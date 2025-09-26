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
  Container,
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
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  PictureAsPdf as FilePdfIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as AlertCircleIcon,
  Info as InfoIcon,
  Bolt as ZapIcon,
  Compress as CompressIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  AutoAwesome as AutoAwesomeIcon,
  Tune as TuneIcon,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getApiUrl } from '../../utils/api';

// Mock implementation - replace with actual API call in production
const compressPDF = async (file, settings) => {
  // This is a placeholder for the actual API call
  const formData = new FormData();
  formData.append('pdf', file);
  formData.append('compressionLevel', settings.compressionLevel);
  formData.append('imageQuality', settings.imageQuality);
  formData.append('removeMetadata', settings.removeMetadata);

  try {
    // Replace with your actual API endpoint
    const response = await axios.post(getApiUrl('/pdf/compress'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      message: 'PDF compressed successfully!'
    };
  } catch (error) {
    console.error('Error compressing PDF:', error);
    return {
      success: false,
      message: 'Failed to compress PDF. Please try again.'
    };
  }
};

const CompressPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [compressionLevel, setCompressionLevel] = useState(50);
  const [imageQuality, setImageQuality] = useState(80);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Animation hooks
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const compressionLevels = [
    { 
      value: 25, 
      label: 'Low - Better quality', 
      description: 'Minimal compression, preserve most quality',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    { 
      value: 50, 
      label: 'Medium - Balanced', 
      description: 'Good balance between size and quality',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    { 
      value: 75, 
      label: 'High - Smaller size', 
      description: 'Strong compression, smaller file size',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    { 
      value: 90, 
      label: 'Maximum - Smallest size', 
      description: 'Aggressive compression, may reduce quality',
      color: '#ef4444',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    },
  ];

  const onDrop = useCallback(acceptedFiles => {
    // Only accept one PDF file
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      
      if (pdfFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setFile({
        file: pdfFile,
        preview: URL.createObjectURL(pdfFile),
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
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
      const originalSize = file.file.size;
      let compressionRatio = 1 - (compressionLevel * 0.01);
      if (removeMetadata) compressionRatio -= 0.05;
      compressionRatio = Math.max(0.2, compressionRatio); // Ensure at least 20% of original size
      
      const compressedSize = Math.floor(originalSize * compressionRatio);
      
      setProcessedFile({
        originalSize,
        compressedSize,
        name: file.file.name,
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
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
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

  const getCurrentCompressionLevel = () => {
    return compressionLevels.find(level => level.value === compressionLevel) || compressionLevels[1];
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      bgcolor: '#030018', // Deep dark theme background
      color: 'white',
      minHeight: '100vh',
    }}>
      {/* Premium animated background similar to HomePage */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          right: '-10%',
          bottom: '-20%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={`particle-${i}`}
            component={motion.div}
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.3,
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 20 + i * 5,
              ease: 'linear',
            }}
            sx={{
              position: 'absolute',
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
              width: 60,
              height: 60,
              background: i % 3 === 0 
                ? 'linear-gradient(135deg, rgba(125, 249, 255, 0.1) 0%, rgba(104, 54, 230, 0.1) 100%)'
                : i % 3 === 1
                ? 'linear-gradient(135deg, rgba(104, 54, 230, 0.1) 0%, rgba(230, 54, 189, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(230, 54, 189, 0.1) 0%, rgba(255, 214, 10, 0.1) 100%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
            }}
          />
        ))}
      </Box>

      {/* Lens flare effect */}
      <Box
        component={motion.div}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '25rem',
          height: '25rem',
          background: 'radial-gradient(circle, rgba(125, 249, 255, 0.3) 0%, rgba(125, 249, 255, 0) 70%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Header with theme styling */}
          <Box sx={{ 
            mb: { xs: 4, md: 6 }, 
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '800px' } 
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  lineHeight: { xs: 1.2, md: 1.1 },
                  mb: { xs: 2, md: 3 },
                  background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 5px 30px rgba(125, 249, 255, 0.3)',
                  position: 'relative',
                }}
              >
                Compress Your
                <Box component="span" sx={{
                  display: { xs: 'block', sm: 'inline' },
                  background: 'linear-gradient(90deg, #7df9ff, #6836e6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  ml: { xs: 0, sm: 2 }
                }}>
                  PDF Files
                </Box>
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Typography 
                variant="h6" 
                sx={{
                  mb: { xs: 3, md: 4 },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Reduce PDF file size while maintaining 
                <Box component="span" sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mx: 0.5
                }}>
                  exceptional quality
                </Box> 
                with advanced compression algorithms.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Sidebar - Compress Info */}
          <Grid item xs={12} lg={4} xl={3}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Card sx={{ 
                borderRadius: '20px', 
                mb: { xs: 3, lg: 4 }, 
                position: { lg: 'sticky' }, 
                top: '100px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                      background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                      width: 48, 
                      height: 48,
                      mr: 2,
                      boxShadow: '0 8px 25px rgba(104, 54, 230, 0.3)',
                    }}>
                      <CompressIcon sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        PDF Compress Tool
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Optimize PDF file size
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      mb: 2,
                      fontWeight: 600 
                    }}>
                      How it works:
                    </Typography>
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>1</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Upload PDF file
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>2</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Adjust settings
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>3</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Download compressed file
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      background: 'rgba(125, 249, 255, 0.1)',
                      border: '1px solid rgba(125, 249, 255, 0.2)',
                    }}
                  >
                    <Typography variant="caption" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      display: 'block',
                      mb: 1
                    }}>
                      Current Status:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        label={file ? '1 File Ready' : 'No File'}
                        size="small"
                        sx={{ 
                          bgcolor: file ? 'rgba(125, 249, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: file ? '#7df9ff' : 'white',
                          fontWeight: 500,
                        }}
                      />
                      <Chip 
                        label={file ? getCurrentCompressionLevel().label : 'Upload PDF'}
                        size="small"
                        sx={{ 
                          bgcolor: file ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: file ? '#22c55e' : '#ef4444',
                        }}
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} lg={8} xl={9}>

          {/* Main Content Area */}
          <Grid item xs={12} lg={8} xl={9}>
            {!processedFile ? (
              <>
                {/* Upload Area */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {!file ? (
                    <Card
                      sx={{
                        borderRadius: '24px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: isDragActive 
                          ? '2px dashed #7df9ff' 
                          : '2px dashed rgba(255, 255, 255, 0.1)',
                        boxShadow: isDragActive
                          ? '0 20px 40px rgba(125, 249, 255, 0.2)'
                          : '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: 'rgba(125, 249, 255, 0.5)',
                          background: 'rgba(125, 249, 255, 0.02)',
                          boxShadow: '0 25px 50px rgba(125, 249, 255, 0.15)',
                        },
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      
                      <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                        <Box
                          component={motion.div}
                          animate={{
                            y: isDragActive ? -10 : [0, -5, 0],
                            scale: isDragActive ? 1.1 : [1, 1.05, 1],
                          }}
                          transition={{
                            duration: isDragActive ? 0.3 : 2,
                            repeat: isDragActive ? 0 : Infinity,
                            ease: 'easeInOut',
                          }}
                          sx={{
                            width: { xs: 80, md: 100 },
                            height: { xs: 80, md: 100 },
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: { xs: 3, md: 4 },
                            mx: 'auto',
                            boxShadow: '0 15px 35px rgba(104, 54, 230, 0.4)',
                          }}
                        >
                          <UploadIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
                        </Box>
                        
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            mb: { xs: 2, md: 3 },
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                          }}
                        >
                          {isDragActive
                            ? 'Drop PDF file here'
                            : 'Upload PDF File to Compress'
                          }
                        </Typography>
                        
                        <Typography 
                          variant="body1" 
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            maxWidth: '500px',
                            mx: 'auto',
                            lineHeight: 1.6,
                          }}
                        >
                          Drag & drop your PDF file here or{' '}
                          <Box component="span" sx={{ 
                            color: '#7df9ff', 
                            fontWeight: 600,
                            textDecoration: 'underline',
                            textDecorationColor: 'rgba(125, 249, 255, 0.5)',
                          }}>
                            browse files
                          </Box>{' '}
                          from your device
                        </Typography>
                        
                        <Chip 
                          label="Supported: PDF files (max 50MB)" 
                          size="small" 
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            px: 1,
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          }}
                        />
                      </CardContent>
                    </Card>
                  ) : (
                    /* File Uploaded - Settings Panel */
                    <Card
                      sx={{
                        borderRadius: '20px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {/* File Info */}
                        <Box sx={{ mb: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 3 }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ 
                              bgcolor: '#7df9ff',
                              width: 48,
                              height: 48,
                            }}>
                              <FilePdfIcon sx={{ color: 'white', fontSize: 24 }} />
                            </Avatar>
                            
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" sx={{ 
                                color: 'white', 
                                fontWeight: 500,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                mb: 0.5,
                              }}>
                                {file.file.name}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: { xs: '0.8rem', md: '0.9rem' }
                              }}>
                                {formatFileSize(file.file.size)}
                              </Typography>
                            </Box>
                            
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleReset}
                              startIcon={<RefreshIcon />}
                              sx={{
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '12px',
                                '&:hover': {
                                  borderColor: '#7df9ff',
                                  color: '#7df9ff',
                                },
                              }}
                            >
                              Change File
                            </Button>
                          </Stack>
                        </Box>
                        
                        {/* Compression Settings */}
                        <Typography variant="h6" sx={{ 
                          color: 'white', 
                          fontWeight: 600, 
                          mb: 3,
                          fontSize: { xs: '1.1rem', md: '1.2rem' }
                        }}>
                          Compression Settings
                        </Typography>
                        
                        {/* Compression Level Slider */}
                        <Box sx={{ mb: 4 }}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                              Compression Level
                            </Typography>
                            <Chip 
                              label={getCurrentCompressionLevel().label} 
                              size="small"
                              sx={{
                                bgcolor: getCurrentCompressionLevel().color === '#22c55e' ? 'rgba(34, 197, 94, 0.2)' :
                                        getCurrentCompressionLevel().color === '#3b82f6' ? 'rgba(59, 130, 246, 0.2)' :
                                        getCurrentCompressionLevel().color === '#f59e0b' ? 'rgba(245, 158, 11, 0.2)' :
                                        'rgba(239, 68, 68, 0.2)',
                                color: getCurrentCompressionLevel().color,
                                fontWeight: 600,
                                border: `1px solid ${getCurrentCompressionLevel().color}40`,
                              }}
                            />
                          </Stack>
                          <Slider
                            value={compressionLevel}
                            onChange={handleCompressLevelChange}
                            marks={compressionLevels.map(level => ({ value: level.value }))}
                            step={null}
                            sx={{ 
                              mt: 2,
                              color: getCurrentCompressionLevel().color,
                              '& .MuiSlider-track': {
                                background: getCurrentCompressionLevel().gradient,
                                border: 'none',
                                height: 6,
                              },
                              '& .MuiSlider-thumb': {
                                background: getCurrentCompressionLevel().gradient,
                                border: `2px solid ${getCurrentCompressionLevel().color}`,
                                boxShadow: `0 4px 12px ${getCurrentCompressionLevel().color}40`,
                                '&:hover, &.Mui-focusVisible': {
                                  boxShadow: `0 0 0 8px ${getCurrentCompressionLevel().color}20`,
                                },
                              },
                              '& .MuiSlider-mark': {
                                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                              },
                              '& .MuiSlider-markActive': {
                                backgroundColor: getCurrentCompressionLevel().color,
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: { xs: '0.75rem', md: '0.8rem' }
                          }}>
                            {getCurrentCompressionLevel().description}
                          </Typography>
                        </Box>
                        
                        {/* Image Quality Slider */}
                        <Box sx={{ mb: 4 }}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                              Image Quality
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#7df9ff', fontWeight: 600 }}>
                              {imageQuality}%
                            </Typography>
                          </Stack>
                          <Slider
                            value={imageQuality}
                            onChange={handleImageQualityChange}
                            min={30}
                            max={100}
                            sx={{
                              mt: 2,
                              color: '#7df9ff',
                              '& .MuiSlider-track': {
                                background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
                                border: 'none',
                                height: 6,
                              },
                              '& .MuiSlider-thumb': {
                                background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
                                border: '2px solid #7df9ff',
                                boxShadow: '0 4px 12px rgba(125, 249, 255, 0.4)',
                                '&:hover, &.Mui-focusVisible': {
                                  boxShadow: '0 0 0 8px rgba(125, 249, 255, 0.2)',
                                },
                              },
                              '& .MuiSlider-rail': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              },
                            }}
                          />
                          <Typography variant="caption" sx={{ 
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: { xs: '0.75rem', md: '0.8rem' }
                          }}>
                            Lower quality = smaller file size, but images may appear pixelated
                          </Typography>
                        </Box>
                        
                        {/* Additional Options */}
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="subtitle2" sx={{ 
                            color: 'rgba(255, 255, 255, 0.9)', 
                            mb: 2,
                            fontWeight: 600 
                          }}>
                            Additional Options
                          </Typography>
                          <FormControlLabel
                            control={
                              <Switch 
                                checked={removeMetadata} 
                                onChange={handleRemoveMetadataChange} 
                                sx={{
                                  '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#7df9ff',
                                    '& + .MuiSwitch-track': {
                                      backgroundColor: '#7df9ff',
                                    },
                                  },
                                  '& .MuiSwitch-track': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                Remove metadata (author, creation date, etc.)
                              </Typography>
                            }
                          />
                        </Box>
                        
                        <Alert 
                          severity="info" 
                          icon={<InfoIcon />}
                          sx={{ 
                            mb: 3, 
                            borderRadius: '12px',
                            bgcolor: 'rgba(59, 130, 246, 0.1)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            color: '#7df9ff',
                            '& .MuiAlert-icon': {
                              color: '#7df9ff',
                            },
                          }}
                        >
                          <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            Higher compression levels may affect document quality. For documents with important images or graphs, we recommend using medium compression.
                          </Typography>
                        </Alert>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>

                {/* Processing Progress */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        borderRadius: '20px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                        <Box
                          component={motion.div}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            mx: 'auto',
                            boxShadow: '0 15px 35px rgba(104, 54, 230, 0.4)',
                          }}
                        >
                          <SettingsIcon sx={{ fontSize: 28 }} />
                        </Box>
                        
                        <Typography variant="h6" sx={{ 
                          color: 'white', 
                          fontWeight: 600, 
                          mb: 2,
                          fontSize: { xs: '1rem', md: '1.1rem' }
                        }}>
                          Compressing PDF File...
                        </Typography>
                        
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          mb: 3 
                        }}>
                          Optimizing your PDF with {getCurrentCompressionLevel().label.toLowerCase()} settings
                        </Typography>
                        
                        <LinearProgress
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Action Button */}
                {file && !isProcessing && !processedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      justifyContent="center"
                      sx={{ mb: 4 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleCompress}
                        startIcon={<CompressIcon />}
                        sx={{
                          background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                          borderRadius: '16px',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          boxShadow: '0 12px 30px rgba(104, 54, 230, 0.3)',
                          minWidth: { xs: '100%', sm: '200px' },
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(104, 54, 230, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Compress PDF
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                        startIcon={<RefreshIcon />}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '16px',
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          minWidth: { xs: '100%', sm: '140px' },
                          '&:hover': {
                            borderColor: '#7df9ff',
                            color: '#7df9ff',
                            bgcolor: 'rgba(125, 249, 255, 0.05)',
                          },
                        }}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </motion.div>
                )}

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert 
                      severity="error" 
                      sx={{
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 68, 68, 0.1)',
                        border: '1px solid rgba(255, 68, 68, 0.2)',
                        color: '#ff6b6b',
                        mb: 4,
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}
              </>
            ) : (
              /* Success Result */
              /* Success Result */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Card
                  sx={{
                    borderRadius: '20px',
                    mb: { xs: 3, md: 4 },
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden'
                  }}
                >
                  {/* Success Header */}
                  <Box
                    sx={{
                      p: 3,
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.05) 100%)',
                      borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 24 }} />
                      </Box>
                      
                      <Box>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                          Compression Complete!
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Your PDF file was compressed successfully with {processedFile.compressionPercent}% reduction
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: '12px',
                            background: 'rgba(255, 68, 68, 0.1)',
                            border: '1px solid rgba(255, 68, 68, 0.2)',
                            height: '100%',
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                              <FilePdfIcon sx={{ fontSize: 20, color: '#ef4444', mr: 1 }} />
                              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#ef4444' }}>
                                Original File
                              </Typography>
                            </Box>
                            
                            <Typography variant="h3" sx={{ 
                              fontWeight: 700, 
                              mb: 1,
                              color: 'white',
                              fontSize: { xs: '1.5rem', md: '2rem' }
                            }}>
                              {formatFileSize(processedFile.originalSize)}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {file.file.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: '12px',
                            background: 'rgba(34, 197, 94, 0.1)',
                            border: '1px solid rgba(34, 197, 94, 0.2)',
                            height: '100%',
                          }}
                        >
                          <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                              <CompressIcon sx={{ fontSize: 20, color: '#22c55e', mr: 1 }} />
                              <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#22c55e' }}>
                                Compressed File
                              </Typography>
                            </Box>
                            
                            <Typography variant="h3" sx={{ 
                              fontWeight: 700, 
                              mb: 1,
                              color: 'white',
                              fontSize: { xs: '1.5rem', md: '2rem' }
                            }}>
                              {formatFileSize(processedFile.compressedSize)}
                            </Typography>
                            
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
                        py: 3,
                        px: 4,
                        borderRadius: '12px',
                        background: 'rgba(125, 249, 255, 0.1)',
                        border: '1px solid rgba(125, 249, 255, 0.2)',
                      }}
                    >
                      <Typography variant="h4" sx={{ 
                        fontWeight: 700, 
                        color: '#7df9ff',
                        mr: { xs: 0, sm: 2 }, 
                        mb: { xs: 1, sm: 0 },
                        fontSize: { xs: '1.5rem', md: '2rem' }
                      }}>
                        {processedFile.compressionPercent}%
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        color: 'white',
                        textAlign: { xs: 'center', sm: 'left' },
                        fontSize: { xs: '0.9rem', md: '1rem' }
                      }}>
                        reduction in file size - you saved {formatFileSize(processedFile.originalSize - processedFile.compressedSize)}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        sx={{ 
                          px: { xs: 4, md: 6 }, 
                          py: { xs: 1.5, md: 2 },
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          textTransform: 'none',
                          boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)',
                          minWidth: { xs: '200px', sm: '250px' },
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Download Compressed PDF
                      </Button>
                    </Box>
                  </CardContent>
                  
                  <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                  
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
                      startIcon={<RefreshIcon />}
                      onClick={handleReset}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '12px',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#7df9ff',
                          color: '#7df9ff',
                          bgcolor: 'rgba(125, 249, 255, 0.05)',
                        },
                      }}
                    >
                      Compress Another PDF
                    </Button>
                    
                    <Button
                      variant="outlined"
                      onClick={() => setProcessedFile(null)}
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        borderRadius: '12px',
                        fontWeight: 600,
                        '&:hover': {
                          borderColor: '#7df9ff',
                          color: '#7df9ff',
                          bgcolor: 'rgba(125, 249, 255, 0.05)',
                        },
                      }}
                    >
                      Adjust Settings
                    </Button>
                  </Box>
                </Card>
              </motion.div>
            )}

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 2, md: 4 } }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      p: 3,
                      textAlign: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
                        mb: 2,
                        mx: 'auto',
                      }}
                    >
                      <ZapIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Lightning Fast
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Compress PDF files in seconds with optimized algorithms
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      p: 3,
                      textAlign: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                        mb: 2,
                        mx: 'auto',
                      }}
                    >
                      <TuneIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Smart Controls
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Fine-tune compression levels and quality settings
                    </Typography>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={12} md={4}>
                  <Card
                    sx={{
                      borderRadius: '16px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      p: 3,
                      textAlign: 'center',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 56,
                        height: 56,
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        mb: 2,
                        mx: 'auto',
                      }}
                    >
                      <StarIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Quality Preserved
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Maintain document quality while reducing file size
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>

            {/* How It Works Section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
            >
              <Card
                sx={{
                  borderRadius: '20px',
                  mt: { xs: 4, md: 6 },
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Typography variant="h5" sx={{ 
                    color: 'white', 
                    fontWeight: 700, 
                    mb: 4,
                    textAlign: 'center'
                  }}>
                    How to Compress PDF Files
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
                            mb: 2,
                            mx: 'auto',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                          }}
                        >
                          1
                        </Avatar>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Upload your PDF file by dragging it into the upload area
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                            mb: 2,
                            mx: 'auto',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                          }}
                        >
                          2
                        </Avatar>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Choose your compression level and adjust image quality settings
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                            mb: 2,
                            mx: 'auto',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                          }}
                        >
                          3
                        </Avatar>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Click "Compress PDF" and wait for the optimization to complete
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                            mb: 2,
                            mx: 'auto',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                          }}
                        >
                          4
                        </Avatar>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Download your compressed PDF with significant size reduction
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
        </Grid>
      </Container>
    </Box>
  )
};

export default CompressPDFPage;