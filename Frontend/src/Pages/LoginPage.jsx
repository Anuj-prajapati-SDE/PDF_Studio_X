import React, { useState } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  InputAdornment, 
  IconButton,
  Divider,
  Avatar,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
  Paper
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Visibility, 
  VisibilityOff, 
  AlternateEmail, 
  Lock,
  ArrowForward,
  Facebook,
  Google,
  Apple,
  LockOpen,
  Security
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

// Custom styled components
const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #6836e6 0%, #8561FF 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '12px 24px',
  borderRadius: '14px',
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 10px 30px -5px rgba(104, 54, 230, 0.4)',
  '&:hover': {
    background: 'linear-gradient(90deg, #5926db 0%, #7649ff 100%)',
    boxShadow: '0 15px 35px -5px rgba(104, 54, 230, 0.5)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const SocialButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '12px',
  padding: '10px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: theme.palette.mode === 'dark' ? 'white' : '#333',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: theme.palette.mode === 'dark' ? '#fff' : '#333',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(255, 255, 255, 0.07)',
      borderColor: '#6836e6',
      boxShadow: '0 0 0 2px rgba(104, 54, 230, 0.2)',
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#6836e6',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  border: '1px solid rgba(255, 255, 255, 0.05)',
  height: '100%',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-4px)',
  },
}));

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        position: 'relative',
        backgroundColor: 'rgb(10, 10, 30)',
        overflow: 'hidden',
      }}
    >
      {/* Background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 15% 50%, rgba(104, 54, 230, 0.3) 0%, rgba(0, 0, 0, 0) 35%), radial-gradient(circle at 85% 30%, rgba(125, 249, 255, 0.2) 0%, rgba(0, 0, 0, 0) 35%)',
          zIndex: 0,
        }}
      />

      {/* Animated gradient orbs */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          component={motion.div}
          initial={{ 
            x: Math.random() * 100 - 50, 
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.2
          }}
          animate={{ 
            x: Math.random() * 100 - 50, 
            y: Math.random() * 100 - 50,
            scale: Math.random() * 0.5 + 0.8,
            opacity: Math.random() * 0.4 + 0.3
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 20 + i * 5,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: { xs: '15rem', sm: '20rem', md: '30rem' },
            height: { xs: '15rem', sm: '20rem', md: '30rem' },
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(104, 54, 230, 0.15) 0%, rgba(104, 54, 230, 0) 70%)'
              : i % 3 === 1
                ? 'radial-gradient(circle, rgba(125, 249, 255, 0.15) 0%, rgba(125, 249, 255, 0) 70%)'
                : 'radial-gradient(circle, rgba(230, 54, 189, 0.1) 0%, rgba(230, 54, 189, 0) 70%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
          }}
        />
      ))}

      {/* Grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%236836e6\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M0 40L40 0H20L0 20M40 40V20L20 40\'/%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.3,
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="xl" sx={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Grid container spacing={0} sx={{ 
          maxWidth: 1400,
          backgroundColor: 'rgba(20, 20, 40, 0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 30px rgba(104, 54, 230, 0.1)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Left panel - Login Form */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{ 
              p: { xs: 3, sm: 4, md: 6 }, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
              order: { xs: 2, md: 1 },
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: '#6836e6',
                  boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)'
                }}>
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <LockOpen sx={{ fontSize: 30 }} />
                  </motion.div>
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Log in to your account
                  </Typography>
                </Box>
              </Box>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Box component="form" sx={{ mb: 3 }}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />
                
                <StyledTextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.5)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />

                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3,
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 0 },
                }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        defaultChecked 
                        sx={{
                          color: 'rgba(255,255,255,0.5)',
                          '&.Mui-checked': {
                            color: '#6836e6',
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                        Remember me
                      </Typography>
                    }
                  />
                  <Link to="/forgot-password" style={{ color: '#7df9ff', textDecoration: 'none', fontSize: '0.9rem' }}>
                    Forgot password?
                  </Link>
                </Box>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GradientButton
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{ py: 1.5 }}
                    endIcon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowForward />
                      </motion.div>
                    }
                  >
                    Sign In
                  </GradientButton>
                </motion.div>
              </Box>
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="body2" sx={{ px: 2, color: 'rgba(255,255,255,0.6)' }}>
                  Or continue with
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth>
                      <Google sx={{ color: '#DB4437' }} />
                    </SocialButton>
                  </motion.div>
                </Grid>
                <Grid item xs={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth>
                      <Facebook sx={{ color: '#4267B2' }} />
                    </SocialButton>
                  </motion.div>
                </Grid>
                <Grid item xs={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth>
                      <Apple sx={{ color: '#A2AAAD' }} />
                    </SocialButton>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

            {/* "Don't have an account" section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <Box sx={{ 
                mt: 4, 
                textAlign: 'center',
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(104, 54, 230, 0.1) 0%, rgba(125, 249, 255, 0.1) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  Don't have an account yet?
                </Typography>
                <Button 
                  component={Link} 
                  to="/signup" 
                  variant="outlined" 
                  sx={{
                    color: '#7df9ff',
                    borderColor: 'rgba(125, 249, 255, 0.5)',
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    '&:hover': {
                      borderColor: '#7df9ff',
                      backgroundColor: 'rgba(125, 249, 255, 0.05)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 5px 15px rgba(125, 249, 255, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                  endIcon={<ArrowForward />}
                >
                  Create Account
                </Button>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Right panel - Image/Branding */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{ 
              position: 'relative',
              minHeight: { xs: 'auto', md: 700 },
              display: 'flex',
              flexDirection: 'column',
              order: { xs: 1, md: 2 },
              overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(104, 54, 230, 0.8) 0%, rgba(48, 17, 125, 0.9) 100%)',
              p: { xs: 4, md: 6 },
            }}
          >
            <Box 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              sx={{
                position: 'relative',
                zIndex: 10,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <Typography 
                  variant="h2" 
                  fontWeight={800} 
                  sx={{ 
                    color: '#fff', 
                    mb: 2, 
                    letterSpacing: '-1px',
                    textShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  Premium Document{' '}
                  <Box 
                    component="span" 
                    sx={{ 
                      display: 'block', 
                      background: 'linear-gradient(90deg, #fff, #7df9ff)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontSize: { xs: '2.7rem', sm: '3.2rem', md: '3.7rem' },
                    }}
                  >
                    Management
                  </Box>
                </Typography>
              </motion.div>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 6, 
                    color: 'rgba(255,255,255,0.8)',
                    maxWidth: 500,
                    lineHeight: 1.6,
                    textAlign: { xs: 'center', md: 'left' },
                    fontSize: { xs: '1rem', md: '1.1rem' },
                  }}
                >
                  Log in to access our advanced document processing tools and begin managing your files with ease and security.
                </Typography>
              </motion.div>

              {/* Feature highlights */}
              <Grid container spacing={3}>
                {[
                  { 
                    title: 'Top-tier Security', 
                    description: 'Advanced encryption and secure storage for all documents.',
                    icon: <Security sx={{ fontSize: 30, color: '#7df9ff' }} />,
                    delay: 0.7
                  },
                  { 
                    title: 'Premium Tools', 
                    description: 'Access the most advanced document tools available.',
                    icon: <LockOpen sx={{ fontSize: 30, color: '#7df9ff' }} />,
                    delay: 0.9
                  },
                ].map((feature, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: feature.delay, duration: 0.8 }}
                      whileHover={{ y: -5 }}
                    >
                      <FeatureCard elevation={0}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <Box 
                            sx={{ 
                              mb: 2, 
                              display: 'inline-flex', 
                              p: 1.5, 
                              borderRadius: '12px',
                              background: 'rgba(125, 249, 255, 0.1)',
                            }}
                          >
                            {feature.icon}
                          </Box>
                          <Typography variant="h6" fontWeight={600} sx={{ mb: 1, color: 'white' }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </FeatureCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              {/* Premium badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                style={{
                  position: 'absolute',
                  top: '5%',
                  right: '5%',
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '40px',
                    border: '2px solid rgba(125, 249, 255, 0.3)',
                    px: 2,
                    py: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Box
                    component={motion.div}
                    animate={{ 
                      rotate: 360,
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #7df9ff, #6836e6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    <Box 
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'white',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      letterSpacing: 0.5,
                      textTransform: 'uppercase',
                    }}
                  >
                    Premium
                  </Typography>
                </Box>
              </motion.div>
            </Box>
              
            {/* Decorative elements */}
            <Box
              component={motion.div}
              animate={{ 
                y: ['-5%', '5%', '-5%'],
                rotate: ['-2deg', '2deg', '-2deg'],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 10,
                ease: 'easeInOut',
              }}
              sx={{
                position: 'absolute',
                top: 'auto',
                bottom: '-5%',
                left: '-10%',
                width: '120%',
                height: '45%',
                background: 'linear-gradient(180deg, rgba(125, 249, 255, 0) 0%, rgba(125, 249, 255, 0.1) 100%)',
                borderRadius: '100% 100% 0 0',
                filter: 'blur(20px)',
                zIndex: 1,
              }}
            />
            
            <Box
              component={motion.div}
              animate={{ 
                opacity: [0.6, 0.8, 0.6],
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
              }}
              sx={{
                position: 'absolute',
                top: '10%',
                right: '10%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(104, 54, 230, 0.3) 0%, rgba(104, 54, 230, 0) 70%)',
                borderRadius: '50%',
                filter: 'blur(40px)',
                zIndex: 0,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;