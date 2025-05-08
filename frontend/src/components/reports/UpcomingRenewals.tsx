import React from 'react';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface UpcomingRenewalsProps {
  subscriptions: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    nextBillingDate: string;
    logo: string;
  }>;
}

// Preload all images in src/assets
const images = import.meta.glob('@/assets/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' });

const getLogoSrc = (logo: string, name: string) => {
  const match = Object.entries(images).find(([key]) => key.endsWith(`/${logo}`));
  if (match) {
    return match[1] as string;
  }
  // fallback
  const defaultMatch = Object.entries(images).find(([key]) => key.endsWith('/default.png'));
  return defaultMatch ? (defaultMatch[1] as string) : '';
};

const UpcomingRenewals = ({ subscriptions }: UpcomingRenewalsProps) => {
  // Sort subscriptions by next billing date
  const sortedSubscriptions = [...subscriptions].sort((a, b) => {
    return new Date(a.nextBillingDate).getTime() - new Date(b.nextBillingDate).getTime();
  });

  // Get next 5 upcoming renewals
  const upcomingRenewals = sortedSubscriptions.slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Upcoming Renewals</h3>
      <div className="relative pl-8">
        {/* Vertical wall */}
        <div className="absolute left-3 top-0 bottom-0 w-px bg-purple-900/30" />
        <div className="space-y-4">
          {upcomingRenewals.map((subscription, idx) => {
            const daysUntil = getDaysUntil(subscription.nextBillingDate);
            const logoSrc = getLogoSrc(subscription.logo, subscription.name);
            return (
              <div
                key={subscription.id}
                className="relative flex items-center justify-between p-3 rounded-lg bg-darkBlue-800/50 border border-purple-900/20"
              >
                {/* Dot on the wall with logo */}
                <div className="absolute left-[-2.5rem] flex flex-col items-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
                  <img src={logoSrc} alt={subscription.name} className="h-7 w-7 rounded-lg object-cover" />
                </div>
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium text-gray-100">{subscription.name}</p>
                    <p className="text-sm text-gray-400">{subscription.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-100">${subscription.price}</p>
                  <p className="text-sm text-gray-400">
                    {daysUntil === 0
                      ? 'Due today'
                      : daysUntil === 1
                      ? 'Due tomorrow'
                      : `Due in ${daysUntil} days`}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default UpcomingRenewals;
