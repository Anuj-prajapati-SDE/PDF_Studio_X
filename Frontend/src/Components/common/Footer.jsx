import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  Stack,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Linkedin as LinkedInIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
} from 'react-feather';

// Custom theme colors
const customColors = {
  darkBlue: '#0B1340',
  deepPurple: '#5B0E8B',
  aqua: '#00D4FF',
  lightAqua: '#88E1FF',
  brightPurple: '#A239FF',
};

const Footer = () => {
  const theme = useTheme();
  
  // Current date and time & username
  const currentDateTime = "2025-05-09 11:12:36";
  const username = "Anuj-prajapati-SDE";

  // Navigation links structure
  const footerLinks = [
    {
      title: 'Products',
      links: [
        { name: 'PDF to JPG', path: '/pdf-to-jpg' },
        { name: 'JPG to PDF', path: '/jpg-to-pdf' },
        { name: 'Edit PDF', path: '/edit-pdf' },
        { name: 'Sign PDF', path: '/sign-pdf' },
        { name: 'Watermark PDF', path: '/watermark-pdf' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', path: '/about' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact', path: '/contact' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Documentation', path: '/docs' },
        { name: 'API', path: '/api' },
        { name: 'Status', path: '/status' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]
    }
  ];

  // Social media links
  const socialLinks = [
    { icon: <TwitterIcon size={20} />, url: '#', color: '#1DA1F2' },
    { icon: <FacebookIcon size={20} />, url: '#', color: '#4267B2' },
    { icon: <LinkedInIcon size={20} />, url: '#', color: '#0077B5' },
    { icon: <InstagramIcon size={20} />, url: '#', color: '#E1306C' },
    { icon: <GitHubIcon size={20} />, url: '#', color: '#333333' },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        background: `linear-gradient(135deg, ${customColors.darkBlue} 0%, ${customColors.deepPurple} 100%)`,
        color: '#fff',
        overflow: 'hidden',
      }}
    >
      {/* Glass background effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(100px)',
          zIndex: 0,
        }}
      />
      
      {/* Decorative blobs */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: '10%', 
          right: '5%', 
          width: '200px', 
          height: '200px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.2)} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(50px)',
          zIndex: 0,
        }} 
      />
      
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: '5%', 
          left: '10%', 
          width: '250px', 
          height: '250px', 
          borderRadius: '50%', 
          background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
          filter: 'blur(60px)',
          zIndex: 0,
        }} 
      />

      {/* Main footer content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {/* Logo and description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                component={RouterLink} 
                to="/"
                sx={{ 
                  color: '#fff', 
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: `linear-gradient(135deg, #FFFFFF 30%, ${customColors.lightAqua} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                PDF Utility
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 3, maxWidth: 280 }}>
              Powerful tools to handle all your PDF needs. Edit, convert, compress, and secure PDF documents with ease.
            </Typography>
            
            {/* Social links */}
            <Stack direction="row" spacing={1.5}>
              {socialLinks.map((social, index) => (
                <IconButton
                  key={index}
                  component="a"
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{
                    bgcolor: alpha(social.color, 0.2),
                    color: alpha(social.color, 0.9),
                    '&:hover': {
                      bgcolor: social.color,
                      color: '#fff',
                    },
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>
          
          {/* Footer links columns */}
          {footerLinks.map((column, index) => (
            <Grid item xs={6} sm={4} md={2} key={index} sx={{ ml: index === 0 ? { xs: 0, md: 2 } : 0 }}>
              <Typography variant="subtitle2" fontWeight={600} color="#fff" gutterBottom>
                {column.title}
              </Typography>
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                {column.links.map((link, i) => (
                  <Box component="li" key={i} sx={{ mb: 1 }}>
                    <Link 
                      component={RouterLink} 
                      to={link.path} 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        textDecoration: 'none',
                        '&:hover': {
                          color: customColors.lightAqua,
                        },
                        fontSize: '0.875rem',
                        transition: 'color 0.2s',
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* Bottom bar with copyright and user info */}
      <Box 
        sx={{
          borderTop: '1px solid',
          borderColor: alpha('#fff', 0.1),
          py: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2} alignItems="center" justifyContent="space-between">
            <Grid item xs={12} sm="auto">
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', textAlign: { xs: 'center', sm: 'left' } }}>
                © 2025 PDF Utility. All rights reserved.
              </Typography>
            </Grid>
            
            <Grid item xs={12} sm="auto">
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={{ xs: 1, sm: 2 }}
                divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />}
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.5)',
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <Typography variant="caption">
                  {currentDateTime}
                </Typography>
                <Typography variant="caption">
                  User: {username}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;