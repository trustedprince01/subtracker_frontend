import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

interface UserProfile {
  username: string;
  title: string;
  avatar: string;
}

const ProfileHeader = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile/');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
      <Avatar
        src={profile.avatar}
        alt={profile.username}
        sx={{ width: 80, height: 80, mr: 2 }}
      />
      <Box>
        <Typography variant="h4" gutterBottom>
          {profile.username}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {profile.title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          size="small"
          sx={{ mt: 1 }}
        >
          Edit Profile
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
