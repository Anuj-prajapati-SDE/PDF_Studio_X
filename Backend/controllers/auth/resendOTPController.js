const OTPSession = require('../../models/OTPSession');
const User = require('../../models/User');
const { createOTPSession } = require('../../utils/otpService');
const { 
  sendEmail, 
  generateSignupOTPTemplate, 
  generateLoginOTPTemplate 
} = require('../../utils/emailService');

// Resend OTP controller
exports.resendOTP = async (req, res) => {
  try {
    const { sessionId } = req.body;
    
    // Find existing OTP session
    const existingSession = await OTPSession.findOne({ sessionId });
    
    if (!existingSession) {
      return res.status(404).json({
        success: false,
        message: 'Session not found or expired'
      });
    }
    
    // Check if we need to get user information
    let user = null;
    if (existingSession.userId) {
      user = await User.findById(existingSession.userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }
    }
    
    // Delete existing session
    await OTPSession.deleteOne({ _id: existingSession._id });
    
    // Create new OTP session
    const otpData = await createOTPSession(
      existingSession.email,
      existingSession.purpose,
      existingSession.userId
    );
    
    // Generate appropriate email template
    let emailTemplate;
    let emailSubject;
    
    if (existingSession.purpose === 'signup') {
      const firstName = user ? user.firstName : '';
      emailTemplate = generateSignupOTPTemplate(otpData.otp, firstName);
      emailSubject = 'Verify Your Email - PDF Studio X';
    } else if (existingSession.purpose === 'login') {
      const firstName = user ? user.firstName : '';
      emailTemplate = generateLoginOTPTemplate(otpData.otp, firstName);
      emailSubject = 'Login Verification - PDF Studio X';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP purpose'
      });
    }
    
    // Send OTP via email
    const emailSent = await sendEmail(
      otpData.email,
      emailSubject,
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
      message: 'OTP resent successfully',
      data: {
        sessionId: otpData.sessionId,
        email: otpData.email
      }
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while resending OTP',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};