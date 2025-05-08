import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReportsHeader from '@/components/reports/ReportsHeader';
import MetricCards from '@/components/reports/MetricCards';
import ChartSection from '@/components/reports/ChartSection';
import CategoryBreakdown from '@/components/reports/CategoryBreakdown';
import InsightsPanel from '@/components/reports/InsightsPanel';
import UpcomingRenewals from '@/components/reports/UpcomingRenewals';
import { Toaster } from 'sonner';
import axios from 'axios';

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');
  const [subscriptions, setSubscriptions] = useState([]);

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
      }));
      setSubscriptions(mapped);
    } catch (error) {
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
