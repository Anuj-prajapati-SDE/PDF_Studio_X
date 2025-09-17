const mongoose = require('mongoose');

const otpSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Not required for pre-registration OTP
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  otp: {
    type: String,
    required: true
  },
  purpose: {
    type: String,
    enum: ['signup', 'login', 'password-reset'],
    required: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  attempts: {
    type: Number,
    default: 0
  },
  maxAttempts: {
    type: Number,
    default: 3
  },
  expiresAt: {
    type: Date,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Automatically delete documents after 1 hour
  }
});

// Index for fast expiry checks
otpSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const OTPSession = mongoose.model('OTPSession', otpSessionSchema);
module.exports = OTPSession;