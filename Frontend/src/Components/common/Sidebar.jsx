import React, { useState } from 'react';
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
  Chip
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
  Zap as ZapIcon
} from 'react-feather';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Sidebar = ({ onClose }) => {
  const theme = useTheme();
  const location = useLocation();
  const [openSubMenu, setOpenSubMenu] = useState('pdf-tools');
  
  const handleSubMenuToggle = (menuId) => {
    setOpenSubMenu(openSubMenu === menuId ? null : menuId);
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <HomeIcon size={20} />,
      path: '/dashboard',
    },
    {
      id: 'pdf-tools',
      title: 'PDF Tools',
      icon: <FileIcon size={20} />,
      collapsible: true,
      items: [
        { name: 'Merge PDF', path: '/tools/merge-pdf', icon: <LayersIcon size={18} /> },
        { name: 'Split PDF', path: '/tools/split-pdf', icon: <ScissorsIcon size={18} /> },
        { name: 'Convert PDF', path: '/tools/convert-pdf', icon: <RefreshCwIcon size={18} /> },
        { name: 'Create PDF', path: '/tools/create-pdf', icon: <FileTextIcon size={18} /> },
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
        background: 'linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,251,255,1) 100%)',
      }}
    >
      {/* Logo & Branding */}
      <Box 
        sx={{ 
          p: 3, 
          display: 'flex', 
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
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
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>P</Typography>
        </Box>
        <Typography variant="h6" fontWeight={700} noWrap>
          PDF Utility
        </Typography>
      </Box>
      
      {/* User Profile Summary */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              mr: 2,
              background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              boxShadow: '0 4px 10px rgba(67, 97, 238, 0.2)',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            AP
          </Avatar>
          <Box>
            <Typography variant="subtitle1" fontWeight={600} noWrap>
              Anuj Prajapati
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Free Plan
            </Typography>
          </Box>
        </Box>
        
        <Button
          variant="outlined"
          fullWidth
          startIcon={<StarIcon size={16} />}
          sx={{ 
            borderRadius: 3,
            mt: 1,
            py: 1,
            fontWeight: 600,
            borderWidth: 1.5,
            '&:hover': {
              borderWidth: 1.5,
            }
          }}
        >
          Upgrade to Pro
        </Button>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 2 }}>
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
                        minHeight: 48,
                        px: 2.5,
                        position: 'relative',
                        bgcolor: openSubMenu === item.id ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                        },
                        '&::before': openSubMenu === item.id ? {
                          content: '""',
                          position: 'absolute',
                          top: '50%',
                          left: 0,
                          height: 24,
                          width: 3,
                          bgcolor: 'primary.main',
                          transform: 'translateY(-50%)',
                          borderRadius: '0 4px 4px 0',
                        } : {},
                      }}
                    >
                      <ListItemIcon 
                        sx={{ 
                          minWidth: 36, 
                          color: openSubMenu === item.id ? 'primary.main' : alpha(theme.palette.text.primary, 0.6)
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{ 
                          fontWeight: openSubMenu === item.id ? 600 : 500,
                          color: openSubMenu === item.id ? 'primary.main' : 'inherit',
                          fontSize: '0.95rem',
                        }}
                      />
                      {openSubMenu === item.id ? 
                        <ChevronDownIcon size={18} color={theme.palette.primary.main} /> : 
                        <ChevronRightIcon size={18} color={alpha(theme.palette.text.primary, 0.5)} />
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
                              component={RouterLink}
                              to={subItem.path}
                              onClick={onClose}
                              sx={{
                                borderRadius: 2,
                                minHeight: 40,
                                pl: 5.5,
                                pr: 2.5,
                                py: 0.75,
                                mb: 0.5,
                                position: 'relative',
                                bgcolor: active ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                                color: active ? 'primary.main' : 'inherit',
                                '&:hover': {
                                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                                },
                                '&::before': active ? {
                                  content: '""',
                                  position: 'absolute',
                                  top: '50%',
                                  left: 0,
                                  height: 20,
                                  width: 3,
                                  bgcolor: 'primary.main',
                                  transform: 'translateY(-50%)',
                                  borderRadius: '0 4px 4px 0',
                                } : {},
                              }}
                            >
                              <ListItemIcon 
                                sx={{ 
                                  minWidth: 28, 
                                  color: active ? 'primary.main' : alpha(theme.palette.text.primary, 0.5)
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <ListItemText 
                                primary={subItem.name}
                                primaryTypographyProps={{ 
                                  fontSize: '0.875rem',
                                  fontWeight: active ? 600 : 400,
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
                    component={RouterLink}
                    to={item.path}
                    onClick={onClose}
                    sx={{
                      borderRadius: 2,
                      minHeight: 48,
                      px: 2.5,
                      position: 'relative',
                      bgcolor: isActive(item.path) ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
                      color: isActive(item.path) ? 'primary.main' : 'inherit',
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.08),
                      },
                      '&::before': isActive(item.path) ? {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        left: 0,
                        height: 24,
                        width: 3,
                        bgcolor: 'primary.main',
                        transform: 'translateY(-50%)',
                        borderRadius: '0 4px 4px 0',
                      } : {},
                    }}
                  >
                    <ListItemIcon 
                      sx={{ 
                        minWidth: 36, 
                        color: isActive(item.path) ? 'primary.main' : alpha(theme.palette.text.primary, 0.6)
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.title}
                      primaryTypographyProps={{ 
                        fontWeight: isActive(item.path) ? 600 : 500,
                        fontSize: '0.95rem',
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
                          bgcolor: alpha(theme.palette.warning.main, 0.1),
                          color: theme.palette.warning.main,
                          border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`,
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
      <Box sx={{ p: 3, mt: 'auto' }}>
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: alpha(theme.palette.primary.main, 0.03),
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <DatabaseIcon size={16} color={theme.palette.primary.main} style={{ marginRight: 8 }} />
            <Typography variant="subtitle2" fontWeight={600}>
              Storage
            </Typography>
          </Box>
          
          <Box sx={{ mt: 1.5, mb: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">
                65% of 100 MB used
              </Typography>
              <Typography variant="caption" fontWeight={600}>
                65 MB
              </Typography>
            </Box>
            <LinearProgress 
              variant="determinate" 
              value={65} 
              sx={{ 
                height: 6, 
                borderRadius: 3,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                '& .MuiLinearProgress-bar': {
                  borderRadius: 3,
                  background: 'linear-gradient(90deg, #4361ee, #3a0ca3)',
                }
              }} 
            />
          </Box>
          
          <Button
            size="small"
            fullWidth
            startIcon={<ZapIcon size={14} />}
            color="primary"
            variant="outlined"
            sx={{ 
              mt: 1.5, 
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Upgrade for more space
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;