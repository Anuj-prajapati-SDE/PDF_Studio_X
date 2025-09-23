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
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApiUrl } from '../../utils/api';
import OTPVerification from './OTPVerification';
import toast from 'react-hot-toast';

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
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [currentStep, setCurrentStep] = useState('signup'); // 'signup' or 'otp'
  const [otpData, setOtpData] = useState(null);
  
  const isLargeScreen = useMediaQuery('(min-width:1200px)');
  const isMediumScreen = useMediaQuery('(min-width:900px)');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!agreeToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
 
    setIsLoading(true);
    
    try {
      const response = await fetch(getApiUrl('/auth/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setOtpData({ 
          sessionId: data.data.sessionId,
          email: data.data.email
        });
        setCurrentStep('otp');
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification success
  const handleOTPSuccess = (data) => {
    // Store token and user data
    localStorage.setItem('token', data.token);
    login(data.user);
    
    // Navigate to dashboard or home
    navigate('/');
  };

  // Handle back to signup form
  const handleBackToSignup = () => {
    setCurrentStep('signup');
    setOtpData(null);
  };

  // Handle OTP resend
  const handleResendOTP = (newSessionId) => {
    setOtpData(prev => ({
      ...prev,
      sessionId: newSessionId
    }));
  };

  // If we're in OTP verification step, show OTP component
  if (currentStep === 'otp' && otpData) {
    return (
      <OTPVerification
        email={otpData.email}
        sessionId={otpData.sessionId}
        purpose="signup"
        onSuccess={handleOTPSuccess}
        onBack={handleBackToSignup}
        onResendOTP={handleResendOTP}
        isLoading={isLoading}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: '125vh',
        display: 'flex',
        position: 'relative',
        alignItems:"end",
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
  
      <Container maxWidth="xl" sx={{ zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
        <Grid container spacing={0} sx={{ 
          maxWidth: 600,
          backgroundColor: 'rgba(20, 20, 40, 0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 30px rgba(104, 54, 230, 0.1)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>      
          
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
            <div>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Avatar sx={{ 
                  width: 50, 
                  height: 50, 
                  bgcolor: '#6836e6',
                  boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)'
                }}>
                  <div>
                    <Lock />
                  </div>
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
            </div>

            <div>
              <Box component="form" onSubmit={handleSignup} sx={{ mb: 3 }}>
              
                    <StyledTextField
                      fullWidth
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                    <StyledTextField
                      fullWidth
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                            <Person />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ mb: 2 }}
                    />
                 
          
                
                <StyledTextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  sx={{ mb: 2 }}
                />
                
                <StyledTextField
                  fullWidth
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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
                
                <StyledTextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  variant="outlined"
                  type={showConfirmPassword ? 'text' : 'password'}
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
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
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
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </GradientButton>
                </div>
              </Box>
            </div>

            <div>
              <Box sx={{ my: 3, display: 'flex', alignItems: 'center' }}>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
                <Typography variant="body2" sx={{ px: 2, color: 'rgba(255,255,255,0.6)' }}>
                  Or sign up with
                </Typography>
                <Divider sx={{ flex: 1, borderColor: 'rgba(255,255,255,0.1)' }} />
              </Box>

              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={4}>
                  <div>
                    <SocialButton fullWidth startIcon={<Google />}>
                      Google
                    </SocialButton>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <SocialButton fullWidth startIcon={<Facebook />}>
                      Facebook
                    </SocialButton>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div>
                    <SocialButton fullWidth startIcon={<Apple />}>
                      Apple
                    </SocialButton>
                  </div>
                </Grid>
              </Grid>
            </div>

            {/* "Already have an account" for mobile */}
            {!isMediumScreen && (
              <div>
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
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SignupPage;