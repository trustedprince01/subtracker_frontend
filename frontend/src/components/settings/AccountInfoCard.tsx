
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const AccountInfoCard = () => {
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    name: '',
    profileImage: '',
    creationDate: '',
    lastLogin: '',
    lastLoginLocation: '',
    planType: '',
    paymentMethod: '',
    username: '',
    firstName: '',
    lastName: '',
    isVerified: false
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user/profile/');
        setAccountInfo({
          email: response.data.email || '',
          name: `${response.data.first_name} ${response.data.last_name}`.trim() || response.data.username,
          creationDate: response.data.creation_date || '',
          lastLogin: response.data.last_login || '',
          lastLoginLocation: response.data.last_login_location || '',
          planType: response.data.plan_type || 'Free',
          paymentMethod: response.data.payment_method || 'Not set',
          profileImage: response.data.profile_image || '',
          username: response.data.username || '',
          firstName: response.data.first_name || '',
          lastName: response.data.last_name || '',
          isVerified: true  // Default to true, can be updated based on backend logic
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md">
      <CardHeader className="border-b border-purple-900/20 pb-3">
        <CardTitle className="text-xl text-white">Account Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-1 gap-4">
          {accountInfo.profileImage && (
            <div className="flex justify-center mb-4">
              <img 
                src={accountInfo.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-2 border-purple-900/20"
              />
            </div>
          )}
          {(accountInfo.firstName || accountInfo.lastName) && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Name</span>
                <span className="text-gray-300">{accountInfo.firstName} {accountInfo.lastName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Email</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">{accountInfo.email}</span>
                  {accountInfo.isVerified && (
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Member Since</span>
                <span className="text-gray-300">{new Date(accountInfo.creationDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Subscription Plan</span>
                <span className="text-gray-300">{accountInfo.planType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white font-semibold">Last Login</span>
                <span className="text-gray-300">{new Date(accountInfo.lastLogin).toLocaleString()}</span>
              </div>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Payment Method</p>
            <p className="text-white">{accountInfo.paymentMethod}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400">Last Login Location</p>
            <p className="text-white">{accountInfo.lastLoginLocation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
