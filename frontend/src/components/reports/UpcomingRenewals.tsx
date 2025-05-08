
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const UpcomingRenewals = () => {
  const today = new Date();
  const currentMonth = today.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  
  const renewals = [
    { day: 5, name: 'Adobe Creative Cloud', amount: 52.99, logo: 'https://logo.clearbit.com/adobe.com' },
    { day: 12, name: 'Spotify', amount: 9.99, logo: 'https://logo.clearbit.com/spotify.com' },
    { day: 15, name: 'Netflix', amount: 13.99, logo: 'https://logo.clearbit.com/netflix.com' },
    { day: 22, name: 'Disney+', amount: 7.99, logo: 'https://logo.clearbit.com/disneyplus.com' },
  ];
  
  // Calculate days from today
  const renewalDates = renewals.map(renewal => {
    const renewalDate = new Date(today.getFullYear(), today.getMonth(), renewal.day);
    if (renewalDate < today) {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    }
    
    const diffTime = Math.abs(renewalDate.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return {
      ...renewal,
      date: renewalDate,
      daysFromNow: diffDays,
      isPast: renewalDate < today
    };
  }).sort((a, b) => a.daysFromNow - b.daysFromNow);

  return (
    <Card className="border border-purple-900/20 bg-card mt-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar size={18} className="mr-2 text-purple-300" />
          Upcoming Renewals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-purple-900/20 ml-2.5"></div>
          
          <div className="relative pb-8 flex flex-col space-y-4">
            {renewalDates.map((renewal, index) => (
              <div key={index} className="relative pl-12">
                <div 
                  className={`absolute left-0 w-5 h-5 rounded-full mt-1.5 border-2 
                  ${renewal.daysFromNow <= 7 
                    ? 'bg-red-500/20 border-red-500' 
                    : 'bg-purple-500/20 border-purple-500'
                  }`}
                >
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {renewal.logo && (
                      <img 
                        src={renewal.logo} 
                        alt={renewal.name} 
                        className="w-6 h-6 rounded mr-3"
                      />
                    )}
                    <div>
                      <h4 className="font-medium text-white text-sm">{renewal.name}</h4>
                      <p className="text-xs text-gray-400">
                        {renewal.daysFromNow === 0 ? 'Today' : 
                         renewal.daysFromNow === 1 ? 'Tomorrow' : 
                         `In ${renewal.daysFromNow} days`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${renewal.amount}</p>
                    <p className="text-xs text-gray-400">
                      {renewal.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingRenewals;
