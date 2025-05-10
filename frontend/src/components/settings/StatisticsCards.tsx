import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Calendar, TrendingUp, Clock } from 'lucide-react';
import axios from 'axios';

const StatisticsCards = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('access_token') || localStorage.getItem('accessToken') || localStorage.getItem('jwt');
        console.log('Token being used:', token);
        const response = await axios.get('/api/subscriptions/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('API response:', response.data);
        setSubscriptions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch subscriptions', error);
        setSubscriptions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  const activeSubscriptions = Array.isArray(subscriptions) ? subscriptions.length : 0;
  const monthlyCost = Array.isArray(subscriptions)
    ? subscriptions.reduce((sum, sub) =>
        sum + (sub.cycle === 'monthly' ? (parseFloat(sub.price) || 0) : ((parseFloat(sub.price) || 0) / 12)), 0
      )
    : 0;
  const mostExpensive = Array.isArray(subscriptions)
    ? Math.max(...subscriptions.map(sub => parseFloat(sub.price) || 0), 0)
    : 0;
  const upcomingRenewals = Array.isArray(subscriptions)
    ? subscriptions.filter(sub => {
        if (!sub.next_billing_date) return false;
        const nextBillingDate = new Date(sub.next_billing_date);
        const now = new Date();
        const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return nextBillingDate >= now && nextBillingDate <= weekFromNow;
      }).length
    : 0;

  const stats = [
    {
      title: 'Active Subscriptions',
      value: loading ? '...' : `${activeSubscriptions}`,
      icon: <CreditCard className="h-4 w-4 text-purple-300" />, 
      color: 'from-purple-500/20 to-purple-700/20'
    },
    {
      title: 'Monthly Spending',
      value: loading ? '...' : `$${monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: <TrendingUp className="h-4 w-4 text-purple-300" />, 
      color: 'from-indigo-500/20 to-blue-600/20'
    },
    {
      title: 'Most Expensive',
      value: loading ? '...' : `$${mostExpensive.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      icon: <Calendar className="h-4 w-4 text-purple-300" />, 
      color: 'from-pink-500/20 to-rose-500/20'
    },
    {
      title: 'Upcoming Renewals',
      value: loading ? '...' : `${upcomingRenewals}`,
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
