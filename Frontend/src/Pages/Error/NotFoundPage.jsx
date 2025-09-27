import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  alpha, 
  useTheme 
} from '@mui/material';
import { 
  Home as HomeIcon,
  Search as SearchIcon,
  AlertCircle as AlertCircleIcon,
  ChevronRight as ChevronRightIcon,
  FileText as FileTextIcon,
  Scissors as ScissorsIcon,
  RefreshCw as RefreshCwIcon,
  Shield as ShieldIcon,
} from 'react-feather';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const quickLinkItems = [
    {
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one document',
      path: '/tools/merge-pdf',
      icon: <FileTextIcon size={24} color={theme.palette.primary.main} />,
    },
    {
      title: 'Split PDF',
      description: 'Extract pages or split into multiple documents',
      path: '/tools/split-pdf',
      icon: <ScissorsIcon size={24} color={theme.palette.warning.main} />,
    },
    {
      title: 'Convert PDF',
      description: 'Transform PDFs to and from other formats',
      path: '/tools/convert-pdf',
      icon: <RefreshCwIcon size={24} color={theme.palette.success.main} />,
    },
    {
      title: 'Protect PDF',
      description: 'Secure your documents with password protection',
      path: '/tools/protect-pdf',
      icon: <ShieldIcon size={24} color={theme.palette.error.main} />,
    },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg" sx={{ pt: 8, pb: 12 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box 
                sx={{
                  display: 'inline-flex',
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  p: 1.5,
                  borderRadius: 2,
                  mb: 5,
                }}
              >
                <AlertCircleIcon size={20} />
                <Typography 
                  variant="subtitle2" 
                  fontWeight={600} 
                  sx={{ ml: 1 }}
                >
                  Page Not Found
                </Typography>
              </Box>
              
              <Typography 
                variant="h1" 
                component="h1" 
                fontWeight={800} 
                sx={{ 
                  mb: 3, 
                  fontSize: { xs: '4rem', md: '6rem' },
                  background: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                404
              </Typography>
              
              <Typography 
                variant="h4" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 3 }}
              >
                Oops! This page has gone missing.
              </Typography>
              
              <Typography 
                variant="body1" 
                color="text.secondary" 
                sx={{ 
                  mb: 5,
                  fontSize: '1.1rem', 
                  maxWidth: 450 
                }}
              >
                The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to our homepage.
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<HomeIcon />}
                  onClick={() => navigate('/')}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  Back to Home
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/contact"
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  Contact Support
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <motion.div variants={itemVariants}>
              <Box 
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  height: { xs: 300, md: 400 },
                }}
              >
                {/* 404 Graphics */}
                <Box 
                  component="img" 
                  src="/404-illustration.svg" 
                  alt="404 Not Found" 
                  sx={{ 
                    maxWidth: '100%', 
                    maxHeight: '100%',
                  }}
                  onError={(e) => {
                    // Fallback if image is missing
                    e.target.style.display = 'none';
                    
                    // Create a fallback element
                    const fallback = document.createElement('div');
                    fallback.style.width = '100%';
                    fallback.style.height = '100%';
                    fallback.style.display = 'flex';
                    fallback.style.alignItems = 'center';
                    fallback.style.justifyContent = 'center';
                    
                    // Create a search icon in a circle
                    const iconContainer = document.createElement('div');
                    iconContainer.style.width = '200px';
                    iconContainer.style.height = '200px';
                    iconContainer.style.borderRadius = '50%';
                    iconContainer.style.backgroundColor = alpha(theme.palette.primary.main, 0.1);
                    iconContainer.style.display = 'flex';
                    iconContainer.style.alignItems = 'center';
                    iconContainer.style.justifyContent = 'center';
                    
                    // Use SVG for the search icon
                    iconContainer.innerHTML = `
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="${theme.palette.primary.main}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                      </svg>
                    `;
                    
                    fallback.appendChild(iconContainer);
                    e.target.parentNode.appendChild(fallback);
                  }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Quick Links Section */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" fontWeight={700} gutterBottom>
              Popular PDF Tools
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              You might be looking for one of these tools:
            </Typography>
            
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {quickLinkItems.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      textDecoration: 'none',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        '& .arrow-icon': {
                          transform: 'translateX(4px)',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box 
                        sx={{ 
                          mb: 2,
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </Box>
                      
                      <Typography variant="h6" color="text.primary" gutterBottom fontWeight={600}>
                        {item.title}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
                        {item.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="subtitle2" color="primary" fontWeight={600}>
                          Try now
                        </Typography>
                        <ChevronRightIcon 
                          className="arrow-icon"
                          size={16} 
                          color={theme.palette.primary.main} 
                          style={{ marginLeft: 4, transition: 'transform 0.2s ease' }} 
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default NotFoundPage;