const express = require('express');
const router = express.Router();

// Import controllers
const { register } = require('../controllers/auth/registerController');
const { verifySignupOTP } = require('../controllers/auth/verifySignupController');
const { login } = require('../controllers/auth/loginController');
const { verifyLoginOTP } = require('../controllers/auth/verifyLoginController');
const { resendOTP } = require('../controllers/auth/resendOTPController');
const { forgotPassword } = require('../controllers/auth/forgotPasswordController');
const { 
  resetPassword, 
  verifyResetToken, 
  verifyResetOTP 
} = require('../controllers/auth/resetPasswordController');

// Routes
router.post('/register', register);
router.post('/verify-signup-otp', verifySignupOTP);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOTP);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-token', verifyResetToken);
router.post('/verify-reset-otp', verifyResetOTP);
router.post('/reset-password', resetPassword);

module.exports = router;