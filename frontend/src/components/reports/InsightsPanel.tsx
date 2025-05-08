import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertTriangle, DollarSign } from 'lucide-react';

interface InsightsPanelProps {
  timePeriod: string;
  subscriptions: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    nextBillingDate: string;
  }>;
}

const InsightsPanel = ({ timePeriod, subscriptions }: InsightsPanelProps) => {
  // Calculate insights
  const totalSpend = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  const avgSubscription = subscriptions.length ? totalSpend / subscriptions.length : 0;
  
  // Find most expensive subscription
  const mostExpensive = subscriptions.reduce((max, sub) => 
    sub.price > max.price ? sub : max, 
    { price: 0, name: '' } as { price: number; name: string }
  );

  // Find subscriptions expiring in next 7 days
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
  const expiringSoon = subscriptions.filter(sub => {
    const nextDate = new Date(sub.nextBillingDate);
    return nextDate <= sevenDaysFromNow;
  });

  const insights = [
    {
      title: 'Average Subscription Cost',
      value: `$${avgSubscription.toFixed(2)}`,
      description: 'per subscription',
      icon: <TrendingUp className="h-5 w-5 text-purple-400" />,
      trend: 'up',
    },
    {
      title: 'Most Expensive',
      value: mostExpensive.name,
      description: `$${mostExpensive.price}/mo`,
      icon: <DollarSign className="h-5 w-5 text-purple-400" />,
      trend: 'neutral',
    },
    {
      title: 'Expiring Soon',
      value: expiringSoon.length.toString(),
      description: 'in next 7 days',
      icon: <AlertTriangle className="h-5 w-5 text-yellow-400" />,
      trend: 'down',
    },
  ];

  return (
    <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-3 rounded-lg bg-darkBlue-800/50 border border-purple-900/20"
          >
            <div className="p-2 rounded-lg bg-purple-500/10">
              {insight.icon}
            </div>
            <div>
              <p className="text-sm text-gray-400">{insight.title}</p>
              <p className="text-lg font-semibold text-gray-100">{insight.value}</p>
              <p className="text-xs text-gray-500">{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InsightsPanel;
