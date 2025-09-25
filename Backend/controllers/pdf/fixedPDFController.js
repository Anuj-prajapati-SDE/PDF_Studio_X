const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads/temp');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Filter for image files
const fileFilter = (req, file, cb) => {
  // Accept only specific image formats that we know work well
  const allowedMimeTypes = [
    'image/jpeg', 
    'image/png', 
    'image/gif', 
    'image/webp', 
    'image/tiff'
  ];
  
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported image format! Please upload JPEG, PNG, GIF, WebP, or TIFF images.'), false);
  }
};

// Initialize multer upload
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
}).array('images', 20); // Allow up to 20 images

// Define page sizes
const pageSizes = {
  'A4': { width: 595.28, height: 841.89 },
  'A5': { width: 419.53, height: 595.28 },
  'Letter': { width: 612, height: 792 },
  'Legal': { width: 612, height: 1008 }
};

// Helper function to handle multer upload
const handleMulterUpload = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred during upload
        reject({ status: 400, message: `Upload error: ${err.message}` });
      } else if (err) {
        // An unknown error occurred
        reject({ status: 500, message: `Unknown error: ${err.message}` });
      } else {
        // Upload successful
        resolve(req.files);
      }
    });
  });
};

// Controller for creating PDF from images
exports.createPDFFromImages = async (req, res) => {
  try {
    console.log('Starting PDF creation process');
    // Handle file uploads
    const files = await handleMulterUpload(req, res);
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }

    console.log(`Received ${files.length} images`);

    // Get options from request body
    const {
      pageSize = 'A4',
      imagesPerPage = 1,
      preserveAspectRatio = true,
    } = req.body;

    // Create unique filename for the PDF
    const pdfFilename = `${uuidv4()}.pdf`;
    const pdfPath = path.join(__dirname, '../../uploads/temp', pdfFilename);
    
    console.log(`Creating PDF: ${pdfPath}`);
    
    // Create a new PDF document
    const { width, height } = pageSizes[pageSize] || pageSizes['A4'];
    const doc = new PDFDocument({ 
      size: [width, height],
      info: {
        Title: 'PDF Studio X Generated Document',
        Author: 'PDF Studio X'
      },
      compress: false // Disable compression to avoid potential issues
    });
    
    // Pipe to output file
    const outputStream = fs.createWriteStream(pdfPath);
    doc.pipe(outputStream);
    
    // Calculate how many images to place per page
    const imagesPerPageCount = parseInt(imagesPerPage);
    const totalPages = Math.ceil(files.length / imagesPerPageCount);
    
    console.log(`Using page size: ${pageSize}, ${width}x${height}`);
    console.log(`Images per page: ${imagesPerPageCount}, Total pages: ${totalPages}`);
    
    // Process images page by page
    for (let page = 0; page < totalPages; page++) {
      console.log(`Processing page ${page + 1}`);
      
      if (page > 0) {
        doc.addPage({ size: [width, height] });
      }
      
      const startIdx = page * imagesPerPageCount;
      const endIdx = Math.min(startIdx + imagesPerPageCount, files.length);
      
      // Calculate the grid layout
      let imagesPerRow, rowCount;
      switch (parseInt(imagesPerPage)) {
        case 2:
          imagesPerRow = 1;
          rowCount = 2;
          break;
        case 4:
          imagesPerRow = 2;
          rowCount = 2;
          break;
        case 6:
          imagesPerRow = 2;
          rowCount = 3;
          break;
        default:
          imagesPerRow = 1;
          rowCount = 1;
      }
      
      // Calculate image placement parameters
      const margin = 50;
      const availableWidth = width - (margin * 2);
      const availableHeight = height - (margin * 2);
      
      const cellWidth = availableWidth / imagesPerRow;
      const cellHeight = availableHeight / rowCount;
      
      // Process images for this page
      for (let i = startIdx; i < endIdx; i++) {
        const imageIndexOnPage = i - startIdx;
        const file = files[i];
        
        try {
          console.log(`Processing image ${i + 1}: ${file.originalname}`);
          
          // Calculate position (which cell in the grid)
          const row = Math.floor(imageIndexOnPage / imagesPerRow);
          const col = imageIndexOnPage % imagesPerRow;
          
          const xPos = margin + (col * cellWidth);
          const yPos = margin + (row * cellHeight);
          
          // Calculate the size and position of the image within its cell
          const maxImageWidth = cellWidth - 10;
          const maxImageHeight = cellHeight - 10;
          
          // Define image options
          let imageOptions = {};
          
          if (preserveAspectRatio) {
            // We'll set only the max width/height and let PDFKit handle the aspect ratio
            if (maxImageWidth < maxImageHeight) {
              imageOptions.width = maxImageWidth;
            } else {
              imageOptions.height = maxImageHeight;
            }
          } else {
            // Force exact dimensions
            imageOptions.width = maxImageWidth;
            imageOptions.height = maxImageHeight;
          }
          
          // Calculate the centered position
          const imageX = xPos + 5;
          const imageY = yPos + 5;
          
          // Add the image directly to the PDF
          console.log(`Adding image at position (${imageX}, ${imageY})`);
          doc.image(file.path, imageX, imageY, imageOptions);
          
        } catch (error) {
          console.error(`Error processing image ${i}:`, error);
          
          // Add error text to the PDF if image processing fails
          const row = Math.floor(imageIndexOnPage / imagesPerRow);
          const col = imageIndexOnPage % imagesPerRow;
          
          const xPos = margin + (col * cellWidth) + (cellWidth / 2);
          const yPos = margin + (row * cellHeight) + (cellHeight / 2);
          
          doc.fontSize(12)
             .fillColor('red')
             .text('Image processing error', 
                   xPos - 60, 
                   yPos, 
                   { align: 'center', width: 120 });
        }
      }
    }
    
    // Finalize the PDF
    doc.end();
    console.log('PDF document finalized');
    
    // Wait for the PDF to be written
    outputStream.on('finish', () => {
      // Calculate file size
      const stats = fs.statSync(pdfPath);
      const fileSizeInBytes = stats.size;
      
      console.log(`PDF created successfully: ${pdfFilename}, size: ${fileSizeInBytes} bytes`);
      
      // Send response with file details
      res.status(200).json({
        success: true,
        message: 'PDF created successfully',
        data: {
          filename: pdfFilename,
          url: `/api/pdf/download/${pdfFilename}`,
          size: fileSizeInBytes
        }
      });
      
      // Clean up uploaded images
      files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error removing uploaded file:', err);
        });
      });
      
      // Set up automatic cleanup of the PDF after some time (e.g., 1 hour)
      setTimeout(() => {
        fs.unlink(pdfPath, (err) => {
          if (err && !err.code === 'ENOENT') {
            console.error('Error removing temporary PDF file:', err);
          }
        });
      }, 60 * 60 * 1000); // 1 hour
    });
    
    outputStream.on('error', (err) => {
      console.error('Error writing PDF:', err);
      res.status(500).json({
        success: false,
        message: 'Error creating PDF',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    });
    
  } catch (error) {
    console.error('Create PDF error:', error);
    
    const status = error.status || 500;
    const message = error.message || 'An error occurred while creating the PDF';
    
    res.status(status).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Controller for downloading PDF
exports.downloadPDF = (req, res) => {
  try {
    const { filename } = req.params;
    
    // Validate filename to prevent directory traversal
    if (!filename || filename.includes('../') || filename.includes('..\\')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid filename'
      });
    }
    
    const filePath = path.join(__dirname, '../../uploads/temp', filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }
    
    // Set appropriate headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
    
    // Handle stream errors
    fileStream.on('error', (err) => {
      console.error('Error streaming file:', err);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error downloading file',
          error: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
      }
    });
    
  } catch (error) {
    console.error('Download PDF error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while downloading the PDF',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};