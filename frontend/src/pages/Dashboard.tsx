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

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, subscription: null });
  const username = "Alex"; // This would come from user authentication
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:8000/api/subscriptions/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Map backend fields to frontend fields
      const mapped = response.data.map((sub: any) => ({
        ...sub,
        nextBillingDate: sub.next_billing_date,
        price: Number(sub.price),
        // add more mappings if needed
      }));
      setSubscriptions(mapped);
    } catch (error) {
      setSubscriptions([]);
    }
  };

  React.useEffect(() => { fetchSubscriptions(); }, []);

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
    const token = localStorage.getItem('auth_token');
    await axios.delete(`http://localhost:8000/api/subscriptions/${subscription.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
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
