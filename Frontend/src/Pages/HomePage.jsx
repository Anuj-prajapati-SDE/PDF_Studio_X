import React, { useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  Chip,
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import Lottie from 'lottie-react';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SecurityIcon from '@mui/icons-material/Security';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

// Sample hero animation data
const heroAnimationData = {
  v: "5.7.8",
  fr: 30,
  ip: 0,
  op: 180,
  w: 1200,
  h: 1200,
  assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: "PDF Document", sr: 1, ks: {},
    shapes: [{ ty: 'rc', d: 1, s: { a: 0, k: [800, 1000] }, p: { a: 0, k: [0, 0] }, r: { a: 0, k: 20 } }]
  }]
};

// Sample testimonials
const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Marketing Manager',
    company: 'Acme Inc.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    quote: 'PDF Utility has transformed how our team handles documents. The merge feature alone saves us hours each week!',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Financial Analyst',
    company: 'Global Finance',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    quote: 'Secure, fast, and reliable. I use PDF Utility daily for converting sensitive financial documents.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Graphic Designer',
    company: 'Creative Studios',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    quote: 'The image to PDF conversion is flawless. Best tool I ve found for maintaining design quality in PDFs.',
    rating: 4,
  },
  {
    name: 'David Wilson',
    role: 'Legal Consultant',
    company: 'Wilson & Partners',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    quote: 'The security features give me peace of mind when handling confidential client documents. Excellent service!',
    rating: 5,
  },
];

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  
  // Animation hooks
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };
  
  const fadeInUpVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };
  
  const tools = [
    {
      title: 'Merge PDF',
      description: 'Combine multiple PDFs into a single document',
      icon: <MergeTypeIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/merge-pdf',
      color: theme.palette.info.main,
    },
    {
      title: 'Split PDF',
      description: 'Extract individual pages from a PDF file',
      icon: <CallSplitIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/split-pdf',
      color: theme.palette.warning.main,
    },
    {
      title: 'Convert PDF',
      description: 'Transform PDFs to other formats and back',
      icon: <CompareArrowsIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/convert-pdf',
      color: theme.palette.success.main,
    },
    {
      title: 'Create PDF',
      description: 'Generate new PDF documents from scratch',
      icon: <TextSnippetIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/create-pdf',
      color: theme.palette.secondary.main,
    },
    {
      title: 'Protect PDF',
      description: 'Add password protection to your documents',
      icon: <LockIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/protect-pdf',
      color: theme.palette.error.main,
    },
    {
      title: 'Advanced Editing',
      description: 'Edit content, add watermarks, and more',
      icon: <AutoAwesomeIcon sx={{ fontSize: 40, color: 'white' }} />,
      path: '/tools/edit-pdf',
      color: theme.palette.primary.main,
    },
  ];
  
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
          color: 'white',
          pt: { xs: 10, md: 16 },
          pb: { xs: 14, md: 20 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '30rem',
            height: '30rem',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%',
          }}
        />
        
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                <Typography 
                  component="h1" 
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    mb: 3,
                    fontSize: { xs: '2.5rem', sm: '3.2rem', md: '3.8rem' },
                    lineHeight: 1.1,
                  }}
                >
                  Advanced PDF Solutions
                  <Box component="span" sx={{ display: 'block', color: '#7df9ff', textShadow: '0 0 30px rgba(125, 249, 255, 0.5)' }}>
                    Made Simple
                  </Box>
                </Typography>
                
                <Typography 
                  variant="h6"
                  sx={{ 
                    mb: 5, 
                    opacity: 0.8,
                    fontWeight: 400,
                    maxWidth: 500,
                    lineHeight: 1.6,
                  }}
                >
                  Transform, edit, and secure your documents with our powerful all-in-one PDF toolkit. No software installation required.
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={RouterLink}
                    to="/tools/merge-pdf"
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        bgcolor: '#f0f0f0',
                      },
                      boxShadow: '0 5px 15px rgba(255, 255, 255, 0.2)',
                    }}
                    startIcon={<CloudUploadIcon />}
                  >
                    Try Now - It's Free
                  </Button>
                  
                  <Button
                    variant="outlined"
                    size="large"
                    color="inherit"
                    component={RouterLink}
                    to="/about"
                    sx={{
                      borderRadius: '50px',
                      px: 4,
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        borderColor: 'white',
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 6 }}>
                  <Stack direction="row" spacing={-1}>
                    {[...Array(5)].map((_, i) => (
                      <Avatar
                        key={i}
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                        sx={{
                          width: 36,
                          height: 36,
                          border: '2px solid white',
                          backgroundColor: 'primary.main',
                        }}
                      />
                    ))}
                  </Stack>
                  <Box>
                    <Typography variant="body1" fontWeight={600} sx={{ lineHeight: 1.2 }}>
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                      >
                        <CountUp end={50000} separator="," /> +
                      </motion.span> Happy Users
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      {[...Array(5)].map((_, i) => (
                        <Box
                          key={i}
                          component="span"
                          sx={{
                            color: '#FFD700',
                            display: 'inline-block',
                            fontSize: '0.8rem',
                          }}
                        >
                          ★
                        </Box>
                      ))}
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        4.9/5 rating
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.3,
                    ease: [0, 0.71, 0.2, 1.01],
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: { xs: 300, sm: 400, md: 480 },
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Lottie animationData={heroAnimationData} loop={true} style={{ width: '100%', height: '100%' }} />
                    
                    {/* Document Mockups */}
                    <Box
                      component={motion.div}
                      initial={{ y: -10 }}
                      animate={{ y: 10 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 3,
                        ease: 'easeInOut',
                      }}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-5deg)',
                        width: '70%',
                        height: '80%',
                        backgroundColor: 'white',
                        borderRadius: 3,
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Box sx={{ bgcolor: '#FF5F57', width: 12, height: 12, borderRadius: '50%' }} />
                        <Box sx={{ bgcolor: '#FFBD2E', width: 12, height: 12, borderRadius: '50%' }} />
                        <Box sx={{ bgcolor: '#28CA42', width: 12, height: 12, borderRadius: '50%' }} />
                      </Box>
                      <Box sx={{ bgcolor: 'rgba(67, 97, 238, 0.1)', flex: 1, borderRadius: 2, p: 2 }}>
                        <Box
                          component="img"
                          src="/pdf-preview.png"
                          alt="PDF Preview"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </Box>
                    </Box>
                    
                    <Box
                      component={motion.div}
                      initial={{ y: 10 }}
                      animate={{ y: -10 }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 3.5,
                        ease: 'easeInOut',
                        delay: 0.5,
                      }}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-60%, -45%) rotate(5deg)',
                        width: '60%',
                        height: '70%',
                        backgroundColor: '#f8faff',
                        borderRadius: 3,
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                        zIndex: -1,
                      }}
                    />
                  </Box>
                </motion.div>
                
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  sx={{
                    position: 'absolute',
                    top: { xs: '10%', md: '15%' },
                    right: { xs: '10%', md: '15%' },
                    backgroundColor: 'white',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    borderRadius: 3,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Avatar sx={{ bgcolor: 'success.main' }}>
                    <CheckCircleIcon />
                  </Avatar>
                  <Typography variant="body1" color="text.primary" fontWeight={600}>
                    PDF Secured
                  </Typography>
                </Box>
                
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  sx={{
                    position: 'absolute',
                    bottom: { xs: '15%', md: '20%' },
                    left: { xs: '5%', md: '10%' },
                    backgroundColor: 'white',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    borderRadius: 3,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', p: 1, color: 'white' }}>
                    <CloudDoneIcon />
                  </Box>
                  <Typography variant="body1" color="text.primary" fontWeight={600}>
                    100% Complete
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box
            sx={{
              mt: 8,
              p: 3,
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.15)',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <Grid container spacing={3} alignItems="center" justifyContent="center">
              {[
                { label: 'Files Processed', count: '10M+', icon: <PictureAsPdfIcon /> },
                { label: 'Secure Processing', count: '100%', icon: <SecurityIcon /> },
                { label: 'Processing Speed', count: '3x', icon: <SpeedIcon /> },
                { label: 'Device Compatibility', count: 'All', icon: <DevicesIcon /> },
              ].map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.15)',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        mb: 1,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                      {stat.count}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.7 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      
      {/* Wave separator */}
      <Box
        sx={{
          height: 150,
          width: '100%',
          overflow: 'hidden',
          transform: 'translateY(-1px)',
        }}
      >
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          style={{
            width: '100%',
            height: 200,
            transform: 'rotate(180deg)',
            fill: '#4361ee',
          }}
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
          />
        </svg>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="Features"
            color="primary"
            sx={{
              fontWeight: 600,
              px: 2,
              py: 2.5,
              borderRadius: '50px',
              backgroundColor: 'rgba(67, 97, 238, 0.1)',
              color: 'primary.main',
              mb: 3,
            }}
          />
          <Typography
            variant="h2"
            component="h2"
            sx={{ 
              fontWeight: 800,
              mb: 2, 
              background: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Every PDF Tool You Need
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}
          >
            From simple conversions to complex editing, our suite of tools handles it all 
            with unmatched precision and ease.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: 4,
                    p: 3,
                    transition: 'all 0.3s ease',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'visible',
                  }}
                >
                  <Box
                    sx={{
                      width: 70,
                      height: 70,
                      borderRadius: 3,
                      bgcolor: tool.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 10px 20px ${tool.color}30`,
                      mb: 3,
                      transform: 'rotate(-5deg)',
                    }}
                  >
                    {tool.icon}
                  </Box>
                  
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    {tool.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {tool.description}
                  </Typography>
                  
                  <Button
                    variant="text"
                    component={RouterLink}
                    to={tool.path}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ fontWeight: 600, mt: 'auto', color: tool.color }}
                  >
                    Try Now
                  </Button>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.default', py: 12 }}>
        <Container maxWidth="lg">
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Chip
                label="Simple Process"
                color="primary"
                sx={{
                  fontWeight: 600,
                  px: 2,
                  py: 2.5,
                  borderRadius: '50px',
                  backgroundColor: 'rgba(67, 97, 238, 0.1)',
                  color: 'primary.main',
                  mb: 3,
                }}
              />
              <Typography variant="h2" component="h2" fontWeight={800} sx={{ mb: 2 }}>
                How It Works
              </Typography>
              <Typography 
                variant="h6" 
                color="text.secondary" 
                sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}
              >
                Three simple steps to transform your PDFs
              </Typography>
            </Box>
            
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={6} sx={{ display: { xs: 'block', md: 'none' } }}>
                <motion.div variants={fadeInUpVariants}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 400,
                      width: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Box
                      component="img"
                      src="https://source.unsplash.com/random/800x800/?documents,pdf"
                      alt="PDF Workflow"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        Simple, Fast, Secure
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                  {[
                    {
                      number: '01',
                      title: 'Upload Your Files',
                      description: 'Drag & drop your PDFs or select them from your device. We support files up to 50MB.',
                    },
                    {
                      number: '02',
                      title: 'Select Your Tool',
                      description: 'Choose from our wide range of PDF tools to perform the exact operation you need.',
                    },
                    {
                      number: '03',
                      title: 'Download Results',
                      description: 'Once processing is complete, download your transformed PDF files instantly.',
                    },
                  ].map((step, index) => (
                    <motion.div key={index} variants={itemVariants}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
                        <Box
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 3,
                            bgcolor: 'background.paper',
                            border: '2px solid',
                            borderColor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '1.5rem',
                            color: 'primary.main',
                            flexShrink: 0,
                          }}
                        >
                          {step.number}
                        </Box>
                        <Box>
                          <Typography variant="h5" gutterBottom fontWeight={700}>
                            {step.title}
                          </Typography>
                          <Typography variant="body1" color="text.secondary">
                            {step.description}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </Grid>
              
              <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
                <motion.div variants={fadeInUpVariants}>
                  <Box
                    sx={{
                      position: 'relative',
                      height: 500,
                      width: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Box
                      component="img"
                      src="https://source.unsplash.com/random/800x800/?documents,pdf"
                      alt="PDF Workflow"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 3,
                        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h5" fontWeight={600}>
                        Simple, Fast, Secure
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Testimonials Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #f6f9fc 0%, #f1f4f9 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Chip
              label="Testimonials"
              color="primary"
              sx={{
                fontWeight: 600,
                px: 2,
                py: 2.5,
                borderRadius: '50px',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                color: 'primary.main',
                mb: 3,
              }}
            />
            <Typography variant="h2" component="h2" fontWeight={800} sx={{ mb: 2 }}>
              What Our Users Say
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto', fontWeight: 400 }}
            >
              Join thousands of satisfied users who have transformed their document workflows
            </Typography>
          </Box>
          
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Card
                  sx={{
                    mx: 2,
                    my: 4,
                    p: 4,
                    borderRadius: 4,
                    height: 280,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    {[...Array(5)].map((_, i) => (
                      <Box
                        key={i}
                        component="span"
                        sx={{
                          color: i < testimonial.rating ? '#FFD700' : 'grey.300',
                          fontSize: '1.2rem',
                          mr: 0.5,
                        }}
                      >
                        ★
                      </Box>
                    ))}
                  </Box>
                  
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontStyle: 'italic',
                      mb: 'auto',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                    }}
                  >
                    "{testimonial.quote}"
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                    <Avatar
                      src={testimonial.avatar}
                      sx={{ width: 48, height: 48, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.role}, {testimonial.company}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ py: 12 }}>
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: 6,
              background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
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
              fontWeight={800} 
              sx={{ mb: 3, textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)' }}
            >
              Ready to Transform Your PDFs?
            </Typography>
            <Typography variant="h6" sx={{ mb: 5, opacity: 0.9, maxWidth: 600, mx: 'auto' }}>
              Join thousands of users who have streamlined their document workflows with our suite of powerful PDF tools.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/tools/merge-pdf"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                borderRadius: '50px',
                px: 5,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
            >
              Get Started — It's Free
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;