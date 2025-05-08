import React from 'react';
import { TrendingUp, Calendar, Tag, Clock } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

const SummaryCard = ({ title, value, icon, gradientFrom, gradientTo }: SummaryCardProps) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-purple-900/20 bg-card p-6 animate-fade-in hover:shadow-lg transition-shadow duration-300">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="mt-2 text-3xl font-bold text-white">{value}</h4>
        </div>
        <div className="flex items-center justify-center rounded-full p-2" 
          style={{ 
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            opacity: 0.85
          }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface SummaryCardsProps {
  subscriptions: any[];
}

const SummaryCards = ({ subscriptions }: SummaryCardsProps) => {
  const monthly = subscriptions.reduce((sum, sub) => sum + (sub.cycle === 'monthly' ? sub.price : 0), 0);
  const yearly = subscriptions.reduce((sum, sub) => sum + (sub.cycle === 'yearly' ? sub.price : 0), 0);
  const monthlyCost = monthly + yearly / 12;
  const yearlyEstimate = yearly + monthly * 12;
  const activeCount = subscriptions.length;
  const now = new Date();
  const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingPayments = subscriptions.filter(sub => {
    const date = new Date(sub.nextBillingDate);
    return date >= now && date <= weekFromNow;
  }).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Monthly Cost"
        value={`$${monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}/mo`}
        icon={<TrendingUp size={20} className="text-white" />}
        gradientFrom="#8A2BE2"
        gradientTo="#4B0082"
      />
      <SummaryCard
        title="Yearly Estimate"
        value={`$${yearlyEstimate.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr`}
        icon={<Calendar size={20} className="text-white" />}
        gradientFrom="#9370DB"
        gradientTo="#8A2BE2"
      />
      <SummaryCard
        title="Active Subscriptions"
        value={`${activeCount} Active`}
        icon={<Tag size={20} className="text-white" />}
        gradientFrom="#7E69AB"
        gradientTo="#9370DB"
      />
      <SummaryCard
        title="Upcoming Payments"
        value={`${upcomingPayments} This Week`}
        icon={<Clock size={20} className="text-white" />}
        gradientFrom="#6E59A5"
        gradientTo="#7E69AB"
      />
    </div>
  );
};

export default SummaryCards;
