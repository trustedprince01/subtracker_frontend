
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Download, Calendar } from 'lucide-react';

interface ReportsHeaderProps {
  timePeriod: string;
  onTimeChange: (value: string) => void;
}

const ReportsHeader = ({ timePeriod, onTimeChange }: ReportsHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
        <p className="text-gray-400 mt-1">Track your subscription spending trends</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center">
          <Calendar size={16} className="mr-2 text-purple-300" />
          <Select value={timePeriod} onValueChange={onTimeChange}>
            <SelectTrigger className="w-[160px] bg-darkBlue-700 border-purple-900/20">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-darkBlue-700 border-purple-900/20">
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="Last 3 Months">Last 3 Months</SelectItem>
              <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
              <SelectItem value="Year to Date">Year to Date</SelectItem>
              <SelectItem value="Custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button variant="outline" size="sm" className="bg-darkBlue-700 border-purple-900/20">
          <Download size={16} className="mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default ReportsHeader;
