import React, { useState, useEffect } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Typography, 
  Button,
  Collapse,
  Avatar,
  Badge,
  Divider,
  alpha,
  useTheme,
  Tooltip,
  LinearProgress,
  Chip,
  IconButton,
  useMediaQuery,
  SwipeableDrawer
} from '@mui/material';
import { 
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  Home as HomeIcon,
  Layers as LayersIcon,
  FileText as FileTextIcon,
  Scissors as ScissorsIcon,
  RefreshCw as RefreshCwIcon,
  Shield as ShieldIcon,
  File as FileIcon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  Star as StarIcon,
  BarChart2 as AnalyticsIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Database as DatabaseIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  X as CloseIcon
} from 'react-feather';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSubMenu, setOpenSubMenu] = useState('pdf-tools');
  
  // Collapse all submenus on mobile initially
  useEffect(() => {
    if (isMobile) {
      setOpenSubMenu(null);
    }
  }, [isMobile]);
  
  const handleSubMenuToggle = (menuId) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId);
  };
  
  const handleNavigation = (path) => {
    navigate(path);
    // Close the mobile drawer when a navigation item is clicked
    if (isMobile) {
      onClose?.();
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <HomeIcon size={20} />,
      path: '/tools/dashboard',
    },
    {
      id: 'pdf-tools',
      title: 'PDF Tools',
      icon: <FileIcon size={20} />,
      collapsible: true,
      items: [
        { name: 'Create PDF', path: '/tools/create-pdf', icon: <FileTextIcon size={18} /> },
        { name: 'Merge PDF', path: '/tools/merge-pdf', icon: <LayersIcon size={18} /> },
        { name: 'Split PDF', path: '/tools/split-pdf', icon: <ScissorsIcon size={18} /> },
        { name: 'Convert PDF', path: '/tools/convert-pdf', icon: <RefreshCwIcon size={18} /> },
        { name: 'Protect PDF', path: '/tools/protect-pdf', icon: <ShieldIcon size={18} /> },
      ]
    },
    {
      id: 'recent',
      title: 'Recent Files',
      icon: <ClockIcon size={20} />,
      badge: 3,
      path: '/recent-files',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <AnalyticsIcon size={20} />,
      path: '/analytics',
      pro: true,
    },
    {
      id: 'account',
      title: 'My Account',
      icon: <UserIcon size={20} />,
      collapsible: true,
      items: [
        { name: 'Profile', path: '/profile', icon: <UserIcon size={18} /> },
        { name: 'Storage', path: '/storage', icon: <DatabaseIcon size={18} /> },
        { name: 'Subscription', path: '/subscription', icon: <AwardIcon size={18} /> },
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <SettingsIcon size={20} />,
      path: '/settings',
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircleIcon size={20} />,
      path: '/help',
    },
  ];

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        bgcolor: '#030018',
        color: 'white',
      }}
    >
      {/* Logo & Branding with Close button for mobile */}
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box 
            sx={{ 
              mr: 1.5,
              width: 38,
              height: 38,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              boxShadow: '0 4px 10px rgba(67, 97, 238, 0.3)',
            }}
          >
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>PDF</Typography>
          </Box>
          <Typography variant="h6" fontWeight={700} noWrap sx={{ color: 'white' }}>
           Studio X
          </Typography>
        </Box>
        
        {/* Close button - only visible on mobile */}
        {isMobile && (
          <IconButton 
            onClick={onClose}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                color: '#7df9ff',
                bgcolor: 'rgba(125, 249, 255, 0.1)',
              }
            }}
            aria-label="close sidebar"
          >
            <CloseIcon size={20} />
          </IconButton>
        )}
      </Box>
      
      
      <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      
      {/* Skip to content link - only visible on mobile */}
      {isMobile && (
        <Box sx={{ px: 2, mb: 2 }}>
          <Button
            fullWidth
            onClick={onClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              py: 1,
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': {
                borderColor: '#7df9ff',
                bgcolor: 'rgba(125, 249, 255, 0.1)',
                color: '#7df9ff',
              }
            }}
          >
            Skip to Content
          </Button>
        </Box>
      )}
      
      {/* Navigation Menu */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          px: 2,
          // Mobile optimizations
          '&::-webkit-scrollbar': {
            width: isMobile ? '4px' : '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '10px',
          },
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.2) rgba(255, 255, 255, 0.05)',
          pb: isMobile ? 4 : 0, // Extra padding at bottom for mobile to ensure last items are visible
        }}
      >
        <List component="nav" disablePadding>
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              {item.collapsible ? (
                <>
                  <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
                    <ListItemButton
                      onClick={() => handleSubMenuToggle(item.id)}
                      sx={{
                        borderRadius: 2,
                        minHeight: isMobile ? 56 : 48, // Increase height for mobile touch targets
                        px: 2.5,
                        position: 'relative',
                        bgcolor: openSubMenu === item.id ? 'rgba(104, 54, 230, 0.1)' : 'transparent',
                        color: openSubMenu === item.id ? '#7df9ff' : 'white',
                        '&:hover': {
                          bgcolor: 'rgba(104, 54, 230, 0.15)',
                        },
                        '&::before': openSubMenu === item.id ? {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: 0,
                          height: 24,
                          width: 3,
                          bgcolor: '#7df9ff',
                          transform: 'translateY(-50%)',
                          borderRadius: '0 4px 4px 0',
                        } : {},
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          minWidth: 36, 
                          color: openSubMenu === item.id ? '#7df9ff' : 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ 
                          fontWeight: openSubMenu === item.id ? 600 : 500,
                          color: openSubMenu === item.id ? '#7df9ff' : 'white',
                          fontSize: isMobile ? '1rem' : '0.95rem', // Larger text for mobile
                        }}
                      />
                      {openSubMenu === item.id ? 
                        <ChevronDownIcon size={isMobile ? 20 : 18} color="#7df9ff" /> : 
                        <ChevronRightIcon size={isMobile ? 20 : 18} color="rgba(255, 255, 255, 0.5)" />
                      }
                    </ListItemButton>
                  </ListItem>
                  
                  <Collapse in={openSubMenu === item.id} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.items.map((subItem) => {
                        const active = isActive(subItem.path);
                        
                        return (
                          <ListItem key={subItem.name} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                              onClick={() => handleNavigation(subItem.path)}
                              sx={{
                                borderRadius: 2,
                                minHeight: isMobile ? 48 : 40, // Larger touch target for mobile
                                pl: 5.5,
                                pr: 2.5,
                                py: isMobile ? 1 : 0.75, // More padding for mobile
                                mb: 0.5,
                                position: 'relative',
                                bgcolor: active ? 'rgba(104, 54, 230, 0.15)' : 'transparent',
                                color: active ? '#7df9ff' : 'rgba(255, 255, 255, 0.8)',
                                '&:hover': {
                                  bgcolor: 'rgba(104, 54, 230, 0.1)',
                                },
                                '&::before': active ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: '50%',
                                  left: 0,
                                  height: 20,
                                  width: 3,
                                  bgcolor: '#7df9ff',
                                  transform: 'translateY(-50%)',
                                  borderRadius: '0 4px 4px 0',
                                } : {},
                              }}
                            >
                              <ListItemIcon 
                                sx={{ 
                                  minWidth: 28, 
                                  color: active ? '#7df9ff' : 'rgba(255, 255, 255, 0.6)'
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.name}
                                primaryTypographyProps={{ 
                                  fontSize: isMobile ? '0.925rem' : '0.875rem', // Slightly larger for mobile
                                  fontWeight: active ? 600 : 400,
                                  color: active ? '#7df9ff' : 'rgba(255, 255, 255, 0.8)'
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </>
              ) : (
                <ListItem disablePadding sx={{ display: 'block', mb: 1 }}>
                  <ListItemButton
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      borderRadius: 2,
                      minHeight: isMobile ? 56 : 48, // Increase height for mobile touch targets
                      px: 2.5,
                      position: 'relative',
                      bgcolor: isActive(item.path) ? 'rgba(104, 54, 230, 0.15)' : 'transparent',
                      color: isActive(item.path) ? '#7df9ff' : 'white',
                      '&:hover': {
                        bgcolor: 'rgba(104, 54, 230, 0.1)',
                      },
                      '&::before': isActive(item.path) ? {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        height: 24,
                        width: 3,
                        bgcolor: '#7df9ff',
                        transform: 'translateY(-50%)',
                        borderRadius: '0 4px 4px 0',
                      } : {},
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 36, 
                        color: isActive(item.path) ? '#7df9ff' : 'rgba(255, 255, 255, 0.7)'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{ 
                        fontWeight: isActive(item.path) ? 600 : 500,
                        fontSize: isMobile ? '1rem' : '0.95rem', // Larger text for mobile
                        color: isActive(item.path) ? '#7df9ff' : 'white',
                      }}
                    />
                    {item.badge && (
                      <Badge 
                        badgeContent={item.badge} 
                        color="secondary"
                        sx={{ 
                          '& .MuiBadge-badge': {
                            fontSize: '0.65rem',
                            height: 18,
                            minWidth: 18,
                          }
                        }}
                      />
                    )}
                    {item.pro && (
                      <Chip
                        label="PRO" 
                        size="small"
                        sx={{ 
                          height: 20,
                          fontSize: '0.625rem',
                          fontWeight: 700,
                          bgcolor: 'rgba(255, 193, 7, 0.2)',
                          color: '#ffc107',
                          border: '1px solid rgba(255, 193, 7, 0.3)',
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
      
      {/* Storage Usage */}
      {/* <Box sx={{ p: 3, mt: 'auto' }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: 'rgba(104, 54, 230, 0.08)',
            border: '1px solid',
            borderColor: 'rgba(104, 54, 230, 0.15)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DatabaseIcon size={16} color="#7df9ff" style={{ marginRight: 8 }} />
            <Typography variant="subtitle2" fontWeight={600} sx={{ color: 'white' }}>
              Storage
            </Typography>
          </Box>
          
          <Box sx={{ mt: 1.5, mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                65% of 100 MB used
              </Typography>
              <Typography variant="caption" fontWeight={600} sx={{ color: 'white' }}>
                65 MB
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={65} 
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
          
          <Button
            size="small"
            fullWidth
            startIcon={<ZapIcon size={14} />}
            variant="outlined"
            sx={{ 
              mt: 1.5, 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              color: '#7df9ff',
              borderColor: 'rgba(125, 249, 255, 0.4)',
              '&:hover': {
                borderColor: '#7df9ff',
                backgroundColor: 'rgba(125, 249, 255, 0.1)',
              }
            }}
          >
            Upgrade for more space
          </Button>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Sidebar;