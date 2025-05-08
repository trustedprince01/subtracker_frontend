
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Code, ShoppingCart, PieChart } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CategoryBreakdownProps {
  timePeriod: string;
}

const categories = [
  {
    name: 'Entertainment',
    icon: <Music size={18} />,
    color: '#9370DB',
    amount: 32,
    count: 3,
    percentage: 32
  },
  {
    name: 'Work Tools',
    icon: <Code size={18} />,
    color: '#8A2BE2',
    amount: 42,
    count: 2,
    percentage: 42
  },
  {
    name: 'Shopping',
    icon: <ShoppingCart size={18} />,
    color: '#7E69AB',
    amount: 15,
    count: 2,
    percentage: 15
  },
  {
    name: 'Utilities',
    icon: <PieChart size={18} />,
    color: '#6E59A5',
    amount: 11,
    count: 1,
    percentage: 11
  }
];

const CategoryBreakdown = ({ timePeriod }: CategoryBreakdownProps) => {
  return (
    <Card className="border border-purple-900/20 bg-card">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {categories.map((category) => (
            <div 
              key={category.name}
              className="group flex flex-col space-y-2 hover:bg-darkBlue-700/50 p-3 rounded-lg transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-md" 
                    style={{ backgroundColor: `${category.color}30` }}
                  >
                    <div style={{ color: category.color }}>{category.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{category.name}</h4>
                    <p className="text-xs text-gray-400">{category.count} subscriptions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-white">${category.amount}</p>
                  <p className="text-xs text-gray-400">{category.percentage}% of total</p>
                </div>
              </div>
              
              <Progress 
                value={category.percentage} 
                max={100}
                className="h-2 bg-darkBlue-700"
                style={{ 
                  '--progress-background': category.color
                } as React.CSSProperties} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryBreakdown;
