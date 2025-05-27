import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Container,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Avatar,
  Tooltip,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  Layers as LayersIcon,
  Security as SecurityIcon,
  DateRange as DateIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  NotificationsNone as NotificationsIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid } from 'react-feather';

// Logo component
const PdfLogo = ({ size = 40, light = false }) => (
  <Box
    component={motion.div}
    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
    transition={{ duration: 0.5 }}
    sx={{
      width: size,
      height: size,
      borderRadius: '12px',
      background: light ? 'white' : 'linear-gradient(135deg, #6366f1 0%, #4839eb 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 16px rgba(99, 102, 241, 0.2)',
    }}
  >
    <Typography
      variant="h6"
      sx={{
        fontWeight: 800,
        color: light ? '#4839eb' : 'white',
        fontSize: size / 2,
      }}
    >
      PDF
    </Typography>
  </Box>
);

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  // Tools menu
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null);
  const isToolsMenuOpen = Boolean(toolsAnchorEl);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false);
  
  // User menu
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const isUserMenuOpen = Boolean(userMenuAnchor);
  
  // Update the date/time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date and time (UTC)
  const formattedDateTime = dateTime.toISOString().replace('T', ' ').slice(0, 19);

  const toolsMenuItems = [
    { 
      name: 'Merge PDF', 
      path: '/tools/merge-pdf',
      icon: <LayersIcon fontSize="small" sx={{ color: '#6366f1' }} />,
      description: 'Combine multiple PDFs into one document' 
    },
    { 
      name: 'Split PDF', 
      path: '/tools/split-pdf',
      icon: <ArticleIcon fontSize="small" sx={{ color: '#f97316' }} />,
      description: 'Extract pages from PDF files with precision' 
    },
    { 
      name: 'Convert PDF', 
      path: '/tools/convert-pdf',
      icon: <ImageIcon fontSize="small" sx={{ color: '#10b981' }} />,
      description: 'Convert to and from PDF format seamlessly' 
    },
    {  
      name: 'Protect PDF', 
      path: '/tools/protect-pdf',
      icon: <SecurityIcon fontSize="small" sx={{ color: '#ef4444' }} />,
      description: 'Add password security to your sensitive PDFs' 
    },
  ];

  const handleToolsMenuOpen = (event) => {
    setToolsAnchorEl(event.currentTarget);
  };

  const handleToolsMenuClose = () => {
    setToolsAnchorEl(null);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleMobileSubmenuToggle = () => {
    setOpenMobileSubmenu(!openMobileSubmenu);
  };
  
  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  // Check if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Desktop navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Pricing', path: '/pricing' },
    { title: 'Contact', path: '/contact' },
  ];
  
  // Get current user's initials for avatar
  const getUserInitials = (name) => {
    return name.split('-')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <AppBar 
      position="fixed" 
      color="transparent"
      elevation={0}
      sx={{
        background: scrolled 
          ? 'rgba(255, 255, 255, 0.8)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        boxShadow: scrolled 
          ? '0 4px 20px rgba(0, 0, 0, 0.08)'
          : 'none',
        borderBottom: scrolled 
          ? '1px solid rgba(0, 0, 0, 0.05)'
          : 'none',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: { xs: 70, md: 80 },
            py: 0.5,
            transition: 'height 0.3s ease',
          }}
        >
          {/* Logo */}
          <RouterLink to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            marginRight: 'auto',
          }}>
            <Box 
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                mr: 1.5,
              }}
            >
              <PdfLogo size={isSmall ? 36 : 40} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  ml: 1.5,
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  color: scrolled 
                    ? 'text.primary' 
                    : { xs: 'text.primary', md: 'white' },
                  transition: 'color 0.3s ease',
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(to right, #6366f1, #4839eb)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  PDF
                </Box>
                <Box 
                  component="span" 
                  sx={{ 
                    color: scrolled 
                      ? 'text.primary' 
                      : { xs: 'text.primary', md: 'white' },
                    ml: 0.5,
                  }}
                >
                  Utility
                </Box>
              </Typography>
            </Box>
          </RouterLink>

          {/* Desktop Navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleToolsMenuOpen}
                aria-haspopup="true"
                aria-expanded={isToolsMenuOpen ? 'true' : undefined}
                aria-controls={isToolsMenuOpen ? 'tools-menu' : undefined}
                sx={{
                  px: 2,
                  py: 1,
                  color: scrolled ? 'text.primary' : 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: scrolled 
                      ? 'rgba(99, 102, 241, 0.08)'
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    zIndex: -1,
                  },
                  '&:hover::before': {
                    opacity: 1,
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
                endIcon={
                  <motion.div
                    animate={{ rotate: isToolsMenuOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExpandMoreIcon fontSize="small" />
                  </motion.div>
                }
              >
                Tools
              </Button>
            </Box>
            
            {navLinks.map((link, index) => (
              <Box
                key={link.title}
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    px: 2,
                    py: 1,
                    color: scrolled ? 'text.primary' : 'white',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: scrolled 
                        ? 'rgba(99, 102, 241, 0.08)'
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      zIndex: -1,
                    },
                    '&:hover::before': {
                      opacity: 1,
                    },
                    '&:hover': {
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {link.title}
                  
                  {/* Active indicator */}
                  {location.pathname === link.path && (
                    <Box
                      component={motion.div}
                      layoutId="activeIndicator"
                      initial={false}
                      sx={{
                        position: 'absolute',
                        bottom: '5px',
                        left: '50%',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#6366f1',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)',
                      }}
                    />
                  )}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Right side information: time, user */}
          <Box 
            sx={{ 
              ml: { xs: 0, md: 2 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
            }}
          >
        
            {/* User profile button */}
            <Tooltip title="Account settings">
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={handleUserMenuOpen}
                  aria-controls={isUserMenuOpen ? 'user-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={isUserMenuOpen ? 'true' : undefined}
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    py: 0.5,
                    px: { xs: 1, sm: 1.5 },
                    background: scrolled 
                      ? 'rgba(99, 102, 241, 0.08)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid',
                    borderColor: scrolled 
                      ? 'rgba(99, 102, 241, 0.2)'
                      : 'rgba(255, 255, 255, 0.1)',
                    color: scrolled ? 'text.primary' : 'white',
                    '&:hover': {
                      background: scrolled 
                        ? 'rgba(99, 102, 241, 0.15)'
                        : 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#6366f1',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {getUserInitials('Anuj-prajapati-SDE')}
                  </Avatar>
                  
                  <Box sx={{ 
                    ml: 1.5, 
                    display: { xs: 'none', sm: 'block' },
                    textAlign: 'left',
                  }}>
                    <Typography 
                      component="span" 
                      sx={{ 
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        display: 'block',
                        lineHeight: 1.2,
                      }}
                    >
                      {isSmall ? 'Anuj' : 'Anuj-prajapati'}
                    </Typography>
                    <Typography 
                      component="span" 
                      sx={{ 
                        fontSize: '0.7rem',
                        opacity: 0.8,
                        display: 'block',
                        lineHeight: 1.2,
                      }}
                    >
                      SDE
                    </Typography>
                  </Box>
                </Button>
              </Box>
            </Tooltip>

            {/* Mobile menu toggle */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleMobileDrawer}
              sx={{
                ml: { xs: 0, sm: 1 },
                display: { md: 'none' },
                color: scrolled ? '#6366f1' : 'white',
                backgroundColor: scrolled 
                  ? 'rgba(99, 102, 241, 0.08)'
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                p: 1,
                '&:hover': {
                  backgroundColor: scrolled 
                    ? 'rgba(99, 102, 241, 0.15)'
                    : 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Tools dropdown menu */}
      <Menu
        id="tools-menu"
        anchorEl={toolsAnchorEl}
        open={isToolsMenuOpen}
        onClose={handleToolsMenuClose}
        MenuListProps={{
          'aria-labelledby': 'tools-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            borderRadius: '14px',
            minWidth: 340,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            p: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 12,
              height: 12,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              transform: 'translateY(-50%) translateX(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.8)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
            },
          },
        }}
      >
        <Box 
          component="div" 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: 1.5,
          }}
        >
          {toolsMenuItems.map((item) => (
            <MenuItem
              key={item.name}
              component={RouterLink}
              to={item.path}
              onClick={handleToolsMenuClose}
              sx={{
                borderRadius: '10px',
                p: 1.5,
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 255, 255, 0.5)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 0,
                },
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
                },
                '&:hover::before': {
                  opacity: 0.5,
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: 42,
                  width: 42,
                  height: 42,
                  borderRadius: '10px',
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle2" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
        
        <Box sx={{ mt: 1.5, display: 'flex', justifyContent: 'center' }}>
          <Button
            component={RouterLink}
            to="/tools"
            onClick={handleToolsMenuClose}
            variant="contained"
            disableElevation
            size="small"
            sx={{
              borderRadius: '10px',
              background: 'linear-gradient(to right, #6366f1, #4839eb)',
              color: 'white',
              textTransform: 'none',
              fontWeight: 600,
              px: 2,
              py: 0.8,
              '&:hover': {
                boxShadow: '0 6px 15px rgba(99, 102, 241, 0.4)',
              },
            }}
            endIcon={<ChevronRightIcon fontSize="small" />}
          >
            View All Tools
          </Button>
        </Box>
      </Menu>
      
      {/* User menu */}
      <Menu
        id="user-menu"
        anchorEl={userMenuAnchor}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        MenuListProps={{
          'aria-labelledby': 'user-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mt: 1.5,
            overflow: 'visible',
            borderRadius: '14px',
            minWidth: 220,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            p: 1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 12,
              height: 12,
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.8)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            Anuj Prajapati
          </Typography>
          <Typography variant="caption" color="text.secondary">
            SDE Developer
          </Typography>
        </Box>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem 
          onClick={handleUserMenuClose}
          sx={{ 
            borderRadius: '8px',
            my: 0.5,
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        
        <MenuItem 
          onClick={handleUserMenuClose}
          sx={{ 
            borderRadius: '8px',
            my: 0.5,
          }}
        >
          <ListItemIcon>
            <NotificationsIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText>Notifications</ListItemText>
        </MenuItem>
        
        <Divider sx={{ my: 1 }} />
        
        <MenuItem 
          onClick={handleUserMenuClose}
          sx={{ 
            borderRadius: '8px',
            my: 0.5,
            color: '#ef4444',
          }}
        >
          <ListItemIcon>
            <Box 
              sx={{ 
                color: '#ef4444', 
                display: 'flex' 
              }}
            >
              <CloseIcon fontSize="small" />
            </Box>
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 320,
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.95) 0%, rgba(72, 57, 235, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            px: 2,
            borderTopLeftRadius: '20px',
            borderBottomLeftRadius: '20px',
          },
        }}
        SlideProps={{
          direction: "left"
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            py: 2.5
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PdfLogo size={36} light />
            <Typography variant="h6" sx={{ ml: 1.5, fontWeight: 700 }}>
              PDF Utility
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleMobileDrawer} 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* User info in drawer */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            py: 2,
            px: 2,
            mt: 1,
            mb: 2,
            borderRadius: '16px',
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Avatar
            sx={{
              width: 48,
              height: 48,
              backgroundColor: 'white',
              color: '#6366f1',
              fontWeight: 600,
              fontSize: '1rem',
              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.3)',
            }}
          >
            {getUserInitials('Anuj-prajapati-SDE')}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Anuj-prajapati-SDE
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ opacity: 0.8, fontSize: '0.75rem' }}
            >
              {formattedDateTime}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 1 }} />

        <List disablePadding>
          {/* Tools submenu */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ListItem disablePadding>
              <ListItemButton 
                onClick={handleMobileSubmenuToggle}
                sx={{ 
                  borderRadius: '10px', 
                  px: 2,
                  py: 1.5,
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemText 
                  primary="Tools" 
                  primaryTypographyProps={{ 
                    fontWeight: 700,
                    fontSize: '1rem',
                  }} 
                />
                <motion.div
                  animate={{ rotate: openMobileSubmenu ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {openMobileSubmenu ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </motion.div>
              </ListItemButton>
            </ListItem>
          </motion.div>

          <AnimatePresence>
            {openMobileSubmenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Collapse in={openMobileSubmenu} timeout="auto">
                  <List 
                    component="div" 
                    disablePadding
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      mt: 0.5,
                      mb: 1.5,
                      py: 1,
                    }}
                  >
                    {toolsMenuItems.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ListItem disablePadding>
                          <ListItemButton
                            component={RouterLink}
                            to={item.path}
                            onClick={toggleMobileDrawer}
                            sx={{ 
                              borderRadius: '8px',
                              mx: 1,
                              my: 0.5,
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 40, color: 'white' }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.name} 
                              primaryTypographyProps={{ fontSize: '0.95rem' }}  
                            />
                          </ListItemButton>
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Collapse>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main navigation links */}
          {navLinks.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={link.path}
                  onClick={toggleMobileDrawer}
                  sx={{ 
                    borderRadius: '10px', 
                    px: 2,
                    py: 1.5,
                    my: 0.5,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: '3px',
                      backgroundColor: 'white',
                      opacity: location.pathname === link.path ? 1 : 0,
                      borderRadius: '0 3px 3px 0',
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    ...(location.pathname === link.path && {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }),
                  }}
                >
                  <ListItemText 
                    primary={link.title} 
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === link.path ? 700 : 500,
                      fontSize: '1rem',
                    }}  
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* Button group at bottom of drawer */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          sx={{ 
            mt: 'auto', 
            mb: 4, 
            py: 3,
            px: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                component={RouterLink}
                to="/signup"
                onClick={toggleMobileDrawer}
                sx={{
                  backgroundColor: 'white',
                  color: '#6366f1',
                  borderRadius: '10px',
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Get Started
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                component={RouterLink}
                to="/login"
                onClick={toggleMobileDrawer}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  borderRadius: '10px',
                  py: 1.2,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(235, 235, 235, 0)',
                  },
                }}
              >
                Sign In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Header;