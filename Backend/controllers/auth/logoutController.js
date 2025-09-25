const { clearAuthCookies } = require('../../utils/authUtils');

// Logout controller
exports.logout = async (req, res) => {
  try {
    // Clear cookies
    clearAuthCookies(res);
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred during logout',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};