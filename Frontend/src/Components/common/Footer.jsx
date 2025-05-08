import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
  IconButton,
  Stack,
  InputAdornment,
  useTheme,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  GitHub,
  Send as SendIcon,
  KeyboardArrowUp as ArrowUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import PdfLogo from './PDFLogo';

const Footer = () => {
  const theme = useTheme();
  
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const toolLinks = [
    { name: 'Merge PDF', path: '/tools/merge-pdf' },
    { name: 'Split PDF', path: '/tools/split-pdf' },
    { name: 'Convert PDF', path: '/tools/convert-pdf' },
    { name: 'Protect PDF', path: '/tools/protect-pdf' },
    { name: 'Create PDF', path: '/tools/create-pdf' },
    { name: 'All Tools', path: '/tools' },
  ];
  
  const resourceLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tutorials', path: '/tutorials' },
    { name: 'API Documentation', path: '/api-docs' },
  ];
  
  const companyLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Careers', path: '/careers' },
  ];
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.dark',
        color: 'white',
        pt: { xs: 8, md: 10 },
        pb: 4,
        position: 'relative',
        mt: 10,
        clipPath: 'ellipse(80% 100% at center top)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
          zIndex: -1,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <IconButton
            onClick={handleScrollToTop}
            sx={{
              backgroundColor: 'white',
              boxShadow: theme.shadows[3],
              '&:hover': {
                backgroundColor: 'white',
              },
              width: 60,
              height: 60,
            }}
          >
            <ArrowUpIcon fontSize="medium" color="primary" />
          </IconButton>
        </motion.div>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PdfLogo size={40} light />
              <Typography
                variant="h5"
                sx={{ ml: 1.5, fontWeight: 700, color: 'white' }}
              >
                PDF Utility
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, opacity: 0.9, maxWidth: 350 }}>
              The all-in-one PDF solution that makes working with documents easy and efficient. Convert, merge, split, and secure your PDFs with our powerful tools.
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <LinkedIn />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}>
                <GitHub />
              </IconButton>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              PDF Tools
            </Typography>
            <Box component="nav">
              {toolLinks.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 1.5,
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Resources
            </Typography>
            <Box component="nav">
              {resourceLinks.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 1.5,
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Company
            </Typography>
            <Box component="nav">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.8)',
                    mb: 1.5,
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                    },
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
              Stay Updated
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Subscribe to get the latest updates and offers.
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email Address"
              size="small"
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                  color: 'white',
                  borderRadius: 3,
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'white',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255,255,255,0.7)',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: 'white' }}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', my: 4 }} />
        
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2" color="rgba(255,255,255,0.7)">
              © {new Date().getFullYear()} PDF Utility. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
              <Link component={RouterLink} to="/privacy" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Terms of Service
              </Link>
              <Link component={RouterLink} to="/cookies" sx={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', '&:hover': { color: 'white' } }}>
                Cookies
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;