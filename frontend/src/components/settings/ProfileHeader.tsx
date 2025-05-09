import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';

// Create an axios instance with interceptors
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true,
  timeout: 10000  // 10 seconds timeout
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If the error is due to an invalid token and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: refreshToken
        });

        // Update tokens
        localStorage.setItem('access_token', response.data.access);
        if (response.data.refresh) {
          localStorage.setItem('refresh_token', response.data.refresh);
        }

        // Retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ProfileHeader = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    firstName: '',
    lastName: '',
    username: '',
    title: '',
    memberSince: '',
    avatarUrl: '',
    isPremium: true
  });
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    username: ''
  });
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/user/profile/me/');

        // Check for locally stored avatar as fallback
        const localAvatar = localStorage.getItem('user_avatar');

        setUser({
          id: response.data.id,
          name: [response.data.first_name, response.data.last_name].filter(Boolean).join(' ') || response.data.username,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          username: response.data.username,
          title: response.data.title,
          memberSince: response.data.date_joined || '',
          avatarUrl: response.data.avatar || localAvatar || '',
          isPremium: true // You can update this if you have a real premium field
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // Use locally stored avatar if available
        const localAvatar = localStorage.getItem('user_avatar');
        if (localAvatar) {
          setUser(prevUser => ({
            ...prevUser,
            avatarUrl: localAvatar
          }));
        }
      }
    };
    fetchUser();
  }, []);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatarUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    if (!avatarFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      const response = await api.post('/user/profile/upload-avatar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Persist avatar URL in local storage
      localStorage.setItem('user_avatar', response.data.avatar);

      setUser(prevUser => ({
        ...prevUser, 
        avatarUrl: response.data.avatar
      }));
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Avatar upload error:', error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.details || 'Failed to upload profile picture';
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from server');
      } else {
        // Something happened in setting up the request
        toast.error('Error setting up the upload request');
      }
    } finally {
      setUploading(false);
      setAvatarFile(null);
    }
  };

  const openEdit = () => {
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username
    });
    setEditOpen(true);
  };

  const handleEditSave = async () => {
    try {
      setUploading(true);
      
      // Validate input
      if (!editData.firstName.trim() || !editData.lastName.trim() || !editData.username.trim()) {
        toast.error('All fields are required');
        return;
      }

      const response = await api.patch(`/user/profile/${user.id}/`, {
        first_name: editData.firstName.trim(),
        last_name: editData.lastName.trim(),
        username: editData.username.trim()
      });
      
      setUser(prev => ({
        ...prev,
        name: [response.data.first_name, response.data.last_name].filter(Boolean).join(' ') || response.data.username,
        firstName: response.data.first_name,
        lastName: response.data.last_name,
        username: response.data.username
      }));
      
      toast.success('Profile updated successfully');
      setEditOpen(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      
      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        const errorMessage = error.response.data.details || error.response.data.error || 'Failed to update profile';
        toast.error(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        toast.error('No response received from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        toast.error('Error setting up the update request. Please try again.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-purple-900/20 bg-card p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="flex items-center space-x-4 relative group">
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={avatarInputRef}
            onChange={handleAvatarChange}
          />
          <div className="relative">
            <img 
              src={user.avatarUrl || '/default-avatar.png'} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover 
                         group-hover:opacity-50 transition-opacity duration-300"
            />
            <button 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center 
                           opacity-0 group-hover:opacity-100 
                           transition-opacity duration-300 
                           bg-black bg-opacity-50 text-white rounded-full"
            >
              {uploading ? 'Uploading...' : 'Change'}
            </button>
          </div>
          {avatarFile && (
            <button 
              onClick={uploadAvatar} 
              disabled={uploading}
              className="ml-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 
                         disabled:opacity-50 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Save'}
            </button>
          )}
        </div>
        
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Hey, {user.name}!
            </h2>
            {user.isPremium && (
              <Badge className="bg-gradient-to-r from-purple-500 to-purple-700 text-white border-none">
                Premium
              </Badge>
            )}
          </div>
          
          <p className="text-gray-400 mt-1">{user.title}</p>
          <p className="text-sm text-gray-500 mt-2">
            Member since {user.memberSince}
          </p>
          
          <div className="mt-4">
            <Button variant="outline" size="sm" className="bg-darkBlue-700 border-purple-900/30" onClick={openEdit}>
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-darkBlue-700 border-purple-900/20">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={editData.firstName} onChange={e => setEditData(d => ({ ...d, firstName: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={editData.lastName} onChange={e => setEditData(d => ({ ...d, lastName: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={editData.username} onChange={e => setEditData(d => ({ ...d, username: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleEditSave} disabled={uploading}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileHeader;
