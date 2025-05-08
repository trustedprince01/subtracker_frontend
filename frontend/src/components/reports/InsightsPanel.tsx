
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb } from 'lucide-react';

interface InsightsItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBg: string;
  iconColor: string;
}

const InsightsItem = ({ icon, title, description, iconBg, iconColor }: InsightsItemProps) => (
  <div className="flex items-start space-x-3 p-3 hover:bg-darkBlue-700/50 rounded-lg transition-colors">
    <div 
      className="p-2 rounded-full shrink-0 mt-0.5"
      style={{ backgroundColor: iconBg }}
    >
      <div style={{ color: iconColor }}>{icon}</div>
    </div>
    <div>
      <h4 className="font-medium text-white text-sm">{title}</h4>
      <p className="text-xs text-gray-400 mt-1">{description}</p>
    </div>
  </div>
);

interface InsightsPanelProps {
  timePeriod: string;
}

const InsightsPanel = ({ timePeriod }: InsightsPanelProps) => {
  return (
    <Card className="border border-purple-900/20 bg-card h-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb size={18} className="mr-2 text-purple-300" />
          Smart Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <InsightsItem
          icon={<TrendingUp size={16} />}
          title="Spending increased"
          description="Your spending increased 15% compared to last month."
          iconBg="#FEE2E2"
          iconColor="#EF4444"
        />
        
        <InsightsItem
          icon={<AlertCircle size={16} />}
          title="Price change detected"
          description="Netflix subscription increased by $2 since last month."
          iconBg="#FEF3C7"
          iconColor="#F59E0B"
        />
        
        <InsightsItem
          icon={<TrendingDown size={16} />}
          title="Potential savings"
          description="Switch to annual plans and save $87.45 per year."
          iconBg="#D1FAE5"
          iconColor="#10B981"
        />
        
        <InsightsItem
          icon={<Lightbulb size={16} />}
          title="Duplicate services"
          description="You have multiple streaming services. Consider consolidating?"
          iconBg="#E0E7FF"
          iconColor="#6366F1"
        />
      </CardContent>
    </Card>
  );
};

export default InsightsPanel;
