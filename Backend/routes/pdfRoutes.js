const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { 
  createPDFFromImages, 
  downloadPDF 
} = require('../controllers/pdf/createPDFController');

// Routes
// Create PDF from images - requires authentication
router.post('/create-from-images', auth, createPDFFromImages);

// Download a created PDF - doesn't require auth to allow direct download links
router.get('/download/:filename', downloadPDF);

module.exports = router;