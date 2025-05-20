import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SubscriptionsList from '@/components/dashboard/SubscriptionsList';
import AddSubscriptionButton from '@/components/dashboard/AddSubscriptionButton';
import AddEditSubscriptionModal from '@/components/dashboard/AddEditSubscriptionModal';
import { Toaster } from 'sonner';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, subscription: null });
  const username = "Alex"; // This would come from user authentication
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const fetchUserActivities = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.get(`${API_URL}/api/user/activities/`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const activities = response.data.map(activity => ({
        id: activity.id.toString(),
        type: getNotificationType(activity.type),
        title: getNotificationTitle(activity.type),
        message: activity.description,
        timestamp: new Date(activity.timestamp),
        isRead: false
      }));

      setNotifications(activities);
    } catch (error) {
      console.error('Failed to fetch user activities', error);
    }
  };

  const getNotificationType = (activityType: string) => {
    const typeMap = {
      'subscription_added': 'feature',
      'subscription_removed': 'account',
      'profile_updated': 'tip',
      'login': 'payment',
      'password_changed': 'account'
    };
    return typeMap[activityType] || 'tip';
  };

  const getNotificationTitle = (activityType: string) => {
    const titleMap = {
      'subscription_added': 'New Subscription',
      'subscription_removed': 'Subscription Removed',
      'profile_updated': 'Profile Updated',
      'login': 'New Login',
      'password_changed': 'Security Update'
    };
    return titleMap[activityType] || 'Activity Notification';
  };

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.get(`${API_URL}/api/subscriptions/`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // Map backend fields to frontend fields
      const mapped = response.data.map((sub: any) => ({
        ...sub,
        nextBillingDate: sub.next_billing_date,
        price: Number(sub.price),
        // add more mappings if needed
      }));
      setSubscriptions(mapped);
    } catch (error: any) {
      // Check if token is invalid
      if (error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          // Update tokens
          localStorage.setItem('access_token', refreshResponse.data.access);
          if (refreshResponse.data.refresh) {
            localStorage.setItem('refresh_token', refreshResponse.data.refresh);
          }
          
          // Retry fetching subscriptions
          return fetchSubscriptions();
        } catch (refreshError) {
          // If refresh fails, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
      setSubscriptions([]);
    }
  };

  React.useEffect(() => { 
    fetchSubscriptions(); 
    fetchUserActivities(); 
  }, []);

  const handleEdit = (subscription) => {
    setSubscriptionToEdit(subscription);
    setShowAddModal(true);
  };

  const handleDelete = (subscription) => {
    setDeleteDialog({ open: true, subscription });
  };

  const confirmDelete = async () => {
    const subscription = deleteDialog.subscription;
    if (!subscription) return;
    const token = localStorage.getItem('access_token');
    try {
      await axios.delete(`${API_URL}/api/subscriptions/${subscription.id}/`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setDeleteDialog({ open: false, subscription: null });
      setNotifications(prev => [
        {
          id: `deleted-${subscription.id}`,
          type: 'deleted',
          title: 'Subscription deleted',
          message: `You deleted ${subscription.name}`,
          timestamp: new Date(),
          isRead: false,
        },
        ...prev,
      ]);
      fetchSubscriptions();
    } catch (error: any) {
      // Check if token is invalid
      if (error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            window.location.href = '/login';
            return;
          }
          const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          // Update tokens
          localStorage.setItem('access_token', refreshResponse.data.access);
          if (refreshResponse.data.refresh) {
            localStorage.setItem('refresh_token', refreshResponse.data.refresh);
          }
          
          // Retry delete
          return confirmDelete();
        } catch (refreshError) {
          // If refresh fails, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
      throw error;
    }
  };

  const cancelDelete = () => {
    setDeleteDialog({ open: false, subscription: null });
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSubscriptionToEdit(null);
  };

  // Example notifications: upcoming payments in next 7 days
  React.useEffect(() => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const upcoming = subscriptions
      .filter(sub => {
        const date = new Date(sub.nextBillingDate);
        return date >= now && date <= weekFromNow;
      })
      .map((sub, idx) => {
        const billingDate = new Date(sub.nextBillingDate);
        const days = Math.ceil((billingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        return {
          id: `upcoming-${sub.id}`,
          type: 'payment',
          title: `${sub.name} subscription due in ${days} day${days === 1 ? '' : 's'}`,
          message: `Your ${sub.name} subscription of $${sub.price} will be charged on ${billingDate.toLocaleDateString()}`,
          timestamp: billingDate,
          isRead: false,
        };
      });
    setNotifications(prev => {
      // Keep deleted notifications, add/replace upcoming
      const deleted = prev.filter(n => n.type === 'deleted');
      return [...deleted, ...upcoming];
    });
  }, [subscriptions]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <DashboardHeader 
        username={username} 
        search={search} 
        setSearch={setSearch}
        notifications={notifications}
        onLogout={handleLogout}
      />
      <div className="p-6 space-y-6">
        <SummaryCards subscriptions={subscriptions} />
        <SubscriptionsList 
          subscriptions={subscriptions.filter(sub =>
            sub.name.toLowerCase().includes(search.toLowerCase()) ||
            (sub.category && sub.category.toLowerCase().includes(search.toLowerCase()))
          )}
          onAdd={() => setShowAddModal(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <AddSubscriptionButton onClick={() => setShowAddModal(true)} />
        <AddEditSubscriptionModal 
          isOpen={showAddModal} 
          onClose={handleModalClose} 
          onSuccess={fetchSubscriptions}
          subscriptionToEdit={subscriptionToEdit}
        />
        {deleteDialog.open && (
          <Dialog open={deleteDialog.open} onOpenChange={cancelDelete}>
            <DialogContent className="sm:max-w-[400px] bg-darkBlue-700 border-purple-900/20 text-gray-100">
              <DialogHeader>
                <DialogTitle className="text-lg font-semibold">Delete Subscription</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Are you sure you want to delete subscription '{deleteDialog.subscription?.name}'?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button onClick={cancelDelete} variant="outline" className="w-full sm:w-auto bg-darkBlue-800 border-purple-900/30 hover:bg-darkBlue-700">Cancel</Button>
                <Button onClick={confirmDelete} variant="destructive" className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">Delete</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
