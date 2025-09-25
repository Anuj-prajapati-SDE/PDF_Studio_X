import React, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Button,
  Paper,
  Stack,
  Card,
  CardContent,
  Grid,
  Divider,
  LinearProgress,
  Alert,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Switch,
  FormControlLabel,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  alpha,
  useTheme,
  Chip,
  Container,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  StepButton,
  Tab,
  Tabs,
  Slider,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Collapse,
  Zoom,
  RadioGroup,
  Radio,
  Checkbox,
  AppBar,
  Toolbar,
  Slide
} from '@mui/material';
import {
  FilePlus as FilePlusIcon,
  Image as ImageIcon,
  File as FileIcon,
  Download as DownloadIcon,
  Trash2 as TrashIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  Check as CheckIcon,
  Upload as UploadIcon,
  RefreshCw as RefreshIcon,
  Zap as ZapIcon,
  Eye as EyeIcon,
  RotateCcw as RotateCcwIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Layout as LayoutIcon,
  Type as TypeIcon,
  Sliders as SlidersIcon,
  Book as BookIcon,
  FileText as FileTextIcon,
  Bookmark as BookmarkIcon,
  PenTool as PenToolIcon,
  Loader as LoaderIcon,
  Save as SaveIcon,
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  X as XIcon,
  Minus as MinusIcon,
} from 'react-feather';
import {motion} from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  PentagonOutlined, 
  TextFields, 
  FormatBold, 
  FormatItalic, 
  FormatUnderlined, 
  FormatAlignLeft, 
  FormatAlignCenter, 
  FormatAlignRight,
  FormatColorFill,
  Visibility,
  // Watermark,
} from '@mui/icons-material';
import { Document, Page, pdfjs } from 'react-pdf';
import { pdfService } from '../../services';

// Initialize PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// Transition component for dialog
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Steps for the PDF creation process
const steps = [
  'Upload Images',
  'Customize PDF',
  'Preview & Finalize',
  'Download'
];

