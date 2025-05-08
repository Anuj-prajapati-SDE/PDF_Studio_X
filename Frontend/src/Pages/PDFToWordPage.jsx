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
  Chip,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
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
  Eye as EyeIcon,
  Zap as ZapIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PDFToWordPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    outputFormat: 'docx',
    ocrLanguage: 'english',
    preserveLayout: true,
    includeImages: true,
    detectTables: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 18:53:52";
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
        size: Math.floor(file.size * 0.85), // Simulate smaller file size
        url: '#', // Mock URL
      });
      
      toast.success('PDF converted to Word successfully!');
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
                PDF to Word
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert PDF documents to editable Word files with high accuracy
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
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="output-format-label">Output Format</InputLabel>
                          <Select
                            labelId="output-format-label"
                            id="output-format"
                            value={conversionOptions.outputFormat}
                            onChange={handleOptionChange('outputFormat')}
                            label="Output Format"
                          >
                            <MenuItem value="docx">DOCX (Modern Word)</MenuItem>
                            <MenuItem value="doc">DOC (Legacy Word)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* OCR Language */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="ocr-language-label">OCR Language</InputLabel>
                          <Select
                            labelId="ocr-language-label"
                            id="ocr-language"
                            value={conversionOptions.ocrLanguage}
                            onChange={handleOptionChange('ocrLanguage')}
                            label="OCR Language"
                          >
                            <MenuItem value="english">English</MenuItem>
                            <MenuItem value="spanish">Spanish</MenuItem>
                            <MenuItem value="french">French</MenuItem>
                            <MenuItem value="german">German</MenuItem>
                            <MenuItem value="chinese">Chinese</MenuItem>
                            <MenuItem value="japanese">Japanese</MenuItem>
                            <MenuItem value="russian">Russian</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Layout Preservation */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Layout Options</FormLabel>
                          <RadioGroup
                            value={conversionOptions.preserveLayout ? 'preserve' : 'flowing'}
                            onChange={(e) => setConversionOptions({
                              ...conversionOptions,
                              preserveLayout: e.target.value === 'preserve',
                            })}
                          >
                            <FormControlLabel 
                              value="preserve" 
                              control={<Radio />} 
                              label="Preserve original layout" 
                            />
                            <FormControlLabel 
                              value="flowing" 
                              control={<Radio />} 
                              label="Flowing text (better for editing)" 
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                      
                      {/* Additional Options */}
                      <Grid item xs={12}>
                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                          <FormLabel component="legend">Additional Options</FormLabel>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={conversionOptions.includeImages}
                                    onChange={(e) => setConversionOptions({
                                      ...conversionOptions,
                                      includeImages: e.target.checked,
                                    })}
                                  />
                                }
                                label="Include images and graphics"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <FormControlLabel
                                control={
                                  <Radio
                                    checked={conversionOptions.detectTables}
                                    onChange={(e) => setConversionOptions({
                                      ...conversionOptions,
                                      detectTables: e.target.checked,
                                    })}
                                  />
                                }
                                label="Detect and convert tables"
                              />
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Grid>
                    </Grid>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={18} />}
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        We use advanced OCR (Optical Character Recognition) to extract text from scanned documents. For best results, ensure your PDF has clear, readable text.
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
                      {isProcessing ? 'Converting...' : 'Convert to Word'}
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
                      Your PDF has been successfully converted to {conversionOptions.outputFormat.toUpperCase()}
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
                      bgcolor: conversionOptions.outputFormat === 'docx' ? alpha('#2b5797', 0.1) : alpha('#c43e1c', 0.1),
                      borderRadius: 2,
                    }}
                  >
                    <FileTextIcon 
                      size={40} 
                      color={conversionOptions.outputFormat === 'docx' ? '#2b5797' : '#c43e1c'}
                    />
                  </Box>
                  
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(processedFile.size)}
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
                    Your document has been converted with {conversionOptions.preserveLayout ? 'preserved layout' : 'flowing text'} 
                    {conversionOptions.includeImages ? ', including images' : ''}{conversionOptions.detectTables ? ', with table detection' : ''}.
                    The OCR language was set to {conversionOptions.ocrLanguage}.
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
                  }}
                >
                  Download {conversionOptions.outputFormat.toUpperCase()} File
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
                While our conversion is highly accurate, some formatting elements may not translate perfectly. 
                We recommend reviewing your Word document and making adjustments if necessary.
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
                How to Convert PDF to Word
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose conversion settings',
                    description: 'Select your desired output format (DOCX or DOC) and set your layout preferences.'
                  },
                  {
                    title: 'Choose OCR language',
                    description: 'For scanned documents, select the primary language to improve text recognition.'
                  },
                  {
                    title: 'Download converted file',
                    description: 'Click "Convert to Word" and download your editable document when ready.'
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
                Tips for Best Conversion Results
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'High-Quality Original',
                    description: 'Use high-quality, clearly scanned documents for better OCR results',
                  },
                  {
                    title: 'Right OCR Language',
                    description: 'Select the correct language that matches your document text',
                  },
                  {
                    title: 'Layout Choice',
                    description: 'Choose "Preserve layout" for complex documents, "Flowing text" for easy editing',
                  },
                  {
                    title: 'File Size Consideration',
                    description: 'Files with many images will result in larger Word documents',
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
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom color="primary.main">
                    <EyeIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Pro Feature Preview
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Our Pro version includes enhanced OCR with over 100 language options, batch processing for multiple files, and advanced formatting preservation.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default PDFToWordPage;