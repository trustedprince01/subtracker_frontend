import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import NotificationsEmptyState from '@/components/notifications/NotificationsEmptyState';
import { Toaster } from 'sonner';
import axios from 'axios';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      try {
        const [subscriptionsResponse, activitiesResponse] = await Promise.all([
          axios.get(`${API_URL}/subscriptions/`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_URL}/user/activities/`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        // Map subscriptions
        const mapped = subscriptionsResponse.data.map((sub: any) => ({
          ...sub,
          nextBillingDate: sub.next_billing_date,
          price: Number(sub.price),
        }));
        setSubscriptions(mapped);

        // Generate notifications from activities
        console.log('Raw activities:', activitiesResponse.data);
        const activityNotifications = activitiesResponse.data.map((activity: any) => {
          const notification = {
            id: activity.id.toString(),
            type: getNotificationType(activity.type),
            title: getNotificationTitle(activity.type),
            message: activity.description,
            timestamp: new Date(activity.timestamp),
            isRead: false
          };
          console.log('Mapped notification:', notification);
          return notification;
        });

        // Generate upcoming billing notifications
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcomingBillingNotifications = mapped
          .filter(sub => {
            const date = new Date(sub.nextBillingDate);
            return date >= now && date <= weekFromNow;
          })
          .map((sub) => {
            const billingDate = new Date(sub.nextBillingDate);
            const days = Math.ceil((billingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
            return {
              id: `upcoming-${sub.id}`,
              type: 'payment',
              title: `${sub.name} subscription due in ${days} day${days === 1 ? '' : 's'}`,
              message: `Your ${sub.name} subscription of $${sub.price} will be charged on ${billingDate.toLocaleDateString()}`,
              timestamp: billingDate,
              isRead: false
            };
          });

        // Combine and sort notifications
        const combinedNotifications = [
          ...activityNotifications,
          ...upcomingBillingNotifications
        ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

        setNotifications(combinedNotifications);
      } catch (error: any) {
        // Handle authentication errors
        if (error.response?.status === 401) {
          // Token might be expired, try to refresh
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post('http://localhost:8000/api/token/refresh/', {
                refresh: refreshToken
              });

              // Update tokens
              localStorage.setItem('access_token', refreshResponse.data.access);
              if (refreshResponse.data.refresh) {
                localStorage.setItem('refresh_token', refreshResponse.data.refresh);
              }

              // Retry fetching notifications
              await fetchNotifications();
            } catch (refreshError) {
              console.error('Failed to refresh token', refreshError);
              // Clear tokens and redirect to login
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              window.location.href = '/login';
            }
          } else {
            // No refresh token, redirect to login
            window.location.href = '/login';
          }
        } else {
          console.error('Error fetching notifications:', error);
        }
      }
    } catch (error) {
      console.error('Unexpected error in fetchNotifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Helper function to get notification type
  const getNotificationType = (type: string): Notification['type'] => {
    switch(type) {
      case 'subscription_added':
      case 'subscription_removed':
        return 'account';
      case 'payment':
        return 'payment';
      default:
        return 'tip';
    }
  };

  // Helper function to get notification title based on activity type
  const getNotificationTitle = (type: string) => {
    switch(type) {
      case 'subscription_added':
        return 'New Subscription Added';
      case 'subscription_removed':
        return 'Subscription Removed';
      case 'payment':
        return 'Upcoming Payment';
      default:
        return 'Notification';
    }
  };
  // Removed old code

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-6">
        <NotificationsHeader 
          filter={filter} 
          onFilterChange={setFilter} 
          onMarkAllRead={() => {}} 
          notificationCount={notifications.length}
        />
        
        {notifications.length > 0 ? (
          <NotificationsList 
            filter={filter} 
            notifications={notifications.filter(notification => {
              if (filter === 'all') return true;
              if (filter === 'read') return notification.isRead;
              if (filter === 'unread') return !notification.isRead;
              return true;
            })} 
          />
        ) : (
          <NotificationsEmptyState />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
