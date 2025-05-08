
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const AccountInfoCard = () => {
  const accountInfo = {
    email: 'alex.johnson@example.com',
    isVerified: true,
    creationDate: '2023-02-15',
    lastLogin: '2023-05-06T18:25:43.511Z',
    lastLoginLocation: 'San Francisco, CA',
    planType: 'Premium',
    paymentMethod: 'Visa •••• 4242'
  };

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Account Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Email</p>
            <div className="flex items-center gap-2">
              <p className="text-white">{accountInfo.email}</p>
              {accountInfo.isVerified && (
                <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-800/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Member Since</p>
            <p className="text-white">
              {new Date(accountInfo.creationDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Subscription Plan</p>
            <p className="text-white">{accountInfo.planType}</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Payment Method</p>
            <p className="text-white">{accountInfo.paymentMethod}</p>
          </div>
          
          <div className="space-y-1 col-span-1 md:col-span-2">
            <p className="text-sm text-gray-400">Last Login</p>
            <p className="text-white">
              {new Date(accountInfo.lastLogin).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })} 
              <span className="text-gray-400 ml-1">from {accountInfo.lastLoginLocation}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
