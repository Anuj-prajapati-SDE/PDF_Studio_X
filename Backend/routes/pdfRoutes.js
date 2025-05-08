const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
  }
});

// Helper function to clean up temporary files
const cleanupFiles = (files) => {
  if (Array.isArray(files)) {
    files.forEach(file => {
      try {
        fs.unlinkSync(file.path);
      } catch (error) {
        console.error(`Error deleting file ${file.path}:`, error);
      }
    });
  } else if (files && files.path) {
    try {
      fs.unlinkSync(files.path);
    } catch (error) {
      console.error(`Error deleting file ${files.path}:`, error);
    }
  }
};

// Merge PDFs endpoint
router.post('/merge', upload.array('pdfs', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length < 2) {
      return res.status(400).json({ message: 'Please upload at least 2 PDF files' });
    }

    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();
    
    // Process each uploaded PDF file
    for (const file of req.files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    
    // Save the merged PDF
    const mergedPdfFile = `${Date.now()}-merged.pdf`;
    const mergedPdfPath = path.join(__dirname, '../uploads', mergedPdfFile);
    const mergedPdfBytes = await mergedPdf.save();
    fs.writeFileSync(mergedPdfPath, mergedPdfBytes);
    
    // Return the file path
    res.json({
      message: 'PDFs merged successfully',
      filePath: `/downloads/${mergedPdfFile}`
    });

    // Clean up original files after a delay
    setTimeout(() => {
      cleanupFiles(req.files);
    }, 60000); // 1 minute delay
    
  } catch (error) {
    console.error('Error merging PDFs:', error);
    cleanupFiles(req.files);
    res.status(500).json({ message: 'Error merging PDFs', error: error.message });
  }
});

// Split PDF endpoint
router.post('/split', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }

    const pdfBytes = fs.readFileSync(req.file.path);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pageCount = pdfDoc.getPageCount();
    
    const splitResults = [];
    
    // Split each page into separate PDF
    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
      newPdf.addPage(copiedPage);
      
      const fileName = `${Date.now()}-page-${i+1}.pdf`;
      const filePath = path.join(__dirname, '../uploads', fileName);
      const newPdfBytes = await newPdf.save();
      fs.writeFileSync(filePath, newPdfBytes);
      
      splitResults.push({
        page: i + 1,
        filePath: `/downloads/${fileName}`
      });
    }
    
    // Return the file paths
    res.json({
      message: 'PDF split successfully',
      totalPages: pageCount,
      files: splitResults
    });
    
    // Clean up original file after a delay
    setTimeout(() => {
      cleanupFiles(req.file);
    }, 60000); // 1 minute delay
    
  } catch (error) {
    console.error('Error splitting PDF:', error);
    cleanupFiles(req.file);
    res.status(500).json({ message: 'Error splitting PDF', error: error.message });
  }
});

// Create a blank PDF
router.post('/create', async (req, res) => {
  try {
    const { pageCount = 1 } = req.body;
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add specified number of blank pages
    for (let i = 0; i < pageCount; i++) {
      pdfDoc.addPage([612, 792]); // Standard US Letter size
    }
    
    // Save the PDF
    const fileName = `${Date.now()}-blank.pdf`;
    const filePath = path.join(__dirname, '../uploads', fileName);
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);
    
    // Return the file path
    res.json({
      message: 'Blank PDF created successfully',
      filePath: `/downloads/${fileName}`
    });
    
  } catch (error) {
    console.error('Error creating PDF:', error);
    res.status(500).json({ message: 'Error creating PDF', error: error.message });
  }
});

// Download route to serve files
router.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.filename);
  res.download(filePath, (err) => {
    if (err) {
      res.status(404).json({ message: 'File not found' });
    }
    
    // Delete file after download
    setTimeout(() => {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error(`Error deleting file ${filePath}:`, error);
      }
    }, 1000);
  });
});

module.exports = router;