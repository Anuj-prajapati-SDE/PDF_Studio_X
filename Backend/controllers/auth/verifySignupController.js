const User = require('../../models/User');
const OTPSession = require('../../models/OTPSession');
const { verifyOTP } = require('../../utils/otpService');
const { generateToken, setTokenCookies, sanitizeUser } = require('../../utils/authUtils');

// Verify signup OTP
exports.verifySignupOTP = async (req, res) => {
  try {
    const { sessionId, otp } = req.body;
    
    // Verify the OTP
    const verification = await verifyOTP(sessionId, otp);
    
    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: verification.message,
        code: verification.code
      });
    }
    
    // Get the OTP session
    const otpSession = verification.data;
    
    // Find the user associated with this OTP session
    const user = await User.findById(otpSession.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Update user verification status
    user.isVerified = true;
    await user.save();
    
    // Generate JWT token
    const token = generateToken(user);
    
    // Clean up OTP session
    await OTPSession.deleteOne({ _id: otpSession._id });
    
    // Set token in HTTP-only cookie and prepare response data
    const authData = setTokenCookies(res, token, user);
    
    res.status(200).json({
      success: true,
      message: 'Email verified successfully',
      token: authData.token, // For localStorage storage on frontend
      user: authData.user
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during verification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};