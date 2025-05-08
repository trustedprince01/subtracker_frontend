
import React from 'react';
import { Card } from '@/components/ui/card';
import { Check, Calendar, CreditCard, AlertCircle, Bell, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

export interface NotificationProps {
  id: string;
  type: 'payment' | 'price-change' | 'feature' | 'account' | 'tip';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  onMarkAsRead: (id: string) => void;
}

const NotificationCard = ({
  id,
  type,
  title,
  message,
  timestamp,
  isRead,
  onMarkAsRead
}: NotificationProps) => {
  const iconMap = {
    'payment': <Calendar className="h-5 w-5" />,
    'price-change': <CreditCard className="h-5 w-5" />,
    'feature': <Bell className="h-5 w-5" />,
    'account': <AlertCircle className="h-5 w-5" />,
    'tip': <Lightbulb className="h-5 w-5" />
  };
  
  const colorMap = {
    'payment': 'from-purple-500/20 to-blue-600/20 text-purple-300',
    'price-change': 'from-amber-500/20 to-orange-500/20 text-amber-300',
    'feature': 'from-green-500/20 to-emerald-600/20 text-green-300',
    'account': 'from-red-500/20 to-pink-600/20 text-red-300',
    'tip': 'from-cyan-500/20 to-teal-600/20 text-cyan-300'
  };

  return (
    <Card 
      className={`border ${isRead ? 'border-purple-900/20' : 'border-l-4 border-l-purple-500 border-purple-900/20'} 
      bg-darkBlue-700/80 p-4 mb-3 hover:bg-darkBlue-700 transition-colors group animate-fade-in`}
    >
      <div className="flex items-start gap-4">
        <div 
          className={`p-3 rounded-full bg-gradient-to-br ${colorMap[type]}`} 
          style={{ opacity: isRead ? 0.7 : 1 }}
        >
          {iconMap[type]}
        </div>
        
        <div className={`flex-1 ${isRead ? 'opacity-80' : 'opacity-100'}`}>
          <div className="flex justify-between">
            <h3 className="font-medium text-white">{title}</h3>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-gray-300 mt-1">{message}</p>
        </div>

        {!isRead && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onMarkAsRead(id)} 
            className="opacity-0 group-hover:opacity-100 transition-opacity bg-darkBlue-800 hover:bg-purple-900/20"
          >
            <Check size={14} className="text-purple-300" />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default NotificationCard;
