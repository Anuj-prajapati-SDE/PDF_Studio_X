const { sanitizeUser } = require('../../utils/authUtils');

// Get current user's profile
exports.getMe = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: sanitizeUser(req.user)
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while getting user profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};