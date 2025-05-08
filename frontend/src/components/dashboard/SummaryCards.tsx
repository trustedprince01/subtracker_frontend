
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

const SummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Monthly Cost"
        value="$89/mo"
        icon={<TrendingUp size={20} className="text-white" />}
        gradientFrom="#8A2BE2"
        gradientTo="#4B0082"
      />
      <SummaryCard
        title="Yearly Estimate"
        value="$1,068/yr"
        icon={<Calendar size={20} className="text-white" />}
        gradientFrom="#9370DB"
        gradientTo="#8A2BE2"
      />
      <SummaryCard
        title="Active Subscriptions"
        value="12 Active"
        icon={<Tag size={20} className="text-white" />}
        gradientFrom="#7E69AB"
        gradientTo="#9370DB"
      />
      <SummaryCard
        title="Upcoming Payments"
        value="3 This Week"
        icon={<Clock size={20} className="text-white" />}
        gradientFrom="#6E59A5"
        gradientTo="#7E69AB"
      />
    </div>
  );
};

export default SummaryCards;
