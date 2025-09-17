import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  InputAdornment, 
  IconButton,
  Paper,
  Avatar,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Visibility, 
  VisibilityOff, 
  Lock,
  ArrowForward,
  ArrowBack,
  Security
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

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

// Password strength indicator component
const PasswordStrengthIndicator = ({ password }) => {
  // Calculate password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    
    let strength = 0;
    
    // Length check
    if (pass.length >= 8) strength += 1;
    
    // Uppercase and lowercase check
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) strength += 1;
    
    // Number check
    if (/[0-9]/.test(pass)) strength += 1;
    
    // Special character check
    if (/[^a-zA-Z0-9]/.test(pass)) strength += 1;
    
    return strength;
  };
  
  const strength = getPasswordStrength(password);
  
  // Determine color and text based on strength
  const getColorAndText = () => {
    switch (strength) {
      case 0:
        return { color: '#f44336', text: 'Very Weak' };
      case 1:
        return { color: '#ff9800', text: 'Weak' };
      case 2:
        return { color: '#ffeb3b', text: 'Fair' };
      case 3:
        return { color: '#8bc34a', text: 'Good' };
      case 4:
        return { color: '#4caf50', text: 'Strong' };
      default:
        return { color: '#f44336', text: 'Very Weak' };
    }
  };
  
  const { color, text } = getColorAndText();
  
  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Password Strength:
        </Typography>
        <Typography variant="caption" sx={{ color }}>
          {text}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {[...Array(4)].map((_, i) => (
          <Box
            key={i}
            sx={{
              height: 4,
              flex: 1,
              borderRadius: 2,
              bgcolor: i < strength ? color : 'rgba(255, 255, 255, 0.1)',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyResetToken, resetPassword } = useAuth();
  
  // Extract token from URL
  const token = new URLSearchParams(location.search).get('token');
  
  // Verify token validity on component mount
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setTokenError('Reset token is missing. Please request a new password reset.');
        setIsVerifying(false);
        return;
      }
      
      try {
        console.log('Verifying token:', token);
        const data = await verifyResetToken(token);
        console.log('Token verification response:', data);
        
        if (data.success) {
          setTokenValid(true);
        } else {
          setTokenError(data.message || 'Invalid or expired token. Please request a new password reset.');
        }
      } catch (error) {
        console.error('Token verification error:', error);
        setTokenError('Network error. Please try again.');
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyToken();
  }, [token]);
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Sending reset password request with token:', token);
      // Call reset password API endpoint
      const data = await resetPassword(token, password);
      console.log('Reset password response:', data);
      
      if (data.success) {
        toast.success('Password reset successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        toast.error(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'rgb(10, 10, 30)',
        overflow: 'hidden',
      }}
    >
      {/* Lens flare effects */}
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
          bottom: '15%',
          left: '5%',
          width: '20rem',
          height: '20rem',
          background: 'radial-gradient(circle, #6b43eeb5 0%, rgba(125, 249, 255, 0) 70%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
        }}
      />

      <Container maxWidth="sm" sx={{ zIndex: 1, py: 4 }}>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, sm: 4 },
            background: 'rgba(20, 20, 40, 0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.2), 0 0 30px rgba(104, 54, 230, 0.1)',
            border: '1px solid rgba(255,255,255,0.05)',
            textAlign: 'center',
          }}
        >
          {isVerifying ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8 }}>
              <CircularProgress size={60} sx={{ color: '#6836e6', mb: 3 }} />
              <Typography variant="h6" sx={{ color: 'white' }}>
                Verifying your reset token...
              </Typography>
            </Box>
          ) : tokenValid ? (
            <>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Avatar sx={{ 
                  width: 60, 
                  height: 60, 
                  bgcolor: '#6836e6',
                  boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)',
                  mb: 2
                }}>
                  <Security sx={{ fontSize: 30 }} />
                </Avatar>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    color: '#fff',
                    letterSpacing: '-0.5px',
                    mb: 1
                  }}
                >
                  Reset Your Password
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}
                >
                  Create a strong password that you don't use for other websites.
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                <StyledTextField
                  fullWidth
                  label="New Password"
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
                  sx={{ mb: 1 }}
                />
                
                <PasswordStrengthIndicator password={password} />
                
                <StyledTextField
                  fullWidth
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  error={confirmPassword && password !== confirmPassword}
                  helperText={confirmPassword && password !== confirmPassword ? "Passwords don't match" : ''}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                        <Lock />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleClickShowConfirmPassword}
                          edge="end"
                          sx={{ color: 'rgba(255,255,255,0.5)' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 4 }}
                />

                <GradientButton
                  fullWidth
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={isLoading || !password || !confirmPassword || password !== confirmPassword}
                  sx={{ py: 1.5 }}
                  endIcon={
                    <ArrowForward />
                  }
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </GradientButton>
              </Box>
            </>
          ) : (
            <Box sx={{ py: 3 }}>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 4,
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  color: '#f44336',
                  '& .MuiAlert-icon': {
                    color: '#f44336'
                  }
                }}
              >
                {tokenError}
              </Alert>
              
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3 }}>
                The password reset link is invalid or has expired. Please request a new password reset.
              </Typography>
              
              <Button
                component={Link}
                to="/forgot-password"
                variant="contained"
                sx={{
                  background: 'linear-gradient(90deg, #6836e6 0%, #8561FF 100%)',
                  color: 'white',
                  fontWeight: 600,
                  borderRadius: '14px',
                  textTransform: 'none',
                  px: 3,
                  py: 1.2,
                }}
              >
                Request New Reset Link
              </Button>
            </Box>
          )}

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

          <Box sx={{ textAlign: 'center' }}>
            <Button 
              component={Link} 
              to="/login" 
              startIcon={<ArrowBack />}
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPasswordPage;