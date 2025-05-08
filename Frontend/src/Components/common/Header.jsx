import React, { useState, useEffect } from 'react';
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
import { motion } from 'framer-motion';
import PdfLogo from './PdfLogo';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  
  // Tools menu
  const [toolsAnchorEl, setToolsAnchorEl] = useState(null);
  const isToolsMenuOpen = Boolean(toolsAnchorEl);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState(false);

  const toolsMenuItems = [
    { 
      name: 'Merge PDF', 
      path: '/tools/merge-pdf',
      icon: <LayersIcon fontSize="small" sx={{ color: theme.palette.info.main }} />,
      description: 'Combine multiple PDFs into one' 
    },
    { 
      name: 'Split PDF', 
      path: '/tools/split-pdf',
      icon: <ArticleIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />,
      description: 'Extract pages from PDF file' 
    },
    { 
      name: 'Convert PDF', 
      path: '/tools/convert-pdf',
      icon: <ImageIcon fontSize="small" sx={{ color: theme.palette.success.main }} />,
      description: 'Convert to and from PDF format' 
    },
    { 
      name: 'Protect PDF', 
      path: '/tools/protect-pdf',
      icon: <SecurityIcon fontSize="small" sx={{ color: theme.palette.error.main }} />,
      description: 'Add password to secure your PDFs' 
    },
    { 
      name: 'Create PDF', 
      path: '/tools/create-pdf',
      icon: <ArticleIcon fontSize="small" sx={{ color: theme.palette.secondary.main }} />,
      description: 'Create PDFs from scratch' 
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

  // Check if the page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
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

  return (
    <>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 80 }}>
          {/* Logo */}
          <RouterLink to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
              <PdfLogo size={40} />
            </Box>
            <Typography
              variant="h5"
              sx={{
                color: scrolled ? 'text.primary' : { xs: 'text.primary', md: 'white' },
                fontWeight: 700,
                display: { xs: 'none', sm: 'block' },
                mr: 3,
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              <Box component="span" sx={{ color: 'primary.main' }}>PDF</Box> Utility
            </Typography>
          </RouterLink>

          {/* Desktop Navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={handleToolsMenuOpen}
              sx={{
                mx: 1,
                px: 2,
                color: scrolled ? 'text.primary' : 'white',
                fontWeight: 600,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
              endIcon={<ExpandMoreIcon />}
            >
              Tools
            </Button>
            {navLinks.map((link) => (
              <Button
                key={link.title}
                component={RouterLink}
                to={link.path}
                sx={{
                  mx: 1,
                  px: 2,
                  color: scrolled ? 'text.primary' : 'white',
                  fontWeight: 600,
                  fontSize: '1rem',
                  position: 'relative',
                  '&::after': location.pathname === link.path ? {
                    content: '""',
                    position: 'absolute',
                    bottom: '0.5rem',
                    left: '50%',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: 'primary.main',
                    transform: 'translateX(-50%)',
                  } : {},
                  '&:hover': {
                    backgroundColor: scrolled ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {link.title}
              </Button>
            ))}
          </Box>

          {/* Right side buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/login"
              sx={{
                borderColor: scrolled ? 'primary.main' : 'white',
                color: scrolled ? 'primary.main' : 'white',
                fontWeight: 600,
                mr: 2,
                display: { xs: 'none', sm: 'inline-flex' },
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: scrolled ? 'rgba(67, 97, 238, 0.04)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Login
            </Button>
            
            <Button
              variant="contained"
              component={RouterLink}
              to="/signup"
              sx={{
                backgroundColor: scrolled ? 'primary.main' : 'white',
                color: scrolled ? 'white' : 'primary.main',
                fontWeight: 600,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            >
              Sign Up
            </Button>
            
            {/* Mobile menu button */}
            <IconButton
              edge="end"
              color={scrolled ? 'primary' : 'inherit'}
              aria-label="menu"
              onClick={toggleMobileDrawer}
              sx={{
                display: { md: 'none' },
                color: scrolled ? 'text.primary' : 'white',
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
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            minWidth: 350,
            borderRadius: 4,
            p: 1,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: '50%',
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) translateX(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        {toolsMenuItems.map((item, index) => (
          <MenuItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            onClick={handleToolsMenuClose}
            sx={{
              borderRadius: 2,
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {item.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider sx={{ my: 1 }} />
        <MenuItem
          component={RouterLink}
          to="/tools"
          onClick={handleToolsMenuClose}
          sx={{
            borderRadius: 2,
            color: 'primary.main',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: 'primary.lighter',
            },
          }}
        >
          <Typography variant="body2" sx={{ mr: 'auto' }}>
            View All Tools
          </Typography>
          <ChevronRightIcon fontSize="small" />
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
            maxWidth: 360,
            background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
            color: 'white',
            px: 2,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PdfLogo size={32} light />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>
              PDF Utility
            </Typography>
          </Box>
          <IconButton onClick={toggleMobileDrawer} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 1 }} />

        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton 
              onClick={handleMobileSubmenuToggle}
              sx={{ borderRadius: 2, px: 2 }}
            >
              <ListItemText 
                primary="Tools" 
                primaryTypographyProps={{ fontWeight: 600 }} 
              />
              {openMobileSubmenu ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </ListItemButton>
          </ListItem>
          <Collapse in={openMobileSubmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {toolsMenuItems.map((item) => (
                <ListItem key={item.name} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.path}
                    onClick={toggleMobileDrawer}
                    sx={{ pl: 4, borderRadius: 2 }}
                  >
                    <ListItemIcon sx={{ color: 'white', minWidth: 36 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.name} 
                      primaryTypographyProps={{ fontSize: '0.95rem' }} 
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          {navLinks.map((link) => (
            <ListItem key={link.title} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={link.path}
                onClick={toggleMobileDrawer}
                sx={{ borderRadius: 2, px: 2 }}
              >
                <ListItemText 
                  primary={link.title} 
                  primaryTypographyProps={{ fontWeight: 600 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: 'auto', mb: 4, px: 2, py: 4 }}>
          <Button
            fullWidth
            variant="outlined"
            component={RouterLink}
            to="/login"
            sx={{
              borderColor: 'white',
              color: 'white',
              mb: 2,
              '&:hover': {
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            component={RouterLink}
            to="/signup"
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;