
import React, { useState } from 'react';
import NotificationCard, { NotificationProps } from './NotificationCard';
import { toast } from 'sonner';

interface NotificationsListProps {
  filter: string;
}

const NotificationsList = ({ filter }: NotificationsListProps) => {
  // Mock notifications data
  const [notifications, setNotifications] = useState<NotificationProps[]>([
    {
      id: '1',
      type: 'payment',
      title: 'Netflix subscription due tomorrow',
      message: 'Your Netflix monthly subscription of $13.99 will be charged on April 15, 2023',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      isRead: false,
      onMarkAsRead: () => {}
    },
    {
      id: '2',
      type: 'price-change',
      title: 'Spotify price increase',
      message: 'Spotify has increased their premium plan from $9.99 to $10.99 per month effective next billing cycle',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: false,
      onMarkAsRead: () => {}
    },
    {
      id: '3',
      type: 'feature',
      title: 'New feature: Subscription sharing',
      message: 'You can now share subscription details with family members or teammates',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      isRead: true,
      onMarkAsRead: () => {}
    },
    {
      id: '4',
      type: 'account',
      title: 'Security alert: New login',
      message: 'A new login to your account was detected from San Francisco, CA',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      isRead: true,
      onMarkAsRead: () => {}
    },
    {
      id: '5',
      type: 'tip',
      title: 'Save $45 on Adobe subscription',
      message: 'Switching to an annual plan could save you $45 per year on your Adobe subscription',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
      isRead: false,
      onMarkAsRead: () => {}
    },
    {
      id: '6',
      type: 'payment',
      title: 'Adobe subscription renewed',
      message: 'Your Adobe Creative Cloud subscription was successfully charged ($52.99)',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      isRead: true,
      onMarkAsRead: () => {}
    },
    {
      id: '7',
      type: 'account',
      title: 'Profile update successful',
      message: 'Your account details have been successfully updated',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
      isRead: true,
      onMarkAsRead: () => {}
    },
    {
      id: '8',
      type: 'feature',
      title: 'Try our new mobile app',
      message: 'Track your subscriptions on the go with our new mobile application',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14), // 14 days ago
      isRead: true,
      onMarkAsRead: () => {}
    }
  ]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
    toast.success('Notification marked as read');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'read') return notification.isRead;
    if (filter === 'unread') return !notification.isRead;
    return true;
  });

  return (
    <div className="space-y-3">
      {filteredNotifications.map(notification => (
        <NotificationCard 
          key={notification.id}
          {...notification}
          onMarkAsRead={handleMarkAsRead}
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
