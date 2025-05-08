import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Toolbar,
  Box,
  Button,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Divider,
  Collapse,
  useMediaQuery,
  useTheme,
  Badge,
  alpha,
  Grid,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ArrowForward as ArrowIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Article as ArticleIcon,
  Image as ImageIcon,
  Layers as LayersIcon,
  Security as SecurityIcon,
  LockOpen as UnlockIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import PdfLogo from './PdfLogo';

const UltraModernHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation();
  
  // Tools menu
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null);
  const isToolsMenuOpen = Boolean(toolsAnchorEl);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false);
  const menuTimeoutRef = useRef(null);

  const toolsMenuItems = [
    { 
      name: 'Merge PDF', 
      path: '/tools/merge-pdf',
      icon: <LayersIcon fontSize="small" sx={{ color: '#6C63FF' }} />,
      description: 'Combine multiple PDFs into one document',
      bgColor: '#6C63FF10',
      borderColor: '#6C63FF40'
    },
    { 
      name: 'Split PDF', 
      path: '/tools/split-pdf',
      icon: <ArticleIcon fontSize="small" sx={{ color: '#FF9966' }} />,
      description: 'Extract pages from PDF files with precision',
      bgColor: '#FF996610',
      borderColor: '#FF996640'
    },
    { 
      name: 'Convert PDF', 
      path: '/tools/convert-pdf',
      icon: <ImageIcon fontSize="small" sx={{ color: '#2AC770' }} />,
      description: 'Convert to and from PDF format seamlessly',
      bgColor: '#2AC77010',
      borderColor: '#2AC77040'
    },
    {  
      name: 'Protect PDF', 
      path: '/tools/protect-pdf',
      icon: <SecurityIcon fontSize="small" sx={{ color: '#FF6B6B' }} />,
      description: 'Add password security to your sensitive PDFs',
      bgColor: '#FF6B6B10',
      borderColor: '#FF6B6B40'
    },
    { 
      name: 'Create PDF', 
      path: '/tools/create-pdf',
      icon: <ArticleIcon fontSize="small" sx={{ color: '#A66CFF' }} />,
      description: 'Create professional PDFs from scratch',
      bgColor: '#A66CFF10',
      borderColor: '#A66CFF40'
    },
  ];

  const handleToolsMenuOpen = (event) => {
    clearTimeout(menuTimeoutRef.current);
    setToolsAnchorEl(event.currentTarget);
  };

  const handleToolsMenuClose = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setToolsAnchorEl(null);
    }, 100);
  };

  const toggleMobileDrawer = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleMobileSubmenuToggle = () => {
    setOpenMobileSubmenu(!openMobileSubmenu);
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
      clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  // Desktop navigation links
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Pricing', path: '/pricing' },
    { title: 'Contact', path: '/contact' },
  ];

  return (
    <Box 
      component={motion.div}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        transition: 'all 0.3s ease',
      }}
    >
      {/* Glass background that appears on scroll */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 1 : 0 }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.1)' : 'none',
          zIndex: -1,
        }}
      />

      <Container maxWidth="xl">
        <Toolbar 
          disableGutters 
          sx={{ 
            height: { xs: 70, md: 90 },
            transition: 'height 0.3s ease',
          }}
        >
          {/* Logo */}
          <RouterLink to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            position: 'relative',
            zIndex: 2,
          }}>
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1.5 }}>
                <PdfLogo size={isSmall ? 32 : 42} />
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: scrolled ? 'text.primary' : { xs: 'text.primary', md: 'white' },
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                  mr: 3,
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  letterSpacing: '-0.02em',
                  transition: 'color 0.3s ease',
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(90deg, #6C63FF, #A66CFF)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                  }}
                >
                  PDF
                </Box>{' '}
                <Box 
                  component="span" 
                  sx={{ 
                    color: scrolled ? 'text.primary' : { xs: 'text.primary', md: 'white' },
                    transition: 'color 0.3s ease',
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
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              component={motion.div}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleToolsMenuOpen}
                onMouseEnter={handleToolsMenuOpen}
                onMouseLeave={handleToolsMenuClose}
                sx={{
                  mx: 1,
                  px: 2.5,
                  py: 1,
                  color: scrolled ? 'text.primary' : 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: scrolled 
                      ? 'rgba(108, 99, 255, 0.08)'
                      : 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
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
                    <ExpandMoreIcon />
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
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <Button
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    mx: 1,
                    px: 2.5,
                    py: 1,
                    color: scrolled ? 'text.primary' : 'white',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: scrolled 
                        ? 'rgba(108, 99, 255, 0.08)'
                        : 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
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
                        bottom: '8px',
                        left: '50%',
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#6C63FF',
                        transform: 'translateX(-50%)',
                        boxShadow: '0 0 8px rgba(108, 99, 255, 0.6)',
                      }}
                    />
                  )}
                </Button>
              </Box>
            ))}
          </Box>

          {/* Right side buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              gap: { xs: 1, sm: 2 },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  height: { xs: 36, md: 42 },
                  borderColor: scrolled ? '#6C63FF' : 'rgba(255, 255, 255, 0.5)',
                  color: scrolled ? '#6C63FF' : 'white',
                  fontWeight: 600,
                  borderRadius: '12px',
                  borderWidth: '1.5px',
                  px: { xs: 2, md: 2.5 },
                  display: { xs: 'none', sm: 'inline-flex' },
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: scrolled ? '#6C63FF' : 'white',
                    backgroundColor: scrolled ? 'rgba(108, 99, 255, 0.04)' : 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 5px 15px rgba(108, 99, 255, 0.15)',
                  },
                }}
              >
                Login
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                component={RouterLink}
                to="/signup"
                sx={{
                  height: { xs: 36, md: 42 },
                  backgroundColor: scrolled ? '#6C63FF' : 'white',
                  color: scrolled ? 'white' : '#6C63FF',
                  fontWeight: 600,
                  borderRadius: '12px',
                  px: { xs: 2, md: 2.5 },
                  display: { xs: 'none', sm: 'inline-flex' },
                  transition: 'all 0.3s ease',
                  boxShadow: scrolled 
                    ? '0 10px 25px -5px rgba(108, 99, 255, 0.4)' 
                    : '0 10px 25px -5px rgba(0, 0, 0, 0.15)',
                  '&:hover': {
                    backgroundColor: scrolled ? '#5A52E3' : 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-2px)',
                    boxShadow: scrolled 
                      ? '0 15px 30px -5px rgba(108, 99, 255, 0.5)' 
                      : '0 15px 30px -5px rgba(0, 0, 0, 0.2)',
                  },
                }}
              >
                Sign Up
              </Button>
            </motion.div>
            
            {/* Mobile menu button with animated icon */}
            <Box
              component={motion.div}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              sx={{ display: { md: 'none' } }}
            >
              <IconButton
                edge="end"
                aria-label="menu"
                onClick={toggleMobileDrawer}
                sx={{
                  color: scrolled ? '#6C63FF' : 'white',
                  backgroundColor: scrolled ? 'rgba(108, 99, 255, 0.08)' : 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    backgroundColor: scrolled ? 'rgba(108, 99, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Tools dropdown menu with improved design */}
      <Menu
        id="tools-menu"
        anchorEl={toolsAnchorEl}
        open={isToolsMenuOpen}
        onClose={handleToolsMenuClose}
        MenuListProps={{
          onMouseEnter: handleToolsMenuOpen,
          onMouseLeave: handleToolsMenuClose,
          'aria-labelledby': 'tools-button',
          sx: {
            padding: '12px',
          }
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
            borderRadius: '16px',
            minWidth: 380,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 12,
              height: 12,
              bgcolor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(20px)',
              transform: 'translateY(-50%) translateX(-50%) rotate(45deg)',
              zIndex: 0,
              borderTop: '1px solid rgba(255, 255, 255, 0.8)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.8)',
            },
          },
        }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'transparent',
            }
          }
        }}
        transitionDuration={{ enter: 400, exit: 300 }}
      >
        <Box 
          component="div" 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: 1,
          }}
        >
          {toolsMenuItems.map((item, index) => (
            <MenuItem
              key={item.name}
              component={RouterLink}
              to={item.path}
              onClick={handleToolsMenuClose}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                px: 2,
                backgroundColor: item.bgColor,
                border: `1px solid ${item.borderColor}`,
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
                  background: 'rgba(255, 255, 255, 0.3)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 0,
                },
                '&:hover': {
                  backgroundColor: alpha(item.bgColor, 0.8),
                  transform: 'translateY(-2px)',
                  boxShadow: `0 10px 20px -5px ${item.borderColor}`,
                },
                '&:hover::before': {
                  opacity: 0.5,
                },
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: '40px',
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  backgroundColor: alpha(item.borderColor, 0.2),
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
        
        <Divider sx={{ my: 1.5, opacity: 0.6 }} />
        
        <MenuItem
          component={RouterLink}
          to="/tools"
          onClick={handleToolsMenuClose}
          sx={{
            borderRadius: '12px',
            color: '#6C63FF',
            fontWeight: 600,
            py: 1.5,
            backgroundColor: 'rgba(108, 99, 255, 0.05)',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(108, 99, 255, 0.1)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography variant="body2">
              View All Tools
            </Typography>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowIcon fontSize="small" sx={{ ml: 1 }} />
            </motion.div>
          </Box>
        </MenuItem>
      </Menu>

      {/* Mobile drawer with improved animations and design */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleMobileDrawer}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 350,
            background: 'rgba(30, 25, 80, 0.85)',
            backdropFilter: 'blur(20px)',
            color: 'white',
            px: 2,
            borderTopLeftRadius: '24px',
            borderBottomLeftRadius: '24px',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
        transitionDuration={{ enter: 400, exit: 300 }}
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(3px)',
          },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            py: 2 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PdfLogo size={32} light />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
              PDF Utility
            </Typography>
          </Box>
          <IconButton 
            onClick={toggleMobileDrawer} 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 1.5 }} />

        <List disablePadding>
          {/* Tools submenu */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ListItem disablePadding>
              <ListItemButton 
                onClick={handleMobileSubmenuToggle}
                sx={{ 
                  borderRadius: '12px', 
                  px: 2,
                  my: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemText 
                  primary="Tools" 
                  primaryTypographyProps={{ 
                    fontWeight: 600,
                    fontSize: '1.1rem',
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
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderRadius: '12px',
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
                              pl: 4,
                              borderRadius: '8px',
                              mx: 1,
                              my: 0.5,
                              '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ 
                              color: 'white', 
                              minWidth: 36,
                              width: 32,
                              height: 32,
                              borderRadius: '8px',
                              backgroundColor: alpha(item.borderColor, 0.3),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                              {item.icon}
                            </ListItemIcon>
                            <ListItemText 
                              primary={item.name} 
                              primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }} 
                              secondary={item.description}
                              secondaryTypographyProps={{ 
                                fontSize: '0.75rem', 
                                sx: { 
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  display: { xs: 'none', sm: 'block' }
                                } 
                              }}
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
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={link.path}
                  onClick={toggleMobileDrawer}
                  sx={{ 
                    borderRadius: '12px', 
                    px: 2,
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
                      backgroundColor: '#6C63FF',
                      opacity: location.pathname === link.path ? 1 : 0,
                      borderRadius: '0 3px 3px 0',
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    ...(location.pathname === link.path && {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    }),
                  }}
                >
                  <ListItemText 
                    primary={link.title} 
                    primaryTypographyProps={{ 
                      fontWeight: location.pathname === link.path ? 700 : 500,
                      fontSize: '1.1rem',
                    }} 
                  />
                  {location.pathname === link.path && (
                    <Box 
                      component={motion.div}
                      layoutId="mobileActiveIndicator"
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: '#6C63FF',
                        boxShadow: '0 0 8px rgba(108, 99, 255, 0.8)',
                      }}
                    />
                  )}
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        {/* Mobile authentication buttons */}
        <Box 
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          sx={{ 
            mt: 'auto', 
            mb: 4, 
            px: 2, 
            py: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 4,
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 2, 
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
            }}
          >
            Get access to premium features
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  fullWidth
                  variant="outlined"
                  component={RouterLink}
                  to="/login"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    borderRadius: '12px',
                    py: 1,
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </Grid>
            <Grid item xs={6}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    backgroundColor: '#6C63FF',
                    color: 'white',
                    borderRadius: '12px',
                    py: 1,
                    boxShadow: '0 10px 20px -5px rgba(108, 99, 255, 0.4)',
                    '&:hover': {
                      backgroundColor: '#5A52E3',
                    },
                  }}
                >
                  Sign Up
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </Drawer>

      {/* Visual decorative elements in the header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Purple glow on the right side */}
        <Box
          component={motion.div}
          animate={{ 
            opacity: [0.6, 0.8, 0.6],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '30%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(108, 99, 255, 0.2) 0%, rgba(108, 99, 255, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />

        {/* Blue glow on the left side */}
        <Box
          component={motion.div}
          animate={{ 
            opacity: [0.5, 0.7, 0.5],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
            delay: 1,
          }}
          sx={{
            position: 'absolute',
            top: '-30%',
            left: '10%',
            width: '25%',
            height: '180%',
            background: 'radial-gradient(circle, rgba(125, 249, 255, 0.15) 0%, rgba(125, 249, 255, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
      </Box>
    </Box>
  );
};

export default UltraModernHeader;