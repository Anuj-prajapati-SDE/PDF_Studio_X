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
  CardActions,
  Stack,
  Avatar,
  Chip,
  Divider,
  Switch,
  FormControlLabel,
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import {
  Check as CheckIcon,
  X as CloseIcon,
  Info as InfoIcon,
  AlertCircle as AlertCircleIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  Star as StarIcon,
  Download as DownloadIcon,
  Users as UsersIcon,
  Mail as MailIcon,
  Edit as EditIcon,
  FileText as FileTextIcon,
  Unlock as UnlockIcon,
  MessageCircle as MessageCircleIcon,
  Gift as GiftIcon,
  Briefcase as BriefcaseIcon,
  Settings as SettingsIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import { Image } from '@mui/icons-material';

// Custom theme colors
const customColors = {
  darkBlue: '#0B1340',
  deepPurple: '#5B0E8B',
  aqua: '#00D4FF',
  lightAqua: '#88E1FF',
  brightPurple: '#A239FF',
  nightPurple: '#2C1344',
  glassOverlay: 'rgba(12, 24, 61, 0.3)',
};

// Pricing plan data
const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    description: 'Basic tools for occasional use',
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      { text: 'PDF to JPG conversion', included: true },
      { text: 'JPG to PDF conversion', included: true },
      { text: 'Basic watermarking', included: true },
      { text: 'Up to 5 files per day', included: true },
      { text: 'Max file size: 15MB', included: true },
      { text: 'Basic signatures', included: true },
      { text: 'Ad-supported', included: true },
      { text: 'Advanced editing tools', included: false },
      { text: 'PDF encryption', included: false },
      { text: 'Priority support', included: false },
    ],
    popular: false,
    color: customColors.aqua,
    gradient: `linear-gradient(135deg, ${alpha(customColors.aqua, 0.4)} 0%, ${alpha(customColors.aqua, 0.1)} 100%)`,
    icon: <DownloadIcon size={24} />,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For professionals and small teams',
    monthlyPrice: 9.99,
    annualPrice: 99.99,
    features: [
      { text: 'All Free features', included: true },
      { text: 'Unlimited conversions', included: true },
      { text: 'Advanced editing tools', included: true },
      { text: 'Max file size: 100MB', included: true },
      { text: 'PDF encryption', included: true },
      { text: 'Advanced signatures', included: true },
      { text: 'No ads', included: true },
      { text: 'Email support', included: true },
      { text: 'API access', included: false },
      { text: 'Enterprise integrations', included: false },
    ],
    popular: true,
    color: customColors.brightPurple,
    gradient: `linear-gradient(135deg, ${alpha(customColors.brightPurple, 0.4)} 0%, ${alpha(customColors.brightPurple, 0.1)} 100%)`,
    icon: <AwardIcon size={24} />,
  },
  {
    id: 'business',
    name: 'Business',
    description: 'For teams and organizations',
    monthlyPrice: 29.99,
    annualPrice: 299.99,
    features: [
      { text: 'All Pro features', included: true },
      { text: 'Unlimited everything', included: true },
      { text: 'API access', included: true },
      { text: 'Enterprise integrations', included: true },
      { text: 'Max file size: 500MB', included: true },
      { text: 'Team management', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'Custom onboarding', included: true },
    ],
    popular: false,
    color: customColors.deepPurple,
    gradient: `linear-gradient(135deg, ${alpha(customColors.deepPurple, 0.4)} 0%, ${alpha(customColors.deepPurple, 0.1)} 100%)`,
    icon: <BriefcaseIcon size={24} />,
  }
];

// FAQ data
const faqItems = [
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal. For Business plans, we can also accommodate invoicing and purchase orders.'
  },
  {
    question: 'Can I upgrade or downgrade my plan later?',
    answer: 'Yes, you can upgrade your plan at any time. The price difference will be prorated. You can downgrade your plan at the end of your current billing cycle.'
  },
  {
    question: 'Is there a free trial for paid plans?',
    answer: 'Yes, we offer a 7-day free trial for all paid plans. No credit card is required to start your trial.'
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of the current billing period.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, all files are processed securely with end-to-end encryption. We don\'t store your files beyond the processing period, and your documents are automatically deleted from our servers.'
  }
];

const PricingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Current date and time
  const currentDateTime = "2025-05-09 10:47:51";
  const username = "Anuj-prajapati-SDE";

  // Annual billing state
  const [isAnnual, setIsAnnual] = useState(true);
  
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

  const handleBillingToggle = () => {
    setIsAnnual(!isAnnual);
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
                TRANSPARENT PRICING
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
                Choose Your Perfect Plan
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
                Simple, transparent pricing that scales with your needs. 
                All plans come with our core PDF tools to help you work more efficiently.
              </Typography>
              
              {/* Billing toggle */}
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 6,
                  mb: { xs: 4, md: 8 },
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  sx={{
                    color: isAnnual ? 'rgba(255, 255, 255, 0.7)' : '#fff',
                    fontWeight: isAnnual ? 'normal' : 'medium',
                  }}
                >
                  Monthly
                </Typography>
                
                <Box 
                  onClick={handleBillingToggle}
                  sx={{
                    position: 'relative',
                    cursor: 'pointer',
                    mx: 2,
                  }}
                >
                  <Switch
                    checked={isAnnual}
                    onChange={handleBillingToggle}
                    sx={{
                      '& .MuiSwitch-switchBase': {
                        color: 'white',
                        '&.Mui-checked': {
                          color: customColors.aqua,
                          '& + .MuiSwitch-track': {
                            backgroundColor: alpha(customColors.aqua, 0.5),
                            opacity: 1,
                          },
                        },
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        opacity: 1,
                      },
                      '& .MuiSwitch-thumb': {
                        boxShadow: '0 0 8px rgba(0, 0, 0, 0.5)',
                      },
                    }}
                  />
                  
                  {/* Savings pill */}
                  {isAnnual && (
                    <Chip
                      label="Save 15%"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -22,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: customColors.brightPurple,
                        color: '#fff',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                        '& .MuiChip-label': {
                          px: 1,
                        },
                        fontSize: '0.7rem',
                      }}
                    />
                  )}
                </Box>
                
                <Typography 
                  variant="subtitle1" 
                  sx={{
                    color: isAnnual ? '#fff' : 'rgba(255, 255, 255, 0.7)',
                    fontWeight: isAnnual ? 'medium' : 'normal',
                  }}
                >
                  Annual
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      {/* Pricing Plans Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 12 },
          background: customColors.darkBlue,
          position: 'relative',
          mt: { xs: -6, sm: -8, md: -10 },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >            
            <Grid container spacing={3} justifyContent="center">
              {pricingPlans.map((plan) => (
                <Grid item xs={12} sm={6} md={4} key={plan.id}>
                  <motion.div variants={itemAnimation}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        background: 'rgba(20, 24, 60, 0.3)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: plan.popular 
                          ? alpha(plan.color, 0.4)
                          : 'rgba(122, 184, 255, 0.15)',
                        boxShadow: plan.popular 
                          ? `0 20px 40px ${alpha(plan.color, 0.3)}`
                          : '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transform: plan.popular ? 'scale(1.05)' : 'none',
                        position: 'relative',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': {
                          transform: plan.popular ? 'scale(1.07)' : 'scale(1.02)',
                          boxShadow: plan.popular 
                            ? `0 25px 50px ${alpha(plan.color, 0.4)}`
                            : '0 20px 40px rgba(0, 0, 0, 0.3)',
                        },
                        zIndex: plan.popular ? 2 : 1,
                      }}
                    >
                      {/* Popular badge */}
                      {plan.popular && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 15,
                            right: -35,
                            transform: 'rotate(45deg)',
                            bgcolor: plan.color,
                            color: '#fff',
                            py: 0.5,
                            px: 4,
                            width: 150,
                            textAlign: 'center',
                            boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                            fontWeight: 'bold',
                            fontSize: '0.75rem',
                            letterSpacing: 1,
                            zIndex: 3,
                          }}
                        >
                          MOST POPULAR
                        </Box>
                      )}

                      {/* Top gradient bar */}
                      <Box 
                        sx={{ 
                          height: '5px', 
                          width: '100%', 
                          background: `linear-gradient(to right, ${plan.color}, ${alpha(plan.color, 0.5)})`,
                        }} 
                      />
                      
                      {/* Plan header */}
                      <CardContent sx={{ p: 3, pb: 1 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: '12px',
                              background: plan.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: `0 8px 16px ${alpha(plan.color, 0.2)}`,
                              color: plan.color,
                              border: '1px solid',
                              borderColor: alpha(plan.color, 0.2),
                            }}
                          >
                            {React.cloneElement(plan.icon, { size: 28 })}
                          </Box>
                          <Typography 
                            variant="h5" 
                            component="h2" 
                            fontWeight={700}
                            color="#fff"
                          >
                            {plan.name}
                          </Typography>
                        </Box>
                        
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'rgba(255, 255, 255, 0.8)',
                            height: 40,
                            mb: 2,
                          }}
                        >
                          {plan.description}
                        </Typography>
                        
                        <Box sx={{ mt: 2, mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                            <Typography 
                              variant="h3" 
                              component="span" 
                              fontWeight={800}
                              sx={{ color: '#fff' }}
                            >
                              ${isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice}
                            </Typography>
                            <Typography 
                              variant="subtitle1" 
                              component="span" 
                              sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              /mo
                            </Typography>
                          </Box>
                          
                          {isAnnual && plan.annualPrice > 0 && (
                            <Typography variant="caption" color="rgba(255, 255, 255, 0.7)">
                              ${plan.annualPrice} billed annually
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                      
                      {/* Feature list */}
                      <CardContent sx={{ px: 3, py: 1, flexGrow: 1 }}>
                        <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                        <Box sx={{ mb: 2 }}>
                          {plan.features.map((feature, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 1.5,
                                borderBottom: idx !== plan.features.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                              }}
                            >
                              {feature.included ? (
                                <CheckIcon 
                                  size={18} 
                                  style={{ 
                                    color: plan.color,
                                    marginRight: 12,
                                    flexShrink: 0,
                                  }} 
                                />
                              ) : (
                                <CloseIcon 
                                  size={18} 
                                  style={{ 
                                    color: 'rgba(255, 255, 255, 0.5)',
                                    marginRight: 12,
                                    flexShrink: 0,
                                  }} 
                                />
                              )}
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: feature.included 
                                    ? 'rgba(255, 255, 255, 0.9)' 
                                    : 'rgba(255, 255, 255, 0.5)',
                                  fontWeight: feature.included ? 500 : 'normal',
                                }}
                              >
                                {feature.text}
                              </Typography>
                            </Box>
                          ))}
                        </Box>
                      </CardContent>
                      
                      {/* Call to action */}
                      <CardActions sx={{ px: 3, pb: 3, pt: 1 }}>
                        <Button
                          variant={plan.popular ? "contained" : "outlined"}
                          fullWidth
                          size="large"
                          sx={{
                            py: 1.5,
                            borderRadius: '12px',
                            color: plan.popular ? '#fff' : plan.color,
                            bgcolor: plan.popular ? plan.color : 'transparent',
                            borderColor: plan.color,
                            fontWeight: 600,
                            '&:hover': {
                              bgcolor: plan.popular ? alpha(plan.color, 0.9) : alpha(plan.color, 0.1),
                              borderColor: plan.color,
                            }
                          }}
                        >
                          {plan.id === 'free' ? 'Get Started' : 'Choose Plan'}
                        </Button>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Features Included Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${customColors.nightPurple} 0%, ${customColors.darkBlue} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '10%', 
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
            width: '400px', 
            height: '400px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(80px)',
            zIndex: 0,
          }} 
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 2, color: '#fff' }}
              >
                What's Included in Every Plan
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto', 
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Core features available across all our plans
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {[
                {
                  title: 'PDF to JPG Conversion',
                  description: 'Convert PDF pages to high-quality JPG images',
                  icon: <Image />,
                  color: customColors.aqua,
                },
                {
                  title: 'JPG to PDF Conversion',
                  description: 'Create PDF documents from your image files',
                  icon: <FileTextIcon />,
                  color: customColors.brightPurple,
                },
                {
                  title: 'Basic PDF Editing',
                  description: 'Add text, images, and make basic edits to your PDF',
                  icon: <EditIcon />,
                  color: customColors.lightAqua,
                },
                {
                  title: 'Basic Watermarking',
                  description: 'Add text or image watermarks to your documents',
                  icon: <FileTextIcon />,
                  color: customColors.brightPurple,
                },
                {
                  title: 'PDF Signing',
                  description: 'Add digital signatures to your documents',
                  icon: <EditIcon />,
                  color: customColors.aqua,
                },
                {
                  title: 'PDF Unlocking',
                  description: 'Remove password protection from PDF files',
                  icon: <UnlockIcon />,
                  color: customColors.lightAqua,
                },
              ].map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      background: 'rgba(20, 24, 60, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: alpha(feature.color, 0.3),
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: alpha(feature.color, 0.15),
                            color: feature.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          {React.cloneElement(feature.icon, { size: 24 })}
                        </Box>
                        <Typography 
                          variant="h6" 
                          component="h3" 
                          fontWeight={600}
                          color="#fff"
                        >
                          {feature.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.8)" sx={{ pl: 7 }}>
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Compare Plans Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          bgcolor: customColors.darkBlue,
          color: '#fff',
          backgroundImage: 'radial-gradient(circle at 20% 70%, rgba(91, 14, 139, 0.15) 0%, rgba(10, 17, 58, 0.05) 50%)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 2 }}
              >
                Compare Plans
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto', 
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Find the perfect plan for your needs
              </Typography>
            </Box>
            
            <Card
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                background: 'rgba(20, 24, 60, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'rgba(122, 184, 255, 0.15)',
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Box sx={{ width: '100%', overflowX: 'auto' }}>
                <Box sx={{ minWidth: 800, p: { xs: 2, md: 3 } }}>
                  {/* Table header */}
                  <Grid container sx={{ mb: 2, pb: 2, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <Grid item xs={4}>
                      <Typography variant="subtitle1" fontWeight={600} color="#fff">
                        Feature
                      </Typography>
                    </Grid>
                    {pricingPlans.map((plan) => (
                      <Grid item xs={2.67} key={plan.id} sx={{ textAlign: 'center' }}>
                        <Typography 
                          variant="subtitle1" 
                          fontWeight={600} 
                          sx={{ color: plan.color }}
                        >
                          {plan.name}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {/* Table rows */}
                  {[
                    { feature: 'PDF to JPG Conversion', free: true, pro: true, business: true },
                    { feature: 'JPG to PDF Conversion', free: true, pro: true, business: true },
                    { feature: 'Basic Editing', free: 'Limited', pro: true, business: true },
                    { feature: 'Advanced Editing', free: false, pro: true, business: true },
                    { feature: 'PDF Cropping', free: true, pro: true, business: true },
                    { feature: 'File Size Limit', free: '15MB', pro: '100MB', business: '500MB' },
                    { feature: 'Digital Signatures', free: 'Basic', pro: 'Advanced', business: 'Advanced' },
                    { feature: 'Watermarking', free: 'Basic', pro: 'Advanced', business: 'Custom' },
                    { feature: 'File Uploads per Day', free: '5', pro: 'Unlimited', business: 'Unlimited' },
                    { feature: 'PDF Encryption', free: false, pro: true, business: true },
                    { feature: 'API Access', free: false, pro: false, business: true },
                    { feature: 'Team Management', free: false, pro: false, business: true },
                    { feature: 'Cloud Storage', free: false, pro: '5GB', business: '50GB' },
                    { feature: 'Customer Support', free: 'Community', pro: 'Email', business: 'Priority' },
                    { feature: 'Ad-free Experience', free: false, pro: true, business: true },
                  ].map((row, index) => (
                    <Grid 
                      container 
                      key={index} 
                      sx={{ 
                        py: 1.5,
                        borderBottom: index !== 14 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.03)',
                        },
                      }}
                    >
                      <Grid item xs={4}>
                        <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                          {row.feature}
                        </Typography>
                      </Grid>
                      <Grid item xs={2.67} sx={{ textAlign: 'center' }}>
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <CheckIcon size={18} color={customColors.aqua} />
                          ) : (
                            <CloseIcon size={18} color="rgba(255, 255, 255, 0.5)" />
                          )
                        ) : (
                          <Typography 
                            variant="body2" 
                            sx={{ color: row.free === 'Limited' || row.free === 'Basic' ? customColors.aqua : 'rgba(255, 255, 255, 0.9)' }}
                          >
                            {row.free}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={2.67} sx={{ textAlign: 'center' }}>
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? (
                            <CheckIcon size={18} color={customColors.brightPurple} />
                          ) : (
                            <CloseIcon size={18} color="rgba(255, 255, 255, 0.5)" />
                          )
                        ) : (
                          <Typography 
                            variant="body2" 
                            sx={{ color: row.pro === 'Limited' || row.pro === 'Basic' ? customColors.brightPurple : 'rgba(255, 255, 255, 0.9)' }}
                          >
                            {row.pro}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={2.67} sx={{ textAlign: 'center' }}>
                        {typeof row.business === 'boolean' ? (
                          row.business ? (
                            <CheckIcon size={18} color={customColors.deepPurple} />
                          ) : (
                            <CloseIcon size={18} color="rgba(255, 255, 255, 0.5)" />
                          )
                        ) : (
                          <Typography 
                            variant="body2" 
                            sx={{ color: row.business === 'Limited' || row.business === 'Basic' ? customColors.deepPurple : 'rgba(255, 255, 255, 0.9)' }}
                          >
                            {row.business}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  ))}
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
      
      {/* FAQ Section */}
      <Box 
        sx={{
          py: { xs: 6, md: 10 },
          background: `linear-gradient(135deg, ${customColors.darkBlue} 0%, ${customColors.nightPurple} 100%)`,
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '20%', 
            right: '10%', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.1)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(70px)',
            zIndex: 0,
          }} 
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 2, color: '#fff' }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  maxWidth: 700, 
                  mx: 'auto', 
                  fontWeight: 'normal',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Have more questions? Contact our support team
              </Typography>
            </Box>
            
            <Grid container spacing={3}>
              {faqItems.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: 'rgba(20, 24, 60, 0.3)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.1)',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                        borderColor: 'rgba(122, 184, 255, 0.2)',
                      }
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        fontWeight={600} 
                        sx={{ 
                          mb: 2, 
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Box 
                          sx={{ 
                            mr: 2, 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: alpha(customColors.aqua, 0.2),
                            color: customColors.aqua,
                            fontSize: '0.75rem',
                            fontWeight: 'bold',
                            flexShrink: 0,
                          }}
                        >
                          Q
                        </Box>
                        {item.question}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          ml: 5,
                        }}
                      >
                        {item.answer}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Call to Action with Advanced Glassmorphism */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          background: `linear-gradient(45deg, ${customColors.darkBlue} 0%, ${customColors.deepPurple} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            right: 0, 
            width: '100%', 
            height: '100%', 
            opacity: 0.05,
            background: 'url(/images/pattern.svg)',
            backgroundSize: 'cover',
            zIndex: 0,
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '10%', 
            right: '5%', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(80px)',
            zIndex: 0,
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: '10%', 
            left: '5%', 
            width: '200px', 
            height: '200px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, rgba(162, 57, 255, 0.15) 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(70px)',
            zIndex: 0,
          }} 
        />
      
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Paper
              elevation={0}
              sx={{
                borderRadius: 5,
                overflow: 'hidden',
                background: 'rgba(17, 25, 68, 0.3)',
                backdropFilter: 'blur(20px)',
                border: '1px solid',
                borderColor: 'rgba(122, 184, 255, 0.15)',
                p: { xs: 3, md: 5 },
                position: 'relative',
                textAlign: 'center',
              }}
            >
              {/* Glowing border effect */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: `linear-gradient(to right, ${customColors.aqua}, ${customColors.brightPurple}, ${customColors.aqua})`,
                  backgroundSize: '200% 100%',
                  animation: 'gradientFlow 5s infinite linear',
                  boxShadow: `0 0 20px ${customColors.aqua}`,
                  '@keyframes gradientFlow': {
                    '0%': { backgroundPosition: '0% 0%' },
                    '100%': { backgroundPosition: '200% 0%' },
                  }
                }}
              />
              
              {/* Gift box icon */}
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '20px',
                  background: `linear-gradient(135deg, ${alpha(customColors.aqua, 0.3)}, ${alpha(customColors.brightPurple, 0.3)})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  border: '1px solid',
                  borderColor: 'rgba(122, 184, 255, 0.2)',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                }}
              >
                <GiftIcon size={40} color={customColors.lightAqua} />
              </Box>
              
              <Typography
                variant="h3"
                fontWeight={700}
                color="white"
                sx={{ mb: 3 }}
              >
                Start Your Free Trial Today
              </Typography>
              
              <Typography
                variant="h6"
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255, 255, 255, 0.9)', 
                  fontWeight: 'normal',
                  maxWidth: 700,
                  mx: 'auto',
                }}
              >
                Try any paid plan free for 7 days. No credit card required.
                Experience all our premium features with no limitations.
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
                    px: 5,
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
                  Start Free Trial
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/contact')}
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
                  Contact Sales
                </Button>
              </Stack>
              
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  mt: 3, 
                  color: 'rgba(255, 255, 255, 0.7)',
                }}
              >
                No commitments. Cancel anytime.
              </Typography>
            </Paper>
          </motion.div>
        </Container>
      </Box>
      
     
    </>
  );
};

// Missing Icon Components
const FileIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
    <polyline points="13 2 13 9 20 9"></polyline>
  </svg>
);

// const Users = (props) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={props.size || 24}
//     height={props.size || 24}
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
//     <circle cx="9" cy="7" r="4"></circle>
//     <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
//     <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
//   </svg>
// );

export default PricingPage;