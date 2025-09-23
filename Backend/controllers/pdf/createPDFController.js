const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const sharp = require('sharp');

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
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
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
    // Handle file uploads
    const files = await handleMulterUpload(req, res);
    
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please upload at least one image'
      });
    }

    // Get options from request body
    const {
      pageSize = 'A4',
      imagesPerPage = 1,
      preserveAspectRatio = true,
    } = req.body;

    // Create unique filename for the PDF
    const pdfFilename = `${uuidv4()}.pdf`;
    const pdfPath = path.join(__dirname, '../../uploads/temp', pdfFilename);
    
    // Create a new PDF document
    const { width, height } = pageSizes[pageSize] || pageSizes['A4'];
    const doc = new PDFDocument({ size: [width, height] });
    
    // Pipe to output file
    const outputStream = fs.createWriteStream(pdfPath);
    doc.pipe(outputStream);
    
    // Process images and add to PDF
    const processImage = async (file, pageIndex, imageIndex) => {
      try {
        // Calculate image position and size based on imagesPerPage
        let imagesPerRow, rowCount;
        
        switch (parseInt(imagesPerPage)) {
          case 1:
            imagesPerRow = 1;
            rowCount = 1;
            break;
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
        
        // Calculate image width and height
        const margin = 50;
        const availableWidth = width - (margin * 2);
        const availableHeight = height - (margin * 2);
        
        const imgWidth = availableWidth / imagesPerRow;
        const imgHeight = availableHeight / rowCount;
        
        // Calculate position (which cell in the grid)
        const row = Math.floor(imageIndex / imagesPerRow);
        const col = imageIndex % imagesPerRow;
        
        const xPos = margin + (col * imgWidth);
        const yPos = margin + (row * imgHeight);
        
        // Resize and process image with sharp
        const metadata = await sharp(file.path).metadata();
        
        let resizeOptions = {};
        
        if (preserveAspectRatio) {
          // Maintain aspect ratio by fitting within the cell
          resizeOptions = {
            fit: sharp.fit.inside,
            width: imgWidth - 10, // Subtract some padding
            height: imgHeight - 10, // Subtract some padding
          };
        } else {
          // Fill the cell completely
          resizeOptions = {
            fit: sharp.fit.fill,
            width: imgWidth - 10,
            height: imgHeight - 10,
          };
        }
        
        // Process and save the image temporarily
        const processedImagePath = path.join(
          path.dirname(file.path),
          `processed_${path.basename(file.path)}`
        );
        
        await sharp(file.path)
          .resize(resizeOptions)
          .toFile(processedImagePath);
        
        // Calculate centering within the cell
        const processedMetadata = await sharp(processedImagePath).metadata();
        
        const xOffset = (imgWidth - processedMetadata.width) / 2;
        const yOffset = (imgHeight - processedMetadata.height) / 2;
        
        // Add the image to the PDF
        doc.image(
          processedImagePath,
          xPos + xOffset,
          yPos + yOffset,
          {
            width: processedMetadata.width,
            height: processedMetadata.height
          }
        );
        
        // Remove the processed image
        fs.unlink(processedImagePath, (err) => {
          if (err) console.error('Error removing processed image:', err);
        });
        
        return true;
      } catch (error) {
        console.error('Error processing image:', error);
        return false;
      }
    };
    
    // Calculate how many images to place per page
    const imagesPerPageCount = parseInt(imagesPerPage);
    const totalPages = Math.ceil(files.length / imagesPerPageCount);
    
    // Process images page by page
    for (let page = 0; page < totalPages; page++) {
      if (page > 0) {
        doc.addPage({ size: [width, height] });
      }
      
      const startIdx = page * imagesPerPageCount;
      const endIdx = Math.min(startIdx + imagesPerPageCount, files.length);
      
      // Process images for this page
      for (let i = startIdx; i < endIdx; i++) {
        const imageIndexOnPage = i - startIdx;
        await processImage(files[i], page, imageIndexOnPage);
      }
    }
    
    // Finalize the PDF
    doc.end();
    
    // Wait for the PDF to be written
    outputStream.on('finish', () => {
      // Calculate file size
      const stats = fs.statSync(pdfPath);
      const fileSizeInBytes = stats.size;
      
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