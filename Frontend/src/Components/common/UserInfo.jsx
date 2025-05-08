import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Chip,
  Button,
  Divider,
  alpha,
  useTheme 
} from '@mui/material';
import { 
  Calendar as CalendarIcon, 
  Clock as ClockIcon,
  User as UserIcon,
  Bell as BellIcon,
} from 'react-feather';

const UserInfoBar = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    // Initialize with current date and time
    updateDateTime();
    
    // Update time every minute
    const timer = setInterval(() => {
      updateDateTime();
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  const updateDateTime = () => {
    const now = new Date();
    
    // Format date as YYYY-MM-DD
    const formattedDate = now.toISOString().split('T')[0];
    
    // Format time as HH:MM:SS (24-hour format)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    
    setCurrentDate(formattedDate);
    setCurrentTime(formattedTime);
  };
  
  return (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar 
          sx={{ 
            bgcolor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            width: 40, 
            height: 40,
            mr: 2 
          }}
        >
          <UserIcon size={20} />
        </Avatar>
        
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Welcome, Anuj-prajapati-SDE
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Last login: 2025-05-03 17:45:12
          </Typography>
        </Box>
      </Box>
      
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Chip
          icon={<CalendarIcon size={14} />}
          label={`Date: ${currentDate}`}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        />
        
        <Chip
          icon={<ClockIcon size={14} />}
          label={`Time (UTC): ${currentTime}`}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        />
        
        <Button
          variant="contained"
          size="small"
          startIcon={<BellIcon size={14} />}
          sx={{ 
            borderRadius: 2,
            ml: { xs: 0, sm: 1 },
          }}
        >
          Notifications (3)
        </Button>
      </Box>
    </Paper>
  );
};

export default UserInfoBar;