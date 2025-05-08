import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, 
  Drawer, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Breadcrumbs,
  Link as MuiLink,

  useMediaQuery,
  useTheme,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Paper,
  Chip,
  Stack,
  alpha,
  Button,
  Card,
  CardContent,
  Grid,
  InputBase,
  Fade
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
import Sidebar from '../components/common/Sidebar';

const drawerWidth = 280;

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Use current date and time as provided in the request
  const currentDate = "2025-05-03";
  const currentTime = "18:15:16";
  const username = "Anuj-prajapati-SDE";
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };
  
  // Quick access tools for the dashboard
  // const quickAccessTools = [
  //   {
  //     title: 'Merge PDF',
  //     description: 'Combine multiple PDF files into one',
  //     icon: <LayersIcon size={24} color={theme.palette.primary.main} />,
  //     path: '/tools/merge-pdf',
  //     color: alpha(theme.palette.primary.main, 0.1),
  //   },
  //   {
  //     title: 'Split PDF',
  //     description: 'Extract pages from your document',
  //     icon: <ScissorsIcon size={24} color={theme.palette.warning.main} />,
  //     path: '/tools/split-pdf',
  //     color: alpha(theme.palette.warning.main, 0.1),
  //   },
  //   {
  //     title: 'Convert PDF',
  //     description: 'Transform to other formats',
  //     icon: <RefreshCwIcon size={24} color={theme.palette.success.main} />,
  //     path: '/tools/convert-pdf',
  //     color: alpha(theme.palette.success.main, 0.1),
  //   },
  //   {
  //     title: 'Create PDF',
  //     description: 'Generate new PDF documents',
  //     icon: <FilePlusIcon size={24} color={theme.palette.secondary.main} />,
  //     path: '/tools/create-pdf',
  //     color: alpha(theme.palette.secondary.main, 0.1),
  //   },
  //   {
  //     title: 'Protect PDF',
  //     description: 'Add password protection',
  //     icon: <ShieldIcon size={24} color={theme.palette.error.main} />,
  //     path: '/tools/protect-pdf',
  //     color: alpha(theme.palette.error.main, 0.1),
  //   },
  // ];
  // In the quickAccessTools array, add all the new tools:

