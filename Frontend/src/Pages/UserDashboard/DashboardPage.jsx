import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, 
  Typography, 
  useTheme,
  Link as MuiLink,
  Avatar,
   alpha,
  Paper,
  Card,
  Grid,
  
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  ArrowForward as ArrowIcon,
  Notifications as NotificationIcon,
  Settings as SettingsIcon,
  ExitToApp as LogoutIcon,
  Help as HelpIcon,
  Person as PersonIcon,
  Search as SearchIcon,
  GridView
} from '@mui/icons-material';
import {
  Calendar as CalendarIcon, 
  Clock as ClockIcon,
  User as UserIcon,
  Bell as BellIcon,
  FileText as FileTextIcon,
  Scissors as ScissorsIcon,
  RefreshCw as RefreshCwIcon,
  Shield as ShieldIcon,
  FilePlus as FilePlusIcon,
  Layers as LayersIcon,
  ZapOff,
  FilePlus
} from 'react-feather';
// import Sidebar from './Sidebar';
function DashboardPage() {
     const theme = useTheme();

  const username = "Anuj-prajapati-SDE";
    const  quickAccessTools= [
      {
        title: 'Create PDF',
        description: 'Generate new PDF documents',
        path: '/tools/create-pdf',
        icon: <FilePlus size={24} color={theme.palette.secondary.main} />,
        color: alpha(theme.palette.secondary.main, 0.1),
      },
      {
        title: 'Compress PDF',
        description: 'Reduce file size while preserving quality',
        path: '/tools/compress-pdf',
        icon: <ZapOff size={24} color={theme.palette.success.main} />,
        color: alpha(theme.palette.success.main, 0.1),
      },
      {
        title: 'Split PDF',
        description: 'Extract pages from your document',
        path: '/tools/split-pdf',
        icon: <ScissorsIcon size={24} color={theme.palette.warning.main} />,
        color: alpha(theme.palette.warning.main, 0.1),
      },
      {
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one document',
        path: '/tools/merge-pdf',
        icon: <LayersIcon size={24} color={theme.palette.primary.main} />,
        color: alpha(theme.palette.primary.main, 0.1),
      },
      
      {
        title: 'PDF to Word',
        description: 'Convert PDF to editable Word document',
        path: '/tools/pdf-to-word',
        icon: <FileTextIcon size={24} color="#2b5797" />,
        color: alpha('#2b5797', 0.1),
      },
      {
        title: 'PDF to PowerPoint',
        description: 'Convert PDF to PowerPoint presentation',
        path: '/tools/pdf-to-powerpoint',
        icon: <LayersIcon size={24} color="#B7472A" />,
        color: alpha('#B7472A', 0.1),
      },
      {
        title: 'PDF to Excel',
        description: 'Extract tables from PDF to Excel',
        path: '/tools/pdf-to-excel',
        icon: <GridView size={24} color="#217346" />,
        color: alpha('#217346', 0.1),
      },
      {
        title: 'Word to PDF',
        description: 'Convert Word documents to PDF format',
        path: '/tools/word-to-pdf',
        icon: <FilePlus size={24} color={theme.palette.error.main} />,
        color: alpha(theme.palette.error.main, 0.1),
      },
      {
        title: 'PowerPoint to PDF',
        description: 'Convert PowerPoint presentations to PDF',
        path: '/tools/powerpoint-to-pdf',
        icon: <FilePlus size={24} color={theme.palette.error.main} />,
        color: alpha(theme.palette.error.main, 0.1),
      },
      {
        title: 'Excel to PDF',
        description: 'Convert Excel spreadsheets to PDF',
        path: '/tools/excel-to-pdf',
        icon: <FilePlus size={24} color={theme.palette.error.main} />,
        color: alpha(theme.palette.error.main, 0.1),
      },
      
      {
        title: 'Protect PDF',
        description: 'Add password protection',
        path: '/tools/protect-pdf',
        icon: <ShieldIcon size={24} color={theme.palette.error.main} />,
        color: alpha(theme.palette.error.main, 0.1),
      }
    ];
    const navigate = useNavigate();
  return (
    <>
      {/* User Info Dashboard Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 4,
            background: 'rgba(20, 20, 40, 0.5)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
            color: 'white'
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
                    width: 52, 
                    height: 52,
                    mr: 2,
                    boxShadow: '0 4px 14px rgba(104, 54, 230, 0.5)',
                  }}
                >
                  {username.substr(0, 2).toUpperCase()}
                </Avatar>
                
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ color: 'white' }}>
                    Welcome back, {username.split('-')[0]}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                    Let's manage your PDF documents
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Quick Access Tools */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: 'white' }}>
            Quick Access
          </Typography>
          <Grid container spacing={2}>
            {quickAccessTools.map((tool, index) => (
         
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <Card
                  onClick={() => navigate(tool.path) }
                  sx={{
                    height: '100%', 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2,
                    borderRadius: 4,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'rgba(20, 20, 40, 0.5)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 25px rgba(104, 54, 230, 0.3)',
                      borderColor: '#7df9ff',
                    }
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 3,
                      bgcolor: tool.color,
                      mb: 1.5,
                    }}
                  >
                    {tool.icon}
                  </Box>
                  <Typography variant="subtitle2" fontWeight={600} align="center" gutterBottom sx={{ color: 'white' }}>
                    {tool.title}
                  </Typography>
                  <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" align="center">
                    {tool.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
    </>
  )
}

export default DashboardPage
