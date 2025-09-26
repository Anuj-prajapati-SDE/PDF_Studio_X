import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { getApiUrl } from '../../utils/api';

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



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(getApiUrl('/auth/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Direct login without OTP
        localStorage.setItem('token', data.token);
        login(data.user);
        toast.success('Welcome back!');
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // No OTP verification is needed for login anymore

  return (
    <Box
      sx={{
        minHeight: '115vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'end',
    
        position: 'relative',
        backgroundColor: 'rgb(10, 10, 30)',
        overflow: 'hidden',
      }}
    >
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
            top: '15%',
            right: '5%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
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
            <div>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center',  justifyContent: 'center' }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: '#6836e6',
                  boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)'
                }}>
                  <div>
                    <LockOpen sx={{ fontSize: 30 }} />
                  </div>
                </Avatar>
                <Box sx={{ ml: 2 }} ju>
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
            </div>

            <div>
              <Box component="form" onSubmit={handleLogin} sx={{ mb: 3 }}>
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="outlined"
                  type="email"
                  required
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  required
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

                <div>
                  <GradientButton
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isLoading}
                    sx={{ py: 1.5 }}
                    endIcon={
                      <div>
                        <ArrowForward />
                      </div>
                    }
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </GradientButton>
                </div>
              </Box>
            </div>

            <div>
              <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="body2" sx={{ px: 2, color: 'rgba(255,255,255,0.6)' }}>
                  Or continue with
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
              </Box>

              <Grid container spacing={2} justifyContent={'center'}>
                <Grid item xs={4}>
                  <div>
                    <SocialButton fullWidth>
                      <Google sx={{ color: '#DB4437' }} />
                    </SocialButton>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <SocialButton fullWidth>
                      <Facebook sx={{ color: '#4267B2' }} />
                    </SocialButton>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div>
                    <SocialButton fullWidth>
                      <Apple sx={{ color: '#A2AAAD' }} />
                    </SocialButton>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* "Don't have an account" section */}
            <div>
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
            </div>
          </Grid>
        </Grid>
      </Container>
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
            top: '55%',
            left: '5%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, #6b43eeb5 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
          }}
        />
    </Box>
  );
};

export default LoginPage;