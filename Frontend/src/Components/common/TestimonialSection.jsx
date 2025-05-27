import React, { useRef } from 'react';
import { 
  Container, Box, Typography, Card, Chip, Avatar,
  useMediaQuery, useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import Swiper and its modules
import { Swiper, SwiperSlide } from 'swiper/react';
// import { EffectCoverflow, Pagination } from 'swiper';
import { Autoplay, EffectCoverflow, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const TestimonialSection = ({ testimonials }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [sectionRef, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.02)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {/* Gradient background elements */}
      <Box sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'linear-gradient(135deg, rgba(67,97,238,0.05) 0%, rgba(58,12,163,0.08) 100%)',
        zIndex: 0,
      }} />
      
      {/* Subtle gradient orbs */}
      <Box sx={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(76,201,240,0.15) 0%, rgba(76,201,240,0) 70%)',
        top: '-150px',
        left: '-100px',
        filter: 'blur(50px)',
        zIndex: 1,
      }} />
      
      <Box sx={{
        position: 'absolute',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(114,9,183,0.12) 0%, rgba(114,9,183,0) 70%)',
        bottom: '-120px',
        right: '-80px',
        filter: 'blur(60px)',
        zIndex: 1,
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Chip
                label="Testimonials"
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
              fontWeight={800} 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              What Our Users Say
            </Typography>
            
            <Typography
              variant={isMobile ? "body1" : "h6"}
              color="text.secondary"
              sx={{ 
                maxWidth: 700, 
                mx: 'auto', 
                fontWeight: 400,
                lineHeight: 1.6,
                opacity: 0.9,
              }}
            >
              Join thousands of satisfied users who have transformed their document workflows
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={isMobile ? 1 : isTablet ? 2 : 3}
            coverflowEffect={{
              rotate: 35,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            style={{
              paddingBottom: '50px', // Space for pagination bullets
              paddingTop: '20px',
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                {({ isActive }) => (
                  <motion.div
                    initial={false}
                    animate={
                      isActive
                        ? { scale: 1, y: -15, opacity: 1 }
                        : { scale: 0.9, y: 0, opacity: 0.8 }
                    }
                    transition={{ duration: 0.5 }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        mx: 2,
                        my: 4,
                        p: 4,
                        borderRadius: 4,
                        height: 280,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: isActive 
                          ? '0 20px 40px rgba(0, 0, 0, 0.18)' 
                          : '0 10px 30px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        position: 'relative',
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
                      <Box sx={{ display: 'flex', mb: 2 }}>
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={isActive ? { opacity: 1, y: 0 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.1 + i * 0.08,
                            }}
                          >
                            <Box
                              component="span"
                              sx={{
                                color: i < testimonial.rating ? '#FFD700' : 'rgba(255,255,255,0.2)',
                                fontSize: '1.2rem',
                                mr: 0.5,
                                textShadow: i < testimonial.rating ? '0 0 10px rgba(255,215,0,0.3)' : 'none',
                              }}
                            >
                              ★
                            </Box>
                          </motion.div>
                        ))}
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          fontStyle: 'italic',
                          mb: 'auto',
                          fontSize: '1.1rem',
                          lineHeight: 1.6,
                          color: isActive ? 'text.primary' : 'text.secondary',
                          opacity: isActive ? 1 : 0.9,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        "{testimonial.quote}"
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          <Avatar
                            src={testimonial.avatar}
                            sx={{ 
                              width: 48, 
                              height: 48, 
                              mr: 2,
                              border: '2px solid rgba(255,255,255,0.2)',
                              boxShadow: isActive ? '0 4px 10px rgba(0,0,0,0.15)' : 'none',
                            }}
                          />
                        </motion.div>
                        <Box>
                          <Typography 
                            variant="subtitle1" 
                            fontWeight={600}
                            sx={{
                              background: isActive 
                                ? 'linear-gradient(90deg, #4361ee 0%, #3a0ca3 100%)' 
                                : 'none',
                              backgroundClip: isActive ? 'text' : 'none',
                              WebkitBackgroundClip: isActive ? 'text' : 'none',
                              WebkitTextFillColor: isActive ? 'transparent' : 'inherit',
                              transition: 'all 0.3s ease',
                            }}
                          >
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.role}, {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TestimonialSection;