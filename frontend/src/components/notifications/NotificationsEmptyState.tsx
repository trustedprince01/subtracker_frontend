
import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-darkBlue-700 flex items-center justify-center">
        <Bell size={40} className="text-gray-500" />
      </div>
      <h3 className="text-xl font-medium text-white">No notifications right now</h3>
      <p className="text-gray-400 text-center max-w-md">
        We'll alert you about upcoming payments and important changes to your subscriptions
      </p>
    </div>
  );
};

export default NotificationsEmptyState;