const  quickAccessTools= [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one document',
    path: '/tools/merge-pdf',
    icon: <LayersIcon size={24} color={theme.palette.primary.main} />,
    color: alpha(theme.palette.primary.main, 0.1),
  },
  {
    title: 'Split PDF',
    description: 'Extract pages from your document',
    path: '/tools/split-pdf',
    icon: <ScissorsIcon size={24} color={theme.palette.warning.main} />,
    color: alpha(theme.palette.warning.main, 0.1),
  },
  {
    title: 'Compress PDF',
    description: 'Reduce file size while preserving quality',
    path: '/tools/compress-pdf',
    icon: <ZapOff size={24} color={theme.palette.success.main} />,
    color: alpha(theme.palette.success.main, 0.1),
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
    title: 'Create PDF',
    description: 'Generate new PDF documents',
    path: '/tools/create-pdf',
    icon: <FilePlus size={24} color={theme.palette.secondary.main} />,
    color: alpha(theme.palette.secondary.main, 0.1),
  },
  {
    title: 'Protect PDF',
    description: 'Add password protection',
    path: '/tools/protect-pdf',
    icon: <ShieldIcon size={24} color={theme.palette.error.main} />,
    color: alpha(theme.palette.error.main, 0.1),
  }
];
  
  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'PDF Processing Complete',
      description: 'Your file "Project Proposal.pdf" has been successfully merged.',
      time: '5 minutes ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Storage Limit Warning',
      description: 'You\'ve used 85% of your available storage. Consider upgrading.',
      time: '2 hours ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Security Update',
      description: 'We\'ve upgraded our encryption standards for better security.',
      time: '1 day ago',
      unread: true,
    },
  ];
  
  // Extract current page title from path
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    const pathMap = {
      'merge-pdf': 'Merge PDF',
      'split-pdf': 'Split PDF',
      'convert-pdf': 'Convert PDF',
      'create-pdf': 'Create PDF',
      'protect-pdf': 'Protect PDF',
    };
    return pathMap[path] || 'Dashboard';
  };
  
  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      x: 20,
    },
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: {
        duration: 0.2,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: 'background.paper',
          color: 'text.primary',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, sm: 70 } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Search Bar */}
          <Fade in={!isMobile || searchFocused}>
            <Paper
              component="form"
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: { xs: searchFocused ? '100%' : 'auto', sm: 'auto', md: 300 },
                position: searchFocused && isMobile ? 'absolute' : 'relative',
                left: searchFocused && isMobile ? 0 : 'auto',
                background: alpha(theme.palette.background.default, 0.8),
                border: '1px solid',
                borderColor: searchFocused ? 'primary.main' : 'divider',
                borderRadius: 8,
                px: 2,
                py: 0.5,
                mr: 2,
                maxHeight: 42,
                zIndex: searchFocused && isMobile ? 1200 : 'auto',
                transition: 'all 0.3s ease',
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <InputBase
                placeholder="Search tools, documents..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                sx={{ flex: 1, fontSize: '0.875rem' }}
              />
              {searchFocused && isMobile && (
                <Button size="small" onClick={() => setSearchFocused(false)}>
                  Cancel
                </Button>
              )}
            </Paper>
          </Fade>

          {/* Breadcrumbs - Hide on mobile if search is focused */}
          <Box 
            sx={{ 
              display: searchFocused && isMobile ? 'none' : 'flex', 
              alignItems: 'center', 
              flexGrow: 1 
            }}
          >
            <Breadcrumbs 
              separator={
                <Box 
                  sx={{ 
                    width: 4, 
                    height: 4, 
                    bgcolor: 'text.disabled', 
                    borderRadius: '50%', 
                    mx: 1 
                  }} 
                />
              }
            >
              <MuiLink
                component={Link}
                to="/"
                color="inherit"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  color: 'text.secondary',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    color: 'primary.main',
                  }
                }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Home
              </MuiLink>
              {location.pathname.includes('/tools') && (
                <MuiLink
                  component={Link}
                  to="/tools"
                  color="inherit"
                  sx={{ 
                    fontWeight: 500,
                    color: 'text.secondary',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'primary.main',
                    }
                  }}
                >
                  Tools
                </MuiLink>
              )}
              <Typography 
                color="primary" 
                sx={{ 
                  fontWeight: 600,
                }}
              >
                {getPageTitle()}
              </Typography>
            </Breadcrumbs>
          </Box>

          {/* Right Section with User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* Date & Time Info */}
            <Box sx={{ 
              mr: 2, 
              display: { xs: 'none', md: 'flex' }, 
              alignItems: 'center', 
              gap: 2 
            }}>
              <Chip
                icon={<CalendarIcon size={14} />}
                label={currentDate}
                variant="outlined"
                size="small"
                sx={{ 
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  borderColor: alpha(theme.palette.primary.main, 0.2),
                  '& .MuiChip-icon': { color: theme.palette.primary.main },
                }}
              />
              <Chip
                icon={<ClockIcon size={14} />}
                label={`${currentTime} UTC`}
                variant="outlined"
                size="small"
                sx={{ 
                  borderRadius: 2,
                  bgcolor: alpha(theme.palette.secondary.main, 0.05),
                  borderColor: alpha(theme.palette.secondary.main, 0.2),
                  '& .MuiChip-icon': { color: theme.palette.secondary.main },
                }}
              />
            </Box>
            
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton 
                onClick={handleNotificationMenuOpen} 
                sx={{ 
                  position: 'relative',
                  '&:after': notifications.some(n => n.unread) ? {
                    content: '""',
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    bgcolor: 'error.main',
                    borderRadius: '50%',
                    top: 10,
                    right: 10,
                  } : {},
                }}
              >
                <BellIcon size={22} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={notificationAnchorEl}
              open={Boolean(notificationAnchorEl)}
              onClose={handleNotificationMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  mt: 1.5,
                  overflow: 'visible',
                  width: 320,
                  maxHeight: 380,
                  borderRadius: 3,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" fontWeight={600}>Notifications</Typography>
                <Chip 
                  label={notifications.filter(n => n.unread).length} 
                  color="error" 
                  size="small" 
                  sx={{ minWidth: 28, height: 20 }}
                />
              </Box>
              <Divider sx={{ my: 1 }} />
              {notifications.map((notification) => (
                <MenuItem key={notification.id} sx={{ px: 2, py: 1.5, position: 'relative' }}>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="body2" fontWeight={600}>
                        {notification.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {notification.description}
                    </Typography>
                    {notification.unread && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          width: 4,
                          height: 4,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      />
                    )}
                  </Box>
                </MenuItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <Box sx={{ textAlign: 'center', py: 1 }}>
                <Button size="small" variant="text">View All Notifications</Button>
              </Box>
            </Menu>
            
            {/* User Profile Menu */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileMenuOpen}
                size="small"
                sx={{ ml: 1 }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    bgcolor: theme.palette.primary.main,
                    background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
                    fontWeight: 600,
                  }}
                >
                  {username.substr(0, 2).toUpperCase()}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  width: 260,
                  borderRadius: 3,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              <Box sx={{ px: 2.5, py: 2.5, position: 'relative' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  {username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Free Plan
                </Typography>
                
                {/* Upgrade button */}
                <Button 
                  size="small" 
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 1.5, borderRadius: 3, py: 0.5 }}
                >
                  Upgrade to Pro
                </Button>
              </Box>
              <Divider />
              <MenuItem component={Link} to="/profile" onClick={handleMenuClose} sx={{ px: 2.5, py: 1.5 }}>
                <ListItemIcon>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="My Profile" />
              </MenuItem>
              <MenuItem component={Link} to="/settings" onClick={handleMenuClose} sx={{ px: 2.5, py: 1.5 }}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
              <MenuItem component={Link} to="/help" onClick={handleMenuClose} sx={{ px: 2.5, py: 1.5 }}>
                <ListItemIcon>
                  <HelpIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Help & Support" />
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose} sx={{ px: 2.5, py: 1.5 }}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Sign Out" />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {/* Mobile drawer */}
     
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                boxSizing: 'border-box',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: { xs: 0, sm: '0 16px 16px 0' },
              },
            }}
          >
            <Sidebar onClose={handleDrawerToggle} />
          </Drawer>
    
        
        {/* Desktop drawer */}
     
          <Drawer
            variant="permanent"
            open
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderRight: '1px solid',
                borderColor: 'divider',
                boxShadow: '0 0 28px rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <Sidebar />
          </Drawer>
     
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          p: { xs: 2, sm: 3, md: 4 },
          mt: 9,
          minHeight: '100vh',
        }}
      >
        {/* User Info Dashboard Header */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #fafbff 0%, #f5f7ff 100%)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
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
                    boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
                  }}
                >
                  {username.substr(0, 2).toUpperCase()}
                </Avatar>
                
                <Box>
                  <Typography variant="h5" fontWeight={700}>
                    Welcome back, {username.split('-')[0]}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Let's manage your PDF documents
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', md: 'flex-end' },
                gap: 2,
                flexWrap: 'wrap',
                mt: { xs: 2, md: 0 }
              }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Date (UTC)</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {currentDate}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: 40, mx: 1 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Time (UTC)</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {currentTime}
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ height: 40, mx: 1 }} />
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">Files Processed</Typography>
                  <Typography variant="subtitle1" fontWeight={600}>
                    126
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
        
        {/* Quick Access Tools */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
            Quick Access
          </Typography>
          <Grid container spacing={2}>
            {quickAccessTools.map((tool, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <Card
                  onClick={() => navigate(tool.path)}
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
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                      borderColor: 'primary.main',
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
                  <Typography variant="subtitle2" fontWeight={600} align="center" gutterBottom>
                    {tool.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" align="center">
                    {tool.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Main Content from Routes */}
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransitionVariants}
        >
          <Outlet />
        </motion.div>
      </Box>
    </Box>
  );
};

export default DashboardLayout;