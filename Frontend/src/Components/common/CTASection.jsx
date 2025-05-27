import React from 'react';
import { 
  Container, Box, Typography, Paper, Button,
  useMediaQuery, useTheme 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CTASection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [sectionRef, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        py: { xs: 8, md: 12 },
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 8 },
              pt: { xs: 6, md: 10 },
              pb: { xs: 6, md: 10 },
              borderRadius: { xs: 4, md: 6 },
              background: 'rgba(67, 97, 238, 0.85)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              color: 'white',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 15px 50px rgba(58, 12, 163, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Enhanced gradient background */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
                opacity: 0.9,
                zIndex: -1,
              }}
            />
            
            {/* Glass reflection overlay */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
                zIndex: -1,
              }}
            />
            
            {/* Animated decorative elements */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{ 
                duration: 20, 
                ease: "linear", 
                repeat: Infinity,
              }}
              style={{
                position: 'absolute',
                top: '10%',
                left: '5%',
                width: '20rem',
                height: '20rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />
            
            <motion.div
              animate={{ 
                rotate: [360, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ 
                duration: 25, 
                ease: "linear", 
                repeat: Infinity,
              }}
              style={{
                position: 'absolute',
                bottom: '5%',
                right: '8%',
                width: '15rem',
                height: '15rem',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: 0,
              }}
            />
            
            {/* Floating particles */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.3,
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z\' fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              backgroundSize: 'cover',
              zIndex: 0,
            }} />

            {/* Content container */}
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Typography
                  variant={isMobile ? "h4" : "h3"}
                  fontWeight={800}
                  sx={{ 
                    mb: 3, 
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    px: { xs: 1, md: 6 },
                  }}
                >
                  Ready to Transform Your PDFs?
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Typography 
                  variant={isMobile ? "body1" : "h6"} 
                  sx={{ 
                    mb: 5, 
                    opacity: 0.9, 
                    maxWidth: 600, 
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  Join thousands of users who have streamlined their document workflows 
                  with our suite of powerful PDF tools.
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                  delay: 0.6
                }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  component={RouterLink}
                  to="/tools/merge-pdf"
                  endIcon={
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ 
                        duration: 1.5, 
                        ease: "easeInOut", 
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    >
                      <ArrowForwardIcon />
                    </motion.div>
                  }
                  sx={{
                    background: 'rgba(255, 255, 255, 0.9)',
                    color: 'primary.main',
                    borderRadius: '50px',
                    px: { xs: 4, md: 5 },
                    py: 1.5,
                    fontSize: { xs: '0.95rem', md: '1.1rem' },
                    fontWeight: 600,
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 1)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                    },
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    textTransform: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                      transition: 'all 0.6s ease',
                    },
                    '&:hover::after': {
                      left: '100%',
                    }
                  }}
                >
                  Get Started — It's Free
                </Button>
              </motion.div>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CTASection;