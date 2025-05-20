import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReportsHeader from '@/components/reports/ReportsHeader';
import MetricCards from '@/components/reports/MetricCards';
import ChartSection from '@/components/reports/ChartSection';
import CategoryBreakdown from '@/components/reports/CategoryBreakdown';
import InsightsPanel from '@/components/reports/InsightsPanel';
import UpcomingRenewals from '@/components/reports/UpcomingRenewals';
import { toast, Toaster } from 'sonner';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');
  const [subscriptions, setSubscriptions] = useState([]);

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
      
      // Map backend fields to frontend fields
      const mapped = response.data.map((sub: any) => ({
        ...sub,
        nextBillingDate: sub.next_billing_date,
        price: Number(sub.price),
      }));
      setSubscriptions(mapped);
    } catch (error: any) {
      console.error('Error fetching subscriptions:', error);
      
      // Check if token is invalid
      if (error.response?.status === 401) {
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (!refreshToken) {
            throw new Error('No refresh token');
          }
          
          const refreshResponse = await axios.post(`${API_URL}/api/token/refresh/`, {
            refresh: refreshToken
          });
          
          // Update tokens
          localStorage.setItem('access_token', refreshResponse.data.access);
          if (refreshResponse.data.refresh) {
            localStorage.setItem('refresh_token', refreshResponse.data.refresh);
          }
          
          // Retry fetching subscriptions
          return fetchSubscriptions();
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
          // If refresh fails, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      } else {
        // For other errors, show a user-friendly message
        toast.error('Failed to load subscription data');
      }
      setSubscriptions([]);
    }
  };

  React.useEffect(() => { fetchSubscriptions(); }, []);

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-6">
        <ReportsHeader timePeriod={timePeriod} onTimeChange={setTimePeriod} />
        <MetricCards timePeriod={timePeriod} subscriptions={subscriptions} />
        <ChartSection timePeriod={timePeriod} subscriptions={subscriptions} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CategoryBreakdown timePeriod={timePeriod} subscriptions={subscriptions} />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel timePeriod={timePeriod} subscriptions={subscriptions} />
          </div>
        </div>
        <UpcomingRenewals subscriptions={subscriptions} />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
