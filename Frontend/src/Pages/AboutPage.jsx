import React, { useState, useEffect } from 'react';
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
  IconButton,
  Tooltip,
  useTheme,
  alpha,
  useMediaQuery,
} from '@mui/material';
import {
  Award as AwardIcon,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User as UserIcon,
  Users as TeamIcon,
  Target as TargetIcon,
  Heart as HeartIcon,
  Compass as CompassIcon,
  Shield as ShieldIcon,
  Star as StarIcon,
  Code as CodeIcon,
  Flag as FlagIcon,
  Eye as EyeIcon,
  Mail as MailIcon,
  MapPin as MapPinIcon,
  Link2 as LinkIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Linkedin as LinkedInIcon,
  Facebook as FacebookIcon,
  GitHub as GitHubIcon,
  ChevronRight as ChevronRightIcon,
  Zap as ZapIcon,
  Globe as GlobeIcon,
  File as FileIcon,
  User,
  Flag,
  Award,
 
} from 'react-feather';
// import  Lightbulb from 'react-feather'
import { motion } from 'framer-motion';
import { Lightbulb, Shield } from '@mui/icons-material';

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

// Team member data
const teamMembers = [
  {
    name: 'Saanvi Agarwal',
    role: 'Founder & CEO',
    avatar: 'https://i.pravatar.cc/300?img=25',
    bio: 'Former Google engineer with 15+ years experience in document processing technologies.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  },
  {
    name: 'David Chen',
    role: 'CTO',
    avatar: 'https://i.pravatar.cc/300?img=11',
    bio: 'PDF standards expert who previously led engineering at Adobe for 8 years.',
    social: {
      linkedin: '#',
      twitter: '#',
      github: '#',
    }
  },
  {
    name: 'Maria Rodriguez',
    role: 'Head of Design',
    avatar: 'https://i.pravatar.cc/300?img=5',
    bio: 'Award-winning UX designer focused on creating intuitive digital experiences for complex tools.',
    social: {
      linkedin: '#',
      twitter: '#',
      dribbble: '#',
    }
  },
  {
    name: 'Jamal Williams',
    role: 'Lead Developer',
    avatar: 'https://i.pravatar.cc/300?img=15',
    bio: 'Full-stack engineer specialized in building secure, efficient web applications.',
    social: {
      linkedin: '#',
      github: '#',
      stackoverflow: '#',
    }
  },
];

// Company timeline
const companyTimeline = [
  {
    year: '2025',
    title: 'International Expansion',
    description: 'Reached users in over 100 countries and introduced support for 20 languages.',
    icon: <FlagIcon size={20} />
  },
  {
    year: '2024',
    title: 'Enterprise Solutions Launch',
    description: 'Introduced secure, scalable enterprise PDF solutions for Fortune 500 companies.',
    icon: <ShieldIcon size={20} />
  },
  {
    year: '2023',
    title: 'Series A Funding',
    description: 'Secured $10M in funding to expand our team and enhance our PDF utilities.',
    icon: <AwardIcon size={20} />
  },
  {
    year: '2022',
    title: 'First 1 Million Users',
    description: 'Reached our first million users milestone with users in over 50 countries.',
    icon: <User size={20} />
  },
  {
    year: '2021',
    title: 'Company Founded',
    description: 'Started with a simple vision: make PDF and document handling accessible to everyone.',
    icon: <Flag size={20} />
  },
];

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  
  // Current date and time
  const currentDateTime = "2025-05-09 10:26:22";
  const username = "Anuj-prajapati-SDE";
  
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
  
  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  const timelineAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Hero Section with Blue/Purple Gradient and Glass Effects */}
      <Box 
        sx={{
          position: 'relative',
          minHeight: { xs: '50vh', md: '70vh' },
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          background: `linear-gradient(135deg, ${customColors.darkBlue} 0%, ${customColors.deepPurple} 70%, ${customColors.nightPurple} 100%)`,
          pt: { xs: 8, md: 0 },
          pb: { xs: 8, md: 10 },
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
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
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
                  OUR STORY
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
                  About PDF Utility
                </Typography>
                
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 4, 
                    maxWidth: 600,
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 'normal',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', md: '1.125rem' },
                  }}
                >
                  We're on a mission to make document handling effortless and accessible to everyone. 
                  Our team of experts is dedicated to building tools that simplify your workflow.
                </Typography>
                
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={3}
                >
                  <Button 
                    variant="contained" 
                    size="large"
                    startIcon={<TeamIcon />}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: '12px',
                      fontSize: '1rem',
                      background: `linear-gradient(135deg, ${customColors.aqua} 0%, ${alpha(customColors.brightPurple, 0.8)} 100%)`,
                      color: '#fff',
                      fontWeight: 600,
                      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)',
                      border: '1px solid',
                      borderColor: alpha(customColors.lightAqua, 0.3),
                      backdropFilter: 'blur(10px)',
                      '&:hover': {
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
                        background: `linear-gradient(135deg, ${customColors.aqua} 20%, ${customColors.brightPurple} 100%)`,
                      }
                    }}
                  >
                    Meet Our Team
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    size="large"
                    endIcon={<ChevronRightIcon />}
                    onClick={() => navigate('/contact')}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: '12px',
                      fontSize: '1rem',
                      borderColor: alpha(customColors.aqua, 0.5),
                      color: customColors.lightAqua,
                      backdropFilter: 'blur(10px)',
                      background: 'rgba(11, 19, 64, 0.2)',
                      '&:hover': {
                        borderColor: customColors.aqua,
                        bgcolor: alpha(customColors.aqua, 0.1),
                      }
                    }}
                  >
                    Contact Us
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleIn}
              >
                {/* Glassmorphic decorative elements */}
                <Box sx={{ position: 'relative', height: 400 }}>
                  {/* Main abstract shape */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      left: '20%',
                      width: 300,
                      height: 300,
                      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                      background: `linear-gradient(135deg, rgba(11, 19, 64, 0.4) 0%, rgba(91, 14, 139, 0.2) 100%)`,
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.2)',
                      backdropFilter: 'blur(15px)',
                      boxShadow: '0 25px 45px rgba(0, 0, 0, 0.2)',
                      animation: 'morphing 20s infinite',
                      '@keyframes morphing': {
                        '0%': {
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        },
                        '25%': {
                          borderRadius: '58% 42% 75% 25% / 76% 46% 54% 24%',
                        },
                        '50%': {
                          borderRadius: '50% 50% 33% 67% / 55% 27% 73% 45%',
                        },
                        '75%': {
                          borderRadius: '33% 67% 58% 42% / 63% 68% 32% 37%',
                        },
                        '100%': {
                          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                        },
                      }
                    }}
                  />
                  
                  {/* Floating icon bubbles with glassmorphism */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '5%',
                      right: '15%',
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(11, 19, 64, 0.1) 100%)`,
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.2)',
                      backdropFilter: 'blur(15px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: customColors.lightAqua,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      animation: 'float 6s infinite ease-in-out',
                      '@keyframes float': {
                        '0%, 100%': { transform: 'translateY(0px)' },
                        '50%': { transform: 'translateY(-20px)' },
                      }
                    }}
                  >
                    <TargetIcon size={28} />
                  </Box>
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '15%',
                      left: '5%',
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, rgba(162, 57, 255, 0.2) 0%, rgba(11, 19, 64, 0.1) 100%)`,
                      border: '1px solid',
                      borderColor: 'rgba(162, 57, 255, 0.2)',
                      backdropFilter: 'blur(15px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: alpha(customColors.brightPurple, 0.9),
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      animation: 'float 7s infinite ease-in-out 1s',
                    }}
                  >
                    <HeartIcon size={32} />
                  </Box>
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '10%',
                      right: '20%',
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(11, 19, 64, 0.05) 100%)`,
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.2)',
                      backdropFilter: 'blur(15px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: customColors.lightAqua,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      animation: 'float 5s infinite ease-in-out 0.5s',
                    }}
                  >
                    <GlobeIcon size={24} />
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Our Mission Section with Dark Theme + Aqua Accents */}
      <Box 
        sx={{
          py: { xs: 8, md: 12 },
          bgcolor: customColors.darkBlue,
          color: '#fff',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Grid container spacing={5} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 300, md: 400 },
                    borderRadius: 4,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'rgba(122, 184, 255, 0.2)',
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <Box
                    component="img"
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    alt="Our team collaborating"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.8) saturate(1.2)',
                    }}
                  />
                  
                  {/* Glassmorphic overlay with mission statement */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      p: 3,
                      background: 'linear-gradient(to top, rgba(11, 19, 64, 0.95), rgba(11, 19, 64, 0))',
                      backdropFilter: 'blur(8px)',
                      borderTop: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.1)',
                    }}
                  >
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: customColors.lightAqua }}>
                      Our Mission
                    </Typography>
                    <Typography variant="body2">
                      To empower individuals and businesses with innovative tools that simplify document handling.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h3" 
                  component="h2" 
                  sx={{ 
                    mb: 3, 
                    fontWeight: 700,
                    background: `linear-gradient(135deg, #FFFFFF 30%, ${customColors.aqua} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Transforming Document Workflows
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Founded in 2021, PDF Utility began with a simple idea: everyone should have access to powerful document tools without needing technical expertise or expensive software.
                </Typography>
                
                <Typography variant="body1" paragraph sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  Our team of engineers, designers, and document specialists work together to build intuitive solutions that help you work more efficiently. From converting PDFs to images, to adding digital signatures and editing documents - we've built everything with your workflow in mind.
                </Typography>
                
                <Box sx={{ mt: 4 }}>
                  <Grid container spacing={3}>
                    {[
                      { 
                        count: '15+',
                        label: 'PDF Tools',
                        icon: <CodeIcon size={20} color={customColors.lightAqua} />
                      },
                      { 
                        count: '5M+',
                        label: 'Users Worldwide',
                        icon: <User size={20} color={customColors.brightPurple} />
                      },
                      { 
                        count: '100+',
                        label: 'Countries Served',
                        icon: <FlagIcon size={20} color={customColors.aqua} />
                      },
                      { 
                        count: '1B+',
                        label: 'Documents Processed',
                        icon: <FileIcon size={20} color={customColors.lightAqua} />
                      },
                    ].map((stat, index) => (
                      <Grid item xs={6} sm={3} key={index}>
                        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 1 }}>
                            {stat.icon}
                            <Typography variant="h4" component="span" fontWeight={700} sx={{ ml: 1, color: '#fff' }}>
                              {stat.count}
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {stat.label}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Our Values Section with Purple/Blue Glassmorphism Cards */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: `linear-gradient(135deg, ${customColors.nightPurple} 0%, ${customColors.darkBlue} 100%)`,
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
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
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
            background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
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
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ 
                  mb: 2,
                  color: '#fff',
                }}
              >
                Our Values
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
                The principles that guide everything we do
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              {[
                {
                  title: 'Innovation',
                  description: 'We constantly push boundaries to create tools that make document handling more intuitive and efficient.',
                  icon: <Lightbulb size={32} />,
                  color: customColors.aqua,
                  gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.8), rgba(0, 150, 255, 0.5))'
                },
                {
                  title: 'Accessibility',
                  description: 'We believe powerful tools should be available to everyone, regardless of technical expertise or budget.',
                  icon: <User size={32} />,
                  color: customColors.brightPurple,
                  gradient: 'linear-gradient(135deg, rgba(162, 57, 255, 0.8), rgba(130, 45, 204, 0.5))'
                },
                {
                  title: 'Security',
                  description: 'We prioritize the security of your documents with industry-leading encryption and privacy practices.',
                  icon: <Shield size={32} />,
                  color: customColors.aqua,
                  gradient: 'linear-gradient(135deg, rgba(0, 212, 255, 0.8), rgba(0, 150, 255, 0.5))'
                },
                {
                  title: 'Excellence',
                  description: 'We re committed to delivering the highest quality tools and experiences to our users.',
                  icon: <Award size={32} />,
                  color: customColors.brightPurple,
                  gradient: 'linear-gradient(135deg, rgba(162, 57, 255, 0.8), rgba(130, 45, 204, 0.5))'
                },
              ].map((value, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemAnimation}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        borderRadius: 4,
                        background: 'rgba(20, 24, 60, 0.3)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'rgba(122, 184, 255, 0.15)',
                        overflow: 'visible',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                          borderColor: 'rgba(122, 184, 255, 0.3)',
                        }
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box
                          sx={{
                            width: 70,
                            height: 70,
                            borderRadius: '16px',
                            background: value.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                            color: '#fff',
                          }}
                        >
                          {value.icon}
                        </Box>
                        
                        <Typography variant="h5" gutterBottom fontWeight={600} sx={{ color: '#fff' }}>
                          {value.title}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {value.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Our Journey Timeline with Dark Theme + Aqua Details */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          bgcolor: customColors.darkBlue,
          color: '#fff',
          backgroundImage: 'radial-gradient(circle at 20% 70%, rgba(91, 14, 139, 0.2) 0%, rgba(10, 17, 58, 0.05) 50%)',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 2 }}
              >
                Our Journey
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
                From a small startup to a global document solution
              </Typography>
            </Box>
            
            <Box sx={{ position: 'relative' }}>
              {/* Timeline vertical line */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: { xs: 20, md: '50%' },
                  width: 2,
                  background: `linear-gradient(to bottom, ${customColors.brightPurple}, ${customColors.aqua})`,
                  transform: { xs: 'none', md: 'translateX(-1px)' },
                  zIndex: 0,
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
                }}
              />
              
              {/* Timeline items */}
              {companyTimeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-100px' }}
                  variants={timelineAnimation}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'row', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                      mb: 5,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {/* Timeline dot */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: customColors.darkBlue,
                        border: '2px solid',
                        borderColor: index % 2 === 0 ? customColors.aqua : customColors.brightPurple,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        top: 0,
                        left: { xs: 0, md: 'calc(50% - 20px)' },
                        zIndex: 2,
                        boxShadow: `0 0 15px ${index % 2 === 0 ? 'rgba(0, 212, 255, 0.4)' : 'rgba(162, 57, 255, 0.4)'}`,
                        color: index % 2 === 0 ? customColors.aqua : customColors.brightPurple,
                      }}
                    >
                      {item.icon}
                    </Box>
                    
                    {/* Content */}
                    <Box
                      sx={{
                        width: { xs: 'calc(100% - 60px)', md: '45%' },
                        ml: { xs: 5, md: index % 2 === 0 ? 'auto' : 0 },
                        mr: { xs: 0, md: index % 2 === 0 ? 0 : 'auto' },
                        px: { xs: 2, md: 3 },
                      }}
                    >
                      <Card
                        sx={{
                          background: 'rgba(20, 24, 60, 0.3)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: 3,
                          p: 0,
                          position: 'relative',
                          boxShadow: index % 2 === 0 
                            ? '15px 15px 30px rgba(0, 0, 0, 0.25)' 
                            : '-15px 15px 30px rgba(0, 0, 0, 0.25)',
                          border: '1px solid',
                          borderColor: 'rgba(122, 184, 255, 0.15)',
                          overflow: 'hidden',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 20,
                            [index % 2 === 0 ? 'left' : 'right']: { xs: 'auto', md: -15 },
                            left: { xs: -15, md: index % 2 === 0 ? -15 : 'auto' },
                            width: 0,
                            height: 0,
                            borderTop: '15px solid transparent',
                            borderBottom: '15px solid transparent',
                            [index % 2 === 0 
                              ? 'borderRight' 
                              : 'borderLeft']: { 
                              xs: '15px solid rgba(20, 24, 60, 0.5)', 
                              md: index % 2 === 0 
                                ? '15px solid rgba(20, 24, 60, 0.5)' 
                                : 'none'
                            },
                            [index % 2 === 1 
                              ? 'borderLeft' 
                              : 'borderRight']: { 
                              xs: 'none', 
                              md: index % 2 === 1 
                                ? '15px solid rgba(20, 24, 60, 0.5)' 
                                : 'none'
                            },
                            display: { xs: index === 0 ? 'block' : 'none', md: 'block' },
                            filter: 'drop-shadow(0 5px 5px rgba(0,0,0,0.1))',
                          }
                        }}
                      >
                        <Box 
                          sx={{ 
                            height: '5px', 
                            width: '100%', 
                            background: index % 2 === 0 
                              ? `linear-gradient(to right, ${customColors.aqua}, ${customColors.brightPurple})` 
                              : `linear-gradient(to left, ${customColors.aqua}, ${customColors.brightPurple})`,
                          }} 
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Box
                            sx={{
                              display: 'inline-block',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: alpha(index % 2 === 0 ? customColors.aqua : customColors.brightPurple, 0.2),
                              color: index % 2 === 0 ? customColors.aqua : customColors.brightPurple,
                              fontWeight: 600,
                              fontSize: '0.875rem',
                              mb: 1.5,
                            }}
                          >
                            {item.year}
                          </Box>
                          <Typography variant="h6" gutterBottom fontWeight={600} sx={{ color: '#fff' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      {/* Meet Our Team Section with Glass Cards */}
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
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
            right: '15%', 
            width: '300px', 
            height: '300px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.aqua, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(80px)',
            zIndex: 0,
          }} 
        />
        
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: '20%', 
            left: '10%', 
            width: '400px', 
            height: '400px', 
            borderRadius: '50%', 
            background: `radial-gradient(circle, ${alpha(customColors.brightPurple, 0.15)} 0%, rgba(0,0,0,0) 70%)`,
            filter: 'blur(100px)',
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
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography 
                variant="h3" 
                component="h2" 
                fontWeight={700} 
                sx={{ mb: 2, color: '#fff' }}
              >
                Meet Our Team
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
                The talented people behind PDF Utility
              </Typography>
            </Box>
            
            <Grid container spacing={4} justifyContent="center">
              {teamMembers.map((member, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div variants={itemAnimation}>
                    <Card
                      sx={{
                        borderRadius: 4,
                        overflow: 'visible',
                        background: 'rgba(20, 24, 60, 0.25)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid',
                        borderColor: 'rgba(122, 184, 255, 0.15)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-10px)',
                          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
                          borderColor: 'rgba(122, 184, 255, 0.3)',
                        },
                        '&:hover .team-social': {
                          opacity: 1,
                          transform: 'translateY(0)',
                        },
                        '&:hover::before': {
                          opacity: 1,
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          height: '100px',
                          background: `linear-gradient(to right, ${customColors.aqua}, ${customColors.brightPurple})`,
                          opacity: 0.7,
                          transition: 'opacity 0.3s ease',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', pt: 13 }}>
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          sx={{
                            width: 100,
                            height: 100,
                            border: '4px solid rgba(20, 24, 60, 0.8)',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                            position: 'absolute',
                            top: -30,
                            left: 'calc(50% - 50px)',
                          }}
                        />
                        
                        {/* Social icons with glassmorphism */}
                        <Box
                          className="team-social"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            p: 1.5,
                            borderRadius: '0 0 0 15px',
                            background: 'rgba(20, 24, 60, 0.5)',
                            backdropFilter: 'blur(10px)',
                            display: 'flex',
                            gap: 1,
                            opacity: 0,
                            transform: 'translateY(-10px)',
                            transition: 'all 0.3s ease',
                            zIndex: 2,
                          }}
                        >
                          {Object.keys(member.social).map((platform, idx) => (
                            <IconButton
                              key={idx}
                              size="small"
                              sx={{ 
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                '&:hover': {
                                  bgcolor: platform === 'linkedin' ? '#0077B5' : 
                                           platform === 'twitter' ? '#1DA1F2' : 
                                           platform === 'github' ? '#333' : 
                                           platform === 'dribbble' ? '#EA4C89' : 
                                           customColors.aqua,
                                  color: 'white',
                                }
                              }}
                            >
                              {platform === 'linkedin' && <LinkedInIcon size={16} />}
                              {platform === 'twitter' && <TwitterIcon size={16} />}
                              {platform === 'github' && <GitHubIcon size={16} />}
                              {platform === 'dribbble' && <InstagramIcon size={16} />}
                              {platform === 'stackoverflow' && <CodeIcon size={16} />}
                            </IconButton>
                          ))}
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ pt: 2, pb: 3, textAlign: 'center' }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#fff' }}>
                          {member.name}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          sx={{
                            display: 'inline-block',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 5,
                            bgcolor: alpha(customColors.aqua, 0.2),
                            mb: 2,
                            fontWeight: 500,
                            color: customColors.lightAqua,
                          }}
                        >
                          {member.role}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {member.bio}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
      
      {/* Call to Action with Advanced Glassmorphism */}
      <Box
        sx={{
          py: { xs: 8, md: 10 },
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
            opacity: 0.1,
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
      
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
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
              
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h3"
                    fontWeight={700}
                    color="white"
                    sx={{ mb: 2 }}
                  >
                    Ready to try our tools?
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 'normal' }}
                  >
                    Join millions of users who trust PDF Utility for their document needs.
                    Get started with our free tools today.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/')}
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
                      Get Started
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
                      Contact Us
                    </Button>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  sx={{
                    textAlign: 'center',
                    display: { xs: 'none', md: 'block' }
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      position: 'relative',
                    }}
                  >
                    {/* Layered glassmorphic spheres with star icon */}
                    <Box
                      sx={{
                        width: 180,
                        height: 180,
                        borderRadius: '50%',
                        background: 'rgba(17, 25, 68, 0.2)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid',
                        borderColor: 'rgba(122, 184, 255, 0.15)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
                        animation: 'pulse 3s infinite ease-in-out',
                        '@keyframes pulse': {
                          '0%, 100%': { 
                            transform: 'scale(1)',
                            boxShadow: `0 0 20px ${alpha(customColors.aqua, 0.3)}`,
                          },
                          '50%': { 
                            transform: 'scale(1.05)',
                            boxShadow: `0 0 40px ${alpha(customColors.aqua, 0.5)}`,
                          }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 130,
                          height: 130,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(162, 57, 255, 0.2) 100%)`,
                          backdropFilter: 'blur(15px)',
                          border: '1px solid',
                          borderColor: 'rgba(122, 184, 255, 0.2)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          boxShadow: 'inset 0 5px 15px rgba(255,255,255,0.1)',
                        }}
                      >
                        <StarIcon size={64} color={customColors.lightAqua} />
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </motion.div>
        </Container>
      </Box>
      
      {/* Contact Information with Blue/Purple Glass Effect */}
      <Box sx={{ 
        py: { xs: 8, md: 10 }, 
        bgcolor: customColors.darkBlue,
        backgroundImage: 'radial-gradient(circle at 90% 20%, rgba(91, 14, 139, 0.15) 0%, rgba(10, 17, 58, 0.05) 50%)',
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Typography
              variant="h3"
              component="h2"
              fontWeight={700}
              textAlign="center"
              sx={{ mb: 6, color: '#fff' }}
            >
              Get in Touch
            </Typography>
            
            <Grid container spacing={4} justifyContent="center">
              {[
                {
                  title: 'Email',
                  content: 'hello@pdfutility.com',
                  icon: <MailIcon size={28} />,
                  color: customColors.aqua,
                },
                {
                  title: 'Location',
                  content: 'San Francisco, CA',
                  icon: <MapPinIcon size={28} />,
                  color: customColors.brightPurple,
                },
                {
                  title: 'Website',
                  content: 'www.pdfutility.com',
                  icon: <LinkIcon size={28} />,
                  color: customColors.lightAqua,
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: 'rgba(20, 24, 60, 0.3)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid',
                      borderColor: 'rgba(122, 184, 255, 0.15)',
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        borderColor: alpha(item.color, 0.4),
                      },
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(135deg, ${item.color} 0%, rgba(255, 255, 255, 0.1) 100%)`,
                        opacity: 0.2,
                        zIndex: 0,
                        transition: 'opacity 0.3s ease',
                      },
                      '&:hover::before': {
                        opacity: 0.4,
                      }
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        color: item.color,
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '50%',
                        p: 2,
                        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {item.icon}
                    </Box>
                    
                    <Typography variant="h6" fontWeight={600} gutterBottom sx={{ color: '#fff' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                      {item.content}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>
     </> 

  );
}

export default AboutPage;

