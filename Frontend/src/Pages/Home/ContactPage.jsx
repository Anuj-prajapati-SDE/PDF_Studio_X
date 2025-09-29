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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  CircularProgress,
  useTheme,
  useMediaQuery,
  alpha,
  Divider,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Subject as SubjectIcon,
  Message as MessageIcon,
  Send as SendIcon,
  CheckCircle as CheckIcon,
  Schedule as ScheduleIcon,
  Support as SupportIcon,
  Business as BusinessIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiry: '',
    message: '',
    newsletter: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'newsletter' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitted(true);
      toast.success('Message sent successfully!');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          inquiry: '',
          message: '',
          newsletter: false,
        });
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      title: 'Email Us',
      content: 'support@pdfstudiox.com',
      subContent: 'We\'ll respond within 24 hours',
      color: theme.palette.primary.main,
    },
    {
      icon: <PhoneIcon />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      subContent: 'Mon-Fri, 9AM-6PM EST',
      color: theme.palette.secondary.main,
    },
    {
      icon: <LocationIcon />,
      title: 'Visit Us',
      content: '123 Business Ave',
      subContent: 'San Francisco, CA 94107',
      color: theme.palette.info.main,
    },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: <FacebookIcon />, url: '#', color: '#1877F2' },
    { name: 'Twitter', icon: <TwitterIcon />, url: '#', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: '#', color: '#0077B5' },
    { name: 'Instagram', icon: <InstagramIcon />, url: '#', color: '#E4405F' },
    { name: 'GitHub', icon: <GitHubIcon />, url: '#', color: '#333' },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: theme.palette.background.dark,
      pt: { xs: 10, md: 12 },
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ mb: { xs: 6, md: 8 } }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="overline"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 600,
                letterSpacing: 2,
                mb: 2,
                display: 'block',
              }}
            >
              GET IN TOUCH
            </Typography>
            
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Contact Our Team
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.grey[300],
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Have questions about our PDF tools? Need technical support? 
              We're here to help you succeed.
            </Typography>
          </Box>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Grid container spacing={3} sx={{ mb: { xs: 6, md: 8 } }}>
            {contactInfo.map((item, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <motion.div variants={scaleIn}>
                  <Card
                    sx={{
                      bgcolor: alpha(item.color, 0.1),
                      border: `1px solid ${alpha(item.color, 0.2)}`,
                      borderRadius: 3,
                      p: 3,
                      height: '100%',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 25px ${alpha(item.color, 0.15)}`,
                        borderColor: alpha(item.color, 0.3),
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: alpha(item.color, 0.15),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', mb: 0.5 }}>
                      {item.content}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.grey[400] }}>
                      {item.subContent}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Main Content */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <Card
                sx={{
                  bgcolor: alpha(theme.palette.background.paper, 0.02),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3,
                  p: { xs: 3, md: 4 },
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700, mb: 1 }}>
                  Send us a message
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.grey[300], mb: 4 }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box sx={{ textAlign: 'center', py: 6 }}>
                        <CheckIcon 
                          sx={{ 
                            fontSize: 80, 
                            color: theme.palette.success.main,
                            mb: 2 
                          }} 
                        />
                        <Typography variant="h5" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                          Message Sent Successfully!
                        </Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.grey[300] }}>
                          Thank you for contacting us. We'll respond within 24 hours.
                        </Typography>
                      </Box>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Full Name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon sx={{ color: theme.palette.grey[400] }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                  },
                                  '&:hover fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.grey[300],
                                  '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
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
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon sx={{ color: theme.palette.grey[400] }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                  },
                                  '&:hover fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.grey[300],
                                  '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
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
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <SubjectIcon sx={{ color: theme.palette.grey[400] }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                  },
                                  '&:hover fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.grey[300],
                                  '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <FormControl 
                              fullWidth
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                  },
                                  '&:hover fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.grey[300],
                                  '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiSelect-select': {
                                  color: 'white',
                                },
                                '& .MuiSvgIcon-root': {
                                  color: theme.palette.grey[400],
                                },
                              }}
                            >
                              <InputLabel>Inquiry Type</InputLabel>
                              <Select
                                name="inquiry"
                                value={formData.inquiry}
                                onChange={handleInputChange}
                                label="Inquiry Type"
                                required
                              >
                                <MenuItem value="general">General Question</MenuItem>
                                <MenuItem value="support">Technical Support</MenuItem>
                                <MenuItem value="billing">Billing Inquiry</MenuItem>
                                <MenuItem value="feature">Feature Request</MenuItem>
                                <MenuItem value="partnership">Partnership</MenuItem>
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
                              rows={6}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                                    <MessageIcon sx={{ color: theme.palette.grey[400] }} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  '& fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.2),
                                  },
                                  '&:hover fieldset': {
                                    borderColor: alpha(theme.palette.primary.main, 0.3),
                                  },
                                  '&.Mui-focused fieldset': {
                                    borderColor: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputLabel-root': {
                                  color: theme.palette.grey[300],
                                  '&.Mui-focused': {
                                    color: theme.palette.primary.main,
                                  },
                                },
                                '& .MuiInputBase-input': {
                                  color: 'white',
                                },
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="newsletter"
                                  checked={formData.newsletter}
                                  onChange={handleInputChange}
                                  sx={{
                                    color: theme.palette.grey[400],
                                    '&.Mui-checked': {
                                      color: theme.palette.primary.main,
                                    },
                                  }}
                                />
                              }
                              label={
                                <Typography sx={{ color: theme.palette.grey[300] }}>
                                  Subscribe to our newsletter for product updates
                                </Typography>
                              }
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              variant="contained"
                              size="large"
                              fullWidth
                              disabled={isSubmitting}
                              endIcon={
                                isSubmitting ? (
                                  <CircularProgress size={20} color="inherit" />
                                ) : (
                                  <SendIcon />
                                )
                              }
                              sx={{
                                py: 1.5,
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                '&:hover': {
                                  boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.3)}`,
                                },
                              }}
                            >
                              {isSubmitting ? 'Sending Message...' : 'Send Message'}
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {/* Support Hours */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.info.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ScheduleIcon sx={{ color: theme.palette.info.main, mr: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Support Hours
                    </Typography>
                  </Box>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      Monday - Friday
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.grey[300] }}>
                      9:00 AM - 6:00 PM EST
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" sx={{ color: 'white', fontWeight: 500 }}>
                      Weekend Support
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.grey[300] }}>
                      Limited support available
                    </Typography>
                  </Box>
                </Card>
              </motion.div>

              {/* Quick Support */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SupportIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                      Need Quick Help?
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" sx={{ color: theme.palette.grey[300], mb: 2 }}>
                    Check our FAQ section or browse our documentation for instant answers.
                  </Typography>
                  
                  <Stack spacing={1}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: theme.palette.success.main,
                        color: theme.palette.success.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                        }
                      }}
                    >
                      View FAQ
                    </Button>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        borderColor: theme.palette.success.main,
                        color: theme.palette.success.main,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                        }
                      }}
                    >
                      Documentation
                    </Button>
                  </Stack>
                </Card>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Card
                  sx={{
                    bgcolor: alpha(theme.palette.background.paper, 0.02),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 3,
                    p: 3,
                  }}
                >
                  <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                    Follow Us
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        href={social.url}
                        target="_blank"
                        sx={{
                          minWidth: 40,
                          width: 40,
                          height: 40,
                          borderColor: alpha(social.color, 0.3),
                          color: social.color,
                          '&:hover': {
                            borderColor: social.color,
                            backgroundColor: alpha(social.color, 0.1),
                          },
                        }}
                      >
                        {social.icon}
                      </Button>
                    ))}
                  </Box>
                </Card>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Bottom CTA Section */}
      <Box sx={{ 
        mt: { xs: 8, md: 12 },
        py: { xs: 6, md: 8 },
        bgcolor: alpha(theme.palette.primary.main, 0.05),
        borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}>
        <Container maxWidth="md">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                }}
              >
                Ready to Get Started?
              </Typography>
              
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.grey[300],
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto',
                  fontWeight: 400,
                }}
              >
                Join thousands of users who trust our PDF tools for their document needs.
              </Typography>
              
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  }}
                >
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/pricing')}
                  sx={{
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  View Pricing
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage;