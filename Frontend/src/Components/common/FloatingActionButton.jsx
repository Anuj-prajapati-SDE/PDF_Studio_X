import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Fab, 
  Zoom, 
  Tooltip, 
  useScrollTrigger,
  IconButton, 
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  useTheme,
  Link
} from '@mui/material';
import { 
  ArrowUp as ArrowUpIcon, 
  HelpCircle as HelpCircleIcon,
  FilePlus as FilePlusIcon,
  Layers as LayersIcon,
  Scissors as ScissorsIcon,
  RefreshCw as RefreshCwIcon,
  Shield as ShieldIcon,
  X as XIcon
} from 'react-feather';
import { Link as RouterLink } from 'react-router-dom';

const FloatingActionButton = () => {
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  
  // Track scroll position for showing/hiding scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Open/close help dialog
  const handleHelpDialogOpen = () => {
    setHelpDialogOpen(true);
  };
  
  const handleHelpDialogClose = () => {
    setHelpDialogOpen(false);
  };
  
  const quickTools = [
    {
      name: 'Merge PDF',
      path: '/tools/merge-pdf',
      icon: <LayersIcon size={18} color={theme.palette.primary.main} />,
      description: 'Combine multiple PDFs into one document'
    },
    {
      name: 'Split PDF',
      path: '/tools/split-pdf',
      icon: <ScissorsIcon size={18} color={theme.palette.warning.main} />,
      description: 'Extract pages from your PDF'
    },
    {
      name: 'Convert PDF',
      path: '/tools/convert-pdf',
      icon: <RefreshCwIcon size={18} color={theme.palette.success.main} />,
      description: 'Convert to and from PDF formats'
    },
    {
      name: 'Create PDF',
      path: '/tools/create-pdf',
      icon: <FilePlusIcon size={18} color={theme.palette.secondary.main} />,
      description: 'Create new PDF documents'
    },
    {
      name: 'Protect PDF',
      path: '/tools/protect-pdf',
      icon: <ShieldIcon size={18} color={theme.palette.error.main} />,
      description: 'Secure documents with passwords'
    },
  ];
  
  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100 }}>
        <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          {/* Help Button - Always Visible */}
          <Tooltip title="Help" placement="left">
            <Fab
              color="secondary"
              aria-label="help"
              size="medium"
              onClick={handleHelpDialogOpen}
              sx={{ 
                mb: 2,
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
              }}
            >
              <HelpCircleIcon size={22} />
            </Fab>
          </Tooltip>
          
          {/* Scroll to Top Button - Visible after scrolling */}
          <Zoom in={showScrollTop}>
            <Fab
              color="primary"
              aria-label="scroll back to top"
              size="medium"
              onClick={scrollToTop}
              sx={{ 
                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
              }}
            >
              <ArrowUpIcon size={22} />
            </Fab>
          </Zoom>
        </Box>
      </Box>
      
      {/* Help Dialog */}
      <Dialog
        open={helpDialogOpen}
        onClose={handleHelpDialogClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            padding: 1,
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 2 }}>
          <DialogTitle sx={{ p: 0, fontWeight: 700 }}>
            Quick Access to PDF Tools
          </DialogTitle>
          <IconButton onClick={handleHelpDialogClose} aria-label="close" size="small">
            <XIcon size={20} />
          </IconButton>
        </Box>
        
        <DialogContent sx={{ pt: 1 }}>
          <DialogContentText sx={{ mb: 3 }}>
            Select one of our popular tools to get started:
          </DialogContentText>
          
          <Grid container spacing={2}>
            {quickTools.map((tool, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  component={RouterLink}
                  to={tool.path}
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={handleHelpDialogClose}
                  startIcon={tool.icon}
                  sx={{ 
                    justifyContent: 'flex-start',
                    borderRadius: 2,
                    py: 1.5,
                    borderColor: 'divider',
                    textAlign: 'left',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2">
                      {tool.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {tool.description}
                    </Typography>
                  </Box>
                </Button>
              </Grid>
            ))}
          </Grid>
          
          <Box 
            sx={{ 
              mt: 3, 
              p: 2, 
              borderRadius: 2, 
              bgcolor: alpha(theme.palette.info.main, 0.08),
              border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
            }}
          >
            <Typography variant="subtitle2" fontWeight={600} gutterBottom>
              Need more help?
            </Typography>
            <Typography variant="body2">
              Visit our <Link component={RouterLink} to="/help" color="primary">Help Center</Link> for tutorials and guides, or <Link component={RouterLink} to="/contact" color="primary">contact our support team</Link> for assistance.
            </Typography>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleHelpDialogClose} variant="text">
            Close
          </Button>
          <Button 
            component={RouterLink} 
            to="/contact" 
            variant="contained" 
            onClick={handleHelpDialogClose}
            startIcon={<HelpCircleIcon size={16} />}
          >
            Get Support
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FloatingActionButton;