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
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Visibility, 
  VisibilityOff, 
  AlternateEmail, 
  Person, 
  Lock,
  ArrowForward,
  Facebook,
  Google,
  Apple,
  CheckCircle
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
  padding: '12px 20px',
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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
          
          {/* Left panel - Image/Branding */}
          {isMediumScreen && (
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{ 
                position: 'relative',
                minHeight: 700,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(104, 54, 230, 0.8) 0%, rgba(48, 17, 125, 0.9) 100%)',
              }}
            >
              <Box 
                component={motion.div}
                initial={{ rotate: -5, scale: 0.95 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 1 }}
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  zIndex: 2,
                  px: 4,
                }}
              >
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <Typography 
                    variant="h3" 
                    fontWeight={800} 
                    sx={{ 
                      color: '#fff', 
                      mb: 2, 
                      letterSpacing: '-0.5px',
                      textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                      fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
                    }}
                  >
                    Join our Premium
                    <Box 
                      component="span" 
                      sx={{ 
                        display: 'block', 
                        background: 'linear-gradient(90deg, #fff, #7df9ff)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: { xs: '2.2rem', sm: '2.5rem', md: '3rem' },
                      }}
                    >
                      Document Platform
                    </Box>
                  </Typography>
                </motion.div>
                
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      mb: 4, 
                      color: 'rgba(255,255,255,0.8)',
                      maxWidth: 450,
                      lineHeight: 1.6,
                    }}
                  >
                    Transform how you work with documents. Our platform offers powerful tools for document management, editing, and collaboration.
                  </Typography>
                </motion.div>

                {/* Feature highlights */}
                <Box sx={{ mb: 4 }}>
                  {[
                    { label: 'Advanced Document Processing', delay: 0.7 },
                    { label: 'Secure and Private', delay: 0.9 },
                    { label: 'Collaborate in Real-time', delay: 1.1 },
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: feature.delay, duration: 0.8 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <CheckCircle sx={{ color: '#7df9ff', mr: 1.5, fontSize: 22 }} />
                        <Typography variant="body1" color="white" fontWeight={500}>
                          {feature.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* "Already have an account" for mobile */}
                <Box sx={{ mt: 'auto', display: { xs: 'none', md: 'block' } }}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                  >
                    <Box 
                      sx={{ 
                        mt: 6, 
                        py: 2.5, 
                        px: 3, 
                        borderRadius: '12px',
                        backdropFilter: 'blur(10px)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        border: '1px solid rgba(255,255,255,0.1)',
                      }}
                    >
                      <Typography color="white" variant="body2" sx={{ mb: 1 }}>
                        Already have an account?
                      </Typography>
                      <Button 
                        component={Link} 
                        to="/login" 
                        variant="outlined" 
                        sx={{
                          color: 'white',
                          borderColor: '#7df9ff',
                          borderRadius: '10px',
                          textTransform: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: '#7df9ff',
                            backgroundColor: 'rgba(125, 249, 255, 0.1)',
                          }
                        }}
                        endIcon={<ArrowForward />}
                      >
                        Sign In
                      </Button>
                    </Box>
                  </motion.div>
                </Box>
              </Box>
              
              {/* Decorative elements */}
              <Box
                component={motion.div}
                animate={{ 
                  y: ['-2%', '2%', '-2%'],
                  rotate: ['-1deg', '1deg', '-1deg'],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 10,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'absolute',
                  top: 'auto',
                  bottom: '-10%',
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
                  opacity: [0.7, 0.9, 0.7],
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 8,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'absolute',
                  top: '10%',
                  right: '5%',
                  width: '40%',
                  height: '40%',
                  background: 'radial-gradient(circle, rgba(230, 54, 189, 0.2) 0%, rgba(230, 54, 189, 0) 70%)',
                  borderRadius: '50%',
                  filter: 'blur(40px)',
                  zIndex: 0,
                }}
              />
            </Grid>
          )}
          
          {/* Right panel - Signup Form */}
          <Grid 
            item 
            xs={12} 
            md={6}
            sx={{ 
              p: { xs: 3, sm: 4, md: 6 }, 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ 
                  width: 50, 
                  height: 50, 
                  bgcolor: '#6836e6',
                  boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)'
                }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  >
                    <Lock />
                  </motion.div>
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#fff',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Create Account
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'rgba(255,255,255,0.7)' }}
                  >
                    Sign up to get started with our platform
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
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                </Grid>
                
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
                  sx={{ mb: 2 }}
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
                
                <StyledTextField
                  fullWidth
                  label="Confirm Password"
                  variant="outlined"
                  type={showConfirmPassword ? 'text' : 'password'}
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
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.5)' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

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
                      I agree to the <Link to="/terms" style={{ color: '#7df9ff', textDecoration: 'none' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: '#7df9ff', textDecoration: 'none' }}>Privacy Policy</Link>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />

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
                    Create Account
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
                  Or sign up with
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth startIcon={<Google />}>
                      Google
                    </SocialButton>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth startIcon={<Facebook />}>
                      Facebook
                    </SocialButton>
                  </motion.div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <SocialButton fullWidth startIcon={<Apple />}>
                      Apple
                    </SocialButton>
                  </motion.div>
                </Grid>
              </Grid>
            </motion.div>

            {/* "Already have an account" for mobile */}
            {!isMediumScreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ mb: 1.5, color: 'rgba(255,255,255,0.7)' }}>
                    Already have an account?
                  </Typography>
                  <Button 
                    component={Link} 
                    to="/login" 
                    variant="outlined" 
                    sx={{
                      color: '#7df9ff',
                      borderColor: 'rgba(125, 249, 255, 0.5)',
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontWeight: 600,
                      px: 3,
                      '&:hover': {
                        borderColor: '#7df9ff',
                        backgroundColor: 'rgba(125, 249, 255, 0.05)',
                      }
                    }}
                    endIcon={<ArrowForward />}
                  >
                    Sign In
                  </Button>
                </Box>
              </motion.div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;