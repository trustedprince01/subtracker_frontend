
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SubscriptionEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-purple-900/30 rounded-xl bg-darkBlue-700/50 animate-fade-in">
      <div className="h-24 w-24 mb-6 rounded-full bg-gradient-to-br from-purple-900/20 to-purple-800/20 flex items-center justify-center">
        <div className="text-purple-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-gray-100 mb-2">You have no subscriptions yet</h3>
      <p className="text-gray-400 text-center mb-6 max-w-md">
        Start tracking your recurring expenses by adding your first subscription.
      </p>
      <Button className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800">
        <Plus className="h-5 w-5 mr-2" /> Add your first subscription
      </Button>
    </div>
  );
};

export default SubscriptionEmptyState;
