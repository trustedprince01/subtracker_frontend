
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LockIcon, Download, Mail, User } from 'lucide-react';
import { toast } from 'sonner';

const QuickActions = () => {
  const handleActionClick = (action: string) => {
    toast.success(`${action} action initiated`);
  };

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Button 
            variant="outline" 
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 bg-darkBlue-800/60 hover:bg-purple-900/20 border-purple-900/20"
            onClick={() => handleActionClick('Update Password')}
          >
            <LockIcon className="h-5 w-5 text-purple-300" />
            <span className="text-sm">Update Password</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 bg-darkBlue-800/60 hover:bg-purple-900/20 border-purple-900/20"
            onClick={() => handleActionClick('Export Data')}
          >
            <Download className="h-5 w-5 text-blue-300" />
            <span className="text-sm">Export Data</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 bg-darkBlue-800/60 hover:bg-purple-900/20 border-purple-900/20"
            onClick={() => handleActionClick('Contact Support')}
          >
            <Mail className="h-5 w-5 text-green-300" />
            <span className="text-sm">Contact Support</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-auto py-4 px-3 flex flex-col items-center gap-2 bg-darkBlue-800/60 hover:bg-red-900/20 border-red-900/20 text-red-400 hover:text-red-300"
            onClick={() => handleActionClick('Delete Account')}
          >
            <User className="h-5 w-5" />
            <span className="text-sm">Delete Account</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