const CreatePDFPage = () => {
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [previewPageNumber, setPreviewPageNumber] = useState(1);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [creationMethod, setCreationMethod] = useState('images');
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);

  // From images options
  const [images, setImages] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(1);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const [pageSize, setPageSize] = useState('A4');
  
  // Customization options
  const [pageOrientation, setPageOrientation] = useState('portrait');
  const [pageMargins, setPageMargins] = useState(20);
  const [addWatermark, setAddWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkColor, setWatermarkColor] = useState('#FF0000');
  const [addHeader, setAddHeader] = useState(false);
  const [headerText, setHeaderText] = useState('');
  const [addFooter, setAddFooter] = useState(false);
  const [footerText, setFooterText] = useState('');
  const [addPageNumbers, setAddPageNumbers] = useState(false);
  const [pageNumberPosition, setPageNumberPosition] = useState('bottom-center');

  // Handle image uploads
  const onDropImages = useCallback(acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));

    setImages(prev => [...prev, ...newImages]);
    toast.success(`${acceptedFiles.length} image${acceptedFiles.length > 1 ? 's' : ''} added`);
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onDropImages,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleRemoveImage = (imageId) => {
    const imageToRemove = images.find(img => img.id === imageId);
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setImages(images.filter(img => img.id !== imageId));
    toast.success('Image removed');
  };

  const handleClearImages = () => {
    images.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
    setImages([]);
    toast.success('All images cleared');
  };

  // Text styling methods
  const toggleTextStyle = (style) => {
    setTextStyles(prev => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  // Handle PDF preview
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPreviewPage = () => {
    setPreviewPageNumber(prevPage => Math.min(prevPage + 1, numPages));
  };

  const prevPreviewPage = () => {
    setPreviewPageNumber(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleZoomIn = () => {
    setPreviewZoom(prevZoom => Math.min(prevZoom + 0.25, 3));
  };

  const handleZoomOut = () => {
    setPreviewZoom(prevZoom => Math.max(prevZoom - 0.25, 0.5));
  };
  
  // Stepper navigation
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  // Open preview modal
  const handleOpenPreview = () => {
    setPreviewDialogOpen(true);
    setPageNumber(1); // Reset to first page when opening
  };

  // Close preview modal
  const handleClosePreview = () => {
    setPreviewDialogOpen(false);
  };
  
  // Generate PDF preview
  const handleGeneratePreview = async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      // Get all files from images array
      const imageFiles = images.map(img => img.file);
      
      // Set options including customization options
      const options = {
        pageSize,
        imagesPerPage,
        preserveAspectRatio,
        pageOrientation,
        pageMargins,
        addWatermark: addWatermark ? 1 : 0,
        watermarkText: addWatermark ? watermarkText : '',
        watermarkOpacity,
        watermarkColor,
        addHeader: addHeader ? 1 : 0,
        headerText,
        addFooter: addFooter ? 1 : 0,
        footerText,
        addPageNumbers: addPageNumbers ? 1 : 0,
        pageNumberPosition,
        previewOnly: true
      };
      
      // Call API to create PDF preview
      const response = await pdfService.createPDFFromImages(imageFiles, options);
      
      if (response.success) {
        // Set preview URL
        setPdfPreviewUrl(pdfService.getPDFDownloadUrl(response.data.filename));
        // Move to preview step
        setActiveStep(2);
        toast.success('Preview generated successfully!');
      } else {
        throw new Error(response.message || 'Failed to create preview');
      }
    } catch (err) {
      console.error('Error creating preview:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      toast.error('Failed to generate preview');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Toggle customizing mode
  const handleStartCustomizing = () => {
    setCustomizing(true);
  };
  
  const handleFinishCustomizing = () => {
    setCustomizing(false);
    // Create preview
    handleGeneratePreview();
  };

  // Create preview PDF
  const handlePreviewPDF = async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      // Get all files from images array
      const imageFiles = images.map(img => img.file);
      
      // Set options including customization options
      const options = {
        pageSize,
        imagesPerPage,
        preserveAspectRatio,
        pageOrientation,
        pageMargins,
        addWatermark: addWatermark ? 1 : 0,
        watermarkText: addWatermark ? watermarkText : '',
        watermarkOpacity,
        watermarkColor,
        addHeader: addHeader ? 1 : 0,
        headerText,
        addFooter: addFooter ? 1 : 0,
        footerText,
        addPageNumbers: addPageNumbers ? 1 : 0,
        pageNumberPosition,
        previewOnly: true
      };
      
      // Call API to create PDF preview
      const response = await pdfService.createPDFFromImages(imageFiles, options);
      
      if (response.success) {
        // Set preview URL
        setPdfPreviewUrl(pdfService.getPDFDownloadUrl(response.data.filename));
        // Move to next step if needed
        if (activeStep === 1) {
          setActiveStep(2);
        }
        toast.success('Preview created successfully!');
      } else {
        throw new Error(response.message || 'Failed to create preview');
      }
    } catch (err) {
      console.error('Error creating preview:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      toast.error('Failed to create preview');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Create final PDF with customizations
  const handleCreatePDF = async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      // Get all files from images array
      const imageFiles = images.map(img => img.file);
      
      // Set options with all customizations
      const options = {
        pageSize,
        imagesPerPage,
        preserveAspectRatio,
        pageOrientation,
        pageMargins,
        addWatermark: addWatermark ? 1 : 0,
        watermarkText: addWatermark ? watermarkText : '',
        watermarkOpacity,
        watermarkColor,
        addHeader: addHeader ? 1 : 0,
        headerText,
        addFooter: addFooter ? 1 : 0,
        footerText,
        addPageNumbers: addPageNumbers ? 1 : 0,
        pageNumberPosition
      };
      
      // Call API to create PDF
      const response = await pdfService.createPDFFromImages(imageFiles, options);
      
      if (response.success) {
        // Set processed file with data from API
        setProcessedFile({
          url: pdfService.getPDFDownloadUrl(response.data.filename),
          name: response.data.filename,
          size: response.data.size,
        });
        
        // Go to final step
        setActiveStep(3);
        toast.success('PDF created successfully!');
      } else {
        throw new Error(response.message || 'Failed to create PDF');
      }
    } catch (err) {
      console.error('Error creating PDF:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      toast.error('Failed to create PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedFile && processedFile.url) {
      // Open the download URL in a new tab
      window.open(processedFile.url, '_blank');
      toast.success('Downloading your PDF');
    }
  };

  const handleReset = () => {
    // Clean up resources
    images.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
    
    // Reset all state
    setProcessedFile(null);
    setPdfPreviewUrl(null);
    setNumPages(null);
    setPreviewPageNumber(1);
    setPreviewZoom(1);
    setError(null);
    setActiveStep(0);
    setPreviewOpen(false);
    setCustomizing(false);
    setPageSize('A4');
    setPageOrientation('portrait');
    setPageMargins(20);
    setAddWatermark(false);
    setWatermarkText('CONFIDENTIAL');
    setWatermarkOpacity(0.3);
    setWatermarkColor('#FF0000');
    setAddHeader(false);
    setHeaderText('');
    setAddFooter(false);
    setFooterText('');
    setAddPageNumbers(false);
    setPageNumberPosition('bottom-center');
    setImages([]);
    setImagesPerPage(1);
    setPreserveAspectRatio(true);
    
    toast.success('Form reset');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  // Validation
  const isValid = () => {
    return images.length > 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ 
        position: 'relative', 
        minHeight: '100vh',
        bgcolor: '#030018',
        color: 'white',
        pt: 2,
        pb: 8,
        px: { xs: 2, md: 4 }
      }}>
        {/* Lens flare effect */}
        <Box
          component={motion.div}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          sx={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: '20rem',
            height: '20rem',
            background: 'radial-gradient(circle, rgba(125, 249, 255, 0.4) 0%, rgba(125, 249, 255, 0) 70%)',
            filter: 'blur(50px)',
            borderRadius: '50%',
            mixBlendMode: 'screen',
            zIndex: 0,
          }}
        />
        
        <Box sx={{ mb: 5, position: 'relative', zIndex: 1, textAlign: "center" }}>
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight={700} 
            gutterBottom
            sx={{
              background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block',
            }}
          >
            Create PDF
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} paragraph>
            Generate professional PDF documents from your images with advanced customization options.
          </Typography>
        </Box>
        
        {/* Multi-step stepper */}
        <Box sx={{ mb: 4, position: 'relative', zIndex: 1 }}>
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{ 
              '& .MuiStepLabel-root .Mui-completed': {
                color: '#7df9ff',
              },
              '& .MuiStepLabel-root .Mui-active': {
                color: '#7df9ff',
              },
            }}
          >
            <Step>
              <StepButton onClick={() => handleStepChange(0)}>
                <Typography variant="body2">Upload Files</Typography>
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => activeStep > 0 && handleStepChange(1)}>
                <Typography variant="body2">Customize PDF</Typography>
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => activeStep > 1 && handleStepChange(2)}>
                <Typography variant="body2">Preview & Finalize</Typography>
              </StepButton>
            </Step>
            <Step>
              <StepButton onClick={() => activeStep > 2 && handleStepChange(3)}>
                <Typography variant="body2">Download</Typography>
              </StepButton>
            </Step>
          </Stepper>
        </Box>
        
        {/* PDF Preview Dialog */}
        <Dialog
          fullScreen
          open={previewDialogOpen}
          onClose={handleClosePreview}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative', bgcolor: '#1e1e2d' }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClosePreview}
                aria-label="close"
              >
                <XIcon size={20} />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                PDF Preview
              </Typography>
              <Button 
                autoFocus 
                color="inherit" 
                onClick={handleCreatePDF}
                startIcon={<DownloadIcon size={16} />}
              >
                Download
              </Button>
            </Toolbar>
          </AppBar>
          
          <Box sx={{ 
            bgcolor: '#121212', 
            height: '100%', 
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* PDF Viewer Toolbar */}
            <Box sx={{ 
              p: 1, 
              bgcolor: 'rgba(0,0,0,0.3)', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <IconButton 
                disabled={pageNumber <= 1}
                onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeftIcon size={20} />
              </IconButton>
              
              <Typography sx={{ mx: 2 }}>
                Page {pageNumber} of {numPages}
              </Typography>
              
              <IconButton 
                disabled={pageNumber >= numPages}
                onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}
              >
                <ChevronRightIcon size={20} />
              </IconButton>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              
              <IconButton onClick={() => setScale(prev => Math.max(prev - 0.2, 0.6))}>
                <MinusIcon size={20} />
              </IconButton>
              
              <Typography sx={{ mx: 2 }}>
                {Math.round(scale * 100)}%
              </Typography>
              
              <IconButton onClick={() => setScale(prev => Math.min(prev + 0.2, 3))}>
                <PlusIcon size={20} />
              </IconButton>
              
              <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
              
              <Button
                startIcon={<RefreshIcon size={16} />}
                onClick={() => setScale(1)}
              >
                Reset Zoom
              </Button>
            </Box>
            
            {/* PDF Document */}
            <Box sx={{ 
              flex: 1, 
              overflow: 'auto', 
              display: 'flex', 
              justifyContent: 'center',
              p: 2
            }}>
              <Document
                file={pdfPreviewUrl}
                onLoadSuccess={handleDocumentLoadSuccess}
                loading={
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <CircularProgress size={60} sx={{ color: '#7df9ff' }} />
                  </Box>
                }
              >
                <Page 
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </Box>
          </Box>
        </Dialog>

        {activeStep < 3 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card sx={{ 
              borderRadius: 4, 
              mb: 4, 
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 2.5,
                  px: 3,
                  borderBottom: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  mb: 3
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {activeStep === 0 && (
                      <>
                        <ImageIcon size={20} color="#7df9ff" style={{ marginRight: '10px' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#7df9ff' }}>
                          Upload Images
                        </Typography>
                      </>
                    )}
                    {activeStep === 1 && (
                      <>
                        <SlidersIcon size={20} color="#7df9ff" style={{ marginRight: '10px' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#7df9ff' }}>
                          Customize PDF
                        </Typography>
                      </>
                    )}
                    {activeStep === 2 && (
                      <>
                        <EyeIcon size={20} color="#7df9ff" style={{ marginRight: '10px' }} />
                        <Typography variant="h6" fontWeight={600} sx={{ color: '#7df9ff' }}>
                          Preview & Finalize
                        </Typography>
                      </>
                    )}
                  </Box>
                  
                  {/* Step indicator pill */}
                  <Chip 
                    label={`Step ${activeStep + 1} of 4`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'rgba(125, 249, 255, 0.1)',
                      color: '#7df9ff',
                      fontWeight: 500,
                      borderRadius: '50px',
                    }}
                  />
                </Box>

                <Box sx={{ px: 3, pb: 3 }}>
                  {/* Step 1: Upload Images */}
                  <AnimatePresence mode="wait">
                    {activeStep === 0 && (
                      <motion.div
                        key="upload-step"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {images.length === 0 ? (
                          <Paper
                            {...getImageRootProps()}
                            elevation={0}
                            variant="outlined"
                            sx={{
                              borderRadius: 4,
                              borderStyle: 'dashed',
                              borderWidth: 2,
                              borderColor: isImageDragActive ? 'primary.main' : 'divider',
                              bgcolor: isImageDragActive ? 'rgba(125, 249, 255, 0.1)' : 'rgba(0, 0, 0, 0.3)',
                              p: 6,
                              textAlign: 'center',
                              cursor: 'pointer',
                              mb: 4,
                            }}
                          >
                            <input {...getImageInputProps()} />
                            
                            <Box
                              sx={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                color: 'primary.main',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mb: 2,
                                mx: 'auto',
                              }}
                            >
                              <UploadIcon size={36} />
                            </Box>
                            
                            <Typography variant="h6" gutterBottom>
                              {isImageDragActive
                                ? "Drop images here"
                                : "Drag & drop images here"
                              }
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary">
                              or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse files</Box> from your computer
                            </Typography>
                            
                            <Box sx={{ mt: 2 }}>
                              <Chip 
                                label="Supported formats: JPG, PNG, GIF, WEBP" 
                                size="small" 
                                variant="outlined" 
                              />
                            </Box>
                          </Paper>
                        ) : (
                          <>
                            <Box sx={{ mb: 4 }}>
                              <Typography variant="h6" gutterBottom>
                                {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
                              </Typography>
                              
                              <Grid container spacing={2} sx={{ mb: 3 }}>
                                {images.map((image) => (
                                  <Grid item xs={6} sm={4} md={3} key={image.id}>
                                    <Card sx={{ position: 'relative', borderRadius: 2 }}>
                                      <Box
                                        component="img"
                                        src={image.preview}
                                        alt="Preview"
                                        sx={{
                                          width: '100%',
                                          height: 160,
                                          objectFit: 'cover',
                                          borderRadius: '8px 8px 0 0',
                                        }}
                                      />
                                      <Box sx={{ p: 1.5 }}>
                                        <Typography variant="body2" noWrap>
                                          {image.file.name}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {(image.file.size / (1024 * 1024)).toFixed(2)} MB
                                        </Typography>
                                      </Box>
                                      <IconButton
                                        size="small"
                                        onClick={() => handleRemoveImage(image.id)}
                                        sx={{
                                          position: 'absolute',
                                          top: 8,
                                          right: 8,
                                          bgcolor: 'rgba(0,0,0,0.5)',
                                          color: 'white',
                                          '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.7)',
                                          },
                                          width: 28,
                                          height: 28,
                                        }}
                                      >
                                        <TrashIcon size={14} />
                                      </IconButton>
                                    </Card>
                                  </Grid>
                                ))}
                                
                                <Grid item xs={6} sm={4} md={3}>
                                  <Card 
                                    {...getImageRootProps()}
                                    sx={{ 
                                      height: '100%',
                                      minHeight: 220,
                                      display: 'flex',
                                      flexDirection: 'column',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      borderRadius: 2,
                                      border: '2px dashed',
                                      borderColor: 'divider',
                                      bgcolor: 'background.paper',
                                      p: 2,
                                      cursor: 'pointer',
                                      '&:hover': {
                                        borderColor: 'primary.main',
                                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                                      },
                                    }}
                                  >
                                    <input {...getImageInputProps()} />
                                    <PlusIcon size={30} color={"rgba(255, 255, 255, 0.7)"} />
                                    <Typography variant="body2" align="center" color="rgba(255, 255, 255, 0.7)" sx={{ mt: 1 }}>
                                      Add More Images
                                    </Typography>
                                  </Card>
                                </Grid>
                              </Grid>
                              
                              <Button
                                variant="outlined"
                                color="error"
                                startIcon={<TrashIcon size={16} />}
                                onClick={handleClearImages}
                                size="small"
                              >
                                Clear All Images
                              </Button>
                            </Box>
                            
                            <Divider sx={{ my: 3 }} />
                            
                            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                              Basic Layout Options
                            </Typography>
                            
                            <Grid container spacing={3}>
                              <Grid item xs={12} sm={6} md={4}>
                                <TextField
                                  fullWidth
                                  select
                                  label="Images Per Page"
                                  value={imagesPerPage}
                                  onChange={(e) => setImagesPerPage(parseInt(e.target.value))}
                                >
                                  <MenuItem value={1}>1 image per page</MenuItem>
                                  <MenuItem value={2}>2 images per page</MenuItem>
                                  <MenuItem value={4}>4 images per page</MenuItem>
                                  <MenuItem value={6}>6 images per page</MenuItem>
                                </TextField>
                              </Grid>
                              
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControlLabel
                                  control={
                                    <Switch 
                                      checked={preserveAspectRatio}
                                      onChange={(e) => setPreserveAspectRatio(e.target.checked)}
                                    />
                                  }
                                  label="Preserve aspect ratio"
                                />
                              </Grid>
                              
                              <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth>
                                  <InputLabel id="page-size-label">Page Size</InputLabel>
                                  <Select
                                    labelId="page-size-label"
                                    id="page-size"
                                    value={pageSize}
                                    label="Page Size"
                                    onChange={(e) => setPageSize(e.target.value)}
                                  >
                                    <MenuItem value="A4">A4 (210 × 297 mm)</MenuItem>
                                    <MenuItem value="A5">A5 (148 × 210 mm)</MenuItem>
                                    <MenuItem value="Letter">Letter (8.5 × 11 in)</MenuItem>
                                    <MenuItem value="Legal">Legal (8.5 × 14 in)</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </motion.div>
                    )}

                    {/* Step 2: Customize PDF */}
                    {activeStep === 1 && (
                      <motion.div
                        key="customize-step"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            Page Layout & Orientation
                          </Typography>
                          
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <FormControl component="fieldset">
                                <Typography variant="body2" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                  Page Orientation
                                </Typography>
                                <RadioGroup 
                                  row
                                  value={pageOrientation}
                                  onChange={(e) => setPageOrientation(e.target.value)}
                                >
                                  <FormControlLabel 
                                    value="portrait" 
                                    control={<Radio size="small" />} 
                                    label="Portrait" 
                                  />
                                  <FormControlLabel 
                                    value="landscape" 
                                    control={<Radio size="small" />} 
                                    label="Landscape" 
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                Margins (mm)
                              </Typography>
                              <Slider
                                value={pageMargins}
                                min={0}
                                max={50}
                                step={5}
                                valueLabelDisplay="auto"
                                onChange={(e, newValue) => setPageMargins(newValue)}
                                sx={{ 
                                  color: '#7df9ff',
                                  '& .MuiSlider-thumb': {
                                    '&:hover, &.Mui-focusVisible': {
                                      boxShadow: '0 0 0 8px rgba(125, 249, 255, 0.16)'
                                    }
                                  }
                                }}
                              />
                              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                  None
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                  {pageMargins}mm
                                </Typography>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                  Large
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        {/* Watermark section */}
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            Watermark & Branding
                          </Typography>
                          
                          <FormControlLabel
                            control={
                              <Switch 
                                checked={addWatermark}
                                onChange={(e) => setAddWatermark(e.target.checked)}
                              />
                            }
                            label="Add watermark"
                          />
                          
                          <Collapse in={addWatermark}>
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 2 }}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    fullWidth
                                    label="Watermark Text"
                                    value={watermarkText}
                                    onChange={(e) => setWatermarkText(e.target.value)}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          {/* <Watermark fontSize="small" /> */}
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                  <Box sx={{ mb: 1 }}>
                                    <Typography variant="body2" gutterBottom sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                                      Opacity
                                    </Typography>
                                    <Slider
                                      value={watermarkOpacity}
                                      min={0.1}
                                      max={1}
                                      step={0.1}
                                      valueLabelDisplay="auto"
                                      valueLabelFormat={x => `${Math.round(x * 100)}%`}
                                      onChange={(e, newValue) => setWatermarkOpacity(newValue)}
                                    />
                                  </Box>
                                </Grid>
                                
                                <Grid item xs={12} sm={6}>
                                  <FormControl fullWidth>
                                    <InputLabel>Watermark Color</InputLabel>
                                    <Select
                                      value={watermarkColor}
                                      onChange={(e) => setWatermarkColor(e.target.value)}
                                      label="Watermark Color"
                                    >
                                      <MenuItem value="#FF0000">Red</MenuItem>
                                      <MenuItem value="#000000">Black</MenuItem>
                                      <MenuItem value="#0000FF">Blue</MenuItem>
                                      <MenuItem value="#808080">Gray</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                            </Box>
                          </Collapse>
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        {/* Headers and Footers */}
                        <Box sx={{ mb: 3 }}>
                          <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                            Headers & Footers
                          </Typography>
                          
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Switch 
                                    checked={addHeader}
                                    onChange={(e) => setAddHeader(e.target.checked)}
                                  />
                                }
                                label="Add header"
                              />
                              
                              <Collapse in={addHeader}>
                                <TextField
                                  fullWidth
                                  label="Header Text"
                                  value={headerText}
                                  onChange={(e) => setHeaderText(e.target.value)}
                                  margin="normal"
                                />
                              </Collapse>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Switch 
                                    checked={addFooter}
                                    onChange={(e) => setAddFooter(e.target.checked)}
                                  />
                                }
                                label="Add footer"
                              />
                              
                              <Collapse in={addFooter}>
                                <TextField
                                  fullWidth
                                  label="Footer Text"
                                  value={footerText}
                                  onChange={(e) => setFooterText(e.target.value)}
                                  margin="normal"
                                />
                              </Collapse>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Switch 
                                    checked={addPageNumbers}
                                    onChange={(e) => setAddPageNumbers(e.target.checked)}
                                  />
                                }
                                label="Add page numbers"
                              />
                              
                              <Collapse in={addPageNumbers}>
                                <FormControl fullWidth margin="normal">
                                  <InputLabel>Position</InputLabel>
                                  <Select
                                    value={pageNumberPosition}
                                    label="Position"
                                    onChange={(e) => setPageNumberPosition(e.target.value)}
                                  >
                                    <MenuItem value="bottom-center">Bottom Center</MenuItem>
                                    <MenuItem value="bottom-right">Bottom Right</MenuItem>
                                    <MenuItem value="bottom-left">Bottom Left</MenuItem>
                                  </Select>
                                </FormControl>
                              </Collapse>
                            </Grid>
                          </Grid>
                        </Box>
                      </motion.div>
                    )}
                    
                    {/* Step 3: Preview & Finalize */}
                    {activeStep === 2 && (
                      <motion.div
                        key="preview-step"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          {pdfPreviewUrl ? (
                            <Box>
                              <Typography variant="h6" gutterBottom>
                                Your PDF is Ready for Preview
                              </Typography>
                              
                              <Box
                                sx={{
                                  mt: 3,
                                  mb: 4,
                                  position: 'relative',
                                  height: 400,
                                  border: '1px solid rgba(255, 255, 255, 0.1)',
                                  borderRadius: 2,
                                  overflow: 'hidden',
                                  bgcolor: 'rgba(0, 0, 0, 0.3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Box sx={{ 
                                  width: '100%', 
                                  height: '100%', 
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  position: 'relative'
                                }}>
                                  <Document
                                    file={pdfPreviewUrl}
                                    onLoadSuccess={handleDocumentLoadSuccess}
                                    loading={
                                      <CircularProgress size={60} sx={{ color: '#7df9ff' }} />
                                    }
                                    error={
                                      <Typography color="error">
                                        Failed to load PDF preview.
                                      </Typography>
                                    }
                                  >
                                    <Page 
                                      pageNumber={1} 
                                      width={300}
                                      renderTextLayer={false}
                                      renderAnnotationLayer={false}
                                    />
                                  </Document>
                                  
                                  {/* Overlay for clicking to open full preview */}
                                  <Box
                                    sx={{
                                      position: 'absolute',
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      opacity: 0,
                                      transition: 'opacity 0.2s ease',
                                      cursor: 'pointer',
                                      '&:hover': {
                                        opacity: 1,
                                      },
                                    }}
                                    onClick={handleOpenPreview}
                                  >
                                    <Button
                                      variant="contained"
                                      startIcon={<EyeIcon size={16} />}
                                    >
                                      Open Full Preview
                                    </Button>
                                  </Box>
                                </Box>
                              </Box>
                              
                              <Box sx={{ mb: 3 }}>
                                <Typography variant="body1" gutterBottom>
                                  PDF Details
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 2, maxWidth: 600, mx: 'auto' }}>
                                  <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                                      <Typography variant="caption" color="text.secondary">Pages</Typography>
                                      <Typography variant="h6">{numPages || '-'}</Typography>
                                    </Paper>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                                      <Typography variant="caption" color="text.secondary">Size</Typography>
                                      <Typography variant="h6">{pageSize}</Typography>
                                    </Paper>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                                      <Typography variant="caption" color="text.secondary">Orientation</Typography>
                                      <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
                                        {pageOrientation}
                                      </Typography>
                                    </Paper>
                                  </Grid>
                                  <Grid item xs={6} sm={3}>
                                    <Paper sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.03)' }}>
                                      <Typography variant="caption" color="text.secondary">Images</Typography>
                                      <Typography variant="h6">{images.length}</Typography>
                                    </Paper>
                                  </Grid>
                                </Grid>
                                
                                <Button 
                                  variant="outlined" 
                                  startIcon={<EditIcon size={16} />} 
                                  onClick={() => setActiveStep(1)}
                                  sx={{ mr: 2 }}
                                >
                                  Edit PDF Settings
                                </Button>
                                
                                <Button 
                                  variant="outlined" 
                                  color="primary" 
                                  startIcon={<EyeIcon size={16} />} 
                                  onClick={handleOpenPreview}
                                >
                                  Full Preview
                                </Button>
                              </Box>
                            </Box>
                          ) : (
                            <Box 
                              sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center',
                                py: 6
                              }}
                            >
                              <CircularProgress size={60} sx={{ mb: 3, color: '#7df9ff' }} />
                              <Typography variant="h6" gutterBottom>
                                Generating PDF Preview
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Please wait while we create a preview of your PDF...
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>

                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'rgba(255, 255, 255, 0.1)', background: 'rgba(0, 0, 0, 0.3)', display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                    <Button
                      variant="outlined"
                      onClick={handleReset}
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)'
                        }
                      }}
                    >
                      Reset
                    </Button>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center'
                  }}>
                    {activeStep > 0 && (
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        sx={{ 
                          mr: 2,
                          color: 'rgba(255, 255, 255, 0.8)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        }}
                      >
                        Back
                      </Button>
                    )}
                    
                    {activeStep === 0 && (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={images.length === 0}
                        sx={{
                          px: 3,
                          borderRadius: '50px',
                          background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                            boxShadow: '0 4px 15px rgba(125, 249, 255, 0.4)'
                          }
                        }}
                      >
                        Continue to Customize
                      </Button>
                    )}
                    
                    {activeStep === 1 && (
                      <Button
                        variant="contained"
                        onClick={handleGeneratePreview}
                        disabled={!isValid() || isProcessing}
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <EyeIcon size={16} />}
                        sx={{
                          px: 3,
                          borderRadius: '50px',
                          background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                            boxShadow: '0 4px 15px rgba(125, 249, 255, 0.4)'
                          },
                          '& .rotating': {
                            animation: 'spin 2s linear infinite',
                          },
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          }
                        }}
                      >
                        {isProcessing ? 'Generating Preview...' : 'Preview PDF'}
                      </Button>
                    )}
                    
                    {activeStep === 2 && (
                      <Button
                        variant="contained"
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <DownloadIcon size={16} />}
                        onClick={handleCreatePDF}
                        disabled={!isValid() || isProcessing || !pdfPreviewUrl}
                        sx={{
                          px: 4,
                          borderRadius: '50px',
                          background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                          '&:hover': {
                            background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                            boxShadow: '0 4px 15px rgba(125, 249, 255, 0.4)'
                          },
                          '& .rotating': {
                            animation: 'spin 2s linear infinite',
                          },
                          '@keyframes spin': {
                            '0%': { transform: 'rotate(0deg)' },
                            '100%': { transform: 'rotate(360deg)' },
                          },
                          '&.Mui-disabled': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.4)'
                          }
                        }}
                      >
                        {isProcessing ? 'Creating PDF...' : 'Download PDF'}
                      </Button>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} gutterBottom>
                  Creating your PDF...
                </Typography>
                <LinearProgress 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                    }
                  }} 
                />
              </Box>
            )}
            
            {error && (
              <Alert 
                severity="error" 
                sx={{ mt: 3, borderRadius: 2 }}
              >
                {error}
              </Alert>
            )}
          </motion.div>
        ) : (
          <motion.div
            variants={successVariants}
            initial="hidden"
            animate="visible"
          >
            <Card sx={{ 
              borderRadius: 4, 
              mb: 4,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <CardContent sx={{ p: 0 }}>
                <Box
                  sx={{
                    p: 3,
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'rgba(75, 219, 106, 0.2)',
                    color: 'white',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      bgcolor: '#4DDB6A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    <CheckIcon size={24} />
                  </Box>
                  
                  <Box>
                    <Typography variant="h6">
                      PDF Created Successfully
                    </Typography>
                    <Typography variant="body2">
                      Your PDF document is ready to download
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha('#ff4d4f', 0.1),
                      borderRadius: 2,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileIcon size={40} color="#ff4d4f" />
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        right: -10,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: '#4DDB6A',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                      }}
                    >
                      <CheckIcon size={16} />
                    </Box>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {(processedFile.size / (1024 * 1024)).toFixed(2)} MB • Created {new Date().toLocaleString()}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{
                      px: 4,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                        boxShadow: '0 4px 15px rgba(125, 249, 255, 0.4)'
                      },
                    }}
                  >
                    Download PDF
                  </Button>
                </Box>
                
                <Divider />
                
                <Box sx={{ p: 3, textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <Button
                    variant="text"
                    startIcon={<FilePlusIcon size={16} />}
                    onClick={handleReset}
                    sx={{ color: '#7df9ff', '&:hover': { backgroundColor: 'rgba(125, 249, 255, 0.1)' } }}
                  >
                    Create Another PDF
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Info Section */}
        <Box sx={{ mt: 8, position: 'relative', zIndex: 1 }}>
          <Divider sx={{ mb: 4, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h5" 
                gutterBottom 
                fontWeight={700}
                sx={{
                  background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'inline-block',
                }}
              >
                How to Create a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Choose your creation method',
                    description: 'Select whether you want to create a blank PDF, convert text to PDF, or convert images to PDF.'
                  },
                  {
                    title: 'Configure settings',
                    description: 'Set page size, orientation, and other options depending on your chosen method.'
                  },
                  {
                    title: 'Add your content',
                    description: 'Enter text or upload images based on the selected creation method.'
                  },
                  {
                    title: 'Create and download',
                    description: 'Click the "Create PDF" button and download your new PDF document.'
                  }
                ].map((step, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      mb: 3,
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        bgcolor: '#7df9ff',
                        color: '#030018',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        mr: 2,
                        mt: 0.5,
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>      
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  bgcolor: alpha(theme.palette.info.main, 0.08),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PentagonOutlined size={16} style={{ marginRight: 8 }} color={theme.palette.info.main} />
                  Advanced PDF Creation
                </Typography>
                <Typography variant="body2">
                  Need more advanced features like headers, footers, page numbers, or custom watermarks? 
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 500, ml: 0.5 }}>
                    Upgrade to our Pro version
                  </Box> for enhanced PDF creation capabilities.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CreatePDFPage;