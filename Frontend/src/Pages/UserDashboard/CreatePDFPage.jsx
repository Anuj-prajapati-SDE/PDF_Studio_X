import React, { useState, useCallback, useRef } from 'react';
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
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { PentagonOutlined } from '@mui/icons-material';

const CreatePDFPage = () => {
  const theme = useTheme();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // From images options
  const [images, setImages] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(1);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);
  const [pageSize, setPageSize] = useState('A4');

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

  // Create PDF methods
  const handleCreatePDF = async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call an API to generate the PDF
      // For now, we'll simulate success
      setProcessedFile({
        url: '#', // Mock URL - in a real app, this would be the download URL
        name: 'document.pdf',
        size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB-1.1MB
      });
      
      toast.success('PDF created successfully!');
    } catch (err) {
      console.error('Error creating PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to create PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your PDF');
    // In a real app, this would initiate the download
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
    setError(null);
    setPageCount(1);
    setPageSize('A4');
    setOrientation('portrait');
    setMargins(20);
    setTextContent('');
    setFontFamily('Arial');
    setFontSize(12);
    setTextAlignment('left');
    setTextStyles({ bold: false, italic: false, underline: false });
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
        px: 2
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
        <Box sx={{ mb: 5, position: 'relative', zIndex: 1 }}>
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
            Generate PDF documents from your images.
          </Typography>
        </Box>

        {!processedFile ? (
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
                  py: 2.5,
                  borderBottom: '1px solid',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  mb: 3
                }}>
                  <ImageIcon size={20} color="#7df9ff" style={{ marginRight: '10px' }} />
                  <Typography 
                    variant="h6" 
                    fontWeight={600} 
                    sx={{ color: '#7df9ff' }}
                  >
                    Create PDF from Images
                  </Typography>
                </Box>

                <Box sx={{ px: 3, pb: 3 }}>
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
                          Layout Options
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
                </Box>

                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'rgba(255, 255, 255, 0.1)', textAlign: 'right', background: 'rgba(0, 0, 0, 0.3)' }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{ 
                      mr: 2,
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
                  
                  <Button
                    variant="contained"
                    startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <FilePlusIcon size={16} />}
                    onClick={handleCreatePDF}
                    disabled={!isValid() || isProcessing}
                    sx={{
                      px: 4,
                      borderRadius: '50px',
                      position: 'relative',
                      overflow: 'hidden',
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
                    {isProcessing ? 'Creating...' : 'Create PDF'}
                  </Button>
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