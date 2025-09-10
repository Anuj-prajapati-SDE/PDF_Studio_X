import React, { useRef, useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Chip, 
  Avatar,
  Stack,
  useMediaQuery,
  useTheme,
  alpha
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  CloudUpload as UploadIcon,
  Dns as ProcessIcon,
  GetApp as DownloadIcon,
  AccessTime as TimeIcon,
  AccountCircle as UserIcon,
  Security as SecurityIcon,
  Check as CheckIcon
} from '@mui/icons-material';


// Premium glass morphism card component
const GlassCard = styled(Box)(({ theme, gradientStyle = 'primary' }) => {
  // Define gradient styles using theme colors
  const gradients = {
    primary: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.dark, 0.12)} 100%)`,
    secondary: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.dark, 0.12)} 100%)`,
    info: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.08)} 0%, ${alpha(theme.palette.info.dark, 0.12)} 100%)`,
  };
  
  // Define border colors using theme colors
  const borders = {
    primary: alpha(theme.palette.primary.main, 0.2),
    secondary: alpha(theme.palette.secondary.main, 0.2),
    info: alpha(theme.palette.info.main, 0.2),
  };

  return {
    position: 'relative',
    borderRadius: 24,
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    backgroundColor: alpha(theme.palette.background.paper, 0.6),
    background: gradients[gradientStyle],
    border: '1px solid',
    borderColor: borders[gradientStyle],
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(4),
    zIndex: 1,
    transformStyle: 'preserve-3d',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(130deg, rgba(255, 255, 255, 0.15), transparent)',
      zIndex: -1,
    },
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(3),
    },
  };
});

// Premium gradient display
const GradientDisplay = styled(Box)(({ theme, gradient = 'primary' }) => {
  // Define gradient styles using theme colors
  const gradients = {
    primary: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    secondary: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
    info: `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`,
  };
  
  // Define shadow colors using theme colors
  const shadows = {
    primary: `0 8px 16px -4px ${alpha(theme.palette.primary.main, 0.5)}`,
    secondary: `0 8px 16px -4px ${alpha(theme.palette.secondary.main, 0.5)}`,
    info: `0 8px 16px -4px ${alpha(theme.palette.info.main, 0.5)}`,
  };

  return {
    background: gradients[gradient],
    boxShadow: shadows[gradient],
    borderRadius: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

// Shimmer effect component
const Shimmer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '300%',
  height: '100%',
  background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
  zIndex: 2,
  pointerEvents: 'none',
});

// Glowing dot component with pulsing animation
const GlowDot = ({ size = 6, color = '#ffffff', pulseSize = 16, ...props }) => (
  <Box sx={{ position: 'relative', ...props }}>
    <Box
      sx={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
        boxShadow: `0 0 8px ${color}`,
      }}
    />
    <Box
      component={motion.div}
      animate={{ 
        scale: [1, 1.6, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ 
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
      }}
      sx={{
        width: pulseSize,
        height: pulseSize,
        borderRadius: '50%',
        backgroundColor: color,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.3,
        filter: 'blur(4px)',
      }}
    />
  </Box>
);

// Process steps data
const STEPS = [
  {
    id: '01',
    title: 'Upload Your Files',
    description: 'Simply drag & drop your PDFs or select them from your device. We support files up to 50MB with end-to-end encryption for complete security.',
    icon: <UploadIcon sx={{ fontSize: '2rem' }} />,
    gradient: 'primary',
    delay: 0,
    iconAnimation: {
      y: [0, -5, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: 'easeInOut',
        repeatDelay: 1,
      }
    }
  },
  {
    id: '02',
    title: 'Select Operations',
    description: 'Choose from our comprehensive suite of PDF tools to perform the exact operations you need, from merging and splitting to compression and encryption.',
    icon: <ProcessIcon sx={{ fontSize: '2rem' }} />,
    gradient: 'secondary',
    delay: 0.1,
    iconAnimation: {
      rotate: [0, 10, 0, -10, 0],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
        repeatDelay: 2,
      }
    }
  },
  {
    id: '03',
    title: 'Download Results',
    description: 'Once processing is complete, download your transformed PDF files instantly. All files are automatically deleted after processing for your privacy.',
    icon: <DownloadIcon sx={{ fontSize: '2rem' }} />,
    gradient: 'info',
    delay: 0.2,
    iconAnimation: {
      y: [0, 5, 0],
      transition: {
        repeat: Infinity,
        duration: 2.5,
        ease: 'easeInOut',
        repeatDelay: 1.5,
      }
    }
  }
];

// Features list
const FEATURES = [
  'End-to-end encryption',
  'Zero data retention',
  'Free up to 50MB',
  'No registration required',
  'Process multiple files',
  'API access available'
];

// Step Card Component
const StepCard = ({ step, index }) => {
  const theme = useTheme();
  
  const getGradient = (gradientType) => {
    switch(gradientType) {
      case 'primary':
        return `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
      case 'secondary':
        return `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`;
      case 'info':
        return `linear-gradient(135deg, ${theme.palette.info.main} 0%, ${theme.palette.info.dark} 100%)`;
      default:
        return `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`;
    }
  };

  const getShadow = (gradientType) => {
    switch(gradientType) {
      case 'primary':
        return `0 8px 16px -3px ${alpha(theme.palette.primary.main, 0.4)}`;
      case 'secondary':
        return `0 8px 16px -3px ${alpha(theme.palette.secondary.main, 0.4)}`;
      case 'info':
        return `0 8px 16px -3px ${alpha(theme.palette.info.main, 0.4)}`;
      default:
        return `0 8px 16px -3px ${alpha(theme.palette.primary.main, 0.4)}`;
    }
  };

  const getColor = (gradientType) => {
    switch(gradientType) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return theme.palette.primary.main;
    }
  };


  return (
    <Box
     
      sx={{
        position: 'relative',
       
      }}
    >
      <GlassCard
        gradientStyle={step.gradient}
        sx={{
          p: { xs: 3, md: 4 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Shimmer effect */}
        <Shimmer />
        
        <Box sx={{ position: 'relative', zIndex: 10 }}>
          {/* Step number badge */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 50,
              height: 50,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: getGradient(step.gradient),
              color: 'white',
              fontWeight: 800,
              fontSize: '1.5rem',
              boxShadow: getShadow(step.gradient),
            }}
          >
            {step.id}
          </Box>
          
          {/* Icon with animation */}
          <GradientDisplay
            gradient={step.gradient}
            sx={{
              width: 80,
              height: 80,
              mb: 3,
              position: 'relative',
            }}
          >
            <Box
              component={motion.div}
              animate={step.iconAnimation}
              sx={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {step.icon}
            </Box>
            
            {/* Glow dot for visual interest */}
            <GlowDot
              color={getColor(step.gradient)}
              size={5}
              pulseSize={20}
              sx={{ position: 'absolute', bottom: 10, right: 10 }}
            />
          </GradientDisplay>
          
          {/* Step content */}
          <Typography
            variant="h5"
            component="h3"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: getGradient(step.gradient),
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.5rem', md: '1.75rem' },
            }}
          >
            {step.title}
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.95rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            {step.description}
          </Typography>
        </Box>
      </GlassCard>
    </Box>
  );
};

