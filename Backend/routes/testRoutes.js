const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Public test route
router.get('/public', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Public test route is working',
    data: {
      timestamp: new Date().toISOString()
    }
  });
});

// Protected test route
router.get('/protected', auth, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Protected test route is working',
    data: {
      user: {
        id: req.user._id,
        name: `${req.user.firstName} ${req.user.lastName}`,
        email: req.user.email,
        role: req.user.role
      },
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = router;