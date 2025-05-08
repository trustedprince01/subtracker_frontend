import React from 'react';
import NotificationCard, { NotificationProps } from './NotificationCard';
import { toast } from 'sonner';

interface NotificationsListProps {
  filter: string;
  notifications: NotificationProps[];
}

const NotificationsList = ({ filter, notifications }: NotificationsListProps) => {
  const [localNotifications, setLocalNotifications] = React.useState(notifications);

  React.useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  const handleMarkAsRead = (id: string) => {
    setLocalNotifications(localNotifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
    toast.success('Notification marked as read');
  };

  const filteredNotifications = localNotifications.filter(notification => {
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
