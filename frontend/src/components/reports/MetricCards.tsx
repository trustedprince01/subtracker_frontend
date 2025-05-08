
import React from 'react';
import { TrendingUp, DollarSign, Tag, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  comparison?: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
  positive?: boolean;
}

const MetricCard = ({ 
  title, 
  value, 
  comparison, 
  icon, 
  gradientFrom, 
  gradientTo,
  positive = true
}: MetricCardProps) => {
  return (
    <Card className="relative overflow-hidden border border-purple-900/20 bg-card p-6 animate-fade-in transition-shadow duration-300 hover:shadow-lg">
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
          {comparison && (
            <p className={`text-xs mt-2 ${positive ? 'text-green-400' : 'text-red-400'}`}>
              {comparison}
            </p>
          )}
        </div>
        <div className="flex items-center justify-center rounded-full p-2" 
          style={{ 
            background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
            opacity: 0.85
          }}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

interface MetricCardsProps {
  timePeriod: string;
}

const MetricCards = ({ timePeriod }: MetricCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricCard
        title="Monthly Spending"
        value="$89.99"
        comparison="+4.2% from last month"
        icon={<DollarSign size={20} className="text-white" />}
        gradientFrom="#8A2BE2"
        gradientTo="#4B0082"
        positive={false}
      />
      <MetricCard
        title="Yearly Projection"
        value="$1,079.88"
        comparison="Based on current spending"
        icon={<TrendingUp size={20} className="text-white" />}
        gradientFrom="#9370DB"
        gradientTo="#8A2BE2"
      />
      <MetricCard
        title="Most Expensive"
        value="Adobe - $30/mo"
        comparison="33% of total spending"
        icon={<Tag size={20} className="text-white" />}
        gradientFrom="#7E69AB"
        gradientTo="#9370DB"
        positive={false}
      />
      <MetricCard
        title="Total Active"
        value="8 Subscriptions"
        comparison="-1 from last month"
        icon={<Clock size={20} className="text-white" />}
        gradientFrom="#6E59A5"
        gradientTo="#7E69AB"
        positive={true}
      />
    </div>
  );
};

export default MetricCards;
