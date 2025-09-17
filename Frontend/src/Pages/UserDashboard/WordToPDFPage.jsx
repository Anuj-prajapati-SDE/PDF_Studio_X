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
  Slider,
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
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const WordToPDFPage = () => {
  const theme = useTheme();
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

  // Current date and time
  const currentDateTime = "2025-05-03 19:10:37";
  const username = "Anuj-prajapati-SDE";

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
      
      setFile(wordFile);
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
      
      const estimatedSize = Math.floor(file.size * sizeMultiplier);
      
      setProcessedFile({
        name: file.name.replace(/\.docx?$/, '.pdf'),
        size: estimatedSize,
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
                Word to PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert Word documents to PDF format with high fidelity
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
                    ? "Drop your Word document here"
                    : "Drag & drop Word document here"
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
                    label="Supported formats: DOC, DOCX, DOCM" 
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
                          bgcolor: alpha('#2b5797', 0.1), // Word blue
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        <FileTextIcon size={24} color="#2b5797" />
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
                              sx={{ maxWidth: 500 }}
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
                      icon={<InfoIcon size={18} />}
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
                      startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ZapIcon size={16} />}
                      onClick={handleConvert}
                      disabled={isProcessing}
                      sx={{
                        px: 4,
                        py: 1.5,
                        borderRadius: '50px',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: '#2b5797', // Word blue
                        '&:hover': {
                          bgcolor: '#1e3d6b',
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
                          size={32} 
                          color="#2b5797" // Word blue
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary">
                        Original Document
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
                  startIcon={<RefreshIcon size={16} />}
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
              icon={<InfoIcon size={20} />} 
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
              <Typography variant="h5" gutterBottom fontWeight={700}>
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
                        '&:hover': {
                          borderColor: '#2b5797',
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
                    Important Note
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Converting to PDF makes your document fixed and non-editable. If you need to make further text edits, keep a copy of the original Word document.
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

export default WordToPDFPage;