const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT token
const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(
    payload,
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );
};

// Set secure token in response cookies and return token for localStorage
const setTokenCookies = (res, token, user) => {
  // Prepare cookie options for HTTP-only secure cookie
  const cookieOptions = {
    httpOnly: true, // Prevents client-side JavaScript from reading the cookie
    secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    path: '/' // Cookie is valid for all paths
  };

  // Set JWT as HTTP-only cookie
  res.cookie('auth_token', token, cookieOptions);

  // Set a non-HTTP-only cookie to indicate auth state to frontend
  // This doesn't contain the actual token for security
  res.cookie('auth_status', 'authenticated', {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000,
    path: '/'
  });

  // Return both the token (for localStorage) and sanitized user
  return {
    token,
    user: sanitizeUser(user)
  };
};

// Clear auth cookies
const clearAuthCookies = (res) => {
  res.clearCookie('auth_token', { path: '/' });
  res.clearCookie('auth_status', { path: '/' });
};

// Sanitize user object for response
const sanitizeUser = (user) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
};

module.exports = {
  generateToken,
  setTokenCookies,
  clearAuthCookies,
  sanitizeUser
};