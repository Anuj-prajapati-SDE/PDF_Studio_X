import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Box, 
  Drawer, 
  SwipeableDrawer,
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
  Fade,
  LinearProgress
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
  ZapOff
} from 'react-feather';
import Sidebar from './Sidebar';

const drawerWidth = 280;

const DashBoardLayout = () => { 
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  }, [navigate]);
  
  // Dynamic date and time functionality
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const username = "Anuj-prajapati-SDE";
  
  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
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
  
  const handleSignOut = () => {
    // Close menu first
    handleMenuClose();
    
    // Clear authentication data (localStorage, cookies, etc.)
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  };


  
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
      'dashboard': 'Dashboard',
      'create-pdf': 'Create PDF',
      'merge-pdf': 'Merge PDF',
      'split-pdf': 'Split PDF',
      'convert-pdf': 'Convert PDF',
      'protect-pdf': 'Protect PDF',
      'sign-pdf': 'Sign PDF',
      'watermark-pdf': 'Add Watermark',
      'unlock-pdf': 'Unlock PDF',
      'crop-pdf': 'Crop PDF',
      'word-to-pdf': 'Word to PDF',
      'pdf-to-word': 'PDF to Word',
      'jpg-to-pdf': 'JPG to PDF',
      'pdf-to-jpg': 'PDF to JPG',
      'excel-to-pdf': 'Excel to PDF',
      'pdf-to-excel': 'PDF to Excel',
      'powerpoint-to-pdf': 'PowerPoint to PDF',
      'pdf-to-powerpoint': 'PDF to PowerPoint',
      'image-compression': 'Image Compression',
      'edit-pdf': 'Edit PDF',
      'compress-pdf': 'Compress PDF',
      'profile': 'My Profile',
      'settings': 'Settings',
      'help': 'Help & Support',
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

  // Show loading or error state
  if (isLoading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh',
          bgcolor: '#030018',
          color: 'white'
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3
          }}
        >
          {/* Logo */}
          <Box 
            sx={{ 
              width: 64,
              height: 64,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              boxShadow: '0 4px 10px rgba(67, 97, 238, 0.3)',
              mb: 2
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 800 }}>PDF</Typography>
          </Box>
          <Typography variant="h6" sx={{ color: 'white' }}>Loading Dashboard...</Typography>
          <Box sx={{ width: 200 }}>
            <LinearProgress 
              sx={{
                height: 6, 
                borderRadius: 3,
                bgcolor: 'rgba(104, 54, 230, 0.2)',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #7df9ff, #4361ee)',
                }
              }}
            />
          </Box>
        </Box>
      </Box>
    );
  }

  return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#030018', color: 'white' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
          bgcolor: 'rgba(20, 20, 40, 0.9)',
          color: 'white',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
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

          {/* Date & Time - Only visible on larger screens */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            mr: 3,
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 2,
            py: 0.75,
            px: 1.5
          }}>
            <CalendarIcon size={16} style={{ marginRight: 8, opacity: 0.7 }} />
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {currentDateTime.toLocaleDateString('en-US', { 
                weekday: 'short', 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>
       

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
                  color: 'white',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    color: '#7df9ff',
                  }
                }}
              >
                <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
                Home
              </MuiLink>
              
              {location.pathname.includes('/dashboard') && (
                <MuiLink
                  component={Link}
                  to="/dashboard"
                  color="inherit"
                  sx={{ 
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#7df9ff',
                    }
                  }}
                >
                  Dashboard
                </MuiLink>
              )}
              
              {/* Only show the page title as a breadcrumb if we're not at the dashboard root */}
              {location.pathname !== '/dashboard' && (
                <Typography 
                  sx={{ 
                    color: '#7df9ff',
                    fontWeight: 600,
                  }}
                >
                  {getPageTitle()}
                </Typography>
              )}
              
            </Breadcrumbs>
          </Box>

          {/* Right Section with User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid',
                borderColor: searchFocused ? '#7df9ff' : 'rgba(255, 255, 255, 0.2)',
                borderRadius: 8,
                px: 2,
                py: 0.5,
                mr: 2,
                maxHeight: 42,
                zIndex: searchFocused && isMobile ? 1200 : 'auto',
                transition: 'all 0.3s ease',
              }}
            >
              <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }} />
              <InputBase
                placeholder="Search tools, documents..."
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                sx={{ flex: 1, fontSize: '0.875rem', color: 'white' }}
              />
              {searchFocused && isMobile && (
                <Button size="small" onClick={() => setSearchFocused(false)}>
                  Cancel
                </Button>
              )}
            </Paper>
          </Fade>
            
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
              <MenuItem onClick={handleSignOut} sx={{ px: 2.5, py: 1.5 }}>
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
     
          <SwipeableDrawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onOpen={() => setMobileOpen(true)}
            swipeAreaWidth={30}
            disableSwipeToOpen={false}
            ModalProps={{
              keepMounted: true, // Better mobile performance
            }}
            sx={{
              display: { lg: 'none' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth,
                boxSizing: 'border-box',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                borderRadius: { xs: 0, sm: '0 16px 16px 0' },
              },
            }}
          >
            <Sidebar onClose={handleDrawerToggle} />
          </SwipeableDrawer>
    
        
        {/* Desktop drawer */}
     
          <Drawer
            variant="permanent"
            open
            sx={{
              display: { xs: 'none', lg: 'block' },
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
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Lens flare effects */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            top: '15%',
            right: '5%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(125, 249, 255, 0.2) 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
            zIndex: 0
          }}
        />
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            bottom: '15%',
            left: '5%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(104, 54, 230, 0.2) 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
            zIndex: 0
          }}
        />
      
      
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

export default DashBoardLayout;