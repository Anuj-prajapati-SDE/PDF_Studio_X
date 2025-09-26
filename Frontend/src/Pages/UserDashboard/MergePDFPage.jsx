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
  Upload as UploadIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Bolt as ZapIcon,
  DragIndicator as DragIndicatorIcon,
  Merge as MergeIcon,
  AutoAwesome as AutoAwesomeIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  SwapVert as SwapVertIcon,
  Layers as LayersIcon,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getApiUrl } from '../../utils/api';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Mock implementation - replace with actual API call in production
const mergePDFs = async (files) => {
  // This is a placeholder for the actual API call
  // In a real implementation, you would use FormData to send files to your backend
  const formData = new FormData();
  files.forEach(file => {
    formData.append('pdfs', file);
  });

  try {
    // Replace with your actual API endpoint
    const response = await axios.post(getApiUrl('/pdf/merge'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      message: 'PDFs merged successfully!'
    };
  } catch (error) {
    console.error('Error merging PDFs:', error);
    return {
      success: false,
      message: 'Failed to merge PDFs. Please try again.'
    };
  }
};

const MergePDFPage = () => {
  const theme = useTheme();
  const [files, setFiles] = useState([]);
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
    // Only accept PDF files
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== acceptedFiles.length) {
      toast.error('Only PDF files are accepted');
    }
    
    if (pdfFiles.length > 0) {
      // Add preview URLs and IDs to the files
      const newFiles = pdfFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      toast.success(`${pdfFiles.length} PDF file${pdfFiles.length > 1 ? 's' : ''} added`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024 // 50 MB
  });

  const handleRemoveFile = (fileId) => {
    const fileToRemove = files.find(f => f.id === fileId);
    if (fileToRemove?.preview) {
      URL.revokeObjectURL(fileToRemove.preview);
    }
    
    setFiles(files.filter(f => f.id !== fileId));
    toast.success('File removed');
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate merge process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock result - in real app, this would be the actual API call
      const mockUrl = '#'; // In real app, this would be the download URL
      setProcessedFile(mockUrl);
      toast.success('PDFs merged successfully!');
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to merge PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Download started - merged-document.pdf');
    // In real app, this would download the actual merged PDF
  };

  const handleReset = () => {
    // Clean up all object URLs
    files.forEach(fileObj => {
      if (fileObj.preview) {
        URL.revokeObjectURL(fileObj.preview);
      }
    });
    if (processedFile && processedFile !== '#') {
      URL.revokeObjectURL(processedFile);
    }
    
    setFiles([]);
    setProcessedFile(null);
    setError(null);
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFiles(items);
    toast.success('Files reordered');
  };

  // Move file up in the list
  const moveFileUp = (index) => {
    if (index === 0) return;
    const newFiles = [...files];
    [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
    setFiles(newFiles);
    toast.success('File moved up');
  };

  // Move file down in the list
  const moveFileDown = (index) => {
    if (index === files.length - 1) return;
    const newFiles = [...files];
    [newFiles[index], newFiles[index + 1]] = [newFiles[index + 1], newFiles[index]];
    setFiles(newFiles);
    toast.success('File moved down');
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
                Merge Your
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
                Combine multiple PDF documents into a single file with 
                <Box component="span" sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #ffffff, #7df9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mx: 0.5
                }}>
                  professional quality
                </Box> 
                and intelligent ordering.
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Sidebar - Merge Info */}
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
                      <MergeIcon sx={{ fontSize: 24, color: 'white' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        PDF Merge Tool
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Combine multiple PDFs
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
                          Upload PDF files
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
                          Reorder as needed
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
                          Download merged PDF
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
                        label={`${files.length} Files`}
                        size="small"
                        sx={{ 
                          bgcolor: files.length > 0 ? 'rgba(125, 249, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: files.length > 0 ? '#7df9ff' : 'white',
                          fontWeight: 500,
                        }}
                      />
                      <Chip 
                        label={files.length >= 2 ? 'Ready to Merge' : 'Need 2+ Files'}
                        size="small"
                        sx={{ 
                          bgcolor: files.length >= 2 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: files.length >= 2 ? '#22c55e' : '#ef4444',
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
              <>
                {/* Upload Area */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
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
                          ? 'Drop PDF files here'
                          : 'Upload PDF Files to Merge'
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
                        Drag & drop multiple PDF files here or{' '}
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
                        label="Supported: PDF files (max 50MB each)" 
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
                          <Box>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 700, 
                              color: 'white',
                              fontSize: { xs: '1.1rem', md: '1.2rem' }
                            }}>
                              Files to Merge ({files.length})
                            </Typography>
                            <Typography variant="body2" sx={{ 
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: { xs: '0.8rem', md: '0.9rem' }
                            }}>
                              Files will be merged in the order shown below
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
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <Chip 
                                  label={index + 1}
                                  size="small"
                                  sx={{ 
                                    bgcolor: '#6836e6',
                                    color: 'white',
                                    fontWeight: 600,
                                    minWidth: 28,
                                    height: 28,
                                  }}
                                />
                              </ListItemIcon>
                              <ListItemIcon>
                                <Avatar sx={{ 
                                  bgcolor: '#7df9ff',
                                  width: 36,
                                  height: 36,
                                }}>
                                  <FilePdfIcon sx={{ color: 'white', fontSize: 20 }} />
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
                                <Stack direction="row" spacing={1}>
                                  {index > 0 && (
                                    <IconButton 
                                      size="small"
                                      onClick={() => moveFileUp(index)}
                                      sx={{
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                          color: '#7df9ff',
                                          bgcolor: 'rgba(125, 249, 255, 0.1)',
                                        },
                                      }}
                                    >
                                      <SwapVertIcon sx={{ transform: 'rotate(180deg)' }} />
                                    </IconButton>
                                  )}
                                  {index < files.length - 1 && (
                                    <IconButton 
                                      size="small"
                                      onClick={() => moveFileDown(index)}
                                      sx={{
                                        color: 'rgba(255, 255, 255, 0.5)',
                                        '&:hover': {
                                          color: '#7df9ff',
                                          bgcolor: 'rgba(125, 249, 255, 0.1)',
                                        },
                                      }}
                                    >
                                      <SwapVertIcon />
                                    </IconButton>
                                  )}
                                  <IconButton 
                                    size="small"
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
                                </Stack>
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
                          Merging PDF Files...
                        </Typography>
                        
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          mb: 3 
                        }}>
                          Combining {files.length} files into a single PDF document
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

                {/* Action Buttons */}
                {files.length > 0 && !isProcessing && !processedFile && (
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
                        onClick={handleMerge}
                        startIcon={<MergeIcon />}
                        disabled={files.length < 2}
                        sx={{
                          background: files.length >= 2 
                            ? 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)'
                            : 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '16px',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          boxShadow: files.length >= 2 
                            ? '0 12px 30px rgba(104, 54, 230, 0.3)'
                            : '0 8px 20px rgba(0, 0, 0, 0.2)',
                          minWidth: { xs: '100%', sm: '200px' },
                          '&:hover': files.length >= 2 ? {
                            boxShadow: '0 20px 40px rgba(104, 54, 230, 0.4)',
                            transform: 'translateY(-2px)',
                          } : {},
                          '&:disabled': {
                            color: 'rgba(255, 255, 255, 0.5)',
                            background: 'rgba(255, 255, 255, 0.1)',
                          }
                        }}
                      >
                        {files.length < 2 
                          ? `Need ${2 - files.length} More PDF${2 - files.length > 1 ? 's' : ''}`
                          : `Merge ${files.length} PDFs`
                        }
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
              </>
            ) : (
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
                    textAlign: 'center'
                  }}
                >
                  <CardContent sx={{ p: { xs: 4, md: 6 } }}>
                    <Box
                      component={motion.div}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 3,
                        mx: 'auto',
                        boxShadow: '0 15px 35px rgba(34, 197, 94, 0.4)',
                      }}
                    >
                      <CheckIcon sx={{ fontSize: 36 }} />
                    </Box>
                    
                    <Typography variant="h4" sx={{ 
                      color: 'white', 
                      fontWeight: 700, 
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '2rem' }
                    }}>
                      PDFs Merged Successfully!
                    </Typography>
                    
                    <Typography variant="body1" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)', 
                      mb: 4,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                      maxWidth: '500px',
                      mx: 'auto'
                    }}>
                      Your PDF files have been combined into a single document. 
                      The merged file is ready for download.
                    </Typography>
                    
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      justifyContent="center"
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleDownload}
                        startIcon={<DownloadIcon />}
                        sx={{
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          borderRadius: '16px',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          minWidth: { xs: '100%', sm: '200px' },
                          boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)',
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Download Merged PDF
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
                          minWidth: { xs: '100%', sm: '160px' },
                          '&:hover': {
                            borderColor: '#7df9ff',
                            color: '#7df9ff',
                            bgcolor: 'rgba(125, 249, 255, 0.05)',
                          },
                        }}
                      >
                        Merge More Files
                      </Button>
                    </Stack>
                  </CardContent>
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
                      Merge multiple PDF files in seconds with optimized processing
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
                      <LayersIcon sx={{ fontSize: 28, color: 'white' }} />
                    </Avatar>
                    <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                      Smart Ordering
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Easily reorder files with intuitive controls before merging
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
                      Perfect Quality
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Maintain original quality and formatting in the merged document
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
                    mb: 3,
                    textAlign: 'center'
                  }}>
                    How to Merge PDF Files
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
                          Upload two or more PDF files by dragging them into the upload area
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
                          Rearrange files using the up/down arrows to set the merge order
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
                          Click "Merge PDFs" to combine your files into one document
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
                          Download your merged PDF file when processing is complete
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MergePDFPage;