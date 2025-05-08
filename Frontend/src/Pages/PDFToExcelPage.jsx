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
  Grid as GridIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const PDFToExcelPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    outputFormat: 'xlsx',
    extractTables: true,
    detectHeaders: true,
    includeImages: false,
    pageRange: '',
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
      
      // Generate random table statistics for the result
      const tableCount = Math.floor(Math.random() * 5) + 1;
      const sheetCount = Math.floor(Math.random() * 3) + 1;
      const rowCount = Math.floor(Math.random() * 500) + 50;
      
      setProcessedFile({
        name: file.name.replace('.pdf', `.${conversionOptions.outputFormat}`),
        size: Math.floor(file.size * 0.7), // Simulate smaller file size
        tableCount,
        sheetCount,
        rowCount,
        url: '#', // Mock URL
      });
      
      toast.success('PDF converted to Excel successfully!');
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
                PDF to Excel
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Extract tables and data from PDF documents into Excel spreadsheets
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
                            <MenuItem value="xlsx">XLSX (Modern Excel)</MenuItem>
                            <MenuItem value="xls">XLS (Legacy Excel)</MenuItem>
                            <MenuItem value="csv">CSV (Plain Text)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Page Range */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Page Range (Optional)"
                          placeholder="e.g., 1-3, 5, 7-10"
                          value={conversionOptions.pageRange}
                          onChange={handleOptionChange('pageRange')}
                          helperText="Leave empty to convert all pages"
                        />
                      </Grid>
                      
                      {/* Table Extraction Options */}
                      <Grid item xs={12}>
                        <FormControl component="fieldset" sx={{ width: '100%' }}>
                          <FormLabel component="legend">Table Extraction Options</FormLabel>
                          <Grid container spacing={2} sx={{ mt: 1 }}>
                            <Grid item xs={12} sm={6} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={conversionOptions.extractTables}
                                    onChange={handleOptionChange('extractTables')}
                                  />
                                }
                                label="Extract tables automatically"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={conversionOptions.detectHeaders}
                                    onChange={handleOptionChange('detectHeaders')}
                                    disabled={!conversionOptions.extractTables}
                                  />
                                }
                                label="Detect table headers"
                              />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={conversionOptions.includeImages}
                                    onChange={handleOptionChange('includeImages')}
                                  />
                                }
                                label="Include images (if possible)"
                              />
                            </Grid>
                          </Grid>
                        </FormControl>
                      </Grid>
                      
                      {/* Data Format Options */}
                      <Grid item xs={12}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Data Organization</FormLabel>
                          <RadioGroup
                            row
                            value={conversionOptions.dataOrganization || 'sheets'}
                            onChange={(e) => setConversionOptions({
                              ...conversionOptions,
                              dataOrganization: e.target.value,
                            })}
                          >
                            <FormControlLabel 
                              value="sheets" 
                              control={<Radio />} 
                              label="One sheet per table" 
                            />
                            <FormControlLabel 
                              value="single" 
                              control={<Radio />} 
                              label="All tables in one sheet" 
                            />
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={18} />}
                      sx={{ mt: 3, borderRadius: 2 }}
                    >
                      <Typography variant="body2">
                        Our advanced table recognition algorithm works best with clearly defined tables. Handwritten or very complex tables may require manual adjustments after conversion.
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
                        bgcolor: '#217346', // Excel green
                        '&:hover': {
                          bgcolor: '#185a34',
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
                      {isProcessing ? 'Converting...' : 'Convert to Excel'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Extracting tables and converting to {conversionOptions.outputFormat.toUpperCase()}...
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
              
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Box 
                      sx={{ 
                        width: 80, 
                        height: 80, 
                        mx: { xs: 'auto', md: '0' }, 
                        mb: 2, 
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: alpha('#217346', 0.1), // Excel green
                        borderRadius: 2,
                      }}
                    >
                      <GridIcon 
                        size={40} 
                        color="#217346" // Excel green
                      />
                    </Box>
                    
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {processedFile.name}
                    </Typography>
                    
                    <Typography variant="body2" color="text.secondary">
                      {formatFileSize(processedFile.size)}
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Card 
                      variant="outlined" 
                      sx={{ 
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.info.main, 0.05),
                        mb: 3,
                      }}
                    >
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                          Extraction Results
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={4} sm={4}>
                            <Box sx={{ textAlign: 'center', p: 1 }}>
                              <Typography variant="h4" fontWeight={700} color="#217346">
                                {processedFile.tableCount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Tables
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4} sm={4}>
                            <Box sx={{ textAlign: 'center', p: 1 }}>
                              <Typography variant="h4" fontWeight={700} color="#217346">
                                {processedFile.sheetCount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Sheets
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4} sm={4}>
                            <Box sx={{ textAlign: 'center', p: 1 }}>
                              <Typography variant="h4" fontWeight={700} color="#217346">
                                {processedFile.rowCount}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Rows
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    
                    <Typography variant="body2" paragraph sx={{ mb: 3 }}>
                      Your tables have been {conversionOptions.dataOrganization === 'sheets' ? 'organized into separate sheets' : 'combined into a single sheet'}. 
                      {conversionOptions.detectHeaders ? ' Table headers were automatically detected.' : ''} 
                      {conversionOptions.includeImages ? ' Images were included where possible.' : ''}
                    </Typography>
                    
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      startIcon={<DownloadIcon />}
                      onClick={handleDownload}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        borderRadius: '50px',
                        bgcolor: '#217346', // Excel green
                        '&:hover': {
                          bgcolor: '#185a34',
                        },
                      }}
                    >
                      Download {conversionOptions.outputFormat.toUpperCase()} File
                    </Button>
                  </Grid>
                </Grid>
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
                  onClick={() => setProcessedFile(null)}
                >
                  Adjust Conversion Settings
                </Button>
              </Box>
            </Card>
            
            <Alert 
              severity="warning" 
              icon={<AlertCircleIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>Data Verification Recommended</AlertTitle>
              <Typography variant="body2">
                While our algorithm is highly accurate, we recommend verifying the extracted data, especially when dealing with complex tables or poor quality PDFs. Some manual formatting may be required.
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
                How to Convert PDF to Excel
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Configure extraction options',
                    description: 'Choose how tables should be detected and organized in your Excel file.'
                  },
                  {
                    title: 'Select output format',
                    description: 'Choose between XLSX (modern Excel), XLS (legacy Excel), or CSV format.'
                  },
                  {
                    title: 'Download results',
                    description: 'Click "Convert to Excel" and download your spreadsheet when processing is complete.'
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
                        bgcolor: '#217346', // Excel green
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
                Ideal PDF Types for Conversion
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Financial Reports',
                    description: 'Reports with tables of financial data, income statements, or balance sheets',
                  },
                  {
                    title: 'Data Sheets',
                    description: 'Documents with organized data like product listings or specifications',
                  },
                  {
                    title: 'Research Results',
                    description: 'Academic papers with data tables showing experiment results',
                  },
                  {
                    title: 'Form Responses',
                    description: 'PDF forms with structured field data that needs analysis',
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
                          borderColor: '#217346',
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
                  bgcolor: alpha('#217346', 0.05), // Excel green
                  border: `1px solid ${alpha('#217346', 0.2)}`
                }}
              >
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600} gutterBottom color="#217346">
                    <GridIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Pro Tip
                  </Typography>
                  <Typography variant="body2" paragraph>
                    For large documents with many tables, use the page range feature to convert specific sections. This can help focus on just the data you need and produce cleaner results.
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

export default PDFToExcelPage;