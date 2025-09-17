import React, { useState, useCallback, useEffect } from 'react';
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
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Chip,
  useTheme,
  alpha,
  IconButton,
} from '@mui/material';
import {
  Image as ImageIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Zap as ZapIcon,
  Maximize2 as ResizeIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const ImageCompressionPage = () => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
  const [compressionOptions, setCompressionOptions] = useState({
    quality: 80,
    format: 'original',
    resize: false,
    maxWidth: 1920,
    maxHeight: 1080,
    preserveAspectRatio: true,
    optimizeForWeb: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [error, setError] = useState(null);
  const [totalSavings, setTotalSavings] = useState(0);

  // Current date and time
  const currentDateTime = "2025-05-03 19:39:04";
  const username = "Anuj-prajapati-SDE";

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      // Check file types and sizes
      const validFiles = acceptedFiles.filter(file => {
        const isValidType = /image\/(jpeg|jpg|png|webp|gif)/.test(file.type);
        const isValidSize = file.size <= 15 * 1024 * 1024; // 15MB max
        
        if (!isValidType) {
          toast.error(`${file.name} is not a supported image format`);
        }
        if (!isValidSize) {
          toast.error(`${file.name} exceeds the 15MB size limit`);
        }
        
        return isValidType && isValidSize;
      });
      
      if (validFiles.length > 0) {
        // Add preview URLs for the images
        const filesWithPreviews = validFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        
        setFiles(prev => [...prev, ...filesWithPreviews]);
        toast.success(`${validFiles.length} image${validFiles.length > 1 ? 's' : ''} added successfully`);
        setProcessedFiles([]);
        setError(null);
      }
    }
  }, []);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'image/gif': ['.gif'],
    },
    maxSize: 15 * 1024 * 1024, // 15MB
  });

  const handleOptionChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setCompressionOptions({
      ...compressionOptions,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setCompressionOptions({
      ...compressionOptions,
      [name]: newValue,
    });
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    if (newFiles[index].preview) {
      URL.revokeObjectURL(newFiles[index].preview);
    }
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    if (newFiles.length === 0) {
      setProcessedFiles([]);
    }
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      toast.error('Please upload at least one image to compress');
      return;
    }

    setError(null);
    setIsProcessing(true);
    setProcessedFiles([]);
    
    try {
      // Simulate image compression process
      await new Promise(resolve => setTimeout(resolve, 1500 + (files.length * 300)));
      
      const processed = files.map(file => {
        // Calculate compression based on quality setting
        const compressionRatio = 1 - (compressionOptions.quality / 100) * 0.8; // Simulate compression ratio
        const newSize = Math.floor(file.size * (1 - compressionRatio));
        
        return {
          name: file.name,
          originalSize: file.size,
          compressedSize: newSize,
          preview: file.preview,
          savingsPercent: Math.round(compressionRatio * 100),
          url: '#', // Mock URL, in a real app this would be the download URL
        };
      });
      
      // Calculate total savings
      const totalOriginalSize = files.reduce((sum, file) => sum + file.size, 0);
      const totalCompressedSize = processed.reduce((sum, file) => sum + file.compressedSize, 0);
      const savedBytes = totalOriginalSize - totalCompressedSize;
      const savingsPercent = Math.round((savedBytes / totalOriginalSize) * 100);
      
      setProcessedFiles(processed);
      setTotalSavings(savingsPercent);
      toast.success(`${files.length} image${files.length !== 1 ? 's' : ''} compressed successfully!`);
    } catch (err) {
      console.error('Error compressing images:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to compress images');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    toast.success('Downloading all compressed images');
    // In a real app, this would trigger downloads of all processed images
  };

  const handleReset = () => {
    // Clean up preview URLs
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });
    
    setFiles([]);
    setProcessedFiles([]);
    setError(null);
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
                Image Compression
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Compress your images while maintaining quality
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

        {processedFiles.length === 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card sx={{ borderRadius: 4, mb: 4, overflow: 'visible' }}>
              <CardContent sx={{ p: 0 }}>
                <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight={600}>
                    Upload Images
                  </Typography>
                </Box>
                
                <Box sx={{ p: 3 }}>
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
                      p: { xs: 2, sm: 4 },
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      mb: 3,
                    }}
                  >
                    <input {...getInputProps()} />
                    
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
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
                      <UploadIcon size={24} />
                    </Box>
                    
                    <Typography variant="h6" gutterBottom>
                      {isDragActive
                        ? "Drop your images here"
                        : "Drag & drop images here"
                      }
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse files</Box>
                    </Typography>
                    
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        label="JPG, PNG, WebP, GIF (Max: 15MB each)" 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                  </Paper>
                  
                  {files.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        {files.length} Image{files.length !== 1 ? 's' : ''} Selected
                      </Typography>
                      
                      <Grid container spacing={2}>
                        {files.map((file, index) => (
                          <Grid item xs={6} sm={4} md={3} lg={2} key={`${file.name}-${index}`}>
                            <Card
                              variant="outlined"
                              sx={{
                                borderRadius: 2,
                                position: 'relative',
                                height: '100%',
                                '&:hover .delete-btn': {
                                  opacity: 1,
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src={file.preview}
                                alt={file.name}
                                sx={{
                                  width: '100%',
                                  height: 120,
                                  objectFit: 'cover',
                                  borderTopLeftRadius: '8px',
                                  borderTopRightRadius: '8px',
                                }}
                              />
                              <Box sx={{ p: 1 }}>
                                <Typography variant="caption" noWrap sx={{ display: 'block' }}>
                                  {file.name}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {formatFileSize(file.size)}
                                </Typography>
                              </Box>
                              <IconButton
                                className="delete-btn"
                                size="small"
                                color="error"
                                onClick={() => handleRemoveFile(index)}
                                sx={{
                                  position: 'absolute',
                                  top: 5,
                                  right: 5,
                                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                                  opacity: 0,
                                  transition: 'opacity 0.2s ease',
                                  '&:hover': {
                                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                                  }
                                }}
                              >
                                <TrashIcon size={16} />
                              </IconButton>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="error"
                          size="small"
                          onClick={handleReset}
                          startIcon={<TrashIcon size={16} />}
                        >
                          Clear All
                        </Button>
                      </Box>
                    </Box>
                  )}
                  
                  <Divider sx={{ my: 3 }} />
                  
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Compression Settings
                  </Typography>
                  
                  <Grid container spacing={3}>
                    {/* Quality Slider */}
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" gutterBottom>
                        Quality: {compressionOptions.quality}%
                      </Typography>
                      <Slider
                        value={compressionOptions.quality}
                        onChange={handleSliderChange('quality')}
                        min={30}
                        max={100}
                        valueLabelDisplay="auto"
                        sx={{ mb: 1 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Lower quality = smaller file size
                      </Typography>
                    </Grid>
                    
                    {/* Output Format */}
                    <Grid item xs={12} sm={6} md={3}>
                      <FormControl fullWidth>
                        <InputLabel id="format-label">Output Format</InputLabel>
                        <Select
                          labelId="format-label"
                          id="format"
                          value={compressionOptions.format}
                          onChange={handleOptionChange('format')}
                          label="Output Format"
                        >
                          <MenuItem value="original">Same as Original</MenuItem>
                          <MenuItem value="jpg">JPG</MenuItem>
                          <MenuItem value="png">PNG</MenuItem>
                          <MenuItem value="webp">WebP</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    
                    {/* Optimize for web toggle */}
                    <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={compressionOptions.optimizeForWeb}
                            onChange={handleOptionChange('optimizeForWeb')}
                          />
                        }
                        label="Optimize for Web"
                      />
                    </Grid>
                    
                    {/* Resize toggle */}
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={compressionOptions.resize}
                            onChange={handleOptionChange('resize')}
                          />
                        }
                        label="Resize Images"
                      />
                    </Grid>
                    
                    {/* Resize options */}
                    {compressionOptions.resize && (
                      <>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Max Width (px)"
                            value={compressionOptions.maxWidth}
                            onChange={handleOptionChange('maxWidth')}
                            inputProps={{ min: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <TextField
                            fullWidth
                            type="number"
                            label="Max Height (px)"
                            value={compressionOptions.maxHeight}
                            onChange={handleOptionChange('maxHeight')}
                            inputProps={{ min: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={compressionOptions.preserveAspectRatio}
                                onChange={handleOptionChange('preserveAspectRatio')}
                              />
                            }
                            label="Preserve Aspect Ratio"
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>
                  
                  <Alert 
                    severity="info" 
                    icon={<InfoIcon size={18} />}
                    sx={{ mt: 3, borderRadius: 2 }}
                  >
                    <Typography variant="body2">
                      WebP format typically offers the best compression while maintaining quality, but it may not be supported by older browsers.
                    </Typography>
                  </Alert>
                </Box>
                
                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ZapIcon size={16} />}
                    onClick={handleCompress}
                    disabled={isProcessing || files.length === 0}
                    sx={{
                      px: 4,
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
                    {isProcessing 
                      ? `Compressing ${files.length} Image${files.length !== 1 ? 's' : ''}...` 
                      : `Compress ${files.length} Image${files.length !== 1 ? 's' : ''}`
                    }
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Processing your images, this may take a moment...
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
                      Compression Complete!
                    </Typography>
                    <Typography variant="body2">
                      {processedFiles.length} image{processedFiles.length !== 1 ? 's' : ''} compressed with {totalSavings}% overall size reduction
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Results
                </Typography>
                
                <Grid container spacing={2}>
                  {processedFiles.map((file, index) => (
                    <Grid item xs={12} sm={6} md={4} key={`result-${index}`}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          borderRadius: 2,
                          height: '100%',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={file.preview}
                            alt={file.name}
                            sx={{
                              width: '100%',
                              height: 180,
                              objectFit: 'cover',
                              borderTopLeftRadius: '8px',
                              borderTopRightRadius: '8px',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 10,
                              right: 10,
                              bgcolor: 'success.main',
                              color: 'white',
                              py: 0.5,
                              px: 1.5,
                              borderRadius: '30px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            }}
                          >
                            -{file.savingsPercent}%
                          </Box>
                        </Box>
                        
                        <Box sx={{ p: 2 }}>
                          <Typography variant="subtitle2" noWrap>
                            {file.name}
                          </Typography>
                          
                          <Grid container spacing={1} sx={{ mt: 1 }}>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Original Size
                              </Typography>
                              <Typography variant="body2">
                                {formatFileSize(file.originalSize)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Compressed Size
                              </Typography>
                              <Typography variant="body2" color="success.main" fontWeight={500}>
                                {formatFileSize(file.compressedSize)}
                              </Typography>
                            </Grid>
                          </Grid>
                          
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<DownloadIcon size={14} />}
                            fullWidth
                            sx={{ mt: 2, borderRadius: 2 }}
                            onClick={() => toast.success(`Downloading ${file.name}`)}
                          >
                            Download
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box 
                  sx={{ 
                    mt: 4, 
                    p: 3, 
                    borderRadius: 3, 
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    border: `1px dashed ${alpha(theme.palette.info.main, 0.3)}`, 
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="primary">
                    {totalSavings}% Saved
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total reduction from {formatFileSize(processedFiles.reduce((sum, file) => sum + file.originalSize, 0))} to {formatFileSize(processedFiles.reduce((sum, file) => sum + file.compressedSize, 0))}
                  </Typography>
                </Box>
              </CardContent>
              
              <Divider />
              
              <Box 
                sx={{ 
                  p: 3, 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon size={16} />}
                  onClick={handleReset}
                >
                  Compress New Images
                </Button>
                
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon size={16} />}
                  onClick={handleDownloadAll}
                >
                  Download All Images
                </Button>
              </Box>
            </Card>
            
            <Alert 
              severity="info" 
              icon={<InfoIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>Compression Results</AlertTitle>
              <Typography variant="body2">
                Your images have been compressed with the settings you selected. For best results, we recommend testing different quality settings to find the optimal balance between file size and image quality.
              </Typography>
            </Alert>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Compress Images
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your images',
                    description: 'Drag and drop one or more images into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Adjust compression settings',
                    description: 'Set the quality level and choose whether to resize or convert formats.'
                  },
                  {
                    title: 'Choose output format',
                    description: 'Keep the original format or convert to a more efficient format like WebP.'
                  },
                  {
                    title: 'Download your compressed images',
                    description: 'Click "Compress" and download your optimized images individually or all at once.'
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
                Image Compression Tips
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Choose the Right Format',
                    description: 'WebP offers best compression for most images. Use PNG only for images requiring transparency.',
                  },
                  {
                    title: 'Balance Quality vs. Size',
                    description: 'For web images, 70-80% quality is usually sufficient and provides good compression.',
                  },
                  {
                    title: 'Resize Large Images',
                    description: 'If your images will be displayed smaller, resize them to reduce file size drastically.',
                  },
                  {
                    title: 'Batch Processing',
                    description: 'Process multiple images at once with the same settings for consistency across your site.',
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
                    Image Quality Considerations
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Higher compression (lower quality) may introduce visual artifacts, especially in images with gradients or smooth color transitions. For professional photography or images with fine details, use higher quality settings.
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

export default ImageCompressionPage;