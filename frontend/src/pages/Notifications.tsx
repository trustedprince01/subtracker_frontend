import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import NotificationsEmptyState from '@/components/notifications/NotificationsEmptyState';
import { Toaster } from 'sonner';
import axios from 'axios';

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [hasNotifications, setHasNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get('http://localhost:8000/api/subscriptions/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const mapped = response.data.map((sub: any) => ({
          ...sub,
          nextBillingDate: sub.next_billing_date,
          price: Number(sub.price),
        }));
        setSubscriptions(mapped);
        // Generate notifications from subscriptions
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcoming = mapped
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
        // Notification for every subscription added
        const added = mapped.map((sub, idx) => ({
          id: `added-${sub.id}`,
          type: 'added',
          title: 'Subscription added',
          message: `You added ${sub.name} for $${sub.price}`,
          timestamp: new Date(sub.created_at || sub.nextBillingDate || Date.now()),
          isRead: false,
        }));
        setNotifications([...upcoming, ...added]);
        setHasNotifications(upcoming.length + added.length > 0);
      } catch (error) {
        setSubscriptions([]);
        setNotifications([]);
        setHasNotifications(false);
      }
    };
    fetchSubscriptions();
  }, []);

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-6">
        <NotificationsHeader 
          filter={filter} 
          onFilterChange={setFilter} 
          onMarkAllRead={() => {}} 
          notificationCount={8}
        />
        
        {Array.isArray(notifications) && notifications.length > 0 ? (
          <NotificationsList filter={filter} notifications={notifications} />
        ) : (
          <NotificationsEmptyState />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
