import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container, 
  InputAdornment, 
  Paper,
  Avatar,
  Divider,
  Link as MuiLink
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  AlternateEmail,
  ArrowForward,
  LockReset,
  ArrowBack
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import OTPVerification from './OTPVerification';
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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('email'); // 'email' or 'otp'
  const [otpData, setOtpData] = useState(null);
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    setIsLoading(true);
    
    try {
      // Call the forgot password API endpoint
      const data = await forgotPassword(email);

      if (data.success) {
        toast.success(data.message);
        
        // If OTP verification is required
        if (data.data?.requiresOTP) {
          setOtpData({
            sessionId: data.data.sessionId,
            email: data.data.email
          });
          setCurrentStep('otp');
        } else {
          // If direct email with reset link is sent
          toast.success('Password reset instructions sent to your email');
          setTimeout(() => navigate('/login'), 3000);
        }
      } else {
        toast.error(data.message || 'Failed to process your request');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP verification success
  const handleOTPSuccess = (data) => {
    // Navigate to reset password with token
    if (data.resetToken) {
      navigate(`/reset-password?token=${data.resetToken}`);
    } else {
      toast.success('Password reset email has been sent');
      navigate('/login');
    }
  };

  // Handle back to email form
  const handleBackToEmail = () => {
    setCurrentStep('email');
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
        purpose="reset-password"
        onSuccess={handleOTPSuccess}
        onBack={handleBackToEmail}
        onResendOTP={handleResendOTP}
        isLoading={isLoading}
      />
    );
  }

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
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Avatar sx={{ 
              width: 60, 
              height: 60, 
              bgcolor: '#6836e6',
              boxShadow: '0 0 20px rgba(104, 54, 230, 0.4)',
              mb: 2
            }}>
              <LockReset sx={{ fontSize: 30 }} />
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
              Forgot Your Password?
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: '400px' }}
            >
              Enter your email address below and we'll send you instructions to reset your password.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
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
              sx={{ mb: 4 }}
            />

            <GradientButton
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={isLoading}
              sx={{ py: 1.5 }}
              endIcon={
                <ArrowForward />
              }
            >
              {isLoading ? 'Sending...' : 'Reset Password'}
            </GradientButton>
          </Box>

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

export default ForgotPasswordPage;