// Main How It Works Section Component
const HowItWorksSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 15 },
        // backgroundColor: theme.palette.background.dark,
        color: 'white',
      }}
    >
      {/* Background Elements */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {/* Gradient background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        />
        
        {/* Grid pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
        
            opacity: 0.5,
            zIndex: 0,
          }}
        />
        
        {/* Animated gradient orbs */}
        {[...Array(3)].map((_, i) => (
          <Box
            key={i}
            component={motion.div}
            animate={{
              x: [0, i % 2 === 0 ? 50 : -50, 0],
              y: [0, i % 2 === 0 ? -30 : 30, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              repeat: Infinity,
              duration: 20 + i * 5,
              ease: 'easeInOut',
            }}
            sx={{
              position: 'absolute',
              top: i === 0 ? '15%' : i === 1 ? '60%' : '30%',
              left: i === 0 ? '10%' : i === 1 ? '80%' : '50%',
              width: { xs: '30rem', md: '40rem' },
              height: { xs: '30rem', md: '40rem' },
              background: i === 0 
                ? `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`
                : i === 1 
                  ? `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.08)} 0%, ${alpha(theme.palette.secondary.main, 0)} 70%)`
                  : `radial-gradient(circle, ${alpha(theme.palette.info.main, 0.08)} 0%, ${alpha(theme.palette.info.main, 0)} 70%)`,
              borderRadius: '50%',
              filter: 'blur(80px)',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
          <Chip
            label="HOW IT WORKS"
            sx={{
              fontWeight: 600,
              px: 2.5,
              py: 3,
              borderRadius: '30px',
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              color: theme.palette.primary.main,
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              mb: 3,
              backdropFilter: 'blur(8px)',
              fontSize: '0.75rem',
              letterSpacing: '0.05em',
            }}
          />
          
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 800,
              mb: 2,
              background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              mx: 'auto',
              maxWidth: '800px',
              px: 2,
              position: 'relative',
            }}
          >
            Transform Your PDFs in Three Simple Steps
             
            {/* Decorative elements */}
            <Box
              component={motion.div}
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 20,
                ease: 'linear',
              }}
              sx={{
                position: 'absolute',
                top: -10,
                right: { xs: 0, md: -40 },
                width: { xs: 30, md: 50 },
                height: { xs: 30, md: 50 },
                borderRadius: '50%',
                border: `2px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                zIndex: -1,
              }}
            />
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontWeight: 400,
              maxWidth: 700,
              mx: 'auto',
              mb: 2,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
            }}
          >
            Our intuitive process makes document management effortless and secure
          </Typography>
        </Box>

        {/* Steps Display */}
        <Grid 
          // container 
          spacing={{ xs: 4, sm: 6, md: 8 }}
          sx={{ mb: { xs: 6, md: 10 } }}
          
       
        >
          {STEPS.map((step, index) => (
            <Grid item xs={12} md={4} key={step.id} marginBottom={5} >
              <StepCard step={step} index={index}   />
            </Grid>
          ))}
        </Grid>

        {/* Features List */}
        <Box sx={{ mb: 6 }}>
          <GlassCard
            gradientStyle="primary"
            sx={{
              p: { xs: 3, md: 4 },
              textAlign: 'center',
              backdropFilter: 'blur(20px)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 4,
                background: 'linear-gradient(to right, #fff, rgba(255,255,255,0.7))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.75rem', md: '2rem' },
              }}
            >
              Premium Features You'll Love
            </Typography>
            
            <Grid container spacing={3}>
              {FEATURES.map((feature, index) => (
                <Grid item xs={6} sm={4} key={index}>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: theme.palette.primary.main,
                      }}
                    >
                      <CheckIcon fontSize="small" />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {feature}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </GlassCard>
        </Box>

      
      </Container>
    </Box>
  );
};

export default HowItWorksSection;