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
  useTheme,
  alpha,
} from '@mui/material';
import {
  // FilePdf as FilePdfIcon,
  FileText as FileTextIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Zap as ZapIcon,
  Image as ImageIcon,
  Layers as LayersIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PDFToPowerPointPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    outputFormat: 'pptx',
    extractImages: true,
    createSlidePerPage: true,
    preserveColors: true,
    theme: 'automatic',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 19:03:09";
  const username = "Anuj-prajapati-SDE";

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
      
      setProcessedFile({
        name: file.name.replace('.pdf', `.${conversionOptions.outputFormat}`),
        size: Math.floor(file.size * 0.9), // Simulate file size
        slides: Math.floor(Math.random() * 15) + 5, // Random slide count between 5-20
        url: '#', // Mock URL
      });
      
      toast.success('PDF converted to PowerPoint successfully!');
    } catch (err) {
      console.error('Error converting PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to convert PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success(`Downloading your ${conversionOptions.outputFormat.toUpperCase()} file`);
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
                PDF to PowerPoint
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert PDF documents into editable PowerPoint presentations
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
                      Conversion Settings
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {/* Output Format */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="output-format-label">Output Format</InputLabel>
                          <Select
                            labelId="output-format-label"
                            id="output-format"
                            value={conversionOptions.outputFormat}
                            onChange={handleOptionChange('outputFormat')}
                            label="Output Format"
                          >
                            <MenuItem value="pptx">PPTX (Modern PowerPoint)</MenuItem>
                            <MenuItem value="ppt">PPT (Legacy PowerPoint)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Theme */}
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="theme-label">Presentation Theme</InputLabel>
                          <Select
                            labelId="theme-label"
                            id="theme"
                            value={conversionOptions.theme}
                            onChange={handleOptionChange('theme')}
                            label="Presentation Theme"
                          >
                            <MenuItem value="automatic">Automatic (Based on PDF)</MenuItem>
                            <MenuItem value="professional">Professional</MenuItem>
                            <MenuItem value="minimal">Minimal</MenuItem>
                            <MenuItem value="creative">Creative</MenuItem>
                            <MenuItem value="modern">Modern</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormLabel component="legend" sx={{ mb: 1 }}>Slide Options</FormLabel>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.createSlidePerPage}
                                  onChange={handleOptionChange('createSlidePerPage')}
                                />
                              }
                              label="Create one slide per page"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.extractImages}
                                  onChange={handleOptionChange('extractImages')}
                                />
                              }
                              label="Extract images as separate objects"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.preserveColors}
                                  onChange={handleOptionChange('preserveColors')}
                                />
                              }
                              label="Preserve original colors"
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
                        For best results, use PDFs with clearly defined sections and high-quality images. Complex layouts may be simplified during conversion.
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
                        bgcolor: '#B7472A', // PowerPoint color
                        '&:hover': {
                          bgcolor: '#952613',
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
                      {isProcessing ? 'Converting...' : 'Convert to PowerPoint'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Converting your PDF to {conversionOptions.outputFormat.toUpperCase()}...
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
                      Your PDF has been successfully converted to PowerPoint
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ mb: 3 }}>
                  <Box 
                    sx={{ 
                      width: 80, 
                      height: 80, 
                      mx: 'auto', 
                      mb: 2, 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha('#B7472A', 0.1), // PowerPoint color
                      borderRadius: 2,
                    }}
                  >
                    <LayersIcon 
                      size={40} 
                      color="#B7472A" // PowerPoint color
                    />
                  </Box>
                  
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(processedFile.size)} • {processedFile.slides} slides
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
                    Your presentation has been created with{' '}
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      {conversionOptions.theme}
                    </Box>{' '}
                    theme, {conversionOptions.createSlidePerPage ? 'one slide per page' : 'optimized slide layout'}.
                    {conversionOptions.extractImages ? ' Images have been extracted as separate objects.' : ''}
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
                    bgcolor: '#B7472A', // PowerPoint color
                    '&:hover': {
                      bgcolor: '#952613',
                    },
                  }}
                >
                  Download PowerPoint
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
                  Convert Another PDF
                </Button>
              </Box>
            </Card>
            
            <Alert 
              severity="warning" 
              icon={<AlertCircleIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>Important Note</AlertTitle>
              <Typography variant="body2">
                The conversion process may simplify complex layouts. For best results, you may need to adjust some slide elements after downloading.
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
                How to Convert PDF to PowerPoint
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose conversion settings',
                    description: 'Select your desired output format (PPTX or PPT) and presentation theme.'
                  },
                  {
                    title: 'Configure slide options',
                    description: 'Choose whether to create one slide per page and how to handle images and colors.'
                  },
                  {
                    title: 'Download presentation',
                    description: 'Click "Convert to PowerPoint" and download your editable presentation when ready.'
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
                        bgcolor: '#B7472A', // PowerPoint color
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
                Tips for Best Conversion Results
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Simple Layouts Work Best',
                    description: 'PDFs with clean, simple layouts convert more accurately than complex ones',
                  },
                  {
                    title: 'Check Image Quality',
                    description: 'The quality of extracted images depends on their resolution in the original PDF',
                  },
                  {
                    title: 'Choose Right Theme',
                    description: '"Automatic" theme analyzes your PDF colors for the most appropriate theme',
                  },
                  {
                    title: 'Edit After Conversion',
                    description: 'Fine-tune the presentation in PowerPoint for professional results',
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
                  bgcolor: alpha('#B7472A', 0.05), // PowerPoint color
                  border: `1px solid ${alpha('#B7472A', 0.2)}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom color="#B7472A">
                    <ImageIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Did you know?
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Converting from PDF to PowerPoint creates editable objects that you can modify individually. This makes it easier to update information or design elements in your presentation.
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

export default PDFToPowerPointPage;