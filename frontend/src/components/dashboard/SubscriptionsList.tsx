import React, { useState, useEffect } from 'react';
import { Grid3X3, List, ChevronDown, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SubscriptionCard from './SubscriptionCard';
import SubscriptionEmptyState from './SubscriptionEmptyState';
import axios from 'axios';

// Define the Subscription type with a specific union type for cycle
type Subscription = {
  id: string;
  name: string;
  price: number;
  cycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  category: string;
  logo: string;
};

const API_URL = `${import.meta.env.VITE_API_URL}/subscriptions/`;

const CATEGORIES = ['All', 'Entertainment', 'Work Tools', 'Personal', 'Shopping', 'Utilities'];

interface SubscriptionsListProps {
  subscriptions: Subscription[];
  onAdd: () => void;
  onEdit: (subscription: Subscription) => void;
  onDelete: (subscription: Subscription) => void;
}

const SubscriptionsList = ({ subscriptions, onAdd, onEdit, onDelete }: SubscriptionsListProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortOption, setSortOption] = useState('Next billing');

  const filteredSubscriptions = activeCategory === 'All' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.category === activeCategory);

  const hasSubscriptions = subscriptions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-xl font-semibold text-gray-100">Your Subscriptions</h2>
        
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9">
                Sort: {sortOption} <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-darkBlue-700 border-purple-900/20">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-purple-900/20" />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setSortOption('Name')}>
                  Name
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('Price (low-high)')}>
                  Price (low-high)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('Price (high-low)')}>
                  Price (high-low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOption('Next billing')}>
                  Next billing
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex items-center bg-darkBlue-700 rounded-md border border-purple-900/20">
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${viewMode === 'grid' ? 'bg-purple-800/30' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`h-9 w-9 ${viewMode === 'list' ? 'bg-purple-800/30' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>
      
      {hasSubscriptions && (
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <Badge
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              className={`cursor-pointer hover:bg-purple-900/30 ${
                activeCategory === category ? 'bg-purple-500' : 'bg-transparent'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      )}
      
      {hasSubscriptions ? (
        <Tabs defaultValue="all" className="mt-6">
          <TabsList className="bg-darkBlue-700 border border-purple-900/20">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredSubscriptions.map(subscription => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  viewMode={viewMode}
                  onEdit={() => onEdit(subscription)}
                  onDelete={() => onDelete(subscription)}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upcoming">
            <div className="mt-2 text-center py-8 text-gray-400">
              <p>No upcoming payments in the next 7 days.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="expiring">
            <div className="mt-2 text-center py-8 text-gray-400">
              <p>No subscriptions expiring soon.</p>
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <SubscriptionEmptyState onAdd={onAdd} />
      )}
    </div>
  );
};

export default SubscriptionsList;
