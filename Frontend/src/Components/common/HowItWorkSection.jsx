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
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionTemplate, 
  useSpring, 
  useAnimation,
  useInView 
} from 'framer-motion';
import { 
  CloudUpload as UploadIcon,
  Dns as ProcessIcon,
  GetApp as DownloadIcon,
  AccessTime as TimeIcon,
  AccountCircle as UserIcon,
  Security as SecurityIcon,
  Check as CheckIcon
} from '@mui/icons-material';

// Current date/time and user data
const CURRENT_DATETIME = "2025-05-09 09:52:03";
const CURRENT_USER = "Anuj-prajapati-SDE";

// Premium glass morphism card component
const GlassCard = styled(motion.div)(({ theme, gradientStyle = 'primary' }) => {
  // Define gradient styles
  const gradients = {
    primary: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(79, 70, 229, 0.12) 100%)',
    purple: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(124, 58, 237, 0.12) 100%)',
    blue: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.12) 100%)',
  };
  
  // Define border colors
  const borders = {
    primary: 'rgba(99, 102, 241, 0.2)',
    purple: 'rgba(139, 92, 246, 0.2)',
    blue: 'rgba(59, 130, 246, 0.2)',
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
  // Define gradient styles
  const gradients = {
    primary: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
    purple: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    blue: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  };
  
  // Define shadow colors
  const shadows = {
    primary: '0 8px 16px -4px rgba(99, 102, 241, 0.5)',
    purple: '0 8px 16px -4px rgba(139, 92, 246, 0.5)',
    blue: '0 8px 16px -4px rgba(59, 130, 246, 0.5)',
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
const Shimmer = styled(motion.div)({
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
const GlowDot = ({ size = 6, color = '#6366f1', pulseSize = 16, ...props }) => (
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
    gradient: 'purple',
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
    gradient: 'blue',
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

// Component for the current time and user display
const UserInfoDisplay = ({ currentTime, currentUser }) => {
  const [seconds, setSeconds] = useState(parseInt(currentTime.split(':')[2]));
  
  // Extract user initials
  const userParts = currentUser.split('-');
  const userInitials = userParts.length > 1 
    ? `${userParts[0][0]}${userParts[1][0]}`.toUpperCase()
    : userParts[0].substring(0, 2).toUpperCase();
  
  // Update the seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => (prev + 1) % 60);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time with the updated seconds
  const [date, time] = currentTime.split(' ');
  const formattedTime = `${time.substring(0, 5)}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      sx={{
        position: 'relative',
        mt: { xs: 4, md: 6 },
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        p: { xs: 2, md: 3 },
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        overflow: 'hidden',
      }}
    >
      <Shimmer
        animate={{ x: [-500, 500] }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          ease: 'easeInOut',
          repeatDelay: 5,
        }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
            color: 'white',
            fontWeight: 700,
            width: { xs: 40, md: 48 },
            height: { xs: 40, md: 48 },
            boxShadow: '0 5px 15px rgba(99, 102, 241, 0.4)',
          }}
        >
          {userInitials}
        </Avatar>
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem',
              mb: 0.5,
            }}
          >
            CURRENT USER
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'white',
              fontWeight: 600,
              fontSize: '1rem',
            }}
          >
            {currentUser}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TimeIcon 
          sx={{ 
            color: '#6366f1',
            fontSize: { xs: '1.5rem', md: '2rem' },
          }} 
        />
        <Box>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem',
              mb: 0.5,
            }}
          >
            UTC TIME
          </Typography>
          <Box
            component={motion.div}
            animate={{
              opacity: [1, 1, 1],
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: 'white',
                fontWeight: 600,
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontFamily: 'monospace',
                letterSpacing: 1,
              }}
            >
              {date} {' '}
              <Box
                component="span"
                sx={{
                  color: '#6366f1',
                }}
              >
                {formattedTime}
              </Box>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          py: 0.75,
          px: 2,
          border: '1px solid rgba(16, 185, 129, 0.2)',
        }}
      >
        <SecurityIcon 
          fontSize="small" 
          sx={{ color: '#10B981' }} 
        />
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#10B981',
            fontWeight: 600,
            whiteSpace: 'nowrap',
          }}
        >
          Secure Connection
        </Typography>
      </Box>
    </Box>
  );
};

// Step Card Component
const StepCard = ({ step, index, sectionRef }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Scroll-based animation calculations
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
    containerRef: sectionRef
  });
  
  // Smoothen the scroll progress for better animation
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Transform values based on scroll position
  const translateY = useTransform(smoothProgress, [0, 0.5, 1], [50, 0, -30]);
  const opacity = useTransform(smoothProgress, [0, 0.3, 0.9], [0.3, 1, 0.8]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.9, 1, 0.98]);
  const rotate = useTransform(smoothProgress, [0, 0.5, 1], [-0.5, 0, 0.5]);
  
  // 3D tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  
  const handleTiltMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    setTilt({ x: tiltX, y: tiltY });
  };
  
  const handleTiltLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <Box
      ref={cardRef}
      component={motion.div}
      style={{
        y: translateY,
        opacity,
        scale,
        rotateZ: rotate,
      }}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      sx={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <GlassCard
        gradientStyle={step.gradient}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.2s ease',
        }}
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {/* Shimmer effect */}
        <Shimmer
          animate={{ x: [-500, 500] }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.5,
            ease: 'easeInOut',
            repeatDelay: 5,
          }}
        />
        
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
              background: step.gradient === 'primary'
                ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                : step.gradient === 'purple'
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
                  : 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              fontWeight: 800,
              fontSize: '1.5rem',
              boxShadow: step.gradient === 'primary'
                ? '0 8px 16px -3px rgba(99, 102, 241, 0.4)'
                : step.gradient === 'purple'
                  ? '0 8px 16px -3px rgba(139, 92, 246, 0.4)'
                  : '0 8px 16px -3px rgba(59, 130, 246, 0.4)',
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
              color={
                step.gradient === 'primary' ? '#6366f1' :
                step.gradient === 'purple' ? '#8b5cf6' : '#3b82f6'
              }
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
              background: step.gradient === 'primary'
                ? 'linear-gradient(to right, #6366f1, #4f46e5)'
                : step.gradient === 'purple'
                  ? 'linear-gradient(to right, #8b5cf6, #7c3aed)'
                  : 'linear-gradient(to right, #3b82f6, #2563eb)',
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
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  // Animation for the main title
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  // Parse date and time (for display)
  const [date, time] = CURRENT_DATETIME.split(" ");

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 10, md: 15 },
        backgroundColor: '#0f172a', // Deep blue background
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
            background: `
              radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 50%),
              radial-gradient(circle at 90% 20%, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 60%),
              radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0) 60%)
            `,
            zIndex: 0,
          }}
        />
        
        {/* Grid pattern */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%236366f1\' fill-opacity=\'0.03\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/svg%3E")',
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
                ? 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0) 70%)'
                : i === 1 
                  ? 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(139, 92, 246, 0) 70%)'
                  : 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(59, 130, 246, 0) 70%)',
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
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={controls}
          variants={titleVariants}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
            <Chip
              label="HOW IT WORKS"
              sx={{
                fontWeight: 600,
                px: 2.5,
                py: 3,
                borderRadius: '30px',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                color: '#6366f1',
                border: '1px solid rgba(99, 102, 241, 0.2)',
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
                background: 'linear-gradient(to right, #6366f1, #818cf8, #4f46e5)',
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
                  border: '2px dashed rgba(99, 102, 241, 0.3)',
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
        </motion.div>

        {/* Steps Display */}
        <Grid 
          container 
          spacing={{ xs: 4, sm: 6, md: 8 }}
          sx={{ mb: { xs: 6, md: 10 } }}
        >
          {STEPS.map((step, index) => (
            <Grid item xs={12} md={4} key={step.id}>
              <StepCard step={step} index={index} sectionRef={sectionRef} />
            </Grid>
          ))}
        </Grid>

        {/* Features List */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          sx={{ mb: 6 }}
        >
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
                    component={motion.div}
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
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
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#6366f1',
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

        {/* User Info Display */}
        <UserInfoDisplay 
          currentTime={CURRENT_DATETIME} 
          currentUser={CURRENT_USER} 
        />
      </Container>
    </Box>
  );
};

export default HowItWorksSection;