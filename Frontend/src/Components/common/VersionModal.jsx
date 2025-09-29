import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
} from '@mui/material';
import {
  Close as CloseIcon,
  NewReleases as NewReleasesIcon,
  BugReport as BugIcon,
  Speed as PerformanceIcon,
  Security as SecurityIcon,
  Palette as DesignIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const VersionModal = ({ open, onClose }) => {
  const currentVersion = "1.0.0";
  const releaseDate = "December 2024";
  
  const releaseNotes = [
    {
      type: "feature",
      icon: <NewReleasesIcon sx={{ color: '#10b981' }} />,
      title: "New PDF Creation Tools",
      description: "Enhanced PDF creation with advanced formatting options"
    },
    {
      type: "improvement",
      icon: <PerformanceIcon sx={{ color: '#3b82f6' }} />,
      title: "Performance Optimization",
      description: "50% faster PDF processing and reduced memory usage"
    },
    {
      type: "security",
      icon: <SecurityIcon sx={{ color: '#f59e0b' }} />,
      title: "Enhanced Security",
      description: "Improved password protection and encryption methods"
    },
    {
      type: "ui",
      icon: <DesignIcon sx={{ color: '#8b5cf6' }} />,
      title: "Modern UI/UX",
      description: "Redesigned interface with better accessibility and user experience"
    },
    {
      type: "fix",
      icon: <BugIcon sx={{ color: '#ef4444' }} />,
      title: "Bug Fixes",
      description: "Resolved 15+ critical issues and improved stability"
    }
  ];

  const getTypeColor = (type) => {
    switch (type) {
      case 'feature': return '#10b981';
      case 'improvement': return '#3b82f6';
      case 'security': return '#f59e0b';
      case 'ui': return '#8b5cf6';
      case 'fix': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'feature': return 'New Feature';
      case 'improvement': return 'Improvement';
      case 'security': return 'Security';
      case 'ui': return 'UI/UX';
      case 'fix': return 'Bug Fix';
      default: return 'Update';
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            component: motion.div,
            initial: { scale: 0.9, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.9, opacity: 0 },
            transition: { duration: 0.2 },
            sx: {
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
            }
          }}
        >
          {/* Header */}
          <DialogTitle
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #4839eb 100%)',
              color: 'white',
              p: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                p: 3,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'white' }}>
                      PDF
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      PDF StudioX
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={`v${currentVersion}`}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          fontWeight: 600,
                          border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                      />
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {releaseDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <IconButton
                  onClick={onClose}
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
            </Box>
            
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                zIndex: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                zIndex: 1,
              }}
            />
          </DialogTitle>

          {/* Content */}
          <DialogContent sx={{ p: 0 }}>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: '#1e293b',
                }}
              >
                What's New in This Release
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#64748b',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                We've been working hard to bring you the best PDF tools experience. 
                Here's what's new in version {currentVersion}.
              </Typography>

              <List disablePadding>
                {releaseNotes.map((note, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        background: '#ffffff',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: getTypeColor(note.type),
                          boxShadow: `0 4px 12px ${getTypeColor(note.type)}20`,
                        },
                      }}
                    >
                      <ListItem disablePadding>
                        <ListItemIcon
                          sx={{
                            minWidth: 44,
                            '& svg': {
                              fontSize: '1.25rem',
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: `${getTypeColor(note.type)}15`,
                            }}
                          >
                            {note.icon}
                          </Box>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                {note.title}
                              </Typography>
                              <Chip
                                label={getTypeLabel(note.type)}
                                size="small"
                                sx={{
                                  height: 20,
                                  fontSize: '0.7rem',
                                  fontWeight: 600,
                                  backgroundColor: `${getTypeColor(note.type)}20`,
                                  color: getTypeColor(note.type),
                                  border: `1px solid ${getTypeColor(note.type)}30`,
                                }}
                              />
                            </Box>
                          }
                          secondary={
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#64748b',
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                              }}
                            >
                              {note.description}
                            </Typography>
                          }
                        />
                      </ListItem>
                    </Paper>
                  </motion.div>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />
              
              {/* Footer */}
              <Box
                sx={{
                  textAlign: 'center',
                  p: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#475569',
                    fontWeight: 500,
                    mb: 1,
                  }}
                >
                  Thank you for using PDF StudioX!
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748b',
                    fontSize: '0.75rem',
                  }}
                >
                  For support or feedback, contact us at support@pdfstudiox.com
                </Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default VersionModal;