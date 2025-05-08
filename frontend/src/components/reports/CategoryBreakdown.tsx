import React from 'react';
import { Card } from '@/components/ui/card';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryBreakdownProps {
  timePeriod: string;
  subscriptions: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    nextBillingDate: string;
  }>;
}

const CategoryBreakdown = ({ timePeriod, subscriptions }: CategoryBreakdownProps) => {
  // Calculate spending by category
  const categorySpending = subscriptions.reduce((acc, sub) => {
    const category = sub.category || 'Uncategorized';
    acc[category] = (acc[category] || 0) + sub.price;
    return acc;
  }, {} as Record<string, number>);

  const categories = Object.keys(categorySpending);
  const spending = Object.values(categorySpending);
  const total = spending.reduce((sum, amount) => sum + amount, 0);

  const data = {
    labels: categories,
    datasets: [
      {
        data: spending,
        backgroundColor: [
          '#8B5CF6', // Purple
          '#7C3AED', // Violet
          '#6D28D9', // Purple
          '#5B21B6', // Purple
          '#4C1D95', // Purple
          '#9333EA', // Purple
          '#7E22CE', // Purple
          '#6B21A8', // Purple
          '#581C87', // Purple
        ],
        borderColor: '#1E1B4B',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: '#E5E7EB',
          font: {
            size: 12,
          },
          padding: 20,
          boxWidth: 12,
        },
      },
      tooltip: {
        backgroundColor: '#1E1B4B',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#4C1D95',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: $${value.toFixed(2)} (${percentage}%)`;
          },
          title: (context: any) => {
            return `Category: ${context[0].label}`;
          },
        },
      },
    },
  };

  return (
    <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Category Breakdown</h3>
      <div className="h-[300px]">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
};

export default CategoryBreakdown;
