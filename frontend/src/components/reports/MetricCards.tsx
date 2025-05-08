import React from 'react';
import { TrendingUp, DollarSign, Tag, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardsProps {
  timePeriod: string;
  subscriptions: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    nextBillingDate: string;
  }>;
}

const MetricCards = ({ timePeriod, subscriptions }: MetricCardsProps) => {
  // Calculate metrics from real data
  const totalSpend = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  const avgSubscription = subscriptions.length ? totalSpend / subscriptions.length : 0;
  const categories = new Set(subscriptions.map(sub => sub.category)).size;
  
  // Calculate upcoming renewals in next 30 days
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  const upcomingRenewals = subscriptions.filter(sub => {
    const nextDate = new Date(sub.nextBillingDate);
    return nextDate <= thirtyDaysFromNow;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Spend</p>
            <h3 className="text-2xl font-bold text-gray-100">${totalSpend.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <DollarSign className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Avg. Subscription</p>
            <h3 className="text-2xl font-bold text-gray-100">${avgSubscription.toFixed(2)}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Categories</p>
            <h3 className="text-2xl font-bold text-gray-100">{categories}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Tag className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Upcoming Renewals</p>
            <h3 className="text-2xl font-bold text-gray-100">{upcomingRenewals}</h3>
          </div>
          <div className="p-3 bg-purple-500/10 rounded-lg">
            <Clock className="h-6 w-6 text-purple-400" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MetricCards;
