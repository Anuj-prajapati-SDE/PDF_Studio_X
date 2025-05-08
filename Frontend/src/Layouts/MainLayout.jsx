import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box, AppBar, Container, useScrollTrigger, Slide } from '@mui/material';
import { motion } from 'framer-motion';
import Header from '../components/common/Header';
import Footer from '../Components/common/Footer';
import FloatingActionButton from '../Components/common/FloatingActionButton';
// import ParticlesBackground from '../Components/common/ParticlesBackground';

// Hide AppBar on scroll down
function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const MainLayout = () => {
  const location = useLocation();
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    // Only show particles on homepage
    setShowParticles(location.pathname === '/');
  }, [location]);

  const pageTransitionVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Particles background (only on homepage) */}
      {showParticles && ''} 
      {/* <ParticlesBackground /> */}
      
      {/* Header */}
      <HideOnScroll>
        <AppBar 
          position="sticky" 
          elevation={0} 
          sx={{ 
            bgcolor: showParticles ? 'transparent' : 'rgba(255, 255, 255, 0.95)', 
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Header />
        </AppBar>
      </HideOnScroll>
      
      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageTransitionVariants}
        >
          <Outlet />
        </motion.div>
      </Box>
      
      {/* Footer */}
      <Footer />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </Box>
  );
};

export default MainLayout;