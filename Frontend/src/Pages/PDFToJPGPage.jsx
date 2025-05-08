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
  TextField,
  useTheme,
  alpha,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
//   FilePdf as FilePdfIcon,
  Image as ImageIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Zap as ZapIcon,
  Eye as EyeIcon,
  File as FileIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PDFToJPGPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    quality: 90,
    format: 'jpg',
    resolution: 300,
    pageRange: '',
    colorMode: 'color',
    createZip: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 19:47:27";
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
      setProcessedFiles(null);
      setError(null);
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

  const handleOptionChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setConversionOptions({
      ...conversionOptions,
      [name]: value,
    });
  };

  const handleConvert = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to convert');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate random page count for sample results
      const pageCount = Math.floor(Math.random() * 8) + 2; // Between 2 and 9 pages
      
      // Calculate a realistic file size based on quality settings
      const imageFileSizeFactor = conversionOptions.resolution / 100 * (conversionOptions.quality / 50);
      const averageImageSize = Math.floor(file.size / pageCount * imageFileSizeFactor * 0.8);
      
      // Create mock result data
      const images = Array.from({ length: pageCount }, (_, i) => ({
        id: i + 1,
        name: `Page_${i + 1}.${conversionOptions.format}`,
        size: averageImageSize + Math.floor(Math.random() * averageImageSize * 0.3), // Add some variation
        url: '#',
        preview: `https://picsum.photos/seed/${i+1}/600/800`, // Placeholder images
      }));
      
      setProcessedFiles({
        pageCount,
        images,
        originalFilename: file.name,
        zipUrl: '#', // Mock zip URL
        totalSize: images.reduce((sum, img) => sum + img.size, 0),
      });
      
      toast.success(`PDF converted to ${pageCount} ${conversionOptions.format.toUpperCase()} images!`);
    } catch (err) {
      console.error('Error converting PDF to images:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to convert PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    if (conversionOptions.createZip) {
      toast.success('Downloading ZIP file with all images');
    } else {
      toast.success('Downloading all images individually');
    }
  };

  const handleDownloadSingle = (index) => {
    toast.success(`Downloading ${processedFiles.images[index].name}`);
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFiles(null);
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
                PDF to JPG
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert PDF pages to high-quality JPG or PNG images
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

        {!processedFiles ? (
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
                    label="Maximum file size: 100MB" 
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
                      Conversion Settings
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {/* Image Format */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="format-label">Image Format</InputLabel>
                          <Select
                            labelId="format-label"
                            id="format"
                            value={conversionOptions.format}
                            onChange={handleOptionChange('format')}
                            label="Image Format"
                          >
                            <MenuItem value="jpg">JPG</MenuItem>
                            <MenuItem value="png">PNG</MenuItem>
                            <MenuItem value="webp">WebP</MenuItem>
                            <MenuItem value="tiff">TIFF</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Resolution DPI */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="resolution-label">Resolution (DPI)</InputLabel>
                          <Select
                            labelId="resolution-label"
                            id="resolution"
                            value={conversionOptions.resolution}
                            onChange={handleOptionChange('resolution')}
                            label="Resolution (DPI)"
                          >
                            <MenuItem value={72}>72 DPI (Screen/Web)</MenuItem>
                            <MenuItem value={150}>150 DPI (Standard)</MenuItem>
                            <MenuItem value={300}>300 DPI (High Quality)</MenuItem>
                            <MenuItem value={600}>600 DPI (Print Quality)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Color Mode */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="color-mode-label">Color Mode</InputLabel>
                          <Select
                            labelId="color-mode-label"
                            id="color-mode"
                            value={conversionOptions.colorMode}
                            onChange={handleOptionChange('colorMode')}
                            label="Color Mode"
                          >
                            <MenuItem value="color">Full Color</MenuItem>
                            <MenuItem value="grayscale">Grayscale</MenuItem>
                            <MenuItem value="blackwhite">Black & White</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Quality Slider */}
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" gutterBottom>
                          Image Quality: {conversionOptions.quality}%
                        </Typography>
                        <Slider
                          value={conversionOptions.quality}
                          onChange={(e, newValue) => setConversionOptions({
                            ...conversionOptions,
                            quality: newValue,
                          })}
                          min={10}
                          max={100}
                          valueLabelDisplay="auto"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Higher quality = larger file size
                        </Typography>
                      </Grid>
                      
                      {/* Page Range */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Page Range (Optional)"
                          placeholder="e.g., 1-3, 5, 7-9"
                          value={conversionOptions.pageRange}
                          onChange={handleOptionChange('pageRange')}
                          helperText="Leave empty to convert all pages"
                        />
                      </Grid>
                      
                      {/* Create ZIP option */}
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={conversionOptions.createZip}
                              onChange={handleOptionChange('createZip')}
                              color="primary"
                            />
                          }
                          label="Create ZIP archive for all images"
                        />
                      </Grid>
                    </Grid>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={18} />}
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        PNG format supports transparency but creates larger files. JPG is best for most purposes, while WebP offers better compression but may not be supported by all programs.
                      </Typography>
                    </Alert>
                  </Box>

                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ZapIcon size={16} />}
                      onClick={handleConvert}
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
                      {isProcessing ? 'Converting...' : 'Convert to Images'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Converting PDF pages to {conversionOptions.format.toUpperCase()} images...
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
                      Conversion Complete!
                    </Typography>
                    <Typography variant="body2">
                      {processedFiles.pageCount} pages from "{processedFiles.originalFilename}" converted to {conversionOptions.format.toUpperCase()} images
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Image Results
                </Typography>
                
                <Grid container spacing={2}>
                  {processedFiles.images.map((image, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={`img-${image.id}`}>
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          borderRadius: 2,
                          height: '100%',
                          overflow: 'hidden',
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <Box
                            component="img"
                            src={image.preview}
                            alt={`Page ${image.id}`}
                            sx={{
                              width: '100%',
                              aspectRatio: '1/1.4',
                              objectFit: 'cover',
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              bgcolor: alpha(theme.palette.background.paper, 0.8),
                              borderRadius: '50%',
                              p: 0.5,
                            }}
                          >
                            <Tooltip title="Preview in full size">
                              <IconButton size="small" onClick={() => toast.success('Preview functionality will open image in full size')}>
                                <EyeIcon size={16} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        
                        <Box sx={{ p: 1, pt: 1.5 }}>
                          <Typography variant="caption" fontWeight={500} noWrap display="block">
                            Page {image.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {formatFileSize(image.size)}
                          </Typography>
                          <Button
                            fullWidth
                            variant="text"
                            size="small"
                            startIcon={<DownloadIcon size={14} />}
                            onClick={() => handleDownloadSingle(index)}
                            sx={{ mt: 0.5, fontSize: '0.75rem' }}
                          >
                            Download
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownloadAll}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: '50px',
                    }}
                  >
                    {conversionOptions.createZip 
                      ? 'Download All as ZIP' 
                      : 'Download All Images'
                    }
                  </Button>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    {formatFileSize(processedFiles.totalSize)} • {processedFiles.pageCount} {conversionOptions.format.toUpperCase()} images
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
                  Convert Another PDF
                </Button>
                
                <Button 
                  variant="text" 
                  color="primary"
                  onClick={() => setProcessedFiles(null)}
                >
                  Adjust Conversion Settings
                </Button>
              </Box>
            </Card>
            
            <Alert 
              severity="info" 
              icon={<InfoIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>Next Steps</AlertTitle>
              <Typography variant="body2">
                Your PDF has been converted to {processedFiles.pageCount} {conversionOptions.format.toUpperCase()} images. You can download them individually or all at once. These images can be edited in any image editor or used on websites, social media, or presentations.
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
                How to Convert PDF to JPG
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Select image format',
                    description: 'Choose between JPG, PNG, WebP, or TIFF based on your needs.'
                  },
                  {
                    title: 'Choose quality settings',
                    description: 'Set the resolution, color mode, and quality based on your intended use.'
                  },
                  {
                    title: 'Download your images',
                    description: 'Click "Convert" and download your images individually or as a ZIP archive.'
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
                Choosing the Right Format
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'JPG',
                    description: 'Best for photographs and general use. Smaller file size but no transparency.',
                  },
                  {
                    title: 'PNG',
                    description: 'Supports transparency. Best for images with text, line art, or when you need transparency.',
                  },
                  {
                    title: 'WebP',
                    description: 'Modern format with excellent compression. Smaller file sizes than JPG or PNG but less compatible.',
                  },
                  {
                    title: 'TIFF',
                    description: 'Lossless quality, good for archiving and professional printing. Results in larger files.',
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
                    Resolution Tips
                  </Typography>
                  <Typography variant="body2" paragraph>
                    For web usage, 72 or 150 DPI is sufficient. For printing, choose 300 DPI or higher. Higher resolution results in larger file sizes but better quality when printed or when zooming in.
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

export default PDFToJPGPage;