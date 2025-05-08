
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { EditIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const ProfileHeader = () => {
  const [user, setUser] = useState({
    name: 'Alex Johnson',
    title: 'Product Manager',
    memberSince: new Date('2023-02-15'),
    avatarUrl: null,
    isPremium: true
  });

  return (
    <div className="rounded-xl border border-purple-900/20 bg-card p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative">
          <Avatar className="w-24 h-24 border-2 border-purple-300/30 bg-purple-900/30">
            <AvatarImage src={user.avatarUrl || ''} className="object-cover" />
            <AvatarFallback className="text-3xl text-purple-300 bg-purple-900/30">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2">
            <Button size="sm" variant="outline" className="rounded-full w-8 h-8 p-0 bg-darkBlue-700">
              <EditIcon size={14} />
              <span className="sr-only">Edit profile picture</span>
            </Button>
          </div>
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
            Member since {user.memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          
          <div className="mt-4">
            <Button variant="outline" size="sm" className="bg-darkBlue-700 border-purple-900/30">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
