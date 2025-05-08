
import React, { useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for the charts
const categoryData = [
  { name: 'Entertainment', value: 32, color: '#9370DB' },
  { name: 'Work Tools', value: 42, color: '#8A2BE2' },
  { name: 'Shopping', value: 15, color: '#7E69AB' },
  { name: 'Utilities', value: 11, color: '#6E59A5' },
];

const monthlyData = [
  { name: 'Jan', amount: 70 },
  { name: 'Feb', amount: 82 },
  { name: 'Mar', amount: 93 },
  { name: 'Apr', amount: 89 },
  { name: 'May', amount: 95 },
  { name: 'Jun', amount: 86 },
  { name: 'Jul', amount: 90 },
  { name: 'Aug', amount: 89 },
  { name: 'Sep', amount: 94 },
  { name: 'Oct', amount: 98 },
  { name: 'Nov', amount: 89 },
  { name: 'Dec', amount: 85 },
];

interface ChartSectionProps {
  timePeriod: string;
}

const ChartSection = ({ timePeriod }: ChartSectionProps) => {
  const chartConfig = {
    spending: {
      label: "Spending",
      theme: {
        dark: "#8A2BE2",
        light: "#9370DB",
      },
    },
    savings: {
      label: "Potential Savings",
      theme: {
        dark: "#4B0082",
        light: "#6E59A5",
      },
    },
    entertainment: {
      label: "Entertainment",
      color: "#9370DB",
    },
    workTools: {
      label: "Work Tools",
      color: "#8A2BE2",
    },
    shopping: {
      label: "Shopping",
      color: "#7E69AB",
    },
    utilities: {
      label: "Utilities",
      color: "#6E59A5",
    },
  };

  return (
    <Card className="border border-purple-900/20 bg-card">
      <CardHeader>
        <CardTitle>Spending Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="category">
          <TabsList className="bg-darkBlue-700 border border-purple-900/20">
            <TabsTrigger value="category">By Category</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            <TabsTrigger value="comparison">Year Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="category" className="h-[300px] mt-4">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly" className="h-[300px] mt-4">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: '#bbb' }} />
                  <YAxis tick={{ fill: '#bbb' }} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#8A2BE2' }}
                  />
                  <Bar dataKey="amount" fill="#8A2BE2" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="h-[300px] mt-4">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: '#bbb' }} />
                  <YAxis tick={{ fill: '#bbb' }} />
                  <Tooltip 
                    formatter={(value) => [`$${value}`, 'Amount']}
                    contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#8A2BE2' }}
                  />
                  <Area type="monotone" dataKey="amount" stroke="#8A2BE2" fill="#8A2BE2" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChartSection;
