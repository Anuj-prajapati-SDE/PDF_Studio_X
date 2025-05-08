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
// import Lottie from 'lottie-react';
import CountUp from 'react-countup';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Icons
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import SecurityIcon from '@mui/icons-material/Security';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import SpeedIcon from '@mui/icons-material/Speed';
// import DevicesIcon from '@mui/icons-material/Devices';
// import CloudDoneIcon from '@mui/icons-material/CloudDone';
import LockIcon from '@mui/icons-material/Lock';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CheckCircle, CloudDone, CloudUpload, Crop, Devices, FileCopy, FlashlightOn, FlashOn, FormatColorFill, InfoOutline, InfoOutlined, InsertDriveFile, MoreHoriz, PictureAsPdf, Search, Security, Settings, Speed, TextFields } from '@mui/icons-material';

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
        {/* Multi-layered background system */}
        {/* Base gradient layer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // background: 'radial-gradient(circle at 25% 25%, rgba(104, 54, 230, 0.6) 0%, rgba(58, 12, 163, 0.1) 50%), radial-gradient(circle at 75% 75%, rgba(106, 57, 235, 0.6) 0%, rgba(15, 8, 75, 0.2) 50%), linear-gradient(135deg, rgba(13, 7, 58, 0.8) 0%, rgba(4, 12, 41, 1) 100%)',
          }}
        />

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

        {/* Dynamic mesh grid effect with parallax movement */}
        <Box
          component={motion.div}
          initial={{ y: 0 }}
          animate={{ y: -20 }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 10,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%237d49ff\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5,
          }}
        />

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
                  minWidth: '20%',
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
                  style={{ position: 'relative', height: '100%', width: '100%', overflow: 'visible',top:'-10%' }}
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
                      top: '50%',
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
                 {/* 3D Document Stack with dramatic break-out positioning */}
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
                    <CheckCircle />
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
                    <CloudDone />
                  </Box>
                  <Typography variant="body1" color="text.primary" fontWeight={600}>
                    100% Complete
                  </Typography>
                </Box>
              </Box>
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
                { label: 'Files Processed', count: '10M+', icon: <PictureAsPdf /> },
                { label: 'Secure Processing', count: '100%', icon: <Security /> },
                { label: 'Processing Speed', count: '3x', icon: <Speed /> },
                { label: 'Device Compatibility', count: 'All', icon: <Devices /> },
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
            // background: 'linear-gradient(135deg, #f6f9fc 0%, #f1f4f9 100%)',
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
                  // background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
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
    </Box>
  );
};

export default HomePage;