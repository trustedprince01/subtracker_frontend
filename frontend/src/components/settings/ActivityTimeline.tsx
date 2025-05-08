import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FiberManualRecord as DotIcon } from '@mui/icons-material';
import axios from 'axios';

interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

const ActivityTimeline = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/subscriptions/');
        const subscriptions = response.data;
        const activities = subscriptions.map(sub => ({
          id: sub.id,
          type: 'subscription',
          description: `Subscription to ${sub.name} was ${sub.status}`,
          timestamp: sub.nextBillingDate,
        }));
        setActivities(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Recent Activity</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id} alignItems="flex-start">
            <ListItemIcon>
              <DotIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={activity.description}
              secondary={new Date(activity.timestamp).toLocaleDateString()}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ActivityTimeline;
