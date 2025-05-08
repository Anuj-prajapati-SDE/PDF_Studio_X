import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Divider,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  styled,
  alpha,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { 
  Check as CheckIcon,
  X as XIcon,
  Award as AwardIcon,
  Zap as ZapIcon,
  Shield as ShieldIcon,
  HelpCircle as HelpCircleIcon,
  MessageCircle as MessageCircleIcon,
  Clock as ClockIcon,
  Download as DownloadIcon,
  ChevronDown as ChevronDownIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

// Styled switch for billing period toggle
const BillingSwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 32,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(26px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
        border: 0,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 24,
    height: 24,
    borderRadius: '50%',
    boxShadow: '0 2px 4px 0 rgba(0, 35, 11, 0.2)',
  },
  '& .MuiSwitch-track': {
    borderRadius: 32,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[400],
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const PricingPage = () => {
  const theme = useTheme();
  const [isYearly, setIsYearly] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(false);
  
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
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

  // Pricing plans data
  const pricingPlans = [
    {
      name: 'Free',
      description: 'Basic PDF tools for personal use',
      price: {
        monthly: 0,
        yearly: 0,
      },
      features: [
        { text: 'Basic PDF tools', included: true },
        { text: 'Process up to 3 files daily', included: true },
        { text: 'File size up to 10MB', included: true },
        { text: 'Standard processing speed', included: true },
        { text: 'Community support', included: true },
        { text: 'Advanced security options', included: false },
        { text: 'API access', included: false },
        { text: 'Priority support', included: false },
      ],
      highlight: false,
      buttonText: 'Get Started',
      color: theme.palette.grey[700],
      bgColor: 'transparent',
    },
    {
      name: 'Pro',
      description: 'Advanced features for professionals',
      price: {
        monthly: 9.99,
        yearly: 7.99,
      },
      features: [
        { text: 'All Free features', included: true },
        { text: 'Unlimited files', included: true },
        { text: 'File size up to 100MB', included: true },
        { text: '2x faster processing', included: true },
        { text: 'Advanced security options', included: true },
        { text: 'Email support', included: true },
        { text: 'API access (1000 calls/month)', included: true },
        { text: 'Priority support', included: false },
      ],
      highlight: true,
      popular: true,
      buttonText: 'Get Pro',
      color: theme.palette.primary.main,
      bgColor: alpha(theme.palette.primary.main, 0.03),
    },
    {
      name: 'Business',
      description: 'Enterprise-grade PDF solution',
      price: {
        monthly: 24.99,
        yearly: 19.99,
      },
      features: [
        { text: 'All Pro features', included: true },
        { text: 'Unlimited files', included: true },
        { text: 'File size up to 1GB', included: true },
        { text: '5x faster processing', included: true },
        { text: 'Enterprise-grade security', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'API access (10,000 calls/month)', included: true },
        { text: 'Priority support 24/7', included: true },
      ],
      highlight: false,
      buttonText: 'Contact Sales',
      color: theme.palette.success.main,
      bgColor: 'transparent',
    },
  ];
  
  // Feature comparison table data
  const featureComparisonData = {
    categories: [
      {
        name: 'Core PDF Tools',
        features: [
          { name: 'Merge PDFs', free: true, pro: true, business: true },
          { name: 'Split PDFs', free: true, pro: true, business: true },
          { name: 'Basic PDF to Image', free: true, pro: true, business: true },
          { name: 'PDF to Word (Basic)', free: true, pro: true, business: true },
          { name: 'Advanced PDF to Word', free: false, pro: true, business: true },
          { name: 'Advanced PDF to Image', free: false, pro: true, business: true },
          { name: 'OCR Technology', free: false, pro: true, business: true },
          { name: 'Digital Signatures', free: false, pro: false, business: true },
        ]
      },
      {
        name: 'Security & Privacy',
        features: [
          { name: 'Basic PDF Encryption', free: true, pro: true, business: true },
          { name: 'Advanced Encryption', free: false, pro: true, business: true },
          { name: 'Password Protection', free: true, pro: true, business: true },
          { name: 'Permission Controls', free: false, pro: true, business: true },
          { name: 'HIPAA Compliance', free: false, pro: false, business: true },
          { name: 'Data Retention Controls', free: false, pro: false, business: true },
        ]
      },
      {
        name: 'Support & Resources',
        features: [
          { name: 'Community Support', free: true, pro: true, business: true },
          { name: 'Email Support', free: false, pro: true, business: true },
          { name: 'Live Chat Support', free: false, pro: true, business: true },
          { name: 'Phone Support', free: false, pro: false, business: true },
          { name: 'Dedicated Account Manager', free: false, pro: false, business: true },
          { name: 'Training Sessions', free: false, pro: false, business: true },
        ]
      },
    ]
  };
  
  // FAQ items
  const faqItems = [
    {
      question: "Can I upgrade or downgrade my plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll immediately get access to all the new features. If you downgrade, your current plan will continue until the end of the billing cycle."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with our service within the first 30 days, contact support for a full refund."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards including Visa, MasterCard, American Express, and Discover. We also support PayPal payments."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. We use bank-level encryption to protect your data and documents. Our security practices include secure data transmission, regular security audits, and strict access controls."
    },
    {
      question: "Do I need to install anything?",
      answer: "No, our service is entirely web-based. You don't need to install any software to use PDF Utility."
    },
    {
      question: "Can I use the service on mobile devices?",
      answer: "Yes, PDF Utility is fully responsive and works on all modern browsers, including those on mobile devices."
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div variants={itemVariants}>
            <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', mb: 5, fontWeight: 400 }}>
              Choose the perfect plan for your PDF needs. All plans include our core features with no hidden fees.
            </Typography>
            
            {/* Billing Period Toggle */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body1" color={!isYearly ? 'primary' : 'text.secondary'} fontWeight={!isYearly ? 600 : 400}>
                Monthly
              </Typography>
              <BillingSwitch
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                inputProps={{ 'aria-label': 'billing period switch' }}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" color={isYearly ? 'primary' : 'text.secondary'} fontWeight={isYearly ? 600 : 400}>
                  Yearly
                </Typography>
                <Chip
                  label="Save 20%"
                  size="small"
                  color="secondary"
                  sx={{
                    ml: 1,
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    height: 22,
                  }}
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
        
        {/* Pricing Plans */}
        <Box sx={{ mb: 10 }}>
          <Grid container spacing={3} alignItems="stretch">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={plan.name}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <Card 
                    elevation={plan.highlight ? 8 : 0}
                    sx={{ 
                      borderRadius: 4, 
                      py: 4,
                      px: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'visible',
                      border: !plan.highlight ? '1px solid' : 'none',
                      borderColor: 'divider',
                      transform: plan.highlight ? 'scale(1.05)' : 'none',
                      zIndex: plan.highlight ? 2 : 1,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      bgcolor: plan.bgColor,
                      '&:hover': {
                        boxShadow: plan.highlight ? '0 20px 40px rgba(0, 0, 0, 0.12)' : '0 10px 30px rgba(0, 0, 0, 0.08)',
                        transform: plan.highlight ? 'scale(1.05)' : 'translateY(-5px)',
                      },
                    }}
                  >
                    {plan.popular && (
                      <Chip
                        label="Most Popular"
                        color="primary"
                        size="small"
                        sx={{
                          position: 'absolute',
                          top: -12,
                          right: 24,
                          fontWeight: 600,
                          px: 1,
                        }}
                      />
                    )}
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        fontWeight={700}
                        color={plan.color}
                        gutterBottom
                      >
                        {plan.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {plan.description}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography 
                          variant="h3" 
                          component="span" 
                          fontWeight={700}
                          sx={{ mr: 1 }}
                        >
                          ${isYearly ? plan.price.yearly : plan.price.monthly}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {plan.price.monthly > 0 ? '/month' : ''}
                        </Typography>
                      </Box>
                      {isYearly && plan.price.yearly > 0 && (
                        <Typography variant="body2" color="text.secondary">
                          billed annually (${plan.price.yearly * 12}/year)
                        </Typography>
                      )}
                    </Box>
                    
                    <Divider sx={{ my: 3 }} />
                    
                    <Box sx={{ mb: 4, flexGrow: 1 }}>
                      <List dense disablePadding>
                        {plan.features.map((feature, featureIndex) => (
                          <ListItem 
                            key={featureIndex} 
                            disablePadding 
                            sx={{ 
                              mb: 1.5,
                              opacity: feature.included ? 1 : 0.5,
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 30 }}>
                              {feature.included ? (
                                <CheckIcon 
                                  size={18} 
                                  color={plan.highlight ? theme.palette.primary.main : theme.palette.success.main} 
                                />
                              ) : (
                                <XIcon size={18} color={theme.palette.text.disabled} />
                              )}
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature.text} 
                              primaryTypographyProps={{ 
                                variant: 'body2', 
                                fontWeight: feature.included ? 500 : 400 
                              }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    
                    <Button
                      variant={plan.highlight ? "contained" : "outlined"}
                      color={plan.highlight ? "primary" : "inherit"}
                      fullWidth
                      size="large"
                      component={RouterLink}
                      to={plan.name === 'Free' ? "/tools/merge-pdf" : "#"}
                      sx={{ 
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 600,
                        borderWidth: plan.highlight ? 0 : 2,
                        borderColor: plan.name === 'Business' ? plan.color : undefined,
                        color: plan.highlight ? 'white' : (plan.name === 'Business' ? plan.color : undefined),
                      }}
                    >
                      {plan.buttonText}
                    </Button>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
        
        {/* Feature Comparison */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 10 }}>
            <Typography variant="h4" component="h2" fontWeight={700} align="center" gutterBottom>
              Feature Comparison
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
              Compare our plans to find the right one for your needs
            </Typography>
            
            <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <TableCell sx={{ fontWeight: 600 }}>Feature</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Free</TableCell>
                    <TableCell 
                      align="center" 
                      sx={{ 
                        fontWeight: 600, 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    >
                      Pro
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 600 }}>Business</TableCell>
                  </TableRow>
                </TableHead>
                
                <TableBody>
                  {featureComparisonData.categories.map((category) => [
                    <TableRow key={`cat-${category.name}`} sx={{ bgcolor: alpha(theme.palette.grey[200], 0.5) }}>
                      <TableCell colSpan={4} sx={{ fontWeight: 600 }}>
                        {category.name}
                      </TableCell>
                    </TableRow>,
                    
                    ...category.features.map((feature, featureIdx) => (
                      <TableRow 
                        key={`feat-${category.name}-${featureIdx}`}
                        sx={{ 
                          '&:last-child td, &:last-child th': { border: 0 },
                          '&:nth-of-type(even)': { bgcolor: alpha(theme.palette.grey[50], 0.5) },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {feature.name}
                        </TableCell>
                        <TableCell align="center">
                          {feature.free ? 
                            <CheckIcon size={18} color={theme.palette.success.main} /> : 
                            <XIcon size={18} color={theme.palette.text.disabled} />
                          }
                        </TableCell>
                        <TableCell 
                          align="center"
                          sx={{ bgcolor: alpha(theme.palette.primary.main, 0.03) }}
                        >
                          {feature.pro ? 
                            <CheckIcon size={18} color={theme.palette.primary.main} /> : 
                            <XIcon size={18} color={theme.palette.text.disabled} />
                          }
                        </TableCell>
                        <TableCell align="center">
                          {feature.business ? 
                            <CheckIcon size={18} color={theme.palette.success.main} /> : 
                            <XIcon size={18} color={theme.palette.text.disabled} />
                          }
                        </TableCell>
                      </TableRow>
                    ))
                  ])}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </motion.div>
        
        {/* Testimonials */}
        <motion.div variants={itemVariants}>
          <Box 
            sx={{ 
              mb: 10, 
              py: 8, 
              px: { xs: 2, sm: 6 }, 
              borderRadius: 4,
              bgcolor: alpha(theme.palette.primary.main, 0.03),
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decorations */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 200,
                height: 200,
                backgroundImage: 'radial-gradient(circle, rgba(67, 97, 238, 0.1) 0%, rgba(67, 97, 238, 0) 70%)',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -50,
                left: -50,
                width: 200,
                height: 200,
                backgroundImage: 'radial-gradient(circle, rgba(67, 97, 238, 0.05) 0%, rgba(67, 97, 238, 0) 70%)',
                borderRadius: '50%',
              }}
            />
            
            <Typography variant="h4" component="h2" fontWeight={700} align="center" gutterBottom>
              What Our Customers Say
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 6 }}>
              Join thousands of satisfied users who love our PDF tools
            </Typography>
            
            <Grid container spacing={4}>
              {[
                {
                  quote: "PDF Utility Pro has transformed our workflow. What used to take hours now takes minutes. The batch processing features alone are worth the subscription.",
                  author: "Sarah Johnson",
                  title: "Marketing Manager at TechCorp",
                  plan: "Business Plan",
                },
                {
                  quote: "As a student, the free plan gives me everything I need for my assignments. The interface is intuitive and the tools are reliable.",
                  author: "Michael Chen",
                  title: "Graduate Student",
                  plan: "Free Plan",
                },
                {
                  quote: "The Pro plan hits the sweet spot for our small business. We get all the essential features at a reasonable price, and the customer support is excellent.",
                  author: "Emily Rodriguez",
                  title: "Freelance Graphic Designer",
                  plan: "Pro Plan",
                },
              ].map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: 3,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box sx={{ mb: 2, display: 'flex' }}>
                      {[...Array(5)].map((_, i) => (
                        <AwardIcon 
                          key={i} 
                          size={16} 
                          color={theme.palette.warning.main}
                          style={{ marginRight: 4 }}
                        />
                      ))}
                    </Box>
                    
                    <Typography 
                      variant="body1" 
                      component="p" 
                      gutterBottom
                      sx={{ 
                        mb: 'auto',
                        fontStyle: 'italic',
                        lineHeight: 1.6,
                      }}
                    >
                      "{testimonial.quote}"
                    </Typography>
                    
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" fontWeight={600}>
                        {testimonial.author}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        {testimonial.title}
                      </Typography>
                      <Chip 
                        label={testimonial.plan} 
                        size="small" 
                        color="primary"
                        sx={{ mt: 1, fontWeight: 500, height: 24 }}
                        variant="outlined"
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
        
        {/* FAQ */}
        <motion.div variants={itemVariants}>
          <Box sx={{ mb: 10 }}>
            <Typography variant="h4" component="h2" fontWeight={700} align="center" gutterBottom>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 5, maxWidth: 700, mx: 'auto' }}>
              Find answers to common questions about our pricing and plans
            </Typography>
            
            <Grid container spacing={3}>
              {faqItems.map((faq, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Accordion
                    expanded={expandedFaq === `faq-${index}`}
                    onChange={handleAccordionChange(`faq-${index}`)}
                    disableGutters
                    elevation={0}
                    sx={{
                      mb: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '10px !important',
                      '&:before': {
                        display: 'none',
                      },
                      '&.Mui-expanded': {
                        margin: 0,
                        borderColor: 'primary.main',
                      },
                      overflow: 'hidden',
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDownIcon size={18} />}
                      sx={{
                        px: 3,
                        py: 1.5,
                        bgcolor: expandedFaq === `faq-${index}` ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <HelpCircleIcon 
                          size={18} 
                          color={theme.palette.primary.main}
                          style={{ marginRight: 12 }}
                        />
                        <Typography variant="subtitle1" fontWeight={600}>
                          {faq.question}
                        </Typography>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 3, pt: 0 }}>
                      <Typography variant="body2" color="text.secondary">
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              ))}
            </Grid>
          </Box>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div variants={itemVariants}>
          <Box
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 4,
              backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              mb: 6,
            }}
          >
            {/* Background decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '15rem',
                height: '15rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                width: '10rem',
                height: '10rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
              }}
            />
            
            <Typography 
              variant="h3" 
              fontWeight={700} 
              sx={{ mb: 3 }}
            >
              Start Using PDF Utility Today
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, maxWidth: 700, mx: 'auto' }}>
              Begin with our free plan or try Pro features with a 14-day trial. No credit card required.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to="/tools/merge-pdf"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  borderRadius: '50px',
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Try PDF Utility Free
              </Button>
              <Button
                variant="outlined"
                size="large"
                component={RouterLink}
                to="/contact"
                sx={{
                  borderRadius: '50px',
                  px: 6,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white',
                  },
                }}
              >
                Contact Sales
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </motion.div>
  );
};

export default PricingPage;