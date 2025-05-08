
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AddSubscriptionButtonProps {
  onClick: () => void;
}

const AddSubscriptionButton = ({ onClick }: AddSubscriptionButtonProps) => {
  return (
    <Button 
      onClick={onClick}
      className="fixed bottom-8 right-8 z-10 h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-purple-700 p-0 shadow-lg hover:shadow-purple-500/20 hover:scale-105 transition-all duration-200"
    >
      <Plus className="h-6 w-6" />
      <span className="sr-only">Add Subscription</span>
    </Button>
  );
};

export default AddSubscriptionButton;
