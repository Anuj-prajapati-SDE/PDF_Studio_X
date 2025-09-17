const crypto = require('crypto');
const OTPSession = require('../models/OTPSession');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a new OTP session
const createOTPSession = async (email, purpose, userId = null) => {
  try {
    // Generate a unique session ID
    const sessionId = uuidv4();
    
    // Generate a new OTP
    const otp = generateOTP();
    
    // Calculate expiry time (5 minutes from now)
    const expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRY) * 1000);
    
    // Create a new OTP session
    const otpSession = new OTPSession({
      userId,
      email,
      otp,
      purpose,
      sessionId,
      expiresAt
    });
    
    await otpSession.save();
    
    return {
      sessionId,
      otp,
      email
    };
  } catch (error) {
    console.error('Error creating OTP session:', error);
    throw new Error('Failed to create OTP session');
  }
};

// Verify OTP
const verifyOTP = async (sessionId, otp) => {
  try {
    // Find the OTP session
    const otpSession = await OTPSession.findOne({ sessionId });
    
    if (!otpSession) {
      return {
        success: false,
        message: 'Invalid or expired verification session'
      };
    }
    
    // Check if OTP is expired
    if (new Date() > otpSession.expiresAt) {
      await otpSession.deleteOne();
      return {
        success: false,
        message: 'OTP has expired. Please request a new one'
      };
    }
    
    // Check if max attempts reached
    if (otpSession.attempts >= otpSession.maxAttempts) {
      await otpSession.deleteOne();
      return {
        success: false,
        message: 'Maximum verification attempts reached. Please request a new OTP',
        code: 'MAX_ATTEMPTS_EXCEEDED'
      };
    }
    
    // Check if already verified
    if (otpSession.verified) {
      return {
        success: false,
        message: 'OTP already verified'
      };
    }
    
    // Verify OTP
    if (otpSession.otp !== otp) {
      // Increment attempts
      otpSession.attempts += 1;
      await otpSession.save();
      
      return {
        success: false,
        message: `Invalid OTP. ${otpSession.maxAttempts - otpSession.attempts} attempts remaining`
      };
    }
    
    // OTP verified
    otpSession.verified = true;
    await otpSession.save();
    
    return {
      success: true,
      message: 'OTP verified successfully',
      data: otpSession
    };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Failed to verify OTP');
  }
};

module.exports = {
  generateOTP,
  createOTPSession,
  verifyOTP
};