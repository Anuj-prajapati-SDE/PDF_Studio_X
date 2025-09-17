const express = require('express');
const router = express.Router();

// Import controllers
const { register } = require('../controllers/auth/registerController');
const { verifySignupOTP } = require('../controllers/auth/verifySignupController');
const { login } = require('../controllers/auth/loginController');
const { verifyLoginOTP } = require('../controllers/auth/verifyLoginController');
const { resendOTP } = require('../controllers/auth/resendOTPController');

// Routes
router.post('/register', register);
router.post('/verify-signup-otp', verifySignupOTP);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOTP);
router.post('/resend-otp', resendOTP);

module.exports = router;