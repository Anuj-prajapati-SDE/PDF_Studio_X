const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config();

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email function
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: `PDF Studio X <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Generate OTP template for signup
const generateSignupOTPTemplate = (otp, firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #6836e6;">PDF Studio X</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Email Verification</h2>
        <p style="color: #555555; font-size: 16px;">Hi ${firstName || 'there'},</p>
        <p style="color: #555555; font-size: 16px;">Thank you for registering with PDF Studio X. To complete your registration, please use the verification code below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 15px 30px; background-color: #f2f2f2; border-radius: 8px; letter-spacing: 6px; font-size: 24px; font-weight: bold; color: #333333;">
            ${otp}
          </div>
        </div>
        <p style="color: #555555; font-size: 16px;">This code will expire in 5 minutes. If you didn't request this verification, please ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999999; font-size: 14px;">© ${new Date().getFullYear()} PDF Studio X. All rights reserved.</p>
      </div>
    </div>
  `;
};

// Generate OTP template for login
const generateLoginOTPTemplate = (otp, firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #6836e6;">PDF Studio X</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Login Verification</h2>
        <p style="color: #555555; font-size: 16px;">Hi ${firstName || 'there'},</p>
        <p style="color: #555555; font-size: 16px;">To complete your login, please use the following verification code:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 15px 30px; background-color: #f2f2f2; border-radius: 8px; letter-spacing: 6px; font-size: 24px; font-weight: bold; color: #333333;">
            ${otp}
          </div>
        </div>
        <p style="color: #555555; font-size: 16px;">This code will expire in 5 minutes. If you didn't attempt to login, please change your password immediately.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999999; font-size: 14px;">© ${new Date().getFullYear()} PDF Studio X. All rights reserved.</p>
      </div>
    </div>
  `;
};

// Generate OTP template for password reset
const generatePasswordResetOTPTemplate = (otp, firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #6836e6;">PDF Studio X</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Password Reset</h2>
        <p style="color: #555555; font-size: 16px;">Hi ${firstName || 'there'},</p>
        <p style="color: #555555; font-size: 16px;">We received a request to reset your password. To proceed, please use the verification code below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <div style="display: inline-block; padding: 15px 30px; background-color: #f2f2f2; border-radius: 8px; letter-spacing: 6px; font-size: 24px; font-weight: bold; color: #333333;">
            ${otp}
          </div>
        </div>
        <p style="color: #555555; font-size: 16px;">This code will expire in 5 minutes. If you didn't request a password reset, please ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999999; font-size: 14px;">© ${new Date().getFullYear()} PDF Studio X. All rights reserved.</p>
      </div>
    </div>
  `;
};

// Generate password reset link email template
const generatePasswordResetLinkTemplate = (resetUrl, firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #6836e6;">PDF Studio X</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Password Reset</h2>
        <p style="color: #555555; font-size: 16px;">Hi ${firstName || 'there'},</p>
        <p style="color: #555555; font-size: 16px;">We received a request to reset your password. Click the button below to create a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #6836e6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Reset Password</a>
        </div>
        <p style="color: #555555; font-size: 16px;">If the button doesn't work, you can copy and paste the following link into your browser:</p>
        <p style="color: #555555; font-size: 14px; word-break: break-all; background-color: #f7f7f7; padding: 10px; border-radius: 5px;">${resetUrl}</p>
        <p style="color: #555555; font-size: 16px;">This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999999; font-size: 14px;">© ${new Date().getFullYear()} PDF Studio X. All rights reserved.</p>
      </div>
    </div>
  `;
};

// Generate password reset success email template
const generatePasswordResetSuccessTemplate = (firstName) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #f9f9f9;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #6836e6;">PDF Studio X</h1>
      </div>
      <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 style="color: #333333; margin-top: 0;">Password Reset Successful</h2>
        <p style="color: #555555; font-size: 16px;">Hi ${firstName || 'there'},</p>
        <p style="color: #555555; font-size: 16px;">Your password has been successfully reset. You can now log in with your new password.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #6836e6; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">Go to Login</a>
        </div>
        <p style="color: #555555; font-size: 16px;">If you didn't make this change, please contact our support team immediately.</p>
      </div>
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999999; font-size: 14px;">© ${new Date().getFullYear()} PDF Studio X. All rights reserved.</p>
      </div>
    </div>
  `;
};

module.exports = {
  sendEmail,
  generateSignupOTPTemplate,
  generateLoginOTPTemplate,
  generatePasswordResetOTPTemplate,
  generatePasswordResetLinkTemplate,
  generatePasswordResetSuccessTemplate
};