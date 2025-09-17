const User = require('../../models/User');
const OTPSession = require('../../models/OTPSession');
const { verifyOTP } = require('../../utils/otpService');
const { sendEmail, generatePasswordResetSuccessTemplate } = require('../../utils/emailService');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Verify the reset token
exports.verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Reset token is required'
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user exists
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired reset token'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Token is valid',
        email: user.email
      });
    } catch (error) {
      console.error('JWT verification error:', error);
      // JWT verification failed
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during token verification',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Verify OTP for password reset
exports.verifyResetOTP = async (req, res) => {
  try {
    const { sessionId, otp } = req.body;
    console.log('Verifying reset OTP:', { sessionId, otp });
    
    // Verify the OTP
    const verification = await verifyOTP(sessionId, otp);
    console.log('OTP verification result:', verification);
    
    if (!verification.success) {
      return res.status(400).json({
        success: false,
        message: verification.message,
        code: verification.code
      });
    }
    
    // Get the OTP session
    const otpSession = verification.data;
    
    // Check if user exists
    const user = await User.findById(otpSession.userId);
    
    if (!user) {
      console.log('User not found for ID:', otpSession.userId);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Generated reset token for user:', user.email);
    
    // Clean up OTP session
    await OTPSession.deleteOne({ _id: otpSession._id });
    
    res.status(200).json({
      success: true,
      message: 'OTP verified successfully',
      resetToken
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

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log('Reset password request received:', { token: token ? 'provided' : 'missing', newPassword: newPassword ? 'provided' : 'missing' });

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long'
      });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token verified, decoded:', decoded);
      
      // Find user
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        console.log('User not found for ID:', decoded.userId);
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Update password
      user.password = newPassword;
      await user.save();
      console.log('Password updated successfully for user:', user.email);

      // Send confirmation email
      const emailSent = await sendEmail(
        user.email,
        'Password Reset Successful - PDF Studio X',
        generatePasswordResetSuccessTemplate(user.firstName)
      );

      res.status(200).json({
        success: true,
        message: 'Password has been reset successfully'
      });
    } catch (error) {
      console.error('JWT verification or password update error:', error);
      // JWT verification failed
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during password reset',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


