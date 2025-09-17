const User = require('../../models/User');
const { createOTPSession } = require('../../utils/otpService');
const { sendEmail, generateLoginOTPTemplate } = require('../../utils/emailService');

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: 'Email not verified. Please complete the verification process.'
      });
    }
    
    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Create OTP session for login verification
    const otpData = await createOTPSession(email, 'login', user._id);
    
    // Send OTP via email
    const emailTemplate = generateLoginOTPTemplate(otpData.otp, user.firstName);
    const emailSent = await sendEmail(
      email,
      'Login Verification - PDF Studio X',
      emailTemplate
    );
    
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Please verify your login with the OTP sent to your email',
      data: {
        requiresOTP: true,
        sessionId: otpData.sessionId,
        email: otpData.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during login',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};