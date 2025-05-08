import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Paper,
  Divider,
  InputAdornment,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Alert,
  alpha,
  useTheme, 
  Stack
} from '@mui/material';
import { 
  Mail as EmailIcon,
  Phone as PhoneIcon,
  MapPin as LocationIcon,
  Send as SendIcon,
  MessageSquare as MessageIcon,
  CheckCircle as CheckCircleIcon,
  User as UserIcon,
  HelpCircle as HelpCircleIcon,
  AlertCircle as AlertCircleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedInIcon,
  GitHub as GitHubIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const theme = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry', // Default topic
    message: '',
    agreeToTerms: false,
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  // Form validation
  const [formErrors, setFormErrors] = useState({});
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    // Subject validation
    if (!formData.subject) {
      errors.subject = 'Please select a topic';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters';
    }
    
    // Terms agreement
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to our privacy policy';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setError(null);
      
      // Simulate API call
      setTimeout(() => {
        // Random success (90% chance to succeed)
        const success = Math.random() < 0.9;
        
        if (success) {
          setSubmitted(true);
          toast.success('Your message has been sent successfully!');
        } else {
          setError('Something went wrong. Please try again later.');
          toast.error('Failed to send message. Please try again.');
        }
        
        setIsSubmitting(false);
      }, 1500);
    }
  };
  
  // Reset form
  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      subject: 'General Inquiry',
      message: '',
      agreeToTerms: false,
    });
    setFormErrors({});
    setSubmitted(false);
    setError(null);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };
  
  const formSuccessVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };
  
  const contactInfo = [
    {
      icon: <EmailIcon size={20} color={theme.palette.primary.main} />,
      title: "Email Us",
      info: "support@pdfutility.com",
      description: "We'll respond within 24 hours",
    },
    {
      icon: <PhoneIcon size={20} color={theme.palette.success.main} />,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      description: "Mon-Fri from 9AM to 6PM EST",
    },
    {
      icon: <LocationIcon size={20} color={theme.palette.error.main} />,
      title: "Location",
      info: "San Francisco, CA",
      description: "123 Tech Avenue, Suite 100",
    },
  ];
  
  const faqItems = [
    {
      question: "How quickly do you respond to inquiries?",
      answer: "We try to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
    },
    {
      question: "Do you offer custom PDF solutions?",
      answer: "Yes, we offer custom PDF solutions for businesses with specific requirements. Please contact us with details about your needs.",
    },
    {
      question: "How secure are your PDF tools?",
      answer: "Our tools are designed with security in mind. Most processing happens in your browser, and any files uploaded are encrypted and automatically deleted after processing.",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <motion.div variants={itemVariants}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}>
              Have questions about our PDF tools? Need help with a specific issue? Our team is here to assist you.
            </Typography>
          </motion.div>
        </Box>
        
        {/* Contact Info Cards */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {contactInfo.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  elevation={0}
                  sx={{ 
                    borderRadius: 4, 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 3, height: '100%' }}>
                    <Stack sx={{ height: '100%' }}>
                      <Box sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                          }}
                        >
                          {item.icon}
                        </Box>
                      </Box>
                      
                      <Typography variant="h6" component="h3" fontWeight={600}>
                        {item.title}
                      </Typography>
                      
                      <Typography variant="body1" sx={{ fontWeight: 500, mt: 1 }}>
                        {item.info}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto', pt: 1 }}>
                        {item.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </motion.div>
        
        {/* Contact Form and Map Section */}
        <Grid container spacing={4} sx={{ mb: 10 }}>
          {/* Contact Form */}
          <Grid item xs={12} lg={7}>
            <motion.div variants={itemVariants}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 0, height: '100%' }}>
                  <Box 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      p: 3,
                    }}
                  >
                    <Typography variant="h5" fontWeight={600}>
                      Send Us a Message
                    </Typography>
                    <Typography variant="body2">
                      Fill out the form below and we'll get back to you as soon as possible
                    </Typography>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    {!submitted ? (
                      <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Your Name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              error={!!formErrors.name}
                              helperText={formErrors.name}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <UserIcon size={18} color={theme.palette.text.secondary} />
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
                              onChange={handleChange}
                              error={!!formErrors.email}
                              helperText={formErrors.email}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <EmailIcon size={18} color={theme.palette.text.secondary} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              select
                              label="Subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              error={!!formErrors.subject}
                              helperText={formErrors.subject}
                            >
                              <MenuItem value="General Inquiry">General Inquiry</MenuItem>
                              <MenuItem value="Technical Support">Technical Support</MenuItem>
                              <MenuItem value="Feature Request">Feature Request</MenuItem>
                              <MenuItem value="Partnership">Partnership</MenuItem>
                              <MenuItem value="Billing/Payment">Billing/Payment</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                            </TextField>
                          </Grid>
                          
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              multiline
                              rows={5}
                              label="Message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              error={!!formErrors.message}
                              helperText={formErrors.message}
                              placeholder="How can we help you?"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                    <MessageIcon size={18} color={theme.palette.text.secondary} />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          
                          <Grid item xs={12}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="agreeToTerms"
                                  checked={formData.agreeToTerms}
                                  onChange={handleChange}
                                  color="primary"
                                />
                              }
                              label={
                                <Typography variant="body2">
                                  I agree to the processing of my data as per the{' '}
                                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>
                                    privacy policy
                                  </Box>
                                </Typography>
                              }
                            />
                            {formErrors.agreeToTerms && (
                              <Typography variant="caption" color="error.main">
                                {formErrors.agreeToTerms}
                              </Typography>
                            )}
                          </Grid>
                        </Grid>
                        
                        {error && (
                          <Alert 
                            severity="error" 
                            sx={{ mt: 2, borderRadius: 2 }}
                          >
                            {error}
                          </Alert>
                        )}
                        
                        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SendIcon />}
                            disabled={isSubmitting}
                            sx={{ 
                              px: 4,
                              py: 1.5,
                              borderRadius: 3,
                            }}
                          >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                          </Button>
                        </Box>
                      </Box>
                    ) : (
                      <motion.div
                        variants={formSuccessVariants}
                        initial="hidden"
                        animate="visible"
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          textAlign: 'center',
                          padding: '30px 0',
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            bgcolor: 'success.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                          }}
                        >
                          <CheckCircleIcon size={40} />
                        </Box>
                        
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                          Message Sent!
                        </Typography>
                        
                        <Typography variant="body1" sx={{ mb: 4, maxWidth: 500 }}>
                          Thank you for reaching out to us. We've received your message and will get back to you as soon as possible.
                        </Typography>
                        
                        <Button
                          variant="outlined"
                          onClick={handleReset}
                          sx={{ borderRadius: 3 }}
                        >
                          Send Another Message
                        </Button>
                      </motion.div>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
          
          {/* Office Map & Info */}
          <Grid item xs={12} lg={5}>
            <motion.div variants={itemVariants}>
              <Card 
                elevation={0}
                sx={{ 
                  borderRadius: 4, 
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Embedded Map */}
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: { xs: 250, md: 300 },
                    bgcolor: '#eee',
                    backgroundImage: 'url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-122.4194,37.7749,12,0/600x400?access_token=pk.eyJ1IjoiZGVtb3VzZXIiLCJhIjoiY2szeXBsODdzMGl2YzNvczhxNnhkY211dSJ9.3Qn9iaQ-K5K3Jj_X5zLxVg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'error.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 15px rgba(0,0,0,0.3)',
                      border: '2px solid white',
                      color: 'white',
                    }}
                  >
                    <LocationIcon size={20} />
                  </Box>
                </Box>
                
                <CardContent sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Our Office
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" paragraph>
                      Visit us at our headquarters in San Francisco, where our team is building the future of PDF technology.
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      <LocationIcon size={14} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                      123 Tech Avenue, Suite 100, San Francisco, CA 94107
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                    Connect with Us
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      mt: 2, 
                      display: 'flex', 
                      gap: 2
                    }}
                  >
                    {[
                      { icon: <FacebookIcon size={18} />, color: '#3b5998' },
                      { icon: <TwitterIcon size={18} />, color: '#1da1f2' },
                      { icon: <LinkedInIcon size={18} />, color: '#0077b5' },
                      { icon: <GitHubIcon size={18} />, color: '#333' },
                    ].map((social, index) => (
                      <Box
                        key={index}
                        sx={{
                          width: 38,
                          height: 38,
                          borderRadius: '50%',
                          bgcolor: alpha(social.color, 0.1),
                          color: social.color,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: social.color,
                            color: 'white',
                            transform: 'translateY(-3px)',
                          },
                        }}
                      >
                        {social.icon}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* FAQs */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 10 }}>
            <Typography variant="h4" fontWeight={700} align="center" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6, maxWidth: 700, mx: 'auto' }}>
              Have additional questions? Check out our common inquiries below
            </Typography>
            
            <Grid container spacing={4}>
              {faqItems.map((faq, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        alignItems: 'flex-start', 
                        mb: 2
                      }}
                    >
                      <HelpCircleIcon size={20} color={theme.palette.primary.main} style={{ marginRight: 10, marginTop: 4 }} />
                      <Typography variant="h6" fontWeight={600}>
                        {faq.question}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            
            <Box 
              sx={{ 
                mt: 5, 
                p: 3, 
                borderRadius: 3,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 2, sm: 0 } }}>
                <AlertCircleIcon size={24} color={theme.palette.info.main} style={{ marginRight: 12 }} />
                <Typography variant="body1" fontWeight={500}>
                  Can't find what you're looking for?
                </Typography>
              </Box>
              
              <Box sx={{ ml: { xs: 0, sm: 'auto' } }}>
                <Button
                  variant="contained"
                  color="info"
                  onClick={() => document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' })}
                  sx={{ borderRadius: 3 }}
                >
                  Contact Support
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default ContactPage;