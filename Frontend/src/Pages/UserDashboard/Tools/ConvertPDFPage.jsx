import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  alpha,
  useTheme,
} from '@mui/material';
import {
  PictureAsPdf as FilePdfIcon,
  Image as ImageIcon,
  TextSnippet as WordIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Warning as AlertIcon,
  Close as CloseIcon,
  Bolt as ZapIcon,
  TextSnippet as TextIcon,
  InsertDriveFile as FileIcon,
  AutoAwesome as AutoAwesomeIcon,
  CompareArrows as CompareArrowsIcon,
  Security as SecurityIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';

// Conversion options based on conversion type
const conversionTypes = {
  'pdf-to-image': {
    title: 'PDF to Image',
    icon: <ImageIcon sx={{ fontSize: 24, color: 'white' }} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['JPG', 'PNG', 'TIFF', 'GIF'],
    defaultFormat: 'JPG',
    description: 'Convert PDF pages to high-quality images',
    color: '#7df9ff', // Cyan theme color
    gradient: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
  },
  'image-to-pdf': {
    title: 'Image to PDF',
    icon: <FilePdfIcon sx={{ fontSize: 24, color: 'white' }} />,
    acceptedFiles: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'] },
    targetFormats: ['PDF'],
    defaultFormat: 'PDF',
    description: 'Create PDF documents from your images',
    color: '#6836e6', // Purple theme color
    gradient: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
  },
  'pdf-to-word': {
    title: 'PDF to Word',
    icon: <WordIcon sx={{ fontSize: 24, color: 'white' }} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['DOCX', 'DOC'],
    defaultFormat: 'DOCX',
    description: 'Convert PDF documents to editable Word files',
    color: '#3b82f6', // Blue theme color
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
  },
  'pdf-to-text': {
    title: 'PDF to Text',
    icon: <TextIcon sx={{ fontSize: 24, color: 'white' }} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['TXT', 'RTF'],
    defaultFormat: 'TXT',
    description: 'Extract text content from PDF documents',
    color: '#f59e0b', // Warning theme color
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
  },
};

const ConvertPDFPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [conversionType, setConversionType] = useState('pdf-to-image');
  
  const [files, setFiles] = useState([]);
  const [outputFormat, setOutputFormat] = useState('');
  const [quality, setQuality] = useState('medium'); // low, medium, high
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
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
  
  // Get conversion type from URL or default to pdf-to-image
  useEffect(() => {
    const typeParam = searchParams.get('type');
    if (typeParam && conversionTypes[typeParam]) {
      setConversionType(typeParam);
      setOutputFormat(conversionTypes[typeParam].defaultFormat);
    } else {
      setOutputFormat(conversionTypes['pdf-to-image'].defaultFormat);
    }
  }, [searchParams]);
  
  // Update URL when conversion type changes
  const handleConversionTypeChange = (event) => {
    const newType = event.target.value;
    setConversionType(newType);
    setOutputFormat(conversionTypes[newType].defaultFormat);
    navigate(`/tools/convert-pdf?type=${newType}`, { replace: true });
    
    // Reset files when changing conversion type
    setFiles([]);
    setProcessedFiles([]);
  };

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${acceptedFiles.length} file${acceptedFiles.length > 1 ? 's' : ''} added`);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: conversionTypes[conversionType]?.acceptedFiles || {},
    maxSize: 50 * 1024 * 1024, // 50MB
  });
  
  const handleRemoveFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(files.filter(f => f.id !== fileId));
    toast.success('File removed');
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast.error('Please upload files to convert');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes - generate mock results
      const mockResults = files.map(fileObj => {
        const file = fileObj.file;
        const fileName = file.name.split('.')[0];
        const mockUrl = '#'; // In real app, this would be the download URL
        
        return {
          originalName: file.name,
          convertedName: `${fileName}.${outputFormat.toLowerCase()}`,
          url: mockUrl,
          size: Math.floor(Math.random() * 1000000) + 100000, // Random size
        };
      });
      
      setProcessedFiles(mockResults);
      toast.success(`Converted ${files.length} file${files.length > 1 ? 's' : ''} to ${outputFormat}`);
    } catch (err) {
      console.error('Error converting files:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Conversion failed');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDownloadAll = () => {
    toast.success('Downloading all converted files');
    // In a real app, this would trigger a zip download of all files
  };
  
  const handleDownloadFile = (file) => {
    toast.success(`Downloading ${file.convertedName}`);
    // In a real app, this would download the specific file
  };

  const handleReset = () => {
    // Clean up object URLs
    files.forEach(fileObj => {
      if (fileObj.preview) {
        URL.revokeObjectURL(fileObj.preview);
      }
    });
    
    setFiles([]);
    setProcessedFiles([]);
    setError(null);
  };
  
  // Get current conversion options
  const currentConversionType = conversionTypes[conversionType];

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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 }, }} >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}

          // textAlign="center"
        >
          {/* Hero Header with theme styling */}
          <Box sx={{ 
            mb: { xs: 4, md: 6 },   
            maxWidth: { xs: '100%', md: '100%' } ,
             textAlign: { xs: 'center', md: 'center' }
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
                Convert Your
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
           
 maxWidth: { xs: '100%', md: '100%' } ,
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Transform your documents between PDF and other formats with 
                <Box component="span" sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mx: 0.5
                }}>
                  professional precision
                </Box> 
                and lightning-fast speed.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
        
        <Grid container spacing={{ xs: 3, md: 4 }}  >
          {/* Sidebar - Conversion Settings */}
          <Grid item xs={12} lg={4} xl={3} minWidth={"100%"}>
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
                  <Typography variant="h6" sx={{ 
                    fontWeight: 700, 
                    mb: 3, 
                    color: 'white',
                    fontSize: { xs: '1.1rem', md: '1.2rem' }
                  }}>
                    Conversion Settings
                  </Typography>
                  
                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel 
                      id="conversion-type-label" 
                      sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                    >
                      Select Conversion Type
                    </InputLabel>
                    <Select
                      labelId="conversion-type-label"
                      id="conversion-type"
                      value={conversionType}
                      onChange={handleConversionTypeChange}
                      label="Select Conversion Type"
                      sx={{
                        color: 'white',
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(125, 249, 255, 0.5)',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#7df9ff',
                        },
                        '& .MuiSvgIcon-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            bgcolor: '#1a1a2e',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px',
                            mt: 1,
                          }
                        }
                      }}
                    >
                      {Object.entries(conversionTypes).map(([key, option]) => (
                        <MenuItem 
                          value={key} 
                          key={key}
                          sx={{ 
                            color: 'white',
                            '&:hover': {
                              bgcolor: 'rgba(125, 249, 255, 0.1)',
                            }
                          }}
                        >
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar 
                              sx={{ 
                                width: 36, 
                                height: 36, 
                                background: option.gradient,
                                boxShadow: `0 8px 25px ${alpha(option.color, 0.3)}`,
                              }}
                            >
                              {option.icon}
                            </Avatar>
                            <Box>
                              <Typography variant="body1" fontWeight={600} sx={{ color: 'white' }}>
                                {option.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                {option.description}
                              </Typography>
                            </Box>
                          </Stack>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  
                  {/* Output Format Selection */}
                  {currentConversionType.targetFormats.length > 1 && (
                    <FormControl fullWidth sx={{ mb: 3 }}>
                      <InputLabel 
                        id="output-format-label" 
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        Output Format
                      </InputLabel>
                      <Select
                        labelId="output-format-label"
                        id="output-format"
                        value={outputFormat}
                        onChange={(e) => setOutputFormat(e.target.value)}
                        label="Output Format"
                        sx={{
                          color: 'white',
                          borderRadius: '12px',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(125, 249, 255, 0.5)',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#7df9ff',
                          },
                          '& .MuiSvgIcon-root': {
                            color: 'rgba(255, 255, 255, 0.7)',
                          },
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              bgcolor: '#1a1a2e',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '12px',
                              mt: 1,
                            }
                          }
                        }}
                      >
                        {currentConversionType.targetFormats.map((format) => (
                          <MenuItem 
                            value={format} 
                            key={format}
                            sx={{ 
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'rgba(125, 249, 255, 0.1)',
                              }
                            }}
                          >
                            {format}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                  
                  {/* Quality Settings */}
                  <Box sx={{ mb: 3 }}>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 2,
                        fontWeight: 600 
                      }}
                    >
                      Quality Settings
                    </Typography>
                    <ToggleButtonGroup
                      value={quality}
                      exclusive
                      onChange={(event, newQuality) => {
                        if (newQuality !== null) {
                          setQuality(newQuality);
                        }
                      }}
                      aria-label="quality settings"
                      size="small"
                      sx={{
                        width: '100%',
                        '& .MuiToggleButton-root': {
                          color: 'rgba(255, 255, 255, 0.7)',
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          textTransform: 'none',
                          fontWeight: 500,
                          flex: 1,
                          '&.Mui-selected': {
                            bgcolor: alpha(currentConversionType.color, 0.2),
                            borderColor: currentConversionType.color,
                            color: currentConversionType.color,
                            '&:hover': {
                              bgcolor: alpha(currentConversionType.color, 0.3),
                            },
                          },
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                          },
                        },
                      }}
                    >
                      <ToggleButton value="low" aria-label="low quality">
                        Low
                      </ToggleButton>
                      <ToggleButton value="medium" aria-label="medium quality">
                        Medium
                      </ToggleButton>
                      <ToggleButton value="high" aria-label="high quality">
                        High
                      </ToggleButton>
                    </ToggleButtonGroup>
                    
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)', 
                        mt: 1,
                        display: 'block',
                        textAlign: 'center'
                      }}
                    >
                      {quality === 'low' && 'Smaller file size, lower quality'}
                      {quality === 'medium' && 'Balanced size and quality'}
                      {quality === 'high' && 'Best quality, larger file size'}
                    </Typography>
                  </Box>
                  
                  {/* Conversion Summary */}
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      background: alpha(currentConversionType.color, 0.1),
                      border: `1px solid ${alpha(currentConversionType.color, 0.2)}`,
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        display: 'block',
                        mb: 1
                      }}
                    >
                      Current Settings:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        label={currentConversionType.title}
                        size="small"
                        sx={{ 
                          bgcolor: alpha(currentConversionType.color, 0.2),
                          color: currentConversionType.color,
                          fontWeight: 500,
                        }}
                      />
                      <Chip 
                        label={outputFormat}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
                        }}
                      />
                      <Chip 
                        label={`${quality.charAt(0).toUpperCase() + quality.slice(1)} Quality`}
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          color: 'white',
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {/* Upload Area */}
              <Card
                sx={{
                  borderRadius: '24px',
                  mb: { xs: 3, md: 4 },
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: isDragActive 
                    ? `2px dashed ${currentConversionType.color}` 
                    : '2px dashed rgba(255, 255, 255, 0.1)',
                  boxShadow: isDragActive
                    ? `0 20px 40px ${alpha(currentConversionType.color, 0.2)}`
                    : '0 15px 35px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: alpha(currentConversionType.color, 0.5),
                    background: `${alpha(currentConversionType.color, 0.02)}`,
                    boxShadow: `0 25px 50px ${alpha(currentConversionType.color, 0.15)}`,
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
                      background: currentConversionType.gradient,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: { xs: 3, md: 4 },
                      mx: 'auto',
                      boxShadow: `0 15px 35px ${alpha(currentConversionType.color, 0.4)}`,
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
                      ? `Drop ${conversionType === 'image-to-pdf' ? 'images' : 'PDF files'} here`
                      : `Upload ${conversionType === 'image-to-pdf' ? 'Images' : 'PDF Files'}`
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
                    Drag & drop your files here or{' '}
                    <Box component="span" sx={{ 
                      color: currentConversionType.color, 
                      fontWeight: 600,
                      textDecoration: 'underline',
                      textDecorationColor: alpha(currentConversionType.color, 0.5),
                    }}>
                      browse files
                    </Box>{' '}
                    from your device
                  </Typography>
                  
                  <Chip 
                    label={`Supported: ${Object.values(currentConversionType.acceptedFiles)
                      .flat()
                      .join(', ')
                      .replace(/\./g, '')
                      .toUpperCase()}`} 
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
            </motion.div>

            {/* Files List */}
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
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
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        Files to Convert ({files.length})
                      </Typography>
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
                        Clear All
                      </Button>
                    </Stack>
                    
                    <List sx={{ p: 0 }}>
                      {files.map((fileObj, index) => (
                        <ListItem
                          key={fileObj.id}
                          sx={{
                            borderRadius: '12px',
                            mb: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.08)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ 
                              bgcolor: currentConversionType.color,
                              width: 36,
                              height: 36,
                            }}>
                              {conversionType === 'image-to-pdf' ? (
                                <ImageIcon sx={{ color: 'white', fontSize: 20 }} />
                              ) : (
                                <FilePdfIcon sx={{ color: 'white', fontSize: 20 }} />
                              )}
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ 
                                color: 'white', 
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', md: '1rem' }
                              }}>
                                {fileObj.file.name}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: { xs: '0.75rem', md: '0.8rem' }
                              }}>
                                {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton 
                              edge="end" 
                              onClick={() => handleRemoveFile(fileObj.id)}
                              sx={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                '&:hover': {
                                  color: '#ff4444',
                                  bgcolor: 'rgba(255, 68, 68, 0.1)',
                                },
                              }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            )}

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
                        background: currentConversionType.gradient,
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        mx: 'auto',
                        boxShadow: `0 15px 35px ${alpha(currentConversionType.color, 0.4)}`,
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
                      Converting Files...
                    </Typography>
                    
                    <LinearProgress
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          background: currentConversionType.gradient,
                          borderRadius: 4,
                        },
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Conversion Results */}
            {processedFiles.length > 0 && !isProcessing && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
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
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        <CheckIcon sx={{ mr: 1, color: '#4ade80' }} />
                        Conversion Complete!
                      </Typography>
                      <Button
                        variant="contained"
                        size="medium"
                        onClick={handleDownloadAll}
                        startIcon={<DownloadIcon />}
                        sx={{
                          background: currentConversionType.gradient,
                          borderRadius: '12px',
                          fontWeight: 600,
                          px: 3,
                          textTransform: 'none',
                          boxShadow: `0 8px 25px ${alpha(currentConversionType.color, 0.3)}`,
                          '&:hover': {
                            boxShadow: `0 12px 30px ${alpha(currentConversionType.color, 0.4)}`,
                          },
                        }}
                      >
                        Download All
                      </Button>
                    </Stack>
                    
                    <List sx={{ p: 0 }}>
                      {processedFiles.map((file, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            borderRadius: '12px',
                            mb: 1,
                            bgcolor: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.08)',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Avatar sx={{ 
                              bgcolor: '#4ade80',
                              width: 36,
                              height: 36,
                            }}>
                              <CheckIcon sx={{ color: 'white', fontSize: 20 }} />
                            </Avatar>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body1" sx={{ 
                                color: 'white', 
                                fontWeight: 500,
                                fontSize: { xs: '0.9rem', md: '1rem' }
                              }}>
                                {file.convertedName}
                              </Typography>
                            }
                            secondary={
                              <Typography variant="caption" sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: { xs: '0.75rem', md: '0.8rem' }
                              }}>
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </Typography>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton 
                              edge="end" 
                              onClick={() => handleDownloadFile(file)}
                              sx={{
                                color: currentConversionType.color,
                                '&:hover': {
                                  bgcolor: alpha(currentConversionType.color, 0.1),
                                },
                              }}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Action Buttons */}
            {files.length > 0 && !isProcessing && processedFiles.length === 0 && (
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
                    onClick={handleConvert}
                    startIcon={<ZapIcon />}
                    sx={{
                      background: currentConversionType.gradient,
                      borderRadius: '16px',
                      fontWeight: 700,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      px: { xs: 4, md: 6 },
                      py: { xs: 1.5, md: 2 },
                      textTransform: 'none',
                      boxShadow: `0 12px 30px ${alpha(currentConversionType.color, 0.3)}`,
                      minWidth: { xs: '100%', sm: '200px' },
                      '&:hover': {
                        boxShadow: `0 20px 40px ${alpha(currentConversionType.color, 0.4)}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    Convert to {outputFormat}
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
                    Clear All
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
                      Convert multiple files simultaneously with optimized processing
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
                      <SecurityIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Secure Processing
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Your files are processed locally with enterprise-grade security
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
                      Premium Quality
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Maintain original quality with advanced conversion algorithms
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ConvertPDFPage;