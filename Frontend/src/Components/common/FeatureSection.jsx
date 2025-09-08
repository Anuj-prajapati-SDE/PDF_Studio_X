import React, { useRef } from 'react';
import { 
  Container, Box, Typography, Grid, Card, Button, Chip,
  useMediaQuery, useTheme
} from '@mui/material';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeatureSection = ({ tools }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Create refs for scroll-based animations
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  
  // Track when elements come into view
  const titleInView = useInView(titleRef, { 
    once: true, 
    threshold: 0.2,
    margin: "-80px 0px"
  });
  
  const gridInView = useInView(gridRef, { 
    once: true, 
    threshold: 0.05,
    margin: "-30px 0px"
  });

  // Smooth custom easing functions
  const smoothEase = [0.25, 0.1, 0.25, 1];
  const bounceEase = [0.68, -0.55, 0.265, 1.55];
  const smoothSpring = { type: "spring", stiffness: 120, damping: 14, mass: 0.8 };
  const gentleSpring = { type: "spring", stiffness: 80, damping: 12, mass: 1 };

  // Animation variants with enhanced smoothness
  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.96,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: smoothEase,
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: 10,
      rotateY: 5,
      scale: 0.92,
      filter: "blur(3px)"
    },
    visible: (index) => ({ 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        delay: index * 0.08,
        ease: smoothEase,
        ...smoothSpring
      }
    })
  };

  const iconVariants = {
    hidden: { 
      scale: 0.3, 
      rotate: -90,
      opacity: 0
    },
    visible: { 
      scale: 1, 
      rotate: 0,
      opacity: 1,
      transition: { 
        ...gentleSpring,
        delay: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        my: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          ref={titleRef}
          variants={titleVariants}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
        >
          <Box sx={{ 
            textAlign: 'center', 
            mb: { xs: 6, md: 8 },
          }}>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  transition: { 
                    duration: 0.8, 
                    ease: smoothEase,
                    ...gentleSpring
                  }
                }
              }}
            >
              <Chip
                label="Features"
                color="primary"
                sx={{
                  fontWeight: 600,
                  px: 2.5,
                  py: 3,
                  borderRadius: '50px',
                  mb: 3,
                }}
              />
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40, filter: "blur(2px)" },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  filter: "blur(0px)",
                  transition: { 
                    duration: 1, 
                    delay: 0.15, 
                    ease: smoothEase 
                  }
                }
              }}
            >
              <Typography
                variant={isMobile ? "h3" : "h2"}
                component="h2"
                sx={{
                  fontWeight: 800,
                  mb: { xs: 2, md: 3 },
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                }}
              >
                Every PDF Tool You Need
              </Typography>
            </motion.div>
            
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30, filter: "blur(2px)" },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  filter: "blur(0px)",
                  transition: { 
                    duration: 1, 
                    delay: 0.3, 
                    ease: smoothEase 
                  }
                }
              }}
            >
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
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} ref={gridRef}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={8} md={6} lg={2} key={index}>
              <motion.div
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={gridInView ? "visible" : "hidden"}
                whileHover={{ 
                  y: -12,
                  scale: 1.03,
                  rotateY: 2,
                  transition: { 
                    ...smoothSpring,
                    duration: 0.4
                  }
                }}
                whileTap={{ 
                  scale: 0.97,
                  transition: { duration: 0.1 }
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: { xs: 'auto', lg: '300px' }, // Fixed height for laptop screens
                    minHeight: { xs: '300px', sm: '350px' }, // Minimum height for smaller screens
                    borderRadius: { xs: 3, md: 4 },
                    p: { xs: 3, md: 4 },
                    transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    color: 'white',
                    flexDirection: 'column',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                      background: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateZ(10px)',
                    }
                  }}
                >
                  <motion.div
                    variants={iconVariants}
                    whileHover={{ 
                      scale: 1.15,
                      rotate: 8,
                      transition: { 
                        ...gentleSpring,
                        duration: 0.5
                      }
                    }}
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
                        mb: 3,
                      }}
                    >
                      {tool.icon}
                    </Box>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -30, filter: "blur(1px)" },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        filter: "blur(0px)",
                        transition: { 
                          duration: 0.8, 
                          delay: 0.3 + index * 0.05,
                          ease: smoothEase
                        }
                      }
                    }}
                  >
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      fontWeight={700}
                      sx={{
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        mb: 1.5,
                      }}
                    >
                      {tool.title}
                    </Typography>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -30, filter: "blur(1px)" },
                      visible: { 
                        opacity: 1, 
                        x: 0,
                        filter: "blur(0px)",
                        transition: { 
                          duration: 0.8, 
                          delay: 0.4 + index * 0.05,
                          ease: smoothEase
                        }
                      }
                    }}
                  >
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
                  </motion.div>

                  <Box sx={{ mt: 'auto' }}>
                    <motion.div 
                      variants={{
                        hidden: { opacity: 0, y: 20, scale: 0.9 },
                        visible: { 
                          opacity: 1, 
                          y: 0,
                          scale: 1,
                          transition: { 
                            duration: 0.8, 
                            delay: 0.5 + index * 0.05,
                            ease: smoothEase,
                            ...gentleSpring
                          }
                        }
                      }}
                      whileHover={{ 
                        x: 8,
                        scale: 1.05,
                        transition: { 
                          duration: 0.3,
                          ease: smoothEase
                        }
                      }}
                    >
                      <Button
                        variant="text"
                        component={RouterLink}
                        to={tool.path}
                        endIcon={<ArrowForwardIcon />}
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
                    </motion.div>
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