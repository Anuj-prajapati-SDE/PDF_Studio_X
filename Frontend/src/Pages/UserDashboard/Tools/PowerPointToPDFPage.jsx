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
  Switch,
  TextField,
  useTheme,
  alpha,
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
  Zap as ZapIcon,
  Layers as LayersIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PowerPointToPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    quality: 'high',
    includeNotes: false,
    includeHiddenSlides: false,
    slideRange: '',
    optimizeForPrinting: true,
    imageCompression: 'medium',
    embedFonts: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 19:10:37";
  const username = "Anuj-prajapati-SDE";

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const pptFile = acceptedFiles[0];
      
      // Check if the file is a PowerPoint file
      const validTypes = [
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint.presentation.macroEnabled.12'
      ];
      
      if (!validTypes.includes(pptFile.type)) {
        toast.error('Please upload a PowerPoint file (PPT or PPTX)');
        return;
      }
      
      setFile(pptFile);
      toast.success('PowerPoint file uploaded successfully');
      setProcessedFile(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'application/vnd.ms-powerpoint.presentation.macroEnabled.12': ['.pptm']
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
      toast.error('Please upload a PowerPoint file to convert');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate random slide count for the output
      const slideCount = Math.floor(Math.random() * 20) + 5; // Between 5 and 25 slides
      
      // Calculate a realistic file size based on original and quality settings
      let sizeMultiplier = 0.8; // PDFs are usually smaller than PPT files
      
      if (conversionOptions.quality === 'low') {
        sizeMultiplier = 0.6;
      } else if (conversionOptions.quality === 'high') {
        sizeMultiplier = 0.9;
      }
      
      if (!conversionOptions.embedFonts) {
        sizeMultiplier -= 0.1;
      }
      
      const estimatedSize = Math.floor(file.size * sizeMultiplier);
      
      setProcessedFile({
        name: file.name.replace(/\.pptx?$/, '.pdf'),
        size: estimatedSize,
        slides: slideCount,
        url: '#', // Mock URL
      });
      
      toast.success('PowerPoint converted to PDF successfully!');
    } catch (err) {
      console.error('Error converting presentation:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to convert PowerPoint file');
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
                PowerPoint to PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert PowerPoint presentations to PDF format with precision
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
                    ? "Drop your PowerPoint file here"
                    : "Drag & drop PowerPoint file here"
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
                    label="Supported formats: PPT, PPTX, PPTM" 
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
                          bgcolor: alpha('#B7472A', 0.1), // PowerPoint orange
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        <LayersIcon size={24} color="#B7472A" />
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
                      
                      {/* Image Compression */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="image-compression-label">Image Compression</InputLabel>
                          <Select
                            labelId="image-compression-label"
                            id="image-compression"
                            value={conversionOptions.imageCompression}
                            onChange={handleOptionChange('imageCompression')}
                            label="Image Compression"
                          >
                            <MenuItem value="low">Low (Best Quality)</MenuItem>
                            <MenuItem value="medium">Medium (Balanced)</MenuItem>
                            <MenuItem value="high">High (Smaller Size)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Slide Range */}
                      <Grid item xs={12} sm={6} md={4}>
                        <TextField
                          fullWidth
                          label="Slide Range (Optional)"
                          placeholder="e.g., 1-5, 7, 10-12"
                          value={conversionOptions.slideRange}
                          onChange={handleOptionChange('slideRange')}
                          helperText="Leave empty to convert all slides"
                        />
                      </Grid>
                      
                      {/* Additional Options */}
                      <Grid item xs={12}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>Additional Options</FormLabel>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.includeNotes}
                                  onChange={handleOptionChange('includeNotes')}
                                />
                              }
                              label="Include speaker notes"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.includeHiddenSlides}
                                  onChange={handleOptionChange('includeHiddenSlides')}
                                />
                              }
                              label="Include hidden slides"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.optimizeForPrinting}
                                  onChange={handleOptionChange('optimizeForPrinting')}
                                />
                              }
                              label="Optimize for printing"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.embedFonts}
                                  onChange={handleOptionChange('embedFonts')}
                                />
                              }
                              label="Embed fonts"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={18} />}
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        Animations and transitions cannot be preserved in PDF format. If your presentation heavily relies on these elements, consider using PowerPoint for presentations.
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
                        bgcolor: '#B7472A', // PowerPoint orange
                        '&:hover': {
                          bgcolor: '#8e3821',
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
                  Converting your PowerPoint presentation to PDF...
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
                      Conversion Complete!
                    </Typography>
                    <Typography variant="body2">
                      Your PowerPoint presentation has been successfully converted to PDF
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
                          bgcolor: alpha('#B7472A', 0.1), // PowerPoint orange
                          borderRadius: 2,
                          position: 'relative',
                        }}
                      >
                        <LayersIcon 
                          size={32} 
                          color="#B7472A" // PowerPoint orange
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        Original Presentation
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ZapIcon size={24} color={theme.palette.primary.main} />
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
                        {/* <FilePdfIcon 
                          size={32} 
                          color={theme.palette.error.main}
                        /> */}
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
                    {formatFileSize(processedFile.size)} • {processedFile.slides} pages
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
                    Your presentation has been converted with {conversionOptions.quality} quality settings
                    {conversionOptions.includeNotes ? ', including speaker notes' : ''}
                    {conversionOptions.includeHiddenSlides ? ', including hidden slides' : ''}
                    {conversionOptions.optimizeForPrinting ? ', optimized for printing' : ''}.
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
                  startIcon={<RefreshIcon size={16} />}
                  onClick={handleReset}
                >
                  Convert Another Presentation
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
              icon={<InfoIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>PDF Ready</AlertTitle>
              <Typography variant="body2">
                Your PDF is now ready for sharing or printing. Each slide has been converted to a separate PDF page while maintaining the formatting and quality you selected.
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
                How to Convert PowerPoint to PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your presentation',
                    description: 'Drag and drop your PPT or PPTX file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose quality settings',
                    description: 'Select the quality level and image compression based on your needs.'
                  },
                  {
                    title: 'Select additional options',
                    description: 'Choose whether to include notes, hidden slides, and other optional settings.'
                  },
                  {
                    title: 'Download your PDF',
                    description: 'Click "Convert to PDF" and download your converted presentation when ready.'
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
                        bgcolor: '#B7472A', // PowerPoint orange
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
                Best Uses for PowerPoint to PDF Conversion
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Presentation Handouts',
                    description: 'Create printable handouts of your slides for meeting attendees',
                  },
                  {
                    title: 'File Sharing',
                    description: 'Share your presentation with people who may not have PowerPoint',
                  },
                  {
                    title: 'Archiving Presentations',
                    description: 'Create stable, long-term archives of your presentation content',
                  },
                  {
                    title: 'Web Publishing',
                    description: 'Upload your presentation to websites in a widely compatible format',
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
                          borderColor: '#B7472A',
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
                    What Gets Lost in Conversion
                  </Typography>
                  <Typography variant="body2" paragraph>
                    While we maintain high visual fidelity, PowerPoint-specific elements like animations, transitions, and interactive elements won't be preserved in the PDF. For presentations that rely heavily on these features, use PowerPoint for delivery.
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

export default PowerPointToPDFPage;