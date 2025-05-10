import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL;

const AccountInfoCard = () => {
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    isVerified: false,
    creationDate: '',
    lastLogin: '',
    lastLoginLocation: '',
    lastLoginDevice: '',
    planType: 'Free',
    paymentMethod: 'Not set'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${API_URL}/user/profile/me/`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = response.data;
        setAccountInfo({
          email: userData.email || '',
          isVerified: true, // Always show verified badge
          creationDate: userData.date_joined || '',
          lastLogin: userData.last_login || '',
          lastLoginLocation: userData.last_login_location || 'Unknown',
          lastLoginDevice: userData.last_login_device || 'Unknown Device',
          planType: userData.plan_type || 'Free',
          paymentMethod: userData.payment_method || 'Not set'
        });
      } catch (error: any) {
        console.error('Error fetching user data:', error);
        
        // Handle token-related errors
        if (error.response?.status === 401) {
          try {
            const refreshToken = localStorage.getItem('refresh_token');
            const refreshResponse = await axios.post(`${API_URL}/token/refresh/`, {
              refresh: refreshToken
            });
            
            // Update tokens
            localStorage.setItem('access_token', refreshResponse.data.access);
            if (refreshResponse.data.refresh) {
              localStorage.setItem('refresh_token', refreshResponse.data.refresh);
            }
            
            // Retry fetching user data
            return fetchUserData();
          } catch (refreshError) {
            // If refresh fails, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login';
          }
        }

        // Show error toast
        toast.error('Failed to fetch account information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return (
      <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md flex items-center justify-center h-[500px]">
        <div className="animate-pulse text-gray-400">Loading account information...</div>
      </Card>
    );
  }

  if (!accountInfo.email) {
    return (
      <Card className="border-purple-900/20 bg-darkBlue-700 shadow-md flex items-center justify-center h-[500px]">
        <div className="text-red-400 text-center">
          <p>Failed to load account information</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </Card>
    );
  }

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
              {accountInfo.creationDate ? new Date(accountInfo.creationDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }) : 'Not available'}
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
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Last Login
            </p>
            {accountInfo.lastLogin ? (
              <div className="text-white space-y-1">
                <p>
                  {new Date(accountInfo.lastLogin).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(accountInfo.lastLogin), { addSuffix: true })} 
                  {accountInfo.lastLoginLocation && ` • from ${accountInfo.lastLoginLocation}`}
                  {accountInfo.lastLoginDevice && ` • ${accountInfo.lastLoginDevice}`}
                </p>
              </div>
            ) : (
              <p className="text-gray-400">No recent login information</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfoCard;
