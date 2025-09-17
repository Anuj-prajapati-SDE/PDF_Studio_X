const User = require('../../models/User');
const { createOTPSession } = require('../../utils/otpService');
const { sendEmail, generatePasswordResetOTPTemplate, generatePasswordResetLinkTemplate } = require('../../utils/emailService');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Handle forgot password request
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot password request received for email:', email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email });

    // If user doesn't exist, still send success response for security
    if (!user) {
      console.log('User not found with email:', email);
      return res.status(200).json({
        success: true,
        message: 'If your email is registered, you will receive password reset instructions'
      });
    }

    // Determine if we should use OTP or direct link
    const useOTP = process.env.USE_OTP_FOR_PASSWORD_RESET === 'true';
    console.log('Using OTP for password reset:', useOTP);

    if (useOTP) {
      // Create OTP session
      const otpData = await createOTPSession(email, 'password-reset', user._id);
      console.log('OTP session created:', otpData.sessionId);

      // Send OTP email
      const emailSent = await sendEmail(
        email,
        'Reset Your Password - PDF Studio X',
        generatePasswordResetOTPTemplate(otpData.otp, user.firstName)
      );

      if (!emailSent) {
        console.log('Failed to send OTP email');
        return res.status(500).json({
          success: false,
          message: 'Failed to send verification email. Please try again.'
        });
      }

      console.log('OTP email sent successfully');
      return res.status(200).json({
        success: true,
        message: 'Password reset code sent to your email',
        data: {
          requiresOTP: true,
          sessionId: otpData.sessionId,
          email: otpData.email
        }
      });
    } else {
      // Generate reset token
      const resetToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      console.log('Reset token generated for user ID:', user._id);

      // Create reset URL
      const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
      console.log('Reset URL created:', resetUrl);

      // Send reset email
      const emailSent = await sendEmail(
        email,
        'Reset Your Password - PDF Studio X',
        generatePasswordResetLinkTemplate(resetUrl, user.firstName)
      );

      if (!emailSent) {
        console.log('Failed to send reset email');
        return res.status(500).json({
          success: false,
          message: 'Failed to send reset email. Please try again.'
        });
      }

      console.log('Reset email sent successfully');
      return res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email'
      });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during password reset request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};