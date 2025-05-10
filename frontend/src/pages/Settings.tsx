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
  
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/subscriptions/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubscriptions(response.data);
      } catch (error) {
        console.error('Failed to fetch subscriptions', error);
        toast.error('Could not load subscriptions');
      }
    };

    fetchSubscriptions();
  }, []);
  
  const handleLogout = () => {
    toast.success('Successfully logged out');
    // In a real app, you would clear auth tokens/session here
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
