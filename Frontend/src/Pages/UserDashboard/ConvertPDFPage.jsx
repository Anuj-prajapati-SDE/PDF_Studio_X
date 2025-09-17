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
  // FilePdf as FilePdfIcon,
  Image as ImageIcon,
  FileText as WordIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  RefreshCw as RefreshIcon,
  Check as CheckIcon,
  AlertCircle as AlertIcon,
  X as CloseIcon,
  Zap as ZapIcon,
  FileText as TextIcon,
  File as FileIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Conversion options based on conversion type
const conversionTypes = {
  'pdf-to-image': {
    title: 'PDF to Image',
    icon: <ImageIcon size={24} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['JPG', 'PNG', 'TIFF', 'GIF'],
    defaultFormat: 'JPG',
    description: 'Convert PDF pages to high-quality images',
    color: '#10b981', // success.main
  },
  'image-to-pdf': {
    title: 'Image to PDF',
    // icon: <FilePdfIcon size={24} />,
    acceptedFiles: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'] },
    targetFormats: ['PDF'],
    defaultFormat: 'PDF',
    description: 'Create PDF documents from your images',
    color: '#ef4444', // error.main
  },
  'pdf-to-word': {
    title: 'PDF to Word',
    icon: <WordIcon size={24} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['DOCX', 'DOC'],
    defaultFormat: 'DOCX',
    description: 'Convert PDF documents to editable Word files',
    color: '#3b82f6', // primary.main
  },
  'pdf-to-text': {
    title: 'PDF to Text',
    icon: <TextIcon size={24} />,
    acceptedFiles: { 'application/pdf': ['.pdf'] },
    targetFormats: ['TXT', 'RTF'],
    defaultFormat: 'TXT',
    description: 'Extract text content from PDF documents',
    color: '#f59e0b', // warning.main
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
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
            Convert PDF
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Transform your documents between PDF and other formats with high precision.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ borderRadius: 4, mb: 3, position: 'sticky', top: '100px' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Conversion Type
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="conversion-type-label">Select Conversion</InputLabel>
                  <Select
                    labelId="conversion-type-label"
                    id="conversion-type"
                    value={conversionType}
                    onChange={handleConversionTypeChange}
                    label="Select Conversion"
                  >
                    {Object.entries(conversionTypes).map(([key, option]) => (
                      <MenuItem value={key} key={key}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              bgcolor: alpha(option.color, 0.1),
                              color: option.color,
                            }}
                          >
                            {option.icon}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            {option.title}
                          </Typography>
                        </Stack>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Output Format
                </Typography>
                
                <FormControl fullWidth size="small" sx={{ mb: 3 }}>
                  <InputLabel id="output-format-label">Format</InputLabel>
                  <Select
                    labelId="output-format-label"
                    id="output-format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    label="Format"
                  >
                    {currentConversionType.targetFormats.map((format) => (
                      <MenuItem value={format} key={format}>
                        {format}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {(conversionType === 'pdf-to-image') && (
                  <>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Image Quality
                    </Typography>
                    
                    <ToggleButtonGroup
                      value={quality}
                      exclusive
                      onChange={(e, newQuality) => {
                        if (newQuality !== null) {
                          setQuality(newQuality);
                        }
                      }}
                      size="small"
                      fullWidth
                      sx={{ mb: 3 }}
                    >
                      <ToggleButton value="low">Low</ToggleButton>
                      <ToggleButton value="medium">Medium</ToggleButton>
                      <ToggleButton value="high">High</ToggleButton>
                    </ToggleButtonGroup>
                  </>
                )}
                
                <Box 
                  sx={{ 
                    bgcolor: alpha(currentConversionType.color, 0.1), 
                    p: 2, 
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <ZapIcon size={18} color={currentConversionType.color} style={{ marginRight: 12 }} />
                  <Typography variant="body2">
                    {currentConversionType.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <Card 
              sx={{ 
                borderRadius: 4, 
                p: 2.5, 
                border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                bgcolor: alpha(theme.palette.primary.main, 0.03),
              }}
            >
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Need to do more?
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Check out our Pro version for advanced features, larger file sizes and batch processing.
              </Typography>
              <Button 
                variant="outlined" 
                color="primary"
                size="small"
                fullWidth
              >
                Upgrade to Pro
              </Button>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={9}>
            {processedFiles.length === 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Paper
                  {...getRootProps()}
                  elevation={0}
                  variant="outlined"
                  sx={{
                    borderRadius: 4,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: isDragActive ? currentConversionType.color : 'divider',
                    bgcolor: isDragActive 
                      ? alpha(currentConversionType.color, 0.05)
                      : 'background.paper',
                    p: 4,
                    textAlign: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    mb: 3,
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
                      backgroundColor: alpha(currentConversionType.color, 0.1),
                      color: currentConversionType.color,
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
                      ? `Drop ${conversionType === 'image-to-pdf' ? 'images' : 'PDFs'} here`
                      : `Drag & drop ${conversionType === 'image-to-pdf' ? 'images' : 'PDF files'} here`
                    }
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    component={motion.div}
                    variants={itemVariants}
                  >
                    or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse files</Box> from your computer
                  </Typography>
                  
                  <Box component={motion.div} variants={itemVariants} sx={{ mt: 2 }}>
                    <Chip 
                      label={`Supported formats: ${Object.values(currentConversionType.acceptedFiles)
                        .flat()
                        .join(', ')
                        .replace(/\./g, '')
                        .toUpperCase()}`} 
                      size="small" 
                      variant="outlined" 
                    />
                  </Box>
                </Paper>
                
                {files.length > 0 && (
                  <Card sx={{ borderRadius: 4, mb: 4 }}>
                    <CardContent sx={{ p: 0 }}>
                      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography variant="h6">
                            {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
                          </Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<CloseIcon size={16} />}
                            onClick={handleReset}
                          >
                            Clear All
                          </Button>
                        </Stack>
                      </Box>
                      
                      <List sx={{ py: 0 }}>
                        {files.map((fileObj, index) => (
                          <ListItem 
                            key={fileObj.id}
                            divider={index < files.length - 1}
                            sx={{ px: 3, py: 1.5 }}
                          >
                            <ListItemIcon>
                              <Box
                                sx={{
                                  bgcolor: alpha(
                                    conversionType === 'image-to-pdf' 
                                      ? theme.palette.success.main 
                                      : theme.palette.error.main,
                                    0.1
                                  ),
                                  width: 40,
                                  height: 40,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 2,
                                }}
                              >
                                {conversionType === 'image-to-pdf' 
                                  ? <ImageIcon size={20} color={theme.palette.success.main} />
                                  : <FilePdfIcon size={20} color={theme.palette.error.main} />
                                }
                              </Box>
                            </ListItemIcon>
                            
                            <ListItemText
                              primary={fileObj.file.name}
                              secondary={`${(fileObj.file.size / (1024 * 1024)).toFixed(2)} MB`}
                              primaryTypographyProps={{ fontWeight: 500 }}
                            />
                            
                            <ListItemSecondaryAction>
                              <IconButton
                                edge="end"
                                size="small"
                                onClick={() => handleRemoveFile(fileObj.id)}
                                sx={{ color: 'error.main' }}
                              >
                                <CloseIcon size={18} />
                              </IconButton>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))}
                      </List>
                      
                      <Box sx={{ p: 3, textAlign: 'right', borderTop: '1px solid', borderColor: 'divider' }}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <SettingsIcon size={16} />}
                          onClick={handleConvert}
                          disabled={files.length === 0 || isProcessing}
                          sx={{
                            px: 4,
                            borderRadius: '50px',
                            bgcolor: currentConversionType.color,
                            '&:hover': {
                              bgcolor: alpha(currentConversionType.color, 0.9),
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
                          {isProcessing ? 'Converting...' : `Convert to ${outputFormat}`}
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                )}
                
                {isProcessing && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Converting your files...
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
              <Card sx={{ borderRadius: 4, mb: 4 }}>
                <CardContent sx={{ p: 0 }}>
                  <Box
                    sx={{
                      p: 3,
                      display: 'flex',
                      alignItems: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      bgcolor: 'success.lighter',
                    }}
                  >
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
                        mr: 2,
                      }}
                    >
                      <CheckIcon size={24} />
                    </Box>
                    
                    <Box>
                      <Typography variant="h6">
                        Conversion Completed!
                      </Typography>
                      <Typography variant="body2">
                        {processedFiles.length} {processedFiles.length === 1 ? 'file' : 'files'} converted to {outputFormat}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                      Download Converted Files
                    </Typography>
                    
                    <List sx={{ py: 0 }}>
                      {processedFiles.map((file, index) => (
                        <ListItem 
                          key={index}
                          divider={index < processedFiles.length - 1}
                          sx={{ 
                            px: 3, 
                            py: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              bgcolor: 'action.hover',
                            }
                          }}
                        >
                          <ListItemIcon>
                            <Box
                              sx={{
                                bgcolor: (() => {
                                  if (outputFormat === 'PDF') 
                                    return alpha(theme.palette.error.main, 0.1);
                                  if (outputFormat === 'DOCX' || outputFormat === 'DOC') 
                                    return alpha(theme.palette.info.main, 0.1);
                                  return alpha(theme.palette.success.main, 0.1);
                                })(),
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 2,
                              }}
                            >
                              {outputFormat === 'PDF' ? (
                                <FilePdfIcon size={24} color={theme.palette.error.main} />
                              ) : outputFormat === 'DOCX' || outputFormat === 'DOC' ? (
                                <WordIcon size={24} color={theme.palette.info.main} />
                              ) : (
                                <ImageIcon size={24} color={theme.palette.success.main} />
                              )}
                            </Box>
                          </ListItemIcon>
                          
                          <ListItemText
                            primary={file.convertedName}
                            secondary={`Original: ${file.originalName} • ${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                            primaryTypographyProps={{ fontWeight: 500 }}
                          />
                          
                          <Button
                            variant="contained"
                            startIcon={<DownloadIcon size={16} />}
                            onClick={() => handleDownloadFile(file)}
                            sx={{ 
                              borderRadius: '50px',
                              px: 3,
                              bgcolor: currentConversionType.color,
                              '&:hover': {
                                bgcolor: alpha(currentConversionType.color, 0.9),
                              },
                            }}
                          >
                            Download
                          </Button>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  
                  <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider' }}>
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon size={16} />}
                      onClick={handleReset}
                    >
                      Convert More Files
                    </Button>
                    
                    {processedFiles.length > 1 && (
                      <Button
                        variant="contained"
                        startIcon={<DownloadIcon size={16} />}
                        onClick={handleDownloadAll}
                      >
                        Download All Files
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            )}
            
            {/* Help Section */}
            <Box sx={{ mt: 8 }}>
              <Divider sx={{ mb: 4 }} />
              
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    How to Convert {currentConversionType.title}
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    {[
                      {
                        title: 'Upload your files',
                        description: `Drag and drop ${conversionType === 'image-to-pdf' ? 'images' : 'PDF files'} into the upload area or click to browse.`,
                      },
                      {
                        title: 'Select output format',
                        description: `Choose your desired output format (${currentConversionType.targetFormats.join(', ')}).`,
                      },
                      {
                        title: 'Adjust settings',
                        description: 'Configure any additional options like quality to fine-tune your results.',
                      },
                      {
                        title: 'Convert and download',
                        description: 'Click the convert button and download your transformed files.',
                      },
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
                            bgcolor: currentConversionType.color,
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
                  <Card
                    sx={{
                      borderRadius: 4,
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: alpha(currentConversionType.color, 0.1),
                        p: 3,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Typography variant="h6" fontWeight={600} gutterBottom>
                        Tips for Better Conversions
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Follow these recommendations for the best results:
                      </Typography>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1 }}>
                      <List dense sx={{ p: 0 }}>
                        {[
                          'Ensure your source files have good quality before converting',
                          'For image to PDF conversions, use high-resolution images',
                          'Select the appropriate quality setting based on your needs',
                          'For text extraction, make sure your PDF contains actual text, not just images',
                          'Use our "Pro" version for batch processing of large files',
                        ].map((tip, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckIcon size={16} color={currentConversionType.color} />
                            </ListItemIcon>
                            <ListItemText 
                              primary={tip} 
                              primaryTypographyProps={{ variant: 'body2' }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                      
                      <Box
                        sx={{
                          mt: 3,
                          p: 2,
                          bgcolor: alpha(theme.palette.info.main, 0.1),
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'flex-start',
                        }}
                      >
                        <AlertIcon 
                          size={18} 
                          color={theme.palette.info.main} 
                          style={{ marginRight: 12, marginTop: 2 }}
                        />
                        <Typography variant="body2">
                          Files are processed securely and deleted from our servers after conversion. We don't store your content.
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default ConvertPDFPage;