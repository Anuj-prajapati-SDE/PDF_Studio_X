import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  AlertTitle,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Tooltip,
  TextField,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
//   FilePdf as FilePdfIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Zap as ZapIcon,
  Crop as CropIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Maximize as MaximizeIcon,
  Scissors as ScissorsIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Mock PDF page preview component (in a real app, we'd use a PDF renderer)
const PDFPagePreview = ({ pageNumber, totalPages, onPageChange, cropArea, setCropArea }) => {
  const theme = useTheme();
  const containerRef = useRef(null);
  
  // Simplified crop area handling
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    setCropArea({
      ...cropArea,
      startX: x,
      startY: y,
      endX: x,
      endY: y,
      isDragging: true,
    });
  };
  
  const handleMouseMove = (e) => {
    if (!cropArea.isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    const y = Math.min(Math.max((e.clientY - rect.top) / rect.height, 0), 1);
    
    setCropArea({
      ...cropArea,
      endX: x,
      endY: y,
    });
  };
  
  const handleMouseUp = () => {
    if (cropArea.isDragging) {
      setCropArea({
        ...cropArea,
        isDragging: false,
      });
      
      // Normalize values to ensure startX < endX and startY < endY
      const normCropArea = {
        startX: Math.min(cropArea.startX, cropArea.endX),
        startY: Math.min(cropArea.startY, cropArea.endY),
        endX: Math.max(cropArea.startX, cropArea.endX),
        endY: Math.max(cropArea.startY, cropArea.endY),
        isDragging: false,
      };
      
      setCropArea(normCropArea);
      
      // Show dimensions in toast
      const width = Math.round((normCropArea.endX - normCropArea.startX) * 100);
      const height = Math.round((normCropArea.endY - normCropArea.startY) * 100);
      toast.success(`Selection: ${width}% × ${height}% of page`);
    }
  };
  
  // Clean up event listeners
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (cropArea.isDragging) {
        setCropArea({
          ...cropArea,
          isDragging: false,
        });
      }
    };
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [cropArea, setCropArea]);
  
  // Show selection box
  const selectionStyle = {
    position: 'absolute',
    left: `${Math.min(cropArea.startX, cropArea.endX) * 100}%`,
    top: `${Math.min(cropArea.startY, cropArea.endY) * 100}%`,
    width: `${Math.abs(cropArea.endX - cropArea.startX) * 100}%`,
    height: `${Math.abs(cropArea.endY - cropArea.startY) * 100}%`,
    border: '2px dashed',
    borderColor: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    pointerEvents: 'none',
  };
  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box
          ref={containerRef}
          sx={{
            width: '100%',
            height: 400,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'crosshair',
            overflow: 'hidden',
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Typography variant="h1" sx={{ color: alpha(theme.palette.text.primary, 0.05), userSelect: 'none' }}>
            PDF
          </Typography>
          
          {/* Sample page content - would be actual PDF page in real app */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundImage: `url(https://picsum.photos/seed/${pageNumber}/800/1000)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'opacity(0.7)',
            }} 
          />
          
          {/* Selection rectangle */}
          {(cropArea.startX !== cropArea.endX || cropArea.startY !== cropArea.endY) && (
            <Box style={selectionStyle} />
          )}
          
          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.75),
              color: 'text.secondary',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 500,
              backdropFilter: 'blur(4px)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.5),
            }}
          >
            <Tooltip title="Drag to select crop area">
              <CropIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
            </Tooltip>
            Drag to select crop area
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <IconButton 
            disabled={pageNumber <= 1} 
            onClick={() => onPageChange(pageNumber - 1)}
            sx={{ 
              color: pageNumber <= 1 ? 'text.disabled' : 'primary.main',
            }}
          >
            <ChevronLeftIcon size={24} />
          </IconButton>
          
          <Typography sx={{ mx: 2, fontWeight: 500 }}>
            Page {pageNumber} of {totalPages}
          </Typography>
          
          <IconButton 
            disabled={pageNumber >= totalPages} 
            onClick={() => onPageChange(pageNumber + 1)}
            sx={{ 
              color: pageNumber >= totalPages ? 'text.disabled' : 'primary.main',
            }}
          >
            <ChevronRightIcon size={24} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const CropPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Simulated total pages
  const [cropOptions, setCropOptions] = useState({
    applyToAllPages: false,
    cropMargins: false,
    marginSize: 20,
  });
  const [cropArea, setCropArea] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    isDragging: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-04 07:25:23";
  const username = "Anuj-prajapati-SDE";

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      
      if (pdfFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setFile(pdfFile);
      toast.success('PDF uploaded successfully');
      setProcessedFile(null);
      setError(null);
      
      // Reset crop area when changing files
      setCropArea({
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
        isDragging: false,
      });
      
      // Simulate getting total pages from the PDF
      const simulatedPageCount = Math.floor(Math.random() * 8) + 1; // 1-8 pages
      setTotalPages(simulatedPageCount);
      setCurrentPage(1);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleOptionChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setCropOptions({
      ...cropOptions,
      [name]: value,
    });
  };

  const handleCrop = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to crop');
      return;
    }
    
    // Check if crop area has been defined
    const hasSelection = cropArea.startX !== cropArea.endX || cropArea.startY !== cropArea.endY;
    const hasCropOption = cropOptions.cropMargins;
    
    if (!hasSelection && !hasCropOption) {
      toast.error('Please select a crop area or enable margin cropping');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate PDF cropping process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calculate file size reduction based on crop area
      const sizeReduction = hasSelection ? 
        (cropArea.endX - cropArea.startX) * (cropArea.endY - cropArea.startY) : 
        0.95; // 5% reduction for margin cropping
      
      const newFileSize = Math.round(file.size * sizeReduction);
      
      setProcessedFile({
        name: file.name.replace('.pdf', '_cropped.pdf'),
        size: newFileSize,
        pagesAffected: cropOptions.applyToAllPages ? totalPages : 1,
        totalPages: totalPages,
        url: '#', // Mock URL
      });
      
      toast.success('PDF cropped successfully!');
    } catch (err) {
      console.error('Error cropping PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to crop PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your cropped PDF');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    setCropArea({
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isDragging: false,
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ position: 'relative', minHeight: '100vh' }}>
        {/* Page Header with Current User and DateTime */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #fafbff 0%, #f5f7ff 100%)',
            border: '1px solid',
            borderColor: alpha(theme.palette.primary.main, 0.1),
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
                Crop PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Remove unwanted margins and content from your PDF pages
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" color="text.secondary">Current User</Typography>
                <Typography variant="body2" fontWeight={500}>{username}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Date & Time (UTC)</Typography>
                <Typography variant="body2" fontWeight={500}>{currentDateTime}</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {!processedFile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card 
                  sx={{ 
                    borderRadius: 4, 
                    mb: { xs: 3, md: 0 },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                          }}
                        >
                          <CropIcon size={24} color={theme.palette.primary.main} />
                        </Box>
                        
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {file ? 'Select Crop Area' : 'Upload PDF'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {file 
                              ? 'Drag to select the area you want to keep' 
                              : 'Upload the PDF you want to crop'
                            }
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    
                    <Box sx={{ p: 3 }}>
                      {!file ? (
                        <Paper
                          {...getRootProps()}
                          elevation={0}
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            borderColor: isDragActive ? 'primary.main' : 'divider',
                            bgcolor: isDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                            p: 6,
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                          }}
                        >
                          <input {...getInputProps()} />
                          
                          <Box
                            component={motion.div}
                            variants={itemVariants}
                            sx={{
                              width: 70,
                              height: 70,
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
                            <UploadIcon size={30} />
                          </Box>
                          
                          <Typography 
                            variant="h6" 
                            component={motion.div}
                            variants={itemVariants} 
                            gutterBottom
                          >
                            {isDragActive
                              ? "Drop your PDF here"
                              : "Drag & drop PDF file here"
                            }
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            component={motion.div}
                            variants={itemVariants}
                          >
                            or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>browse files</Box>
                          </Typography>
                          
                          <Box component={motion.div} variants={itemVariants} sx={{ mt: 2 }}>
                            <Chip 
                              label="Maximum file size: 100MB" 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        </Paper>
                      ) : (
                        <>
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <Box
                                sx={{
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  width: 36,
                                  height: 36,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 2,
                                  mr: 2,
                                }}
                              >
                                {/* <FilePdfIcon size={20} color={theme.palette.error.main} /> */}
                              </Box>
                              
                              <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" fontWeight={500}>
                                  {file.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {formatFileSize(file.size)} • {totalPages} page{totalPages !== 1 ? 's' : ''}
                                </Typography>
                              </Box>
                              
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={handleReset}
                                startIcon={<TrashIcon size={16} />}
                              >
                                Change
                              </Button>
                            </Box>
                          </Box>
                          
                          <PDFPagePreview 
                            pageNumber={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={handlePageChange}
                            cropArea={cropArea}
                            setCropArea={setCropArea}
                          />
                          
                          <Alert 
                            severity="info" 
                            icon={<InfoIcon size={18} />}
                            sx={{ mt: 3, borderRadius: 2 }}
                          >
                            <Typography variant="body2">
                              The selected area (inside the dashed box) will be kept, and everything outside will be cropped away.
                              {cropOptions.applyToAllPages 
                                ? ' This crop will be applied to all pages.' 
                                : ' This crop will only be applied to the current page.'
                              }
                            </Typography>
                          </Alert>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Card sx={{ borderRadius: 4, height: '100%' }}>
                  <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Crop Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Configure how you want to crop your PDF
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cropOptions.applyToAllPages}
                            onChange={handleOptionChange('applyToAllPages')}
                            disabled={!file}
                          />
                        }
                        label="Apply crop to all pages"
                      />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -0.5, mb: 2 }}>
                        When disabled, crop will only apply to the current page
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={cropOptions.cropMargins}
                            onChange={handleOptionChange('cropMargins')}
                            disabled={!file}
                          />
                        }
                        label="Auto-crop margins"
                      />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: -0.5, mb: 2 }}>
                        Automatically remove white margins from all pages
                      </Typography>
                      
                      {cropOptions.cropMargins && (
                        <Box sx={{ mb: 3, ml: 4, mr: 1 }}>
                          <Typography variant="body2" gutterBottom>
                            Margin Detection Sensitivity: {cropOptions.marginSize}%
                          </Typography>
                          <Slider
                            value={cropOptions.marginSize}
                            onChange={handleOptionChange('marginSize')}
                            min={0}
                            max={50}
                            disabled={!file}
                          />
                          <Typography variant="caption" color="text.secondary">
                            Higher values remove more white space
                          </Typography>
                        </Box>
                      )}
                      
                      <Box sx={{ mt: 'auto' }}>
                        <Button
                          variant="contained"
                          size="large"
                          fullWidth
                          startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ScissorsIcon size={16} />}
                          onClick={handleCrop}
                          disabled={isProcessing || !file}
                          sx={{
                            py: 1.5,
                            borderRadius: '50px',
                            position: 'relative',
                            overflow: 'hidden',
                            '& .rotating': {
                              animation: 'spin 2s linear infinite',
                            },
                            '@keyframes spin': {
                              '0%': { transform: 'rotate(0deg)' },
                              '100%': { transform: 'rotate(360deg)' },
                            },
                          }}
                        >
                          {isProcessing ? 'Cropping PDF...' : 'Crop PDF'}
                        </Button>
                        
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
                          The original PDF will not be modified
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cropping your PDF...
                </Typography>
                <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Card sx={{ borderRadius: 4, mb: 4, overflow: 'hidden' }}>
                  <Box
                    sx={{
                      p: 3,
                      bgcolor: 'success.lighter',
                      borderBottom: '1px solid',
                      borderColor: alpha(theme.palette.success.main, 0.2),
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <CheckIcon size={24} />
                      </Box>
                      
                      <Box>
                        <Typography variant="h6">
                          PDF Cropped Successfully!
                        </Typography>
                        <Typography variant="body2">
                          Your PDF has been cropped according to your selection
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Box 
                          sx={{ 
                            maxWidth: 320,
                            mx: { xs: 'auto', md: '0' }
                          }}
                        >
                          <Box
                            sx={{
                              height: 320,
                              width: '100%',
                              backgroundColor: alpha(theme.palette.background.default, 0.5),
                              borderRadius: 3,
                              display: 'flex',
                              flexDirection: 'column',
                              overflow: 'hidden',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              position: 'relative',
                              mb: 2,
                            }}
                          >
                            {/* Before/After Visualization */}
                            <Box sx={{ display: 'flex', height: '100%' }}>
                              <Box sx={{ width: '50%', height: '100%', position: 'relative', borderRight: '1px dashed', borderColor: 'primary.main' }}>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    position: 'absolute', 
                                    top: 5, 
                                    left: 5, 
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: 'primary.main',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontWeight: 500,
                                  }}
                                >
                                  Before
                                </Typography>
                                {/* Sample uncropped content */}
                                <Box
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url(https://picsum.photos/seed/1/800/1000)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    filter: 'opacity(0.7)',
                                  }}
                                />
                              </Box>
                              <Box sx={{ width: '50%', height: '100%', position: 'relative' }}>
                                <Typography 
                                  variant="caption" 
                                  sx={{ 
                                    position: 'absolute', 
                                    top: 5, 
                                    right: 5, 
                                    bgcolor: alpha(theme.palette.success.main, 0.1),
                                    color: 'success.main',
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 1,
                                    fontWeight: 500,
                                  }}
                                >
                                  After
                                </Typography>
                                {/* Sample cropped content - zoomed in */}
                                <Box
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url(https://picsum.photos/seed/1/800/1000)',
                                    backgroundSize: '120%', // Zoomed to simulate crop
                                    backgroundPosition: 'center',
                                    filter: 'opacity(0.9)',
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                          
                          <Typography variant="body1" fontWeight={600}>
                            {processedFile.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatFileSize(processedFile.size)} • {processedFile.totalPages} page{processedFile.totalPages !== 1 ? 's' : ''}
                          </Typography>
                          
                          <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<DownloadIcon />}
                            onClick={handleDownload}
                            sx={{ 
                              mt: 2,
                              py: 1.5,
                              borderRadius: '50px',
                            }}
                          >
                            Download Cropped PDF
                          </Button>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={7}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: 3,
                            bgcolor: alpha(theme.palette.info.main, 0.05),
                            mb: 3,
                          }}
                        >
                          <CardContent>
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                              Crop Summary
                            </Typography>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Pages Modified
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                    {processedFile.pagesAffected} of {processedFile.totalPages}
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Size Reduction
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500} color="success.main">
                                    {Math.round((1 - processedFile.size / file.size) * 100)}%
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Original Size
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                    {formatFileSize(file.size)}
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    New Size
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                    {formatFileSize(processedFile.size)}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                        
                        <Alert 
                          severity="success" 
                          icon={<CheckIcon size={18} />}
                          sx={{ mb: 3, borderRadius: 3 }}
                        >
                          <Typography variant="body2">
                            Your PDF has been successfully cropped. The original content outside the selected area has been removed, resulting in a cleaner document and smaller file size.
                          </Typography>
                        </Alert>
                        
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                          <Button
                            variant="outlined"
                            startIcon={<RefreshIcon size={16} />}
                            fullWidth
                            onClick={handleReset}
                          >
                            Crop Another PDF
                          </Button>
                          
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => {
                              setProcessedFile(null);
                            }}
                          >
                            Adjust Crop Area
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                
                <Alert 
                  severity="info" 
                  icon={<InfoIcon size={20} />} 
                  sx={{ mb: 4, borderRadius: 3 }}
                >
                  <AlertTitle>Next Steps</AlertTitle>
                  <Typography variant="body2">
                    You can download your cropped PDF or further edit it using our other PDF tools. The cropping process permanently removes content outside your selected area, which can help reduce file size and focus on important content.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Crop a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop or browse to upload the PDF file you want to crop.'
                  },
                  {
                    title: 'Select crop area',
                    description: 'Drag on the page to create a selection box around the content you want to keep.'
                  },
                  {
                    title: 'Choose cropping options',
                    description: 'Configure whether to apply the crop to all pages or just the current one.'
                  },
                  {
                    title: 'Download your cropped PDF',
                    description: 'Click "Crop PDF" and download your newly cropped document.'
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
                        bgcolor: 'primary.main',
                        color: 'white',
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
              <Typography variant="h6" gutterBottom fontWeight={700}>
                Crop PDF Tips & Tricks
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Precise Selection',
                    description: 'Click and drag from one corner to the opposite corner for the most accurate selection.',
                  },
                  {
                    title: 'Auto-crop Margins',
                    description: 'Use the auto-crop feature to automatically remove white margins from all pages at once.',
                  },
                  {
                    title: 'Mixed Page Sizes',
                    description: 'For documents with different page sizes, crop one page at a time instead of applying to all pages.',
                  },
                  {
                    title: 'Scan Cleanup',
                    description: 'Use cropping to remove scanner artifacts and black edges from scanned documents.',
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        height: '100%',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              
              <Card 
                sx={{ 
                  mt: 3,
                  borderRadius: 3,
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom color="warning.dark">
                    <AlertCircleIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Important Note
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Cropping permanently removes content from your PDF. This can't be undone, so make sure you're only removing the parts you don't need. Consider saving a backup copy of your original PDF before cropping.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CropPDFPage;