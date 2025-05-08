
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import NotificationsHeader from '@/components/notifications/NotificationsHeader';
import NotificationsList from '@/components/notifications/NotificationsList';
import NotificationsEmptyState from '@/components/notifications/NotificationsEmptyState';
import { Toaster } from 'sonner';

const Notifications = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'
  const [hasNotifications, setHasNotifications] = useState(true);

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
        
        {hasNotifications ? (
          <NotificationsList filter={filter} />
        ) : (
          <NotificationsEmptyState />
        )}
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
