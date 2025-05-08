
import React from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ProfileHeader from '@/components/settings/ProfileHeader';
import AccountInfoCard from '@/components/settings/AccountInfoCard';
import StatisticsCards from '@/components/settings/StatisticsCards';
import ActivityTimeline from '@/components/settings/ActivityTimeline';
import ConnectedAccounts from '@/components/settings/ConnectedAccounts';
import QuickActions from '@/components/settings/QuickActions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  
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
          <div className="lg:col-span-2">
            <AccountInfoCard />
          </div>
          <div className="lg:col-span-1">
            <StatisticsCards />
          </div>
        </div>
        <ActivityTimeline />
        <ConnectedAccounts />
        <QuickActions />
      </div>
    </DashboardLayout>
  );
};

export default Settings;
