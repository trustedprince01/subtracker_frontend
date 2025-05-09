
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Settings, Shield, Bell } from 'lucide-react';

const ActivityTimeline = () => {
  const activities = [
    {
      id: 1,
      type: 'subscription',
      action: 'Added new subscription',
      subject: 'Spotify Premium',
      date: '2023-05-05T10:30:00',
      icon: <CreditCard className="h-4 w-4" />
    },
    {
      id: 2,
      type: 'setting',
      action: 'Updated profile information',
      subject: 'Changed job title',
      date: '2023-05-03T14:45:00',
      icon: <Settings className="h-4 w-4" />
    },
    {
      id: 3,
      type: 'security',
      action: 'Password changed',
      subject: 'Enhanced account security',
      date: '2023-04-28T09:15:00',
      icon: <Shield className="h-4 w-4" />
    },
    {
      id: 4,
      type: 'notification',
      action: 'Acknowledged payment reminder',
      subject: 'Netflix renewal',
      date: '2023-04-25T16:20:00',
      icon: <Bell className="h-4 w-4" />
    },
    {
      id: 5,
      type: 'subscription',
      action: 'Removed subscription',
      subject: 'HBO Max',
      date: '2023-04-22T11:10:00',
      icon: <CreditCard className="h-4 w-4" />
    },
  ];

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else if (diffInSeconds < 604800) {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'bg-purple-500/20 text-purple-300';
      case 'setting':
        return 'bg-blue-500/20 text-blue-300';
      case 'security':
        return 'bg-green-500/20 text-green-300';
      case 'notification':
        return 'bg-amber-500/20 text-amber-300';
      default:
        return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3 animate-fade-in">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${getIconBackground(activity.type)}`}>
                {activity.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{activity.subject}</p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                    {getTimeAgo(activity.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t border-purple-900/20 pt-3">
        <Button variant="outline" size="sm" className="w-full bg-darkBlue-800 hover:bg-purple-900/20">
          View All Activity
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActivityTimeline;
