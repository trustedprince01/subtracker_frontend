
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SubscriptionsList from '@/components/dashboard/SubscriptionsList';
import AddSubscriptionButton from '@/components/dashboard/AddSubscriptionButton';
import AddEditSubscriptionModal from '@/components/dashboard/AddEditSubscriptionModal';
import { Toaster } from 'sonner';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const username = "Alex"; // This would come from user authentication

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <DashboardHeader username={username} />
      <div className="p-6 space-y-6">
        <SummaryCards />
        <SubscriptionsList />
        <AddSubscriptionButton onClick={() => setShowAddModal(true)} />
        <AddEditSubscriptionModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
