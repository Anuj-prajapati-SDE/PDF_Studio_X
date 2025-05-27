import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Container,
  Card,
  CardContent,
  Stack,
  Avatar,
  Chip,
  Divider,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
  useMediaQuery,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Mail as MailIcon,
  Phone as PhoneIcon,
  MapPin as MapPinIcon,
  MessageSquare as MessageSquareIcon,
  User as UserIcon,
  Send as SendIcon,
  MessageCircle as MessageCircleIcon,
  Inbox as InboxIcon,
  Clock as ClockIcon,
  Headphones as HeadphonesIcon,
  Globe as GlobeIcon,
  Check as CheckIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedInIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  HelpCircle as HelpCircleIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Custom theme colors
const customColors = {
  darkBlue: '#0B1340',
  deepPurple: '#5B0E8B',
  aqua: '#00D4FF',
  lightAqua: '#88E1FF',
  brightPurple: '#A239FF',
  nightPurple: '#030018',
  glassOverlay: 'rgba(12, 24, 61, 0.3)',
};

// Office location data
const officeLocations = [
  {
    city: 'San Francisco',
    address: '123 Innovation Drive, San Francisco, CA 94107',
    phone: '+1 (415) 555-0123',
    email: 'sf@pdfutility.com',
    mapUrl: 'https://maps.google.com/?q=San+Francisco',
  },
  {
    city: 'London',
    address: '10 Tech Square, London, EC1V 9BW, UK',
    phone: '+44 20 7946 0958',
    email: 'london@pdfutility.com',
    mapUrl: 'https://maps.google.com/?q=London',
  },
  {
    city: 'Singapore',
    address: '42 Digital Tower, Marina Bay, Singapore 018980',
    phone: '+65 6123 4567',
    email: 'singapore@pdfutility.com',
    mapUrl: 'https://maps.google.com/?q=Singapore',
  },
];

// FAQ data
const faqItems = [
  {
    question: 'How quickly can I expect a response?',
    answer: 'We aim to respond to all inquiries within 24 hours during business days. Premium support plans receive priority responses within 4 hours.'
  },
  {
    question: 'Can I request a feature for your products?',
    answer: 'Absolutely! We welcome feature requests and user feedback. Please use our contact form and select "Feature Request" as the inquiry type.'
  },
  {
    question: 'Do you offer phone support?',
    answer: 'Phone support is available for Business plan subscribers. If you\'re on another plan, please use our email support or contact form.'
  },
];

const ContactPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Current date and time
  const currentDateTime = "2025-05-09 11:02:28";
  const username = "Anuj-prajapati-SDE";
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiry: '',
    message: '',
    subscribe: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  
  // Split date and time for display
  const [date, time] = currentDateTime.split(' ');

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'subscribe' ? checked : value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSuccess(true);
      toast.success('Your message has been sent successfully!');
      
      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          inquiry: '',
          message: '',
          subscribe: false,
        });
        setFormSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <>
      {/* Hero Section with Blue/Purple Gradient and Glass Effects */}
      <Box 
        sx={{
          position: 'relative',
          minHeight: { xs: 'auto', md: '50vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${customColors.darkBlue} 0%, ${customColors.deepPurple} 70%, ${customColors.nightPurple} 100%)`,
          pt: { xs: 10, md: 15 },
          pb: { xs: 8, md: 15 },
        }}
      >
        {/* Decorative blobs & light effects */}
        <Box 
          sx={{
            position: 'absolute',
            top: '-5%',
            right: '-5%',
            width: '30%',
            height: '50%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.3)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(60px)',
            zIndex: 0,
          }}
        />
        
        <Box 
          sx={{
            position: 'absolute',
            bottom: '-20%',
            left: '30%',
            width: '40%',
            height: '60%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.3)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(100px)',
            zIndex: 0,
          }}
        />
        
        <Box 
          sx={{
            position: 'absolute',
            top: '30%',
            left: '-10%',
            width: '25%',
            height: '40%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(70px)',
            zIndex: 0,
          }}
        />

        {/* Animated star-like particles */}
        {[...Array(20)].map((_, index) => (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: customColors.lightAqua,
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out ${Math.random() * 2}s`,
              '@keyframes twinkle': {
                '0%, 100%': { opacity: 0.1, transform: 'scale(1)' },
                '50%': { opacity: 0.7, transform: 'scale(1.3)' },
              }
            }}
          />
        ))}

        {/* User info bar with advanced glassmorphism */}
        <Box 
          sx={{ 
            position: 'absolute',
            top: 20,
            right: 20,
            zIndex: 10,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              px: 3,
              py: 1.5,
              borderRadius: 8,
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(18, 18, 50, 0.3)',
              border: '1px solid',
              borderColor: 'rgba(122, 184, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            <Box mr={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
                Date & Time (UTC)
              </Typography>
              <Typography variant="body2" fontWeight={500} color="#fff">
                {date} <Box component="span" sx={{ color: customColors.lightAqua }}>{time}</Box>
              </Typography>
            </Box>
            
            <Divider orientation="vertical" flexItem sx={{ 
              mx: 1, 
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: { xs: 'none', sm: 'block' } 
            }} />
            
            <Box sx={{ display: 'flex', alignItems: 'center', ml: { xs: 0, sm: 2 } }}>
              <Avatar 
                sx={{ 
                  width: 38, 
                  height: 38,
                  bgcolor: alpha(customColors.aqua, 0.2),
                  color: customColors.lightAqua,
                  fontWeight: 'bold',
                  fontSize: '0.9rem',
                  border: '2px solid',
                  borderColor: alpha(customColors.aqua, 0.3),
                }}
              >
                {username.charAt(0).toUpperCase()}
              </Avatar>
              <Box ml={2}>
                <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
                  Welcome
                </Typography>
                <Typography variant="body2" fontWeight={500} color="#fff">
                  {username}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center', maxWidth: 850, mx: 'auto' }}>
              <Typography
                variant="overline"
                sx={{
                  color: customColors.lightAqua,
                  fontWeight: 600,
                  letterSpacing: 3,
                  mb: 1,
                  display: 'block',
                }}
              >
                GET IN TOUCH
              </Typography>
              
              <Typography 
                variant="h2" 
                component="h1" 
                fontWeight={800}
                sx={{ 
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                  mb: 2,
                  color: '#fff',
                  textShadow: '0 5px 15px rgba(0,0,0,0.2)',
                  background: `linear-gradient(135deg, #FFFFFF 30%, ${customColors.lightAqua} 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}
              >
                Contact Us
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  maxWidth: 700,
                  mx: 'auto',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 'normal',
                  lineHeight: 1.6,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                }}
              >
                Have a question or need support? Our team is here to help.
                Reach out through our contact form or find your nearest office.
              </Typography>
              
              {/* Contact methods */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: { xs: 2, md: 4 },
                  mt: 6,
                }}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(20, 24, 60, 0.25)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha(customColors.aqua, 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    px: 2.5,
                    py: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(customColors.aqua, 0.15),
                      color: customColors.lightAqua,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <MailIcon size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
                      Email Us
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="#fff">
                      support@pdfutility.com
                    </Typography>
                  </Box>
                </Card>
                
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(20, 24, 60, 0.25)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha(customColors.brightPurple, 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    px: 2.5,
                    py: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(customColors.brightPurple, 0.15),
                      color: customColors.brightPurple,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <PhoneIcon size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
                      Call Us
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="#fff">
                      +1 (800) 123-4567
                    </Typography>
                  </Box>
                </Card>
                
                <Card
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(20, 24, 60, 0.25)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: alpha(customColors.deepPurple, 0.2),
                    display: 'flex',
                    alignItems: 'center',
                    px: 2.5,
                    py: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: alpha(customColors.deepPurple, 0.15),
                      color: alpha(customColors.deepPurple, 0.9),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <HeadphonesIcon size={18} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="rgba(255, 255, 255, 0.7)" display="block">
                      Support Hours
                    </Typography>
                    <Typography variant="body2" fontWeight={600} color="#fff">
                      24/7 for Business Plans
                    </Typography>
                  </Box>
                </Card>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      {/* Contact Form Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 12 },
          background: customColors.darkBlue,
          position: 'relative',
          mt: { xs: -6, sm: -8, md: -10 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                    background: 'rgba(20, 24, 60, 0.3)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid',
                    borderColor: 'rgba(122, 184, 255, 0.15)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Top gradient line */}
                  <Box 
                    sx={{ 
                      height: '4px', 
                      width: '100%', 
                      background: `linear-gradient(to right, ${customColors.aqua}, ${customColors.brightPurple})`,
                    }}
                  />
                  
                  <CardContent sx={{ p: 4 }}>
                    <Typography 
                      variant="h5" 
                      component="h2" 
                      fontWeight={700} 
                      color="#fff"
                      sx={{ mb: 3 }}
                    >
                      Send Us a Message
                    </Typography>
                    
                    {formSuccess ? (
                      <Box 
                        sx={{ 
                          textAlign: 'center',
                          py: 4, 
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: alpha(customColors.aqua, 0.1),
                            color: customColors.lightAqua,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            border: '2px solid',
                            borderColor: alpha(customColors.aqua, 0.2),
                          }}
                        >
                          <CheckIcon size={40} />
                        </Box>
                        <Typography variant="h6" color="#fff" gutterBottom>
                          Thanks for reaching out!
                        </Typography>
                        <Typography color="rgba(255, 255, 255, 0.8)" paragraph>
                          Your message has been received. We'll get back to you as soon as possible.
                        </Typography>
                      </Box>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.2)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.3)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: customColors.aqua,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                },
                                '& .MuiInputBase-input': {
                                  color: '#fff',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: customColors.aqua,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <UserIcon size={18} color="rgba(255, 255, 255, 0.7)" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.2)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.3)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: customColors.aqua,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                },
                                '& .MuiInputBase-input': {
                                  color: '#fff',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: customColors.aqua,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MailIcon size={18} color="rgba(255, 255, 255, 0.7)" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleInputChange}
                              required
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.2)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.3)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: customColors.aqua,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                },
                                '& .MuiInputBase-input': {
                                  color: '#fff',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: customColors.aqua,
                                },
                              }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <MessageCircleIcon size={18} color="rgba(255, 255, 255, 0.7)" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControl fullWidth variant="outlined" sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'rgba(122, 184, 255, 0.2)',
                                },
                                '&:hover fieldset': {
                                  borderColor: 'rgba(122, 184, 255, 0.3)',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: customColors.aqua,
                                },
                              },
                              '& .MuiInputLabel-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                              },
                              '& .MuiInputBase-input': {
                                color: '#fff',
                              },
                              '& .MuiInputLabel-root.Mui-focused': {
                                color: customColors.aqua,
                              },
                              '& .MuiSvgIcon-root': {
                                color: 'rgba(255, 255, 255, 0.7)',
                              },
                            }}>
                              <InputLabel id="inquiry-label">Type of Inquiry</InputLabel>
                              <Select
                                labelId="inquiry-label"
                                name="inquiry"
                                value={formData.inquiry}
                                onChange={handleInputChange}
                                required
                                label="Type of Inquiry"
                                startAdornment={
                                  <InputAdornment position="start">
                                    <HelpCircleIcon size={18} color="rgba(255, 255, 255, 0.7)" />
                                  </InputAdornment>
                                }
                              >
                                <MenuItem value="general">General Inquiry</MenuItem>
                                <MenuItem value="support">Technical Support</MenuItem>
                                <MenuItem value="billing">Billing Question</MenuItem>
                                <MenuItem value="feature">Feature Request</MenuItem>
                                <MenuItem value="partner">Partnership Opportunity</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Your Message"
                              name="message"
                              value={formData.message}
                              onChange={handleInputChange}
                              required
                              multiline
                              rows={5}
                              variant="outlined"
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.2)',
                                  },
                                  '&:hover fieldset': {
                                    borderColor: 'rgba(122, 184, 255, 0.3)',
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: customColors.aqua,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: 'rgba(255, 255, 255, 0.7)',
                                },
                                '& .MuiInputBase-input': {
                                  color: '#fff',
                                },
                                '& .MuiInputLabel-root.Mui-focused': {
                                  color: customColors.aqua,
                                },
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="subscribe"
                                  checked={formData.subscribe}
                                  onChange={handleInputChange}
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    '&.Mui-checked': {
                                      color: customColors.aqua,
                                    },
                                  }}
                                />
                              }
                              label="Subscribe to our newsletter for updates and tips"
                              sx={{
                                '& .MuiFormControlLabel-label': {
                                  color: 'rgba(255, 255, 255, 0.8)',
                                  fontSize: '0.875rem',
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              disabled={isSubmitting}
                              fullWidth
                              sx={{
                                py: 1.5,
                                borderRadius: '12px',
                                background: `linear-gradient(135deg, ${customColors.aqua} 0%, ${customColors.brightPurple} 100%)`,
                                color: '#fff',
                                fontWeight: 600,
                                border: '1px solid',
                                borderColor: alpha(customColors.aqua, 0.3),
                                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                                '&:hover': {
                                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                                },
                                '&:disabled': {
                                  background: `linear-gradient(135deg, ${alpha(customColors.aqua, 0.5)} 0%, ${alpha(customColors.brightPurple, 0.5)} 100%)`,
                                  color: 'rgba(255, 255, 255, 0.7)',
                                },
                              }}
                              endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : <SendIcon size={18} />}
                            >
                              {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                          </Grid>
                        </Grid>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(20, 24, 60, 0.3)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'rgba(122, 184, 255, 0.15)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Top gradient line */}
                      <Box 
                        sx={{ 
                          height: '4px', 
                          width: '100%', 
                          background: `linear-gradient(to right, ${customColors.brightPurple}, ${customColors.aqua})`,
                        }}
                      />
                      
                      <CardContent sx={{ p: 4 }}>
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          fontWeight={700} 
                          color="#fff"
                          sx={{ mb: 3 }}
                        >
                          Global Offices
                        </Typography>
                        
                        <Grid container spacing={3}>
                          {officeLocations.map((office, index) => (
                            <Grid item xs={12} key={index}>
                              <Card
                                sx={{
                                  borderRadius: 3,
                                  background: 'rgba(20, 24, 60, 0.4)',
                                  backdropFilter: 'blur(10px)',
                                  border: '1px solid',
                                  borderColor: 'rgba(122, 184, 255, 0.1)',
                                  p: 2.5,
                                  mb: index !== officeLocations.length - 1 ? 1 : 0,
                                  transition: 'all 0.3s ease',
                                  '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                                    borderColor: alpha(
                                      index === 0 ? customColors.aqua : 
                                      index === 1 ? customColors.brightPurple : 
                                      customColors.deepPurple, 0.3),
                                  }
                                }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                  <Box
                                    sx={{
                                      width: 42,
                                      height: 42,
                                      borderRadius: '10px',
                                      bgcolor: alpha(
                                        index === 0 ? customColors.aqua : 
                                        index === 1 ? customColors.brightPurple : 
                                        customColors.deepPurple, 0.15),
                                      color: 
                                        index === 0 ? customColors.aqua : 
                                        index === 1 ? customColors.brightPurple : 
                                        customColors.deepPurple,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      mr: 2.5,
                                      flexShrink: 0,
                                    }}
                                  >
                                    <MapPinIcon size={20} />
                                  </Box>
                                  <Box>
                                    <Typography variant="h6" color="#fff" fontWeight={600} gutterBottom>
                                      {office.city}
                                    </Typography>
                                    <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" paragraph>
                                      {office.address}
                                    </Typography>
                                    <Grid container spacing={2} sx={{ mt: 1 }}>
                                      <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <PhoneIcon size={14} color="rgba(255, 255, 255, 0.7)" style={{ marginRight: 8 }} />
                                          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                            {office.phone}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12} sm={6}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                          <MailIcon size={14} color="rgba(255, 255, 255, 0.7)" style={{ marginRight: 8 }} />
                                          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                            {office.email}
                                          </Typography>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      href={office.mapUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      sx={{
                                        mt: 2,
                                        borderColor: alpha(
                                          index === 0 ? customColors.aqua : 
                                          index === 1 ? customColors.brightPurple : 
                                          customColors.deepPurple, 0.5),
                                        color: 
                                          index === 0 ? customColors.aqua : 
                                          index === 1 ? customColors.brightPurple : 
                                          customColors.deepPurple,
                                        '&:hover': {
                                          borderColor: 
                                            index === 0 ? customColors.aqua : 
                                            index === 1 ? customColors.brightPurple : 
                                            customColors.deepPurple,
                                          bgcolor: alpha(
                                            index === 0 ? customColors.aqua : 
                                            index === 1 ? customColors.brightPurple : 
                                            customColors.deepPurple, 0.1),
                                        }
                                      }}
                                      startIcon={<GlobeIcon size={14} />}
                                    >
                                      View on Map
                                    </Button>
                                  </Box>
                                </Box>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        background: 'rgba(20, 24, 60, 0.3)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'rgba(122, 184, 255, 0.15)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography 
                          variant="h5" 
                          component="h2" 
                          fontWeight={700} 
                          color="#fff"
                          sx={{ mb: 3 }}
                        >
                          Frequently Asked Questions
                        </Typography>
                        
                        <Box>
                          {faqItems.map((item, index) => (
                            <Box key={index} sx={{ mb: index !== faqItems.length - 1 ? 4 : 0 }}>
                              <Typography variant="h6" color="#fff" gutterBottom fontWeight={600}>
                                {item.question}
                              </Typography>
                              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                {item.answer}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Social Media & Support Hours Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          background: `linear-gradient(135deg, ${customColors.darkBlue} 0%, ${customColors.nightPurple} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient blobs */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '20%', 
            right: '5%', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(60px)',
            zIndex: 0,
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '5%', 
            width: '250px', 
            height: '250px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(50px)',
            zIndex: 0,
          }} 
        />
      
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <motion.div variants={itemAnimation}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(20, 24, 60, 0.3)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.15)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        fontWeight={700} 
                        color="#fff"
                        sx={{ mb: 3 }}
                      >
                        Connect With Us
                      </Typography>
                      
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" paragraph>
                        Follow us on social media for the latest updates, tips, and special offers.
                      </Typography>
                      
                      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 4 }}>
                        {[
                          { name: 'Twitter', icon: <TwitterIcon />, color: '#1DA1F2', url: '#' },
                          { name: 'Facebook', icon: <FacebookIcon />, color: '#4267B2', url: '#' },
                          { name: 'LinkedIn', icon: <LinkedInIcon />, color: '#0077B5', url: '#' },
                          { name: 'Instagram', icon: <InstagramIcon />, color: '#E1306C', url: '#' },
                          { name: 'GitHub', icon: <GitHubIcon />, color: '#333333', url: '#' },
                        ].map((social, index) => (
                          <Card
                            key={index}
                            sx={{
                              borderRadius: 2,
                              background: alpha(social.color, 0.15),
                              border: '1px solid',
                              borderColor: alpha(social.color, 0.3),
                              p: 1,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 90,
                              height: 90,
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px)',
                                boxShadow: `0 10px 20px ${alpha(social.color, 0.2)}`,
                              }
                            }}
                            component="a"
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Box
                              sx={{
                                color: social.color,
                                mb: 1,
                              }}
                            >
                              {React.cloneElement(social.icon, { size: 28 })}
                            </Box>
                            <Typography variant="caption" color="#fff" fontWeight={500}>
                              {social.name}
                            </Typography>
                          </Card>
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <motion.div variants={itemAnimation}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(20, 24, 60, 0.3)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.15)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                      height: '100%',
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        fontWeight={700} 
                        color="#fff"
                        sx={{ mb: 3 }}
                      >
                        Support Hours
                      </Typography>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Card
                            sx={{
                              borderRadius: 3,
                              background: 'rgba(20, 24, 60, 0.4)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid',
                              borderColor: 'rgba(122, 184, 255, 0.1)',
                              p: 3,
                              height: '100%',
                            }}
                          >
                            <Typography variant="h6" color={customColors.aqua} gutterBottom fontWeight={600}>
                              Free & Pro Plans
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                              <ClockIcon size={16} color="rgba(255, 255, 255, 0.7)" style={{ marginRight: 8 }} />
                              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                Monday - Friday
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ ml: 3.5 }}>
                              9:00 AM - 6:00 PM ET
                            </Typography>
                            <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" sx={{ display: 'block', mt: 2 }}>
                              Response time: Within 24 hours
                            </Typography>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Card
                            sx={{
                              borderRadius: 3,
                              background: 'rgba(20, 24, 60, 0.4)',
                              backdropFilter: 'blur(10px)',
                              border: '1px solid',
                              borderColor: 'rgba(122, 184, 255, 0.1)',
                              p: 3,
                              height: '100%',
                            }}
                          >
                            <Typography variant="h6" color={customColors.brightPurple} gutterBottom fontWeight={600}>
                              Business Plan
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                              <ClockIcon size={16} color="rgba(255, 255, 255, 0.7)" style={{ marginRight: 8 }} />
                              <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
                                24/7 Support
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ ml: 3.5 }}>
                              Including weekends & holidays
                            </Typography>
                            <Typography variant="caption" color="rgba(255, 255, 255, 0.6)" sx={{ display: 'block', mt: 2 }}>
                              Response time: Within 4 hours
                            </Typography>
                          </Card>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                            <InboxIcon size={18} color={customColors.lightAqua} style={{ marginRight: 10 }} />
                            <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                              For urgent matters, email us at <Box component="span" sx={{ color: customColors.lightAqua, fontWeight: 600 }}>urgent@pdfutility.com</Box>
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          background: `linear-gradient(45deg, ${customColors.darkBlue} 0%, ${customColors.deepPurple} 100%)`,
          position: 'relative',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                color="#fff"
                sx={{ mb: 3 }}
              >
                Ready to Get Started?
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  maxWidth: 700,
                  mx: 'auto',
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 'normal',
                }}
              >
                Explore our PDF tools and simplify your document workflow today.
              </Typography>
              
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${customColors.aqua} 0%, ${customColors.brightPurple} 100%)`,
                    color: '#fff',
                    fontWeight: 600,
                    border: '1px solid',
                    borderColor: alpha(customColors.aqua, 0.3),
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
                    }
                  }}
                >
                  Try For Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/pricing')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    borderColor: alpha(customColors.aqua, 0.5),
                    color: customColors.lightAqua,
                    '&:hover': {
                      borderColor: customColors.lightAqua,
                      bgcolor: alpha(customColors.aqua, 0.1),
                    }
                  }}
                >
                  View Pricing
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
    </>
  );
};

export default ContactPage;