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
import Lottie from 'lottie-react';

import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link as RouterLink } from 'react-router-dom';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import SecurityIcon from '@mui/icons-material/Security';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import LockIcon from '@mui/icons-material/Lock';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CheckCircle, CloudDone, CloudUpload, Crop, Devices, FileCopy, FlashlightOn, FlashOn, FormatColorFill, InfoOutline, InfoOutlined, InsertDriveFile, MoreHoriz, PictureAsPdf, Search, Security, Settings, Speed, TextFields } from '@mui/icons-material';
import { Feather } from 'react-feather';
import FeatureSection from '../Components/common/FeatureSection';
import HowItWorksSection from '../Components/common/HowItWorkSection';
import TestimonialSection from '../Components/common/TestimonialSection';
import CTASection from '../Components/common/CTASection';
// import WaveSeparator from '../Components/common/WaveSeparator';




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
      {/* Hero Section - Ultra Premium Edition */}
      <Box
        sx={{
          position: 'relative',
          overflow: 'visible', // Allow elements to extend beyond container
          bgcolor: '#030018', // Deeper, richer background
          color: 'white',
          pt: { xs: 10, sm: 14, md: 18 },
          pb: { xs: 16, sm: 20, md: 24 },
        }}
      >
        {/* Extreme premium animated background */}
        <Box
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-10%',
            right: '-10%',
            bottom: '-20%',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
        </Box>


        {/* Animated geometric patterns */}
        <Box
          component={motion.div}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          sx={{
            position: 'absolute',
            top: '-20%',
            left: '-20%',
            width: '140%',
            height: '140%',
            // background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%237d49ff\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Floating dynamic gradient orbs */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.7,
              opacity: Math.random() * 0.3 + 0.2
            }}
            animate={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: Math.random() * 0.5 + 0.9,
              opacity: Math.random() * 0.3 + 0.3
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 25 + i * 5,
              ease: 'easeInOut',
            }}
            sx={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: { xs: '20rem', sm: '30rem', md: '40rem' },
              height: { xs: '20rem', sm: '30rem', md: '40rem' },
              background: i % 4 === 0
                ? 'radial-gradient(circle, rgba(125, 249, 255, 0.15) 0%, rgba(125, 249, 255, 0) 70%)'
                : i % 4 === 1
                  ? 'radial-gradient(circle, rgba(104, 54, 230, 0.15) 0%, rgba(104, 54, 230, 0) 70%)'
                  : i % 4 === 2
                    ? 'radial-gradient(circle, rgba(230, 54, 189, 0.15) 0%, rgba(230, 54, 189, 0) 70%)'
                    : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)',
              borderRadius: '50%',
              filter: 'blur(50px)',
              transform: 'translate(-50%, -50%)',
              mixBlendMode: 'screen',
            }}
          />
        ))}

       

        {/* Lens flare effect */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            top: '25%',
            right: '15%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
          }}
        />

        {/* Chrome-like translucent plates */}
        {[...Array(4)].map((_, i) => (
          <Box
            key={`plate-${i}`}
            component={motion.div}
            initial={{
              x: i % 2 === 0 ? -200 : 200,
              y: (i * 200) - 400,
              rotate: i % 2 === 0 ? -15 : 15,
              scale: 0.8,
            }}
            animate={{
              x: i % 2 === 0 ? -50 : 50,
              y: (i * 220) - 350,
              rotate: i % 2 === 0 ? -8 : 8,
              scale: 1,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'mirror',
              duration: 20 + i * 5,
              ease: 'easeInOut',
            }}
            sx={{
              position: 'absolute',
              width: { xs: '100%', md: '80%' },
              height: { xs: 400, md: 600 },
              background: i % 2 === 0
                ? 'linear-gradient(135deg, rgba(125, 249, 255, 0.08) 0%, rgba(125, 249, 255, 0.03) 100%)'
                : 'linear-gradient(135deg, rgba(104, 54, 230, 0.08) 0%, rgba(104, 54, 230, 0.03) 100%)',
              borderRadius: '30px',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              left: i % 2 === 0 ? '0%' : 'auto',
              right: i % 2 === 0 ? 'auto' : '0%',
              top: `${10 + i * 20}%`,
              transform: `rotate(${i % 2 === 0 ? -5 : 5}deg)`,
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
              zIndex: 0,
            }}
          />
        ))}


        <Container maxWidth="100%" sx={{ position: 'relative', zIndex: 2, overflow: 'visible' }}>
          <Grid
            container
            spacing={{ xs: 6, md: 0 }}
            alignItems="center"
            justifyContent="space-between"
            sx={{ overflow: 'visible', minWidth: '100%', height: '100%' }}
          > 
            {/* Left content column */}
            <Grid item xs={12} md={5} sx={{ position: 'relative', overflow: 'visible', }}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              >
                {/* Ultra premium badge - animated and flying */}
                <motion.div
                  style={{
                    display: 'inline-flex',
                    position: 'relative',
                    transform: 'translateZ(0)',
                  }}
                  initial={{ y: 20, scale: 0.9, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                >
                  <motion.div
                    animate={{
                      y: [-5, 5, -5],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 3,
                        gap: 1.5,
                        py: 1.5,
                        px: 3,
                        borderRadius: '30px',
                        background: 'linear-gradient(135deg, rgba(125, 249, 255, 0.15) 0%, rgba(104, 54, 230, 0.15) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(125, 249, 255, 0.2)',
                        boxShadow: '0 15px 35px rgba(125, 249, 255, 0.2), 0 0 10px rgba(125, 249, 255, 0.1) inset',
                      }}
                    >
                      <Box
                        component={motion.div}
                        animate={{
                          scale: [1, 1.3, 1],
                          boxShadow: [
                            '0 0 0 rgba(125, 249, 255, 0.4)',
                            '0 0 25px rgba(125, 249, 255, 0.8)',
                            '0 0 0 rgba(125, 249, 255, 0.4)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        sx={{
                          height: 12,
                          width: 12,
                          borderRadius: '50%',
                          bgcolor: '#7df9ff',
                        }}
                      />
                      <Typography
                        variant="subtitle1"
                        component="span"
                        sx={{
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          letterSpacing: 1.5,
                          fontSize: '0.875rem',
                          background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Next-Generation PDF Technology
                      </Typography>
                    </Box>
                  </motion.div>
                </motion.div>

                {/* Ultra premium headline with 3D effects */}
                <Box sx={{ overflow: 'visible', position: 'relative' }}>
                  {/* 3D text effect with shadow layers */}
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    sx={{
                      position: 'relative',
                      transform: 'translateZ(0)',
                    }}
                  >
                    <Typography
                      component="h1"
                      variant="h1"
                      sx={{
                        fontWeight: 900,
                        letterSpacing: { xs: '-0.03em', md: '-0.04em' },
                        lineHeight: 0.9,
                        mb: { xs: 3, md: 3 },
                        mt: 2,
                        fontSize: { xs: '3.5rem', sm: '4.2rem', md: '5.5rem' },
                        position: 'relative',
                        textShadow: '0 5px 30px rgba(58, 12, 163, 0.4)',
                        transform: 'perspective(1000px)',
                      }}
                    >
                      <motion.div
                        animate={{
                          textShadow: [
                            '0 5px 30px rgba(58, 12, 163, 0.3)',
                            '0 5px 50px rgba(58, 12, 163, 0.5)',
                            '0 5px 30px rgba(58, 12, 163, 0.3)'
                          ]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        <Box component="span" sx={{
                          display: 'block',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            left: 0,
                            right: '30%',
                            bottom: '15%',
                            height: '8px',
                            background: 'linear-gradient(90deg, rgba(125, 249, 255, 0.7), rgba(125, 249, 255, 0))',
                            borderRadius: '4px',
                            filter: 'blur(8px)',
                            zIndex: -1,
                          }
                        }}>
                          Advanced PDF
                        </Box>

                        <Box component="span"
                          sx={{
                            display: 'block',
                            fontSize: { xs: '4rem', sm: '5rem', md: '6.2rem' },
                            lineHeight: '0.95',
                            mt: { xs: 1, md: 0 },
                          }}
                        >
                          <motion.span style={{
                            display: 'inline-block',
                            background: 'linear-gradient(90deg, #7df9ff, #8c5eff)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            position: 'relative',
                            textShadow: 'none',
                          }}>
                            Solutions

                            {/* Text highlight glow effect */}
                            <Box
                              component={motion.div}
                              animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut'
                              }}
                              sx={{
                                position: 'absolute',
                                bottom: -15,
                                left: '10%',
                                right: '10%',
                                height: 60,
                                background: 'radial-gradient(ellipse at center, rgba(125, 249, 255, 0.5) 0%, rgba(125, 249, 255, 0) 70%)',
                                filter: 'blur(20px)',
                                borderRadius: '50%',
                                zIndex: -1,
                                transform: 'translateZ(0)',
                              }}
                            />
                          </motion.span>
                          {' '}
                          <Box component="span"
                            sx={{
                              fontWeight: 900,
                              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              pl: 1,
                            }}
                          >
                            Simplified
                          </Box>
                        </Box>
                      </motion.div>
                    </Typography>
                  </Box>

                  {/* Animated 3D floating elements around the headline */}
                  {[...Array(3)].map((_, i) => (
                    <Box
                      key={`floating-element-${i}`}
                      component={motion.div}
                      initial={{ x: 0, y: 0, opacity: 0 }}
                      animate={{
                        x: i === 0 ? [30, 0, 30] : i === 1 ? [-20, 10, -20] : [10, -10, 10],
                        y: i === 0 ? [-20, 0, -20] : i === 1 ? [15, -5, 15] : [-10, 10, -10],
                        opacity: 0.5,
                        rotate: i === 0 ? [0, 10, 0] : i === 1 ? [0, -10, 0] : [0, 5, 0],
                      }}
                      transition={{
                        duration: 6 + i * 2,
                        repeat: Infinity,
                        repeatType: 'mirror',
                        ease: 'easeInOut',
                        delay: i * 0.5
                      }}
                      sx={{
                        position: 'absolute',
                        top: i === 0 ? '10%' : i === 1 ? '50%' : '70%',
                        right: i === 0 ? '-5%' : i === 1 ? '30%' : '0%',
                        width: i === 0 ? 100 : i === 1 ? 60 : 80,
                        height: i === 0 ? 100 : i === 1 ? 60 : 80,
                        borderRadius: i === 0 ? '20px' : i === 1 ? '50%' : '15px',
                        background: i === 0
                          ? 'linear-gradient(135deg, rgba(125, 249, 255, 0.2) 0%, rgba(104, 54, 230, 0.2) 100%)'
                          : i === 1
                            ? 'linear-gradient(135deg, rgba(230, 54, 189, 0.2) 0%, rgba(104, 54, 230, 0.2) 100%)'
                            : 'linear-gradient(135deg, rgba(255, 214, 10, 0.2) 0%, rgba(230, 54, 189, 0.2) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                        zIndex: -1,
                      }}
                    />
                  ))}
                </Box>

                {/* Enhanced descriptive text */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 1 }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 6,
                      opacity: 0.95,
                      fontWeight: 400,
                      maxWidth: 540,
                      lineHeight: 1.6,
                      fontSize: { xs: '1.2rem', sm: '1.3rem' },
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    Transform, edit, and secure your documents with our
                    <Box component="span"
                      sx={{
                        fontWeight: 600,
                        display: 'inline',
                        background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mx: 0.5
                      }}
                    >
                      powerful all-in-one PDF toolkit
                    </Box>.
                    No software installation required.
                  </Typography>
                </motion.div>

                {/* Premium floating CTAs with dramatic animations */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: { xs: 3, md: 4 },
                    mb: { xs: 6, md: 7 },
                    zIndex: 10,
                  }}
                >
                  {/* Glowing effect behind buttons */}
                  <Box
                    component={motion.div}
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '25%',
                      transform: 'translate(-50%, -50%)',
                      width: 200,
                      height: 80,
                      background: 'radial-gradient(ellipse at center, rgba(104, 54, 230, 0.6) 0%, rgba(104, 54, 230, 0) 70%)',
                      filter: 'blur(30px)',
                      borderRadius: '50%',
                      zIndex: -1,
                    }}
                  />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    whileHover={{ scale: 1.05, y: -7 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to="/tools/merge-pdf"
                      sx={{
                        // background: 'linear-gradient(135deg, #6836e6, #491bbf)',
                        color: 'white',
                        borderRadius: '16px',
                        px: { xs: 4, md: 5 },
                        py: 2.5,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 700,
                        '&:hover': {
                          background: 'linear-gradient(135deg, #5c2ddd, #3e17a7)',
                          boxShadow: '0 15px 35px -10px rgba(104, 54, 230, 0.7), 0 0 20px rgba(125, 249, 255, 0.3)',
                        },
                        boxShadow: '0 20px 35px -10px rgba(104, 54, 230, 0.6), 0 0 15px rgba(125, 249, 255, 0.2)',
                        transition: 'all 0.4s ease',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                          transition: 'all 0.6s ease',
                        },
                        '&:hover::after': {
                          left: '100%',
                        },
                      }}
                      startIcon={
                        <motion.div
                          animate={{
                            rotate: [0, 8, 0, -8, 0],
                            y: [0, -2, 0, 2, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                        >
                          <CloudUploadIcon
                            sx={{
                              fontSize: { xs: 22, md: 26 },
                              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
                            }}
                          />
                        </motion.div>
                      }
                    >
                      Try Now - It's Free
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                    whileHover={{ scale: 1.05, y: -7 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      color="inherit"
                      component={RouterLink}
                      to="/about"
                      sx={{
                        borderRadius: '16px',
                        px: { xs: 3.5, md: 4.5 },
                        py: 2.5,
                        fontSize: { xs: '1rem', md: '1.1rem' },
                        fontWeight: 600,
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        borderWidth: 2,
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderColor: '#7df9ff',
                          boxShadow: '0 0 30px rgba(125, 249, 255, 0.3)',
                        },
                        transition: 'all 0.4s ease',
                      }}
                      startIcon={<InfoOutlined />}
                    >
                      Learn More
                    </Button>
                  </motion.div>
                </Box>

                {/* Enhanced users testimonial card with premium styling */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 1 }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'flex-start',
                      gap: 3,
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(104, 54, 230, 0.05) 100%)',
                      backdropFilter: 'blur(20px)',
                      borderRadius: '24px',
                      p: 3.5,
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
                      transform: 'perspective(1000px) rotateX(2deg)',
                      transformOrigin: 'center top',
                      '&:hover': {
                        transform: 'perspective(1000px) rotateX(0deg) translateY(-5px)',
                        boxShadow: '0 35px 65px -15px rgba(0, 0, 0, 0.35), 0 0 20px rgba(104, 54, 230, 0.2)',
                      },
                      transition: 'all 0.5s ease',
                    }}
                  >
                    {/* Glass reflections */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '40%',
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0) 100%)',
                        borderRadius: '24px 24px 0 0',
                        zIndex: 0,
                      }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, zIndex: 1 }}>
                      <Stack direction="row" spacing={-2.5}>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, x: -30 }}
                            animate={{ scale: 1, x: 0 }}
                            transition={{ delay: 1.8 + i * 0.1, duration: 0.6, type: 'spring' }}
                          >
                            <Avatar
                              src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`}
                              sx={{
                                width: 54,
                                height: 54,
                                border: '4px solid rgba(104, 54, 230, 0.8)',
                                backgroundColor: 'primary.main',
                                boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8)',
                                zIndex: 5 - i,
                              }}
                            />
                          </motion.div>
                        ))}
                      </Stack>
                      <Box>
                        <Typography variant="body1" fontWeight={700} sx={{ lineHeight: 1.2, fontSize: '1.3rem' }}>
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 2.2 }}
                          >
                            <CountUp end={50000} separator="," /> +
                          </motion.span>{' '}
                          <Box
                            component="span"
                            sx={{
                              background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                              backgroundClip: 'text',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                            }}
                          >
                            Happy Users
                          </Box>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.8 }}>
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 2.3 + i * 0.1, duration: 0.4 }}
                            >
                              <Box
                                component="span"
                                sx={{
                                  color: '#FFD700',
                                  display: 'inline-block',
                                  fontSize: '1.1rem',
                                  filter: 'drop-shadow(0 0 3px rgba(255, 215, 0, 0.6))',
                                }}
                              >
                                ★
                              </Box>
                            </motion.div>
                          ))}
                          <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 600, ml: 0.7 }}>
                            4.9/5 rating
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Divider
                      orientation={matchMedia('(min-width:600px)').matches ? 'vertical' : 'horizontal'}
                      flexItem
                      sx={{
                        borderColor: 'rgba(255,255,255,0.1)',
                        display: { xs: 'block', sm: 'block' }
                      }}
                    />

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.8, zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(125, 249, 255, 0.15)',
                            width: 38,
                            height: 38,
                            boxShadow: '0 0 20px rgba(125, 249, 255, 0.3)',
                          }}
                        >
                          <LockIcon sx={{ fontSize: 18, color: '#7df9ff' }} />
                        </Avatar>
                        <Typography variant="body2" fontWeight={500} fontSize="0.95rem">
                          100% Secure & Private
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar
                          sx={{
                            bgcolor: 'rgba(104, 54, 230, 0.15)',
                            width: 38,
                            height: 38,
                            boxShadow: '0 0 20px rgba(104, 54, 230, 0.3)',
                          }}
                        >
                          <FlashlightOn sx={{ fontSize: 18, color: '#8c5eff' }} />
                        </Avatar>
                        <Typography variant="body2" fontWeight={500} fontSize="0.95rem">
                          Lightning Fast Processing
                        </Typography>
                      </Box>
                    </Box>

                    {/* Decorative badge */}
                    <Box
                      component={motion.div}
                      initial={{ opacity: 0, y: -20, rotate: -10 }}
                      animate={{ opacity: 1, y: 0, rotate: -10 }}
                      transition={{ delay: 2.5, duration: 0.5 }}
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: 30,
                        bgcolor: '#6836e6',
                        color: 'white',
                        borderRadius: 2,
                        px: 2,
                        py: 0.5,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        boxShadow: '0 10px 25px -5px rgba(104, 54, 230, 0.5)',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        zIndex: 2,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                      }}
                    >
                      Top rated
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>

            {/* Right side with break-out 3D documents and floating elements */}
            <Grid item xs={12} md={5} sx={{ position: 'relative', overflow: 'visible', minWidth: '25%' }}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 460, sm: 550 },
                  minWidth: '2%',
                  perspective: 2000,
                  transformStyle: 'preserve-3d',
                  overflow: 'visible',
                }}
              >
                {/* Main 3D scene */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  style={{ position: 'relative', height: '100%', width: '100%', overflow: 'visible', top: '-10%' }}
                >
                  {/* Glow effect */}
                  <Box
                    component={motion.div}
                    animate={{
                      opacity: [0.4, 0.7, 0.4],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    sx={{
                      position: 'absolute',
                      top: '10%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90%',
                      height: '80%',
                      background: 'radial-gradient(ellipse at center, rgba(104, 54, 230, 0.3) 0%, rgba(125, 249, 255, 0.1) 40%, rgba(0, 0, 0, 0) 80%)',
                      filter: 'blur(60px)',
                      borderRadius: '50%',
                      zIndex: 0,
                    }}
                  />

                  {/* Animated floating particles */}
                  {[...Array(15)].map((_, i) => (
                    <Box
                      key={`particle-${i}`}
                      component={motion.div}
                      initial={{
                        x: Math.random() * 400 - 200,
                        y: Math.random() * 400 - 200,
                        z: Math.random() * -400,
                        opacity: Math.random() * 0.4 + 0.2,
                        scale: Math.random() * 0.6 + 0.4,
                        rotate: Math.random() * 360,
                      }}
                      animate={{
                        x: Math.random() * 500 - 250,
                        y: Math.random() * 500 - 250,
                        z: Math.random() * -600,
                        opacity: Math.random() * 0.4 + 0.2,
                        scale: Math.random() * 0.6 + 0.4,
                        rotate: Math.random() * 720,
                      }}
                      transition={{
                        repeat: Infinity,
                        repeatType: 'reverse',
                        duration: 15 + i * 4,
                        ease: 'easeInOut',
                      }}
                      sx={{
                        position: 'absolute',
                        // top: '50%',
                        left: '50%',
                        width: i % 3 === 0 ? 40 : i % 3 === 1 ? 25 : 15,
                        height: i % 3 === 0 ? 40 : i % 3 === 1 ? 25 : 15,
                        background: i % 4 === 0
                          ? '#7df9ff'
                          : i % 4 === 1
                            ? '#6836e6'
                            : i % 4 === 2
                              ? '#e636bd'
                              : '#ffffff',
                        borderRadius: i % 2 === 0 ? '50%' : '8px',
                        boxShadow: i % 4 === 0
                          ? '0 0 20px rgba(125, 249, 255, 0.7)'
                          : i % 4 === 1
                            ? '0 0 20px rgba(104, 54, 230, 0.7)'
                            : i % 4 === 2
                              ? '0 0 20px rgba(230, 54, 189, 0.7)'
                              : 'none',
                        transform: 'translate(-50%, -50%)',
                        zIndex: i % 4 === 0 ? 8 : 4,
                      }}
                    />
                  ))}
                </motion.div>

              </Box>
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
                  startIcon={<CloudUpload />}
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
            </Grid>
          </Grid>
            <Grid
              container
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 10,
                  minWidth: '100%',
                  borderRadius: '20px',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                  zIndex: 0,
                }
              }}
            >
              {[
                { label: 'Files Processed', count: '10M+', icon: <PictureAsPdf />, description: 'Trusted by professionals' },
                { label: 'Secure Processing', count: '100%', icon: <Security />, description: 'End-to-end encryption' },
                { label: 'Processing Speed', count: '3x', icon: <Speed />, description: 'Faster than competitors' },
                { label: 'Device Compatibility', count: 'All', icon: <Devices />, description: 'Works everywhere' },
              ].map((stat, index) => (
                <Grid
                  item
                  xs={6}
                  sm={3}
                  key={index}
                  sx={{
                    position: 'relative',
                    '&:not(:last-child)::after': {
                      content: '""',
                      position: 'absolute',
                      right: 0,
                      top: '20%',
                      height: '60%',
                      width: '1px',
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      display: { xs: index % 2 === 0 ? 'none' : 'block', sm: 'block' },
                    },
                    zIndex: 1,
                  }}
                >
                  <Box
                    sx={{
                      textAlign: 'center',
                      py: { xs: 3, md: 4 },
                      px: 2,
                    }}
                  >
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'rgba(255, 255, 255, 0.15)',
                          width: { xs: 55, md: 70 },
                          height: { xs: 55, md: 70 },
                          borderRadius: '20px',
                          mb: 2,
                          color: '#7df9ff',
                          boxShadow: '0 0 20px rgba(125, 249, 255, 0.2)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        {React.cloneElement(stat.icon, { sx: { fontSize: { xs: 26, md: 32 } } })}
                      </Box>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        sx={{
                          mb: 0.5,
                          fontSize: { xs: '1.75rem', md: '2.5rem' },
                          background: 'linear-gradient(90deg, #fff, #7df9ff)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {stat.count}
                      </Typography>
                      <Typography
                        variant="body1"
                        fontWeight={600}
                        sx={{
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          mb: 0.5,
                        }}
                      >
                        {stat.label}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          opacity: 0.7,
                          fontSize: { xs: '0.75rem', md: '0.85rem' },
                        }}
                      >
                        {stat.description}
                      </Typography>
                    </motion.div>
                  </Box>
                </Grid>
              ))}
            </Grid>
        </Container>



        {/* Features Section */}
       <FeatureSection tools={tools}></FeatureSection>

     {/* How It Works Section */}
{/* How It Works Section */}
        <HowItWorksSection />
       
        {/* Testimonials Section */}
        <TestimonialSection testimonials={testimonials}></TestimonialSection>

        {/* CTA Section */}
        <CTASection />

      </Box>
    </Box>
  );
};

export default HomePage;