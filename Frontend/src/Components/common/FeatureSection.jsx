import React, { useRef, useEffect } from 'react';
import { 
  Container, Box, Typography, Grid, Card, Button, Chip,
  useMediaQuery, useTheme
} from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useInView } from 'react-intersection-observer';

const FeatureSection = ({ tools }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [sectionRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        py: { xs: 8, md: 10 },
        my: { xs: 4, md: 6 },
        borderRadius: { xs: 0, md: '16px' },
        overflow: 'hidden',
        // background: 'rgba(255,255,255,0.02)',
        // backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        // border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      }}
    >
      {/* Subtle gradient background */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        // background: 'linear-gradient(135deg, rgba(67,97,238,0.05) 0%, rgba(58,12,163,0.08) 100%)',
        zIndex: 0,
      }} />
      
      {/* Subtle gradient orbs */}
      <Box sx={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(67,97,238,0.15) 0%, rgba(67,97,238,0) 70%)',
        top: '-100px',
        right: '-100px',
        filter: 'blur(50px)',
        zIndex: 1,
      }} />
      
      <Box sx={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(114,9,183,0.12) 0%, rgba(114,9,183,0) 70%)',
        bottom: '-80px',
        left: '-80px',
        filter: 'blur(50px)',
        zIndex: 1,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 6, md: 8 },
          }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Chip
                label="Features"
                color="primary"
                sx={{
                  fontWeight: 600,
                  px: 2.5,
                  py: 3,
                  borderRadius: '50px',
                  backgroundColor: 'rgba(67, 97, 238, 0.12)',
                  color: 'primary.main',
                  mb: 3,
                  backdropFilter: 'blur(5px)',
                  boxShadow: '0 4px 12px rgba(67, 97, 238, 0.12)',
                  border: '1px solid rgba(67, 97, 238, 0.2)',
                }}
              />
            </motion.div>
            
            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h2"
              sx={{
                fontWeight: 800,
                mb: { xs: 2, md: 3 },
                // background: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}
            >
              Every PDF Tool You Need
            </Typography>
            
            <Typography
              variant={isMobile ? "body1" : "h6"}
              color="text.secondary"
              sx={{ 
                maxWidth: '700px', 
                mx: 'auto', 
                fontWeight: 400,
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              From simple conversions to complex editing, our suite of tools handles it all
              with unmatched precision and ease.
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: { xs: 3, md: 4 },
                    p: { xs: 3, md: 4 },
                    transition: 'all 0.3s ease',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'visible',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                    },
                    // Glass highlight effect
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '60%',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 100%)',
                      borderTopLeftRadius: 'inherit',
                      borderTopRightRadius: 'inherit',
                      pointerEvents: 'none',
                    }
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: -5, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Box
                      sx={{
                        width: { xs: 60, md: 70 },
                        height: { xs: 60, md: 70 },
                        borderRadius: 3,
                        bgcolor: tool.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: `0 8px 20px ${tool.color}30`,
                        mb: 3,
                        transform: 'rotate(-5deg)',
                        position: 'relative',
                        // Icon inner glass highlight
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          borderRadius: 'inherit',
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%)',
                          top: 0,
                          left: 0,
                        }
                      }}
                    >
                      {tool.icon}
                    </Box>
                  </motion.div>

                  <Typography 
                    variant="h5" 
                    gutterBottom 
                    fontWeight={700}
                    sx={{
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      mb: 1.5,
                      // Subtle text gradient
                      background: `linear-gradient(135deg, ${theme.palette.text.primary} 30%, ${theme.palette.text.secondary} 100%)`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {tool.title}
                  </Typography>

                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    sx={{
                      mb: 3, 
                      opacity: 0.85,
                      lineHeight: 1.6,
                      fontSize: { xs: '0.875rem', md: '1rem' }
                    }}
                  >
                    {tool.description}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Button
                      variant="text"
                      component={RouterLink}
                      to={tool.path}
                      endIcon={
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <ArrowForwardIcon />
                        </motion.div>
                      }
                      sx={{ 
                        fontWeight: 600, 
                        color: tool.color,
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: `${tool.color}10`,
                        },
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                      }}
                    >
                      Try Now
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;