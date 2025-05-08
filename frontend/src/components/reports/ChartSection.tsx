import React from 'react';
import { Card } from '@/components/ui/card';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartSectionProps {
  timePeriod: string;
  subscriptions: Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    nextBillingDate: string;
  }>;
}

const ChartSection = ({ timePeriod, subscriptions }: ChartSectionProps) => {
  // Calculate monthly spending for the last 6 months
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return date.toLocaleString('default', { month: 'short' });
  }).reverse();

  const monthlySpending = months.map(month => {
    // For demo purposes, we'll use the current subscriptions
    // In a real app, you'd want to track historical spending
    return subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Spending',
        data: monthlySpending,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#8B5CF6',
        pointBorderColor: '#1E1B4B',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8B5CF6',
        pointHoverBorderColor: '#1E1B4B',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: '#1E1B4B',
        titleColor: '#E5E7EB',
        bodyColor: '#E5E7EB',
        borderColor: '#4C1D95',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: any) => {
            return `Spending: $${context.raw.toFixed(2)}`;
          },
          title: (context: any) => {
            return `Month: ${context[0].label}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#9CA3AF',
          padding: 10,
          callback: (value: number) => `$${value}`,
        },
        border: {
          display: false,
        },
        beginAtZero: true,
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  return (
    <Card className="p-6 bg-darkBlue-700 border-purple-900/20">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Spending Trend</h3>
      <div className="h-[300px]">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default ChartSection;
