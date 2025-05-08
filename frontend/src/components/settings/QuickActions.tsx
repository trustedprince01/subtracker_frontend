import React from 'react';
import { Box, Typography, Paper, Button, Grid } from '@mui/material';
import { Add as AddIcon, Settings as SettingsIcon, Notifications as NotificationsIcon, Security as SecurityIcon } from '@mui/icons-material';

const QuickActions = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Quick Actions</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            fullWidth
          >
            Add Subscription
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            startIcon={<SettingsIcon />}
            fullWidth
          >
            Settings
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            startIcon={<NotificationsIcon />}
            fullWidth
          >
            Notifications
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="outlined"
            startIcon={<SecurityIcon />}
            fullWidth
          >
            Security
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default QuickActions;
