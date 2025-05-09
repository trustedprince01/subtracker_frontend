
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Calendar, TrendingUp, Clock } from 'lucide-react';

const StatisticsCards = () => {
  const stats = [
    {
      title: 'Active Subscriptions',
      value: '12',
      icon: <CreditCard className="h-4 w-4 text-purple-300" />,
      color: 'from-purple-500/20 to-purple-700/20'
    },
    {
      title: 'Monthly Spending',
      value: '$89.99',
      icon: <TrendingUp className="h-4 w-4 text-purple-300" />,
      color: 'from-indigo-500/20 to-blue-600/20'
    },
    {
      title: 'Most Expensive',
      value: 'Adobe - $30/mo',
      icon: <Calendar className="h-4 w-4 text-purple-300" />,
      color: 'from-pink-500/20 to-rose-500/20'
    },
    {
      title: 'Upcoming Renewals',
      value: '3 This Week',
      icon: <Clock className="h-4 w-4 text-purple-300" />,
      color: 'from-amber-400/20 to-orange-500/20'
    }
  ];

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Subscription Statistics</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-purple-900/10 hover:border-purple-900/30 transition-colors"
              style={{
                background: `linear-gradient(135deg, ${stat.color.split(' ')[0].replace('from-', '')} 0%, ${stat.color.split(' ')[1].replace('to-', '')} 100%)`,
                backgroundSize: '200% 200%'
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-darkBlue-800/60">
                  {stat.icon}
                </div>
                <span className="text-sm font-medium text-gray-300">{stat.title}</span>
              </div>
              <span className="text-base font-bold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatisticsCards;
