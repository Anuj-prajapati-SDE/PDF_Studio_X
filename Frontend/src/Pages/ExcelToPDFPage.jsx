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

const ExcelToPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [conversionOptions, setConversionOptions] = useState({
    quality: 'medium',
    paperSize: 'auto',
    orientation: 'auto',
    includeGridlines: true,
    includeHeaderFooter: true,
    fitToPage: true,
    sheetRange: '',
    scalePercent: 100,
    embedFonts: true,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-03 19:18:24";
  const username = "Anuj-prajapati-SDE";

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const excelFile = acceptedFiles[0];
      
      // Check if the file is an Excel file
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel.sheet.macroEnabled.12'
      ];
      
      if (!validTypes.includes(excelFile.type)) {
        toast.error('Please upload an Excel file (XLS or XLSX)');
        return;
      }
      
      setFile(excelFile);
      toast.success('Excel file uploaded successfully');
      setProcessedFile(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel.sheet.macroEnabled.12': ['.xlsm'],
      'application/vnd.ms-excel.sheet.binary.macroEnabled.12': ['.xlsb'],
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
      toast.error('Please upload an Excel file to convert');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate conversion process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Generate random sheet count for the result
      const sheetCount = Math.floor(Math.random() * 3) + 1;
      
      // Calculate a realistic file size based on original and quality settings
      let sizeMultiplier = 1.2; // PDFs are usually larger than Excel files due to rendering
      
      if (conversionOptions.quality === 'low') {
        sizeMultiplier = 0.9;
      } else if (conversionOptions.quality === 'high') {
        sizeMultiplier = 1.5;
      }
      
      const estimatedSize = Math.floor(file.size * sizeMultiplier);
      
      setProcessedFile({
        name: file.name.replace(/\.xlsx?$/, '.pdf'),
        size: estimatedSize,
        sheets: sheetCount,
        url: '#', // Mock URL
      });
      
      toast.success('Excel file converted to PDF successfully!');
    } catch (err) {
      console.error('Error converting spreadsheet:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to convert Excel file');
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
                Excel to PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Convert Excel spreadsheets to PDF documents with precision formatting
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
                    ? "Drop your Excel file here"
                    : "Drag & drop Excel file here"
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
                    label="Supported formats: XLS, XLSX, XLSM" 
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
                          bgcolor: alpha('#217346', 0.1), // Excel green
                          width: 48,
                          height: 48,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                        }}
                      >
                        <GridIcon size={24} color="#217346" />
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
                      
                      {/* Paper Size */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="paper-size-label">Paper Size</InputLabel>
                          <Select
                            labelId="paper-size-label"
                            id="paper-size"
                            value={conversionOptions.paperSize}
                            onChange={handleOptionChange('paperSize')}
                            label="Paper Size"
                          >
                            <MenuItem value="auto">Auto-Detect</MenuItem>
                            <MenuItem value="a4">A4</MenuItem>
                            <MenuItem value="letter">Letter</MenuItem>
                            <MenuItem value="legal">Legal</MenuItem>
                            <MenuItem value="a3">A3</MenuItem>
                            <MenuItem value="tabloid">Tabloid</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Orientation */}
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel id="orientation-label">Orientation</InputLabel>
                          <Select
                            labelId="orientation-label"
                            id="orientation"
                            value={conversionOptions.orientation}
                            onChange={handleOptionChange('orientation')}
                            label="Orientation"
                          >
                            <MenuItem value="auto">Auto-Detect</MenuItem>
                            <MenuItem value="portrait">Portrait</MenuItem>
                            <MenuItem value="landscape">Landscape</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Sheet Range */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Sheet Range (Optional)"
                          placeholder="e.g., Sheet1, Sheet3-5"
                          value={conversionOptions.sheetRange}
                          onChange={handleOptionChange('sheetRange')}
                          helperText="Leave empty to convert all sheets"
                        />
                      </Grid>
                      
                      {/* Scale */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Scale (%)"
                          type="number"
                          value={conversionOptions.scalePercent}
                          onChange={handleOptionChange('scalePercent')}
                          inputProps={{ min: 50, max: 200 }}
                          helperText="Scaling percentage (50-200%)"
                          disabled={conversionOptions.fitToPage}
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
                                  checked={conversionOptions.includeGridlines}
                                  onChange={handleOptionChange('includeGridlines')}
                                />
                              }
                              label="Include gridlines"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.includeHeaderFooter}
                                  onChange={handleOptionChange('includeHeaderFooter')}
                                />
                              }
                              label="Include headers & footers"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={conversionOptions.fitToPage}
                                  onChange={handleOptionChange('fitToPage')}
                                />
                              }
                              label="Fit content to page"
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
                        For wide spreadsheets, we recommend selecting "Landscape" orientation and "Fit content to page" to ensure all columns are visible in the PDF.
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
                          bgcolor: '#125a32',
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
                  Converting your Excel file to PDF...
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
                      Your Excel spreadsheet has been successfully converted to PDF
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} sm={6} md={4} sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Box sx={{ mb: 3 }}>
                      <Stack direction="row" spacing={4} justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mb: 3 }}>
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
                              bgcolor: alpha('#217346', 0.1), // Excel green
                              borderRadius: 2,
                              position: 'relative',
                            }}
                          >
                            <GridIcon 
                              size={32} 
                              color="#217346" // Excel green
                            />
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary">
                            Excel
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
                            PDF
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={8}>
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
                          Conversion Details
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">File Name</Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {processedFile.name}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ mb: 2 }}>
                              <Typography variant="body2" color="text.secondary">File Size</Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {formatFileSize(processedFile.size)}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">Sheets Converted</Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {processedFile.sheets} {processedFile.sheets === 1 ? 'sheet' : 'sheets'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box>
                              <Typography variant="body2" color="text.secondary">Quality</Typography>
                              <Typography variant="body1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                {conversionOptions.quality}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    
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
                        bgcolor: theme.palette.error.main, // PDF red
                        '&:hover': {
                          bgcolor: theme.palette.error.dark,
                        },
                      }}
                    >
                      Download PDF
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
                  Convert Another Spreadsheet
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
                Your Excel spreadsheet has been converted to a PDF document with the settings you specified. The document preserves your formatting and is ready for sharing or printing.
                {conversionOptions.includeGridlines ? ' Gridlines have been included.' : ' Gridlines have been excluded.'}
                {conversionOptions.fitToPage ? ' Content has been scaled to fit the page.' : ''}
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
                How to Convert Excel to PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your spreadsheet',
                    description: 'Drag and drop your XLS or XLSX file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Configure layout settings',
                    description: 'Choose page size, orientation, and scaling options based on your spreadsheet.'
                  },
                  {
                    title: 'Select formatting options',
                    description: 'Decide whether to include gridlines, headers, footers, and other elements.'
                  },
                  {
                    title: 'Download your PDF',
                    description: 'Click "Convert to PDF" and download your converted spreadsheet when ready.'
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
                Tips for Best Results
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Check Print Area',
                    description: 'Set print area in Excel before conversion for better control over the PDF output',
                  },
                  {
                    title: 'Choose Right Orientation',
                    description: 'Use landscape for wide spreadsheets with many columns',
                  },
                  {
                    title: 'Scale Appropriately',
                    description: '"Fit to page" works well for most cases but may make text too small for complex sheets',
                  },
                  {
                    title: 'Preview First',
                    description: 'For critical documents, check the PDF output and adjust settings if needed',
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
                    <AlertCircleIcon size={16} style={{ verticalAlign: 'middle', marginRight: 8 }} />
                    Advanced Excel Features
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Some Excel features like macros, interactive filters, data validation, and complex formulas won't be functional in the PDF. However, the visual representation and data will be preserved accurately.
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

export default ExcelToPDFPage;