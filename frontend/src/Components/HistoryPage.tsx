"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

// Sample history data
const sampleHistoryData = [
  {
    id: 1,
    title: 'Dataset Upload - Sales Data',
    description: 'Uploaded sales data for Q1 2024.',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'Q&A - Sales Forecast',
    description: 'Queried sales forecast for Q2 2024.',
    date: '2024-02-10',
  },
  {
    id: 3,
    title: 'Dataset Upload - Customer Feedback',
    description: 'Uploaded customer feedback data for January 2024.',
    date: '2024-03-12',
  },
];

// Styled component for each history item
const HistoryItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '200px', // Set a fixed height
}));

export default function HistoryPage() {
  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 4 }}>
        History
      </Typography>

      {/* Sample history content */}
      <Grid container spacing={2} justifyContent="center">
        {sampleHistoryData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <HistoryItem>
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                {item.description}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {item.date}
              </Typography>
            </HistoryItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
