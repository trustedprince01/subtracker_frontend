
import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ReportsHeader from '@/components/reports/ReportsHeader';
import MetricCards from '@/components/reports/MetricCards';
import ChartSection from '@/components/reports/ChartSection';
import CategoryBreakdown from '@/components/reports/CategoryBreakdown';
import InsightsPanel from '@/components/reports/InsightsPanel';
import UpcomingRenewals from '@/components/reports/UpcomingRenewals';
import { Toaster } from 'sonner';

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState('This Month');

  return (
    <DashboardLayout>
      <Toaster position="top-right" />
      <div className="p-6 space-y-6">
        <ReportsHeader timePeriod={timePeriod} onTimeChange={setTimePeriod} />
        <MetricCards timePeriod={timePeriod} />
        <ChartSection timePeriod={timePeriod} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CategoryBreakdown timePeriod={timePeriod} />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel timePeriod={timePeriod} />
          </div>
        </div>
        <UpcomingRenewals />
      </div>
    </DashboardLayout>
  );
};

export default Reports;
