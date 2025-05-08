
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Check, 
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

interface NotificationsHeaderProps {
  filter: string;
  onFilterChange: (filter: string) => void;
  onMarkAllRead: () => void;
  notificationCount: number;
}

const NotificationsHeader = ({
  filter,
  onFilterChange,
  onMarkAllRead,
  notificationCount
}: NotificationsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">Notifications</h1>
        <Badge className="bg-purple-600 text-white">{notificationCount}</Badge>
      </div>
      
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="bg-darkBlue-700 border-purple-900/30">
              <Filter size={16} className="mr-2" />
              {filter === 'all' ? 'All' : filter === 'unread' ? 'Unread' : 'Read'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-darkBlue-700 border-purple-900/20">
            <DropdownMenuItem 
              className={filter === 'all' ? "bg-purple-900/30" : ""} 
              onClick={() => onFilterChange('all')}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={filter === 'unread' ? "bg-purple-900/30" : ""} 
              onClick={() => onFilterChange('unread')}
            >
              Unread
            </DropdownMenuItem>
            <DropdownMenuItem 
              className={filter === 'read' ? "bg-purple-900/30" : ""} 
              onClick={() => onFilterChange('read')}
            >
              Read
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onMarkAllRead}
          className="bg-darkBlue-700 border border-purple-900/30 text-purple-300 hover:bg-purple-900/20"
        >
          <Check size={16} className="mr-2" />
          Mark all read
        </Button>
      </div>
    </div>
  );
};

export default NotificationsHeader;
