import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

interface Statistics {
  totalSubscriptions: number;
  monthlySpend: number;
  activeSubscriptions: number;
  upcomingPayments: number;
}

const StatisticsCards = () => {
  const [stats, setStats] = useState<Statistics | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/subscriptions/');
        const subscriptions = response.data;
        const totalSubscriptions = subscriptions.length;
        const monthlySpend = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
        const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length;
        const upcomingPayments = subscriptions.filter(sub => {
          const nextBilling = new Date(sub.nextBillingDate);
          const now = new Date();
          const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
          return nextBilling >= now && nextBilling <= weekFromNow;
        }).length;
        setStats({ totalSubscriptions, monthlySpend, activeSubscriptions, upcomingPayments });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return null;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Total Subscriptions</Typography>
          <Typography variant="h4">{stats.totalSubscriptions}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Monthly Spend</Typography>
          <Typography variant="h4">${stats.monthlySpend.toFixed(2)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Active Subscriptions</Typography>
          <Typography variant="h4">{stats.activeSubscriptions}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Upcoming Payments</Typography>
          <Typography variant="h4">{stats.upcomingPayments}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StatisticsCards;
