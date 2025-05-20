import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileHeader from '@/components/settings/ProfileHeader';
import AccountInfoCard from '@/components/settings/AccountInfoCard';
import StatisticsCards from '@/components/settings/StatisticsCards';
import ActivityTimeline from '@/components/settings/ActivityTimeline';
import QuickActions from '@/components/settings/QuickActions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const Settings = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();
  
  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        window.location.href = '/login';
        return;
      }
      const response = await axios.get(`${API_URL}/api/subscriptions/`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSubscriptions(response.data);
    } catch (error: any) {
      console.error('Failed to fetch subscriptions', error);
      toast.error('Could not load subscriptions');
      
      // Handle token refresh if needed
      if (error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
              refresh: refreshToken
            });
            
            localStorage.setItem('access_token', refreshResponse.data.access);
            if (refreshResponse.data.refresh) {
              localStorage.setItem('refresh_token', refreshResponse.data.refresh);
            }
            
            // Retry fetching subscriptions
            return fetchSubscriptions();
          }
        } catch (refreshError) {
          // If refresh fails, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    toast.success('Successfully logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1500);
  };
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="sr-only">Account Settings</h1>
          <Button 
            variant="destructive" 
            className="ml-auto flex items-center gap-2 bg-red-900/30 text-red-400 hover:bg-red-900/50 hover:text-red-300"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        
        <ProfileHeader />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-4">
            <AccountInfoCard />
          </div>
        </div>
        {/* <ActivityTimeline /> */}
        <QuickActions />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
