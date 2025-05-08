import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';

interface AccountInfo {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

const AccountInfoCard = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const response = await axios.get('/api/user/profile/');
        setAccountInfo(response.data);
      } catch (error) {
        console.error('Error fetching account info:', error);
      }
    };
    fetchAccountInfo();
  }, []);

  if (!accountInfo) return null;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Account Information</Typography>
        <Button
          variant="outlined"
          startIcon={<EditIcon />}
          size="small"
        >
          Edit
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Email</Typography>
          <Typography variant="body1">{accountInfo.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Username</Typography>
          <Typography variant="body1">{accountInfo.username}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">First Name</Typography>
          <Typography variant="body1">{accountInfo.first_name}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle2" color="text.secondary">Last Name</Typography>
          <Typography variant="body1">{accountInfo.last_name}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AccountInfoCard;
