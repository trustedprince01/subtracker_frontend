import React, { useState, useEffect } from 'react';
import { 
  SidebarProvider, 
  Sidebar,
  SidebarHeader, 
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  User,
  Bell
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userAvatar, setUserAvatar] = useState('/default-avatar.png');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token') || localStorage.getItem('accessToken') || localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:8000/api/user/profile/me/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.username) {
          setUsername(response.data.username);
        } else if (response.data.email) {
          setUsername(response.data.email.split('@')[0]);
        }
        if (response.data.avatar) {
          setUserAvatar(response.data.avatar);
        }
      } catch (error) {
        console.error('Failed to fetch user profile', error);
        setUsername('User');
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    toast.success('Successfully logged out');
    // In a real app, you would clear auth tokens/session here
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar className="bg-darkBlue-800 border-r border-purple-900/20">
          <SidebarHeader>
            <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-purple-900/30">
                <span className="text-purple-300 font-bold">ST</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-400">
                SubTrackr
              </span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/dashboard'} tooltip="Dashboard">
                  <Link to="/dashboard" className="flex items-center">
                    <LayoutDashboard className={location.pathname === '/dashboard' ? "text-purple-300" : ""} />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/reports'} tooltip="Reports">
                  <Link to="/reports" className="flex items-center">
                    <BarChart3 className={location.pathname === '/reports' ? "text-purple-300" : ""} />
                    <span>Reports</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/notifications'} tooltip="Notifications">
                  <Link to="/notifications" className="flex items-center">
                    <Bell className={location.pathname === '/notifications' ? "text-purple-300" : ""} />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={location.pathname === '/settings'} tooltip="Settings">
                  <Link to="/settings" className="flex items-center">
                    <Settings className={location.pathname === '/settings' ? "text-purple-300" : ""} />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter>
            <div className="px-3 py-2">
              <div className="flex items-center justify-between">
                <Link to="/settings" className="flex items-center gap-3 p-2 rounded-md hover:bg-purple-900/20 transition-colors">
                  <img 
                    src={userAvatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-100">{username || 'User'}</span>
                    <span className="text-xs text-gray-400">Premium Plan</span>
                  </div>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-sm text-gray-400 hover:text-red-400 transition-colors rounded-md hover:bg-red-900/20"
                >
                  Logout
                </button>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <main className="flex-1 overflow-auto bg-darkBlue-800">
          <div className="flex items-center justify-end p-4 border-b border-purple-900/20 bg-darkBlue-700/50 backdrop-blur-sm sticky top-0 z-10">
            <SidebarTrigger className="bg-darkBlue-700 hover:bg-purple-900/20" />
          </div>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
