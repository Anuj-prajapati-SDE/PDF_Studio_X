const User = require('../../models/User');
const { createOTPSession } = require('../../utils/otpService');
const { sendEmail, generateSignupOTPTemplate } = require('../../utils/emailService');
const { sanitizeUser } = require('../../utils/authUtils');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // If user exists but is not verified, delete the old record
    if (existingUser && !existingUser.isVerified) {
      await User.deleteOne({ _id: existingUser._id });
    }
    
    // Create new user (not verified yet)
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      isVerified: false
    });
    
    await user.save();
    
    // Create OTP session for verification
    const otpData = await createOTPSession(email, 'signup', user._id);
    
    // Send OTP via email
    const emailTemplate = generateSignupOTPTemplate(otpData.otp, firstName);
    const emailSent = await sendEmail(
      email,
      'Verify Your Email - PDF Studio X',
      emailTemplate
    );
    
    if (!emailSent) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email'
      });
    }
    
    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email with the OTP sent.',
      data: {
        sessionId: otpData.sessionId,
        email: otpData.email
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during registration',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};