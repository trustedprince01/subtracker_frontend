import React, { useState, useEffect } from 'react';
import NotificationCard, { NotificationProps } from './NotificationCard';
import { toast } from 'sonner';
import axios from 'axios';
import { getAccessToken } from '@/lib/auth';

interface NotificationsListProps {
  filter: string;
  notifications?: NotificationProps[];
}

const API_URL = import.meta.env.VITE_API_URL;

const NotificationsList = ({ filter, notifications: initialNotifications }: NotificationsListProps) => {
  const [localNotifications, setLocalNotifications] = useState<NotificationProps[]>(initialNotifications || []);
  const [isLoading, setIsLoading] = useState(!initialNotifications);

  const fetchUserActivities = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      try {
        const response = await axios.get(
          `${API_URL}/api/user/activities/`,
          { headers }
        );

        const activities = response.data.map((activity: any) => ({
          id: activity.id.toString(),
          type: getNotificationType(activity.type),
          title: getNotificationTitle(activity.type),
          message: activity.description,
          timestamp: new Date(activity.timestamp),
          isRead: false,
          onMarkAsRead: () => {}
        }));

        setLocalNotifications(activities);
      } catch (error: any) {
        console.error('Error fetching activities:', error);
        
        // If token is invalid, try to refresh
        if (error.response?.status === 401) {
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) throw new Error('No refresh token');
            
            const refreshResponse = await axios.post(
              `${API_URL}/api/token/refresh/`,
              { refresh: refreshToken },
              { headers: { 'Content-Type': 'application/json' } }
            );

            // Update tokens
            localStorage.setItem('access_token', refreshResponse.data.access);
            if (refreshResponse.data.refresh) {
              localStorage.setItem('refresh_token', refreshResponse.data.refresh);
            }

            // Retry fetching activities with new token
            const newToken = refreshResponse.data.access;
            const retryResponse = await axios.get(
              `${API_URL}/api/user/activities/`,
              { 
                headers: { 
                  'Authorization': `Bearer ${newToken}`,
                  'Content-Type': 'application/json'
                } 
              }
            );

            const activities = retryResponse.data.map((activity: any) => ({
              id: activity.id.toString(),
              type: getNotificationType(activity.type),
              title: getNotificationTitle(activity.type),
              message: activity.description,
              timestamp: new Date(activity.timestamp),
              isRead: false,
              onMarkAsRead: () => {}
            }));

            setLocalNotifications(activities);
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
          }
        } else {
          throw error;
        }
      }
    } catch (error) {
      console.error('Failed to fetch user activities', error);
      toast.error('Could not load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserActivities();
  }, []);

  const getNotificationType = (activityType: string): NotificationProps['type'] => {
    const typeMap = {
      'subscription_added': 'feature',
      'subscription_removed': 'account',
      'profile_updated': 'tip',
      'login': 'payment',
      'password_changed': 'account'
    };
    return typeMap[activityType] || 'tip';
  };

  const getNotificationTitle = (activityType: string): string => {
    const titleMap = {
      'subscription_added': 'New Subscription',
      'subscription_removed': 'Subscription Removed',
      'profile_updated': 'Profile Updated',
      'login': 'New Login',
      'password_changed': 'Security Update'
    };
    return titleMap[activityType] || 'Activity Notification';
  };

  const filteredNotifications = localNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'read') return notification.isRead;
    if (filter === 'unread') return !notification.isRead;
    return true;
  });

  if (isLoading) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-400">Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredNotifications.map(notification => (
        <NotificationCard 
          key={notification.id}
          {...notification}
        />
      ))}
      
      {filteredNotifications.length === 0 && (
        <div className="text-center p-8">
          <p className="text-gray-400">No {filter !== 'all' ? filter : ''} notifications found</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsList;
