import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Paper,
  IconButton,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  ArrowBack,
  Refresh,
  CheckCircle,
  Error as ErrorIcon,
  Email,
  Timer
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Styled components
const OTPInput = styled('input')(({ theme, error }) => ({
  width: '50px',
  height: '50px',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center',
  border: `2px solid ${error ? '#f44336' : 'rgba(255, 255, 255, 0.2)'}`,
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  color: '#fff',
  outline: 'none',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(10px)',
  '&:focus': {
    borderColor: error ? '#f44336' : '#6836e6',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    boxShadow: `0 0 0 3px ${error ? 'rgba(244, 67, 54, 0.2)' : 'rgba(104, 54, 230, 0.3)'}`,
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  [theme.breakpoints.down('sm')]: {
    width: '45px',
    height: '45px',
    fontSize: '20px',
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #6836e6 0%, #8561FF 100%)',
  color: 'white',
  fontWeight: 600,
  padding: '12px 32px',
  borderRadius: '14px',
  textTransform: 'none',
  fontSize: '1rem',
  boxShadow: '0 10px 30px -5px rgba(104, 54, 230, 0.4)',
  '&:hover': {
    background: 'linear-gradient(90deg, #5926db 0%, #7649ff 100%)',
    boxShadow: '0 15px 35px -5px rgba(104, 54, 230, 0.5)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: 'rgba(104, 54, 230, 0.3)',
    boxShadow: 'none',
    transform: 'none',
  },
  transition: 'all 0.3s ease',
}));

const ResendButton = styled(Button)(({ theme }) => ({
  color: '#7df9ff',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: 'rgba(125, 249, 255, 0.1)',
  },
  '&:disabled': {
    color: 'rgba(125, 249, 255, 0.3)',
  },
}));

const OTPVerification = ({
  email,
  sessionId,
  purpose = 'verification',
  onSuccess,
  onBack,
  onResendOTP,
  isLoading = false,
  error = null
}) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef([]);
  const theme = useTheme();

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  // Resend cooldown effect
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Handle OTP input change
  const handleOTPChange = (index, value) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOTP = value.slice(0, 6).split('');
      const newOTP = [...otp];
      pastedOTP.forEach((digit, idx) => {
        if (idx < 6 && /^\d$/.test(digit)) {
          newOTP[idx] = digit;
        }
      });
      setOtp(newOTP);
      
      // Focus on the last filled input or next empty input
      const lastFilledIndex = Math.min(pastedOTP.length - 1, 5);
      inputRefs.current[lastFilledIndex]?.focus();
      return;
    }

    if (/^\d$/.test(value) || value === '') {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOtp(newOTP);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }

      // Auto-submit if all fields are filled
      if (value && newOTP.every(digit => digit !== '')) {
        handleVerifyOTP(newOTP.join(''));
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Verify OTP
  const handleVerifyOTP = async (otpCode = null) => {
    const otpToVerify = otpCode || otp.join('');
    
    if (otpToVerify.length !== 6) {
      toast.error('Please enter the complete OTP');
      return;
    }

    setIsVerifying(true);

    try {
      const endpoint = purpose === 'signup' 
        ? '/api/auth/verify-signup-otp' 
        : '/api/auth/verify-login-otp';

      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          otp: otpToVerify,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        onSuccess(data);
      } else {
        toast.error(data.message);
        
        // Clear OTP inputs on error
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        
        // If max attempts exceeded, redirect back
        if (data.code === 'MAX_ATTEMPTS_EXCEEDED') {
          setTimeout(() => onBack(), 2000);
        }
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('Network error. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    if (!canResend || resendCooldown > 0) return;

    try {
      const response = await fetch('http://localhost:5000/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('OTP resent successfully!');
        setTimeLeft(300); // Reset timer
        setCanResend(false);
        setResendCooldown(30); // 30 second cooldown
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
        
        // Update session ID if provided
        if (data.data?.sessionId && onResendOTP) {
          onResendOTP(data.data.sessionId);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Get purpose-specific content
  const getContent = () => {
    const contents = {
      signup: {
        title: 'Verify Your Email',
        description: 'We\'ve sent a verification code to your email address. Please enter it below to complete your registration.',
        icon: <Email sx={{ fontSize: 40, color: '#6836e6' }} />
      },
      login: {
        title: 'Secure Login',
        description: 'Please enter the verification code sent to your email to complete your login.',
        icon: <CheckCircle sx={{ fontSize: 40, color: '#6836e6' }} />
      },
      verification: {
        title: 'Email Verification',
        description: 'Please enter the verification code sent to your email.',
        icon: <Email sx={{ fontSize: 40, color: '#6836e6' }} />
      }
    };
    
    return contents[purpose] || contents.verification;
  };

  const content = getContent();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a1e 0%, #1a1a3e 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          maxWidth: 500,
          width: '100%',
          p: { xs: 3, sm: 4 },
          background: 'rgba(20, 20, 40, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 2 }}>
            {content.icon}
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#fff',
              mb: 1,
            }}
          >
            {content.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 2,
            }}
          >
            {content.description}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#7df9ff',
              fontWeight: 500,
            }}
          >
            {email}
          </Typography>
        </Box>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  mb: 3,
                  borderRadius: '12px',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  border: '1px solid rgba(244, 67, 54, 0.3)',
                }}
              >
                <ErrorIcon sx={{ color: '#f44336', mr: 1 }} />
                <Typography variant="body2" sx={{ color: '#f44336' }}>
                  {error}
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* OTP Input */}
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
            {otp.map((digit, index) => (
              <Grid item key={index}>
                <OTPInput
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={isVerifying || isLoading}
                  error={error}
                  maxLength={1}
                />
              </Grid>
            ))}
          </Grid>

          {/* Timer */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Timer sx={{ color: timeLeft > 60 ? '#7df9ff' : '#f44336', mr: 1 }} />
            <Typography
              variant="body2"
              sx={{
                color: timeLeft > 60 ? '#7df9ff' : '#f44336',
                fontWeight: 500,
              }}
            >
              Time remaining: {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Box>

        {/* Verify Button */}
        <Box sx={{ mb: 3 }}>
          <GradientButton
            fullWidth
            onClick={() => handleVerifyOTP()}
            disabled={isVerifying || isLoading || otp.some(digit => digit === '')}
            size="large"
          >
            {isVerifying ? (
              <>
                <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                Verifying...
              </>
            ) : (
              'Verify OTP'
            )}
          </GradientButton>
        </Box>

        {/* Resend OTP */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 1 }}>
            Didn't receive the code?
          </Typography>
          <ResendButton
            onClick={handleResendOTP}
            disabled={!canResend || resendCooldown > 0}
            startIcon={<Refresh />}
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : canResend
              ? 'Resend OTP'
              : 'Resend available when timer expires'
            }
          </ResendButton>
        </Box>

        {/* Back Button */}
        <Box>
          <Button
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            Back to {purpose === 'signup' ? 'Sign Up' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default OTPVerification;