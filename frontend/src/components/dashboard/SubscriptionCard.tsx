import React from 'react';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface Subscription {
  id: string;
  name: string;
  price: number;
  cycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  category: string;
  logo: string;
}

interface SubscriptionCardProps {
  subscription: Subscription;
  viewMode: 'grid' | 'list';
}

const SubscriptionCard = ({ subscription, viewMode }: SubscriptionCardProps) => {
  const isApproaching = new Date(subscription.nextBillingDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const formattedPrice = subscription.cycle === 'yearly' 
    ? `$${subscription.price.toFixed(2)}/yr` 
    : `$${subscription.price.toFixed(2)}/mo`;
  
  const nextBillingDateFormatted = formatDistanceToNow(new Date(subscription.nextBillingDate), { addSuffix: true });
  
  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = `https://ui-avatars.com/api/?name=${subscription.name.split(' ').join('+')}&background=8A2BE2&color=fff`;
  };
  
  if (viewMode === 'grid') {
    return (
      <div className="relative group rounded-xl bg-darkBlue-700 border border-purple-900/20 p-4 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-800/30 flex items-center justify-center">
              <img 
                src={subscription.logo}
                alt={subscription.name}
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
            </div>
            <div>
              <h3 className="font-semibold text-gray-100">{subscription.name}</h3>
              <p className="text-gray-400 text-sm">{formattedPrice}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 bg-darkBlue-700 border-purple-900/20">
              <DropdownMenuItem className="flex items-center gap-2">
                <Pencil className="h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-purple-900/20" />
              <DropdownMenuItem className="flex items-center gap-2 text-red-400">
                <Trash2 className="h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 pt-3 border-t border-purple-900/10">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="bg-purple-900/20 text-purple-300 hover:bg-purple-900/30">
              {subscription.category}
            </Badge>
            
            <p className={`text-xs ${isApproaching ? 'text-amber-400' : 'text-gray-400'}`}>
              Bills {nextBillingDateFormatted}
            </p>
          </div>
        </div>
        
        {isApproaching && (
          <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 m-2 animate-pulse"></div>
        )}
      </div>
    );
  } else {
    // List view
    return (
      <div className="relative group flex items-center justify-between rounded-xl bg-darkBlue-700 border border-purple-900/20 p-4 hover:shadow-lg hover:shadow-purple-900/10 transition-all duration-300">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-purple-800/30 flex items-center justify-center">
            <img 
              src={subscription.logo}
              alt={subscription.name}
              className="h-full w-full object-cover"
              onError={handleImageError}
            />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-100">{subscription.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-purple-900/20 text-purple-300 hover:bg-purple-900/30">
                {subscription.category}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="font-semibold text-gray-100">{formattedPrice}</p>
            <p className={`text-xs ${isApproaching ? 'text-amber-400' : 'text-gray-400'}`}>
              Bills {nextBillingDateFormatted}
            </p>
          </div>
          
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400">
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete</span>
            </Button>
          </div>
        </div>
        
        {isApproaching && (
          <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
        )}
      </div>
    );
  }
};

export default SubscriptionCard;
