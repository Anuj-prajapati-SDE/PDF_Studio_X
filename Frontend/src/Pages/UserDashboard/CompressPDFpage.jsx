import React, { useState, useCallback } from 'react';
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
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Chip,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  AlertTitle,
} from '@mui/material';
import {
//   FilePdf as FilePdfIcon,
  FileText as FileTextIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  ZapOff as ZapOffIcon,
  Zap as ZapIcon,
  FileText as TextIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const CompressPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [imageQuality, setImageQuality] = useState(80);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 18:53:52";
  const username = "Anuj-prajapati-SDE";

  const compressionLevels = [
    { value: 25, label: 'Low - Better quality', description: 'Minimal compression, preserve most quality' },
    { value: 50, label: 'Medium - Balanced', description: 'Good balance between size and quality' },
    { value: 75, label: 'High - Smaller size', description: 'Strong compression, smaller file size' },
    { value: 90, label: 'Maximum - Smallest size', description: 'Aggressive compression, may reduce quality' },
  ];

  const onDrop = useCallback(acceptedFiles => {
    // Only accept one PDF file
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
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleCompressLevelChange = (_, newValue) => {
    setCompressionLevel(newValue);
  };

  const handleImageQualityChange = (_, newValue) => {
    setImageQuality(newValue);
  };

  const handleRemoveMetadataChange = (event) => {
    setRemoveMetadata(event.target.checked);
  };

  const handleCompress = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to compress');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate compression process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Calculate a realistic compressed size based on original size and compression settings
      const originalSize = file.size;
      let compressionRatio = 1 - (compressionLevel * 0.01);
      if (removeMetadata) compressionRatio -= 0.05;
      compressionRatio = Math.max(0.2, compressionRatio); // Ensure at least 20% of original size
      
      const compressedSize = Math.floor(originalSize * compressionRatio);
      
      setProcessedFile({
        originalSize,
        compressedSize,
        name: file.name,
        compressionPercent: Math.round(((originalSize - compressedSize) / originalSize) * 100),
        url: '#', // Mock URL, in a real app this would be the download URL
      });
      
      toast.success('PDF compressed successfully!');
    } catch (err) {
      console.error('Error compressing PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to compress PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your compressed PDF');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    setCompressionLevel(50);
    setImageQuality(80);
    setRemoveMetadata(true);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get current compression level info
  const getCurrentCompressionLevel = () => {
    return compressionLevels.find(level => level.value === compressionLevel) || compressionLevels[1];
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
                Compress PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Reduce the size of your PDF files while preserving quality
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
            {!file ? (
              <Paper
                {...getRootProps()}
                elevation={0}
                variant="outlined"
                sx={{
                  borderRadius: 4,
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: isDragActive ? 'primary.main' : 'divider',
                  bgcolor: isDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                  p: 6,
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  mb: 4,
                }}
              >
                <input {...getInputProps()} />
                
                <Box
                  component={motion.div}
                  variants={itemVariants}
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
                  or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>browse files</Box> from your computer
                </Typography>
                
                <Box component={motion.div} variants={itemVariants} sx={{ mt: 2 }}>
                  <Chip 
                    label="Maximum file size: 50MB" 
                    size="small" 
                    variant="outlined" 
                  />
                </Box>
              </Paper>
            ) : (
              <Card sx={{ borderRadius: 4, mb: 4 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        {/* <FilePdfIcon size={24} color={theme.palette.error.main} /> */}
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" noWrap>
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(file.size)}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<TrashIcon size={16} />}
                        onClick={handleReset}
                      >
                        Change File
                      </Button>
                    </Stack>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Compression Settings
                    </Typography>
                    
                    {/* Compression Level Slider */}
                    <Box sx={{ mb: 4 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="subtitle2">
                          Compression Level
                        </Typography>
                        <Chip 
                          label={getCurrentCompressionLevel().label} 
                          size="small"
                          color={compressionLevel > 60 ? "error" : compressionLevel > 30 ? "warning" : "success"}
                          variant="outlined"
                          sx={{ fontWeight: 600 }}
                        />
                      </Stack>
                      <Slider
                        value={compressionLevel}
                        onChange={handleCompressLevelChange}
                        marks={compressionLevels.map(level => ({ value: level.value }))}
                        step={null}
                        sx={{ mt: 2 }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {getCurrentCompressionLevel().description}
                      </Typography>
                    </Box>
                    
                    {/* Image Quality Slider */}
                    <Box sx={{ mb: 4 }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                        <Typography variant="subtitle2">
                          Image Quality
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {imageQuality}%
                        </Typography>
                      </Stack>
                      <Slider
                        value={imageQuality}
                        onChange={handleImageQualityChange}
                        min={30}
                        max={100}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Lower quality = smaller file size, but images may appear pixelated
                      </Typography>
                    </Box>
                    
                    {/* Additional Options */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Additional Options
                      </Typography>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={removeMetadata} 
                            onChange={handleRemoveMetadataChange} 
                            color="primary" 
                          />
                        }
                        label="Remove metadata (author, creation date, etc.)"
                      />
                    </Box>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={18} />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        Higher compression levels may affect document quality. For documents with important images or graphs, we recommend using medium compression.
                      </Typography>
                    </Alert>
                  </Box>

                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ZapIcon size={16} />}
                      onClick={handleCompress}
                      disabled={isProcessing}
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
                      {isProcessing ? 'Compressing...' : 'Compress PDF'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Optimizing your PDF file...
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
            variants={successVariants}
            initial="hidden"
            animate="visible"
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
                      Your PDF file was compressed successfully with {processedFile.compressionPercent}% reduction
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.error.main, 0.04),
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <ZapOffIcon size={20} color={theme.palette.error.main} style={{ marginRight: 8 }} />
                          <Typography variant="subtitle1" fontWeight={600} color="error.main">
                            Original File
                          </Typography>
                        </Box>
                        
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                          {formatFileSize(processedFile.originalSize)}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {file.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.success.main, 0.04),
                        height: '100%',
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                          <ZapIcon size={20} color={theme.palette.success.main} style={{ marginRight: 8 }} />
                          <Typography variant="subtitle1" fontWeight={600} color="success.main">
                            Compressed File
                          </Typography>
                        </Box>
                        
                        <Typography variant="h3" fontWeight={700} gutterBottom>
                          {formatFileSize(processedFile.compressedSize)}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          {processedFile.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    flexDirection: { xs: 'column', sm: 'row' },
                    my: 4,
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    border: '1px dashed',
                    borderColor: alpha(theme.palette.info.main, 0.2),
                  }}
                >
                  <Typography variant="h5" fontWeight={700} color="primary" sx={{ mr: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}>
                    {processedFile.compressionPercent}%
                  </Typography>
                  <Typography variant="body1">
                    reduction in file size - you saved {formatFileSize(processedFile.originalSize - processedFile.compressedSize)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: '50px',
                    }}
                  >
                    Download Compressed PDF
                  </Button>
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
                  Compress Another PDF
                </Button>
                
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setProcessedFile(null)}
                  >
                    Adjust Compression Settings
                  </Button>
                </Stack>
              </Box>
            </Card>
            
            <Alert 
              severity="info" 
              icon={<InfoIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>Want to compress multiple files at once?</AlertTitle>
              <Typography variant="body2">
                Upgrade to our Pro plan to compress multiple PDF files in a single batch and access advanced compression algorithms.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                color="info"
                sx={{ mt: 1 }}
              >
                Learn More
              </Button>
            </Alert>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Compress a PDF File
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose compression settings',
                    description: 'Select your desired compression level. For most documents, the medium setting offers a good balance between quality and file size.'
                  },
                  {
                    title: 'Adjust image quality',
                    description: 'Lower the image quality slider to reduce file size further, especially for documents with many images.'
                  },
                  {
                    title: 'Download compressed file',
                    description: 'Click "Compress PDF" and download your optimized document.'
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
                When to Compress PDF Files
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Email Attachments',
                    description: 'Reduce file size to avoid email attachment limits',
                  },
                  {
                    title: 'Website Uploads',
                    description: 'Optimize PDFs for faster web uploads and downloads',
                  },
                  {
                    title: 'Limited Storage',
                    description: 'Save space on your devices or cloud storage',
                  },
                  {
                    title: 'Mobile Viewing',
                    description: 'Create mobile-friendly files that load quickly',
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
              
              <Box 
                sx={{ 
                  mt: 3, 
                  p: 3, 
                  borderRadius: 3, 
                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} gutterBottom color="warning.dark">
                  <AlertCircleIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                  Important Note
                </Typography>
                <Typography variant="body2">
                  High compression may affect the quality of images and complex graphics. For documents where visual quality is crucial, we recommend using a lower compression level.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CompressPDFPage;