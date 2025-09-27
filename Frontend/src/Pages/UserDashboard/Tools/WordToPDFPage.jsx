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
  Switch,
  Slider,
  useTheme,
  alpha,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
} from '@mui/material';
import {
  PictureAsPdf as FilePdfIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as AlertCircleIcon,
  Info as InfoIcon, 
  Bolt as ZapIcon,
  Description as FileTextIcon,
  Tune as TuneIcon,
  Settings as SettingsIcon,
  AutoAwesome as AutoAwesomeIcon,
  Star as StarIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getApiUrl } from '../../../utils/api';

// Mock implementation - replace with actual API call in production
const convertWordToPDF = async (file, settings) => {
  // This is a placeholder for the actual API call
  const formData = new FormData();
  formData.append('document', file);
  formData.append('quality', settings.quality);
  formData.append('preserveHyperlinks', settings.preserveHyperlinks);
  formData.append('preserveFormFields', settings.preserveFormFields);
  formData.append('fontEmbedding', settings.fontEmbedding);
  formData.append('pdfVersion', settings.pdfVersion);
  formData.append('optimizeSize', settings.optimizeSize);
  formData.append('compressionLevel', settings.compressionLevel);

  try {
    // Replace with your actual API endpoint
    const response = await axios.post(getApiUrl('/pdf/word-to-pdf'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      message: 'Word document converted to PDF successfully!'
    };
  } catch (error) {
    console.error('Error converting Word to PDF:', error);
    return {
      success: false,
      message: 'Failed to convert document. Please try again.'
    };
  }
};

const WordToPDFPage = () => {
  const theme = useTheme();
  
  // Theme colors for consistent styling
  const WORD_BLUE = theme.palette.primary.main;
  const WORD_LIGHT_BLUE = theme.palette.primary.light;
  const PDF_RED = theme.palette.error.main;
  
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    quality: 'high',
    preserveHyperlinks: true,
    preserveFormFields: true,
    fontEmbedding: 'embed',
    pdfVersion: '1.7',
    optimizeSize: true,
    compressionLevel: 70,
  });
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

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const wordFile = acceptedFiles[0];
      
      // Check if the file is a Word document
      const validTypes = [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-word.document.macroEnabled.12'
      ];
      
      if (!validTypes.includes(wordFile.type)) {
        toast.error('Please upload a Word document (DOC or DOCX)');
        return;
      }
      
      setFile({
        file: wordFile,
        preview: URL.createObjectURL(wordFile),
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
      toast.success('Word document uploaded successfully');
      setProcessedFile(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-word.document.macroEnabled.12': ['.docm']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const handleOptionChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConversionOptions({
      ...conversionOptions,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setConversionOptions({
      ...conversionOptions,
      [name]: newValue,
    });
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please upload a Word document to convert');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Calculate a realistic file size based on original and quality settings
      let sizeMultiplier = 1.2; // PDF is often larger than DOCX
      
      if (conversionOptions.quality === 'low') {
        sizeMultiplier = 0.9;
      } else if (conversionOptions.quality === 'high') {
        sizeMultiplier = 1.3;
      }
      
      if (conversionOptions.optimizeSize) {
        sizeMultiplier *= (1 - (conversionOptions.compressionLevel / 200)); // Reduce size based on compression
      }
      
      const originalSize = file.file.size;
      const estimatedSize = Math.floor(originalSize * sizeMultiplier);
      
      setProcessedFile({
        originalSize,
        convertedSize: estimatedSize,
        name: file.file.name.replace(/\.docx?$/, '.pdf'),
        originalName: file.file.name,
        url: '#', // Mock URL
      });
      
      toast.success('Word document converted to PDF successfully!');
    } catch (err) {
      console.error('Error converting document:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to convert Word document');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your PDF file');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
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

  const qualityOptions = [
    { 
      value: 'low', 
      label: 'Low (Smaller Size)', 
      description: 'Reduced quality, smaller file size',
      color: '#22c55e',
      gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
    },
    { 
      value: 'medium', 
      label: 'Medium (Balanced)', 
      description: 'Good balance between quality and size',
      color: '#3b82f6',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
    },
    { 
      value: 'high', 
      label: 'High (Best Quality)', 
      description: 'Best quality, larger file size',
      color: '#6836e6',
      gradient: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)'
    },
  ];

  const getCurrentQuality = () => {
    return qualityOptions.find(option => option.value === conversionOptions.quality) || qualityOptions[2];
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      bgcolor: '#030018', // Deep dark theme background
      color: 'white',
      minHeight: '100vh',
    }}>
      {/* Premium animated background */}
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
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.3)} 0%, ${alpha(theme.palette.primary.main, 0)} 70%)`,
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
                  background: 'linear-gradient(90deg, #ffffff, #aac7ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '0 5px 30px rgba(43, 87, 151, 0.3)',
                  position: 'relative',
                }}
              >
                Convert Word to
                <Box component="span" sx={{
                  display: { xs: 'block', sm: 'inline' },
                  background: 'linear-gradient(90deg, #aac7ff, #2b5797)',
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
                Transform Word documents into professional 
                <Box component="span" sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #ffffff, #aac7ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mx: 0.5
                }}>
                  high-quality PDF files
                </Box> 
                while preserving all formatting and fonts.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Sidebar - Conversion Info */}
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
                      bgcolor: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
                      background: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
                      width: 48, 
                      height: 48,
                      mr: 2,
                      boxShadow: '0 8px 25px rgba(43, 87, 151, 0.3)',
                    }}>
                      <FileTextIcon sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        Word to PDF Tool
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Convert with precision
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
                          background: 'linear-gradient(135deg, #aac7ff 0%, #4285f4 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>1</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Upload Word document
                        </Typography>
                      </Stack>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>2</Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          Configure settings
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
                          Download PDF file
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      background: 'rgba(43, 87, 151, 0.1)', // Word blue
                      border: '1px solid rgba(43, 87, 151, 0.2)',
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
                          bgcolor: file ? 'rgba(43, 87, 151, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: file ? '#aac7ff' : 'white',
                          fontWeight: 500,
                        }}
                      />
                      <Chip 
                        label={file ? getCurrentQuality().label : 'Upload Document'}
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
            {!processedFile ? (
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
                        ? '2px dashed #aac7ff' 
                        : '2px dashed rgba(255, 255, 255, 0.1)',
                      boxShadow: isDragActive
                        ? '0 20px 40px rgba(43, 87, 151, 0.2)'
                        : '0 15px 35px rgba(0, 0, 0, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'rgba(43, 87, 151, 0.5)',
                        background: 'rgba(43, 87, 151, 0.02)',
                        boxShadow: '0 25px 50px rgba(43, 87, 151, 0.15)',
                      },
                    }}
                    {...getRootProps()}
                    >
                <input {...getInputProps()} />
                
                <CardContent sx={{ p: 5, textAlign: 'center' }}>
                  <Box
                    component={motion.div}
                    variants={itemVariants}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: alpha('#2b5797', 0.1), // Word blue theme color
                      color: '#2b5797', // Word blue theme color
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      mx: 'auto',
                    }}
                  >
                    <UploadIcon style={{ fontSize: 36 }} />
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    component={motion.div}
                    variants={itemVariants} 
                    gutterBottom
                    sx={{ color: 'white' }}
                  >
                    {isDragActive
                      ? "Drop your Word document here"
                      : "Drag & drop Word document here"
                    }
                  </Typography>
                  
                  <Typography 
                    variant="body2"
                    component={motion.div}
                    variants={itemVariants}
                    sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}
                  >
                    or <Box component="span" sx={{ color: '#aac7ff', fontWeight: 600, cursor: 'pointer' }}>browse files</Box> from your computer
                  </Typography>
                  
                  <Box component={motion.div} variants={itemVariants} sx={{ mt: 2 }}>
                    <Chip 
                      label="Supported formats: DOC, DOCX, DOCM" 
                      size="small" 
                      sx={{
                        bgcolor: 'rgba(43, 87, 151, 0.1)',
                        color: '#aac7ff',
                        border: '1px solid rgba(43, 87, 151, 0.3)',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card sx={{ borderRadius: 4, mb: 4 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Box
                        sx={{
                          bgcolor: alpha('#2b5797', 0.1), // Word blue
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        <FileTextIcon sx={{ fontSize: 24, color: "#2b5797" }} />
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
                        startIcon={<TrashIcon sx={{ fontSize: 16 }} />}
                        onClick={handleReset}
                      >
                        Change File
                      </Button>
                    </Stack>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Conversion Settings
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {/* PDF Quality */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="quality-label">PDF Quality</InputLabel>
                          <Select
                            labelId="quality-label"
                            id="quality"
                            value={conversionOptions.quality}
                            onChange={handleOptionChange('quality')}
                            label="PDF Quality"
                          >
                            <MenuItem value="low">Low (Smaller Size)</MenuItem>
                            <MenuItem value="medium">Medium (Balanced)</MenuItem>
                            <MenuItem value="high">High (Best Quality)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* PDF Version */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="pdf-version-label">PDF Version</InputLabel>
                          <Select
                            labelId="pdf-version-label"
                            id="pdf-version"
                            value={conversionOptions.pdfVersion}
                            onChange={handleOptionChange('pdfVersion')}
                            label="PDF Version"
                          >
                            <MenuItem value="1.7">PDF 1.7 (Recommended)</MenuItem>
                            <MenuItem value="1.6">PDF 1.6</MenuItem>
                            <MenuItem value="1.5">PDF 1.5 (Legacy)</MenuItem>
                            <MenuItem value="1.4">PDF 1.4 (Older Systems)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Font Embedding */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="font-embedding-label">Font Embedding</InputLabel>
                          <Select
                            labelId="font-embedding-label"
                            id="font-embedding"
                            value={conversionOptions.fontEmbedding}
                            onChange={handleOptionChange('fontEmbedding')}
                            label="Font Embedding"
                          >
                            <MenuItem value="embed">Embed All Fonts</MenuItem>
                            <MenuItem value="subset">Subset Fonts (Smaller Size)</MenuItem>
                            <MenuItem value="none">No Font Embedding</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Document Elements Preservation */}
                      <Grid item xs={12}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>Document Elements</FormLabel>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.preserveHyperlinks}
                                  onChange={handleOptionChange('preserveHyperlinks')}
                                />
                              }
                              label="Preserve hyperlinks"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.preserveFormFields}
                                  onChange={handleOptionChange('preserveFormFields')}
                                />
                              }
                              label="Preserve form fields"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* Size Optimization */}
                      <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={conversionOptions.optimizeSize}
                                onChange={handleOptionChange('optimizeSize')}
                              />
                            }
                            label="Optimize PDF size"
                          />
                        </Box>
                        
                        {conversionOptions.optimizeSize && (
                          <Box>
                            <Typography variant="body2" gutterBottom>
                              Compression Level: {conversionOptions.compressionLevel}%
                            </Typography>
                            <Slider
                              value={conversionOptions.compressionLevel}
                              onChange={handleSliderChange('compressionLevel')}
                              aria-labelledby="compression-slider"
                              valueLabelDisplay="auto"
                              step={5}
                              marks
                              min={10}
                              max={95}
                              disabled={!conversionOptions.optimizeSize}
                              sx={{ 
                                maxWidth: 500,
                                color: WORD_BLUE,
                                '& .MuiSlider-thumb': {
                                  bgcolor: WORD_BLUE,
                                },
                                '& .MuiSlider-track': {
                                  bgcolor: WORD_BLUE,
                                },
                              }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              Higher compression may affect image quality
                            </Typography>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon sx={{ fontSize: 18 }} />}
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        For documents with complex formatting, we recommend using high quality settings and embedding all fonts to maintain visual fidelity.
                      </Typography>
                    </Alert>
                  </Box>

                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ZapIcon sx={{ fontSize: 16 }} />}
                      onClick={handleConvert}
                      disabled={isProcessing}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '50px',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                        '& .rotating': {
                          animation: 'spin 2s linear infinite',
                        },
                        '@keyframes spin': {
                          '0%': { transform: 'rotate(0deg)' },
                          '100%': { transform: 'rotate(360deg)' },
                        },
                      }}
                    >
                      {isProcessing ? 'Converting...' : 'Convert to PDF'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Converting your Word document to PDF...
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
                  bgcolor: alpha(theme.palette.success.main, 0.1),
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
                      bgcolor: theme.palette.success.main,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <CheckIcon sx={{ fontSize: 24 }} />
                  </Box>
                  
                  <Box>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      Conversion Complete!
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Your Word document has been successfully converted to PDF
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={4} justifyContent="center" sx={{ mb: 3 }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 70, 
                          height: 90, 
                          mx: 'auto', 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha('#2b5797', 0.1), // Word blue
                          borderRadius: 2,
                          position: 'relative',
                        }}
                      >
                        <FileTextIcon 
                          sx={{ fontSize: 32, color: '#2b5797' }} // Word blue
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        Original Document
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ZapIcon sx={{ fontSize: 24, color: theme.palette.primary.main }} />
                    </Box>
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 70, 
                          height: 90, 
                          mx: 'auto', 
                          mb: 1, 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          borderRadius: 2,
                          position: 'relative',
                        }}
                      >
                        <FilePdfIcon 
                          sx={{ 
                            fontSize: 32, 
                            color: theme.palette.error.main 
                          }}
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        PDF Document
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(processedFile.convertedSize)}
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    mb: 4,
                    p: 2.5,
                    maxWidth: 500,
                    mx: 'auto',
                    bgcolor: alpha(theme.palette.info.main, 0.05),
                    borderRadius: 3,
                    border: `1px dashed ${alpha(theme.palette.info.main, 0.2)}`,
                  }}
                >
                  <Typography variant="body2">
                    Your document has been converted with {conversionOptions.quality} quality and PDF version {conversionOptions.pdfVersion}.
                    {conversionOptions.optimizeSize ? ` The file was optimized with ${conversionOptions.compressionLevel}% compression.` : ''}
                  </Typography>
                </Box>
                
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownload}
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    borderRadius: '50px',
                    bgcolor: theme.palette.error.main, // PDF red
                    '&:hover': {
                      bgcolor: theme.palette.error.dark,
                    },
                  }}
                >
                  Download PDF
                </Button>
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
                  startIcon={<RefreshIcon sx={{ fontSize: 16 }} />}
                  onClick={handleReset}
                >
                  Convert Another Document
                </Button>
                
                <Button 
                  variant="text" 
                  color="primary"
                  onClick={() => setProcessedFile(null)}
                >
                  Adjust Conversion Settings
                </Button>
              </Box>
            </Card>
            
            <Alert 
              severity="info" 
              icon={<InfoIcon sx={{ fontSize: 20 }} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>PDF Ready</AlertTitle>
              <Typography variant="body2">
                Your PDF is now ready to be shared and viewed on any device. All formatting, fonts, and document elements have been preserved as specified in your settings.
              </Typography>
            </Alert>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700} sx={{ color: 'white' }}>
                How to Convert Word to PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your Word document',
                    description: 'Drag and drop your DOC or DOCX file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose quality settings',
                    description: 'Select the PDF quality level and version based on your needs.'
                  },
                  {
                    title: 'Configure additional options',
                    description: 'Choose font embedding, hyperlink preservation, and other relevant settings.'
                  },
                  {
                    title: 'Download your PDF',
                    description: 'Click "Convert to PDF" and download your converted document when ready.'
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
                        bgcolor: '#2b5797', // Word blue
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
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: 'white' }}>
                        {step.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom fontWeight={700} sx={{ color: 'white' }}>
                When to Convert Word to PDF
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Document Sharing',
                    description: 'Create a final document that anyone can view, regardless of whether they have Word',
                  },
                  {
                    title: 'Print-Ready Documents',
                    description: 'Prepare documents for printing with preserved formatting and embedded fonts',
                  },
                  {
                    title: 'Official Documents',
                    description: 'Submit applications, contracts, or formal documents in a fixed format',
                  },
                  {
                    title: 'Cross-Platform Use',
                    description: 'Ensure your document looks the same on all devices and operating systems',
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        height: '100%',
                        transition: 'all 0.2s ease',
                        bgcolor: 'rgba(255, 255, 255, 0.05)', 
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          borderColor: '#aac7ff',
                          boxShadow: '0 4px 20px rgba(43, 87, 151, 0.25)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: 'white' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
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
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  border: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ color: theme.palette.warning.light }}>
                    <AlertCircleIcon sx={{ fontSize: 16, verticalAlign: 'middle', mr: 1 }} />
                    Important Note
                  </Typography>
                  <Typography variant="body2" paragraph sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    Converting to PDF makes your document fixed and non-editable. If you need to make further text edits, keep a copy of the original Word document.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
    </Container>
    </Box>
  );
};

export default WordToPDFPage;