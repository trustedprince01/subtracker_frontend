import React, { useState, useEffect } from 'react';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface DashboardHeaderProps {
  username: string;
  search: string;
  setSearch: (value: string) => void;
  notifications: { id: number; message: string; read?: boolean }[];
  onLogout: () => void;
}

const DashboardHeader = ({ username: initialUsername, search, setSearch, notifications, onLogout }: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const [userAvatar, setUserAvatar] = useState('/default-avatar.png');
  const [username, setUsername] = useState(initialUsername);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/api/user/profile/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Update avatar
        if (response.data.avatar) {
          setUserAvatar(response.data.avatar);
        }
        
        // Update username
        if (response.data.username) {
          setUsername(response.data.username);
        } else if (response.data.email) {
          // Fallback to email username if needed
          setUsername(response.data.email.split('@')[0]);
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfileClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between px-6 pt-6 pb-2">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
          Hey {username || 'User'}, <span className="text-gray-300">here's your dashboard</span>
        </h1>
      </div>
      
      <div className="flex items-center mt-4 md:mt-0 space-x-4">
        <div className="relative flex-1 md:flex-initial md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search subscriptions..."
            className="pl-9 bg-darkBlue-700 border-purple-900/30 focus-visible:ring-purple-400"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-medium text-white">
                  {notifications.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 bg-darkBlue-700 border-purple-900/20">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-900/20" />
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-gray-400">No notifications</div>
            ) : (
              notifications.map(n => (
                <DropdownMenuItem key={n.id} className="text-gray-100">
                  {n.message}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <img 
                src={userAvatar} 
                alt="Profile" 
                className="w-7 h-7 rounded-full object-cover"
              />
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-darkBlue-700 border-purple-900/20">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-purple-900/20" />
            <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
            <DropdownMenuItem onClick={handleProfileClick}>Settings</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-900/20" />
            <DropdownMenuItem className="text-red-400" onClick={onLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
