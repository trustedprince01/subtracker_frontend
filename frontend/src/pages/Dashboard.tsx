import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SubscriptionsList from '@/components/dashboard/SubscriptionsList';
import AddSubscriptionButton from '@/components/dashboard/AddSubscriptionButton';
import AddEditSubscriptionModal from '@/components/dashboard/AddEditSubscriptionModal';
import { Toaster } from 'sonner';
import axios from 'axios';

const Dashboard = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionToEdit, setSubscriptionToEdit] = useState(null);
  const username = "Alex"; // This would come from user authentication

  const fetchSubscriptions = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await axios.get('http://localhost:8000/api/subscriptions/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Map backend fields to frontend fields
      const mapped = response.data.map((sub: any) => ({
        ...sub,
        nextBillingDate: sub.next_billing_date,
        price: Number(sub.price),
        // add more mappings if needed
      }));
      setSubscriptions(mapped);
    } catch (error) {
      setSubscriptions([]);
    }
  };

  React.useEffect(() => { fetchSubscriptions(); }, []);

  const handleEdit = (subscription) => {
    setSubscriptionToEdit(subscription);
    setShowAddModal(true);
  };

  const handleDelete = async (subscription) => {
    if (!window.confirm(`Delete subscription '${subscription.name}'?`)) return;
    const token = localStorage.getItem('auth_token');
    await axios.delete(`http://localhost:8000/api/subscriptions/${subscription.id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchSubscriptions();
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSubscriptionToEdit(null);
  };

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <DashboardHeader username={username} />
      <div className="p-6 space-y-6">
        <SummaryCards subscriptions={subscriptions} />
        <SubscriptionsList 
          subscriptions={subscriptions} 
          onAdd={() => setShowAddModal(true)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <AddSubscriptionButton onClick={() => setShowAddModal(true)} />
        <AddEditSubscriptionModal 
          isOpen={showAddModal} 
          onClose={handleModalClose} 
          onSuccess={fetchSubscriptions}
          subscriptionToEdit={subscriptionToEdit}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
