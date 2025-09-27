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
  Chip,
  Slider,
  Tooltip,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  alpha,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import {
//   FilePdf as FilePdfIcon, 
  File as FileIcon, 
  Upload as UploadIcon, 
  Download as DownloadIcon, 
  Scissors as ScissorsIcon, 
  RefreshCw as RefreshIcon, 
  Check as CheckIcon, 
  Eye as EyeIcon, 
  AlertCircle as AlertIcon,
  ChevronRight as ChevronRightIcon,
} from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Tabbed panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`split-tabpanel-${index}`}
      aria-labelledby={`split-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SplitPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [splitMethod, setSplitMethod] = useState(0); // 0: All Pages, 1: Page Ranges, 2: Extract Pages
  const [pageCount, setPageCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState([]);
  const [error, setError] = useState(null);
  
  // Split options
  const [pageRanges, setPageRanges] = useState('');
  const [extractPages, setExtractPages] = useState('');
  const [splitAfterPage, setSplitAfterPage] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    // Only accept one PDF file
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      
      if (pdfFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      // In a real app, you would extract the page count from the PDF
      // For demo purposes, we'll simulate getting a random page count
      const randomPageCount = Math.floor(Math.random() * 15) + 5; // Between 5-20 pages
      setPageCount(randomPageCount);
      
      setFile(pdfFile);
      toast.success('PDF uploaded successfully');
      
      // Reset split options when new file is uploaded
      setSplitMethod(0);
      setPageRanges('');
      setExtractPages('');
      setSplitAfterPage([]);
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

  const handleSplitMethodChange = (event, newValue) => {
    setSplitMethod(newValue);
  };

  const handleSplit = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to split');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate API processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes - generate mock results based on split method
      let mockFiles = [];
      
      if (splitMethod === 0) {
        // Split all pages into individual files
        for (let i = 1; i <= pageCount; i++) {
          mockFiles.push({
            name: `page_${i}.pdf`,
            page: i,
            size: Math.floor(Math.random() * 500000) + 100000, // Random size between 100KB-600KB
          });
        }
      } else if (splitMethod === 1) {
        // Split by page ranges
        const ranges = pageRanges.split(',').map(range => range.trim());
        
        ranges.forEach((range, index) => {
          if (range.includes('-')) {
            const [start, end] = range.split('-').map(Number);
            mockFiles.push({
              name: `pages_${start}-${end}.pdf`,
              page: `${start}-${end}`,
              size: Math.floor(Math.random() * 1000000) + 200000, // Random size between 200KB-1.2MB
            });
          } else {
            const pageNum = Number(range);
            mockFiles.push({
              name: `page_${pageNum}.pdf`,
              page: pageNum,
              size: Math.floor(Math.random() * 500000) + 100000,
            });
          }
        });
      } else {
        // Extract specific pages
        const pages = extractPages.split(',').map(page => Number(page.trim()));
        
        pages.forEach(page => {
          mockFiles.push({
            name: `page_${page}.pdf`,
            page: page,
            size: Math.floor(Math.random() * 500000) + 100000,
          });
        });
      }
      
      setProcessedFiles(mockFiles);
      toast.success('PDF split successfully!');
    } catch (err) {
      console.error('Error splitting PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to split PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadAll = () => {
    toast.success('Downloading all files as ZIP archive');
    // In a real app, you would trigger download of a zip containing all files
  };

  const handleDownloadFile = (file) => {
    toast.success(`Downloading ${file.name}`);
    // In a real app, you would download the specific file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFiles([]);
    setPageCount(0);
    setError(null);
    setSplitMethod(0);
    setPageRanges('');
    setExtractPages('');
    setSplitAfterPage([]);
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
  
  const isValidPageRanges = () => {
    if (splitMethod !== 1 || !pageRanges) return true;
    
    const rangePattern = /^(\d+(-\d+)?)(,\s*\d+(-\d+)?)*$/;
    if (!rangePattern.test(pageRanges)) return false;
    
    // Check that page numbers are within valid range
    const ranges = pageRanges.split(',').map(r => r.trim());
    for (const range of ranges) {
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(Number);
        if (isNaN(start) || isNaN(end) || start < 1 || end > pageCount || start > end) {
          return false;
        }
      } else {
        const page = Number(range);
        if (isNaN(page) || page < 1 || page > pageCount) {
          return false;
        }
      }
    }
    
    return true;
  };
  
  const isValidExtractPages = () => {
    if (splitMethod !== 2 || !extractPages) return true;
    
    const pagePattern = /^(\d+)(,\s*\d+)*$/;
    if (!pagePattern.test(extractPages)) return false;
    
    // Check that page numbers are within valid range
    const pages = extractPages.split(',').map(p => Number(p.trim()));
    for (const page of pages) {
      if (isNaN(page) || page < 1 || page > pageCount) {
        return false;
      }
    }
    
    return true;
  };
  
  const isValid = () => {
    if (!file) return false;
    
    if (splitMethod === 1 && !isValidPageRanges()) {
      return false;
    }
    
    if (splitMethod === 2 && !isValidExtractPages()) {
      return false;
    }
    
    return true;
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
            Split PDF
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Divide your PDF document into separate files or extract specific pages with precision.
          </Typography>
        </Box>

        {processedFiles.length === 0 ? (
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
                    ? "Drop your PDF file here"
                    : "Drag & drop a PDF file here"
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
                          {(file.size / (1024 * 1024)).toFixed(2)} MB • {pageCount} {pageCount === 1 ? 'page' : 'pages'}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        startIcon={<RefreshIcon size={16} />}
                        onClick={handleReset}
                      >
                        Change File
                      </Button>
                    </Stack>
                  </Box>
                  
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Split Options
                    </Typography>
                    
                    <Tabs
                      value={splitMethod}
                      onChange={handleSplitMethodChange}
                      variant="scrollable"
                      scrollButtons="auto"
                      sx={{
                        mb: 2,
                        '& .MuiTab-root': {
                          minHeight: 'auto',
                          py: 1.5,
                        },
                      }}
                    >
                      <Tab label="Split All Pages" />
                      <Tab label="Split by Page Ranges" />
                      <Tab label="Extract Specific Pages" />
                    </Tabs>
                    
                    <TabPanel value={splitMethod} index={0}>
                      <Alert 
                        severity="info" 
                        icon={<AlertIcon size={18} />}
                        sx={{ mb: 3, borderRadius: 2 }}
                      >
                        This will create {pageCount} separate PDF files, one for each page of the document.
                      </Alert>
                      
                      <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item xs={12} sm={6}>
                          <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: alpha(theme.palette.primary.main, 0.03) }}>
                            <CardContent>
                              <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                                <ScissorsIcon size={18} color={theme.palette.primary.main} />
                                <Typography variant="subtitle1" fontWeight={600}>
                                  Pages will be split as:
                                </Typography>
                              </Stack>
                              <Box sx={{ height: 150, overflowY: 'auto', px: 1 }}>
                                {[...Array(Math.min(pageCount, 20))].map((_, i) => (
                                  <Chip
                                    key={i}
                                    label={`Page ${i + 1}`}
                                    size="small"
                                    sx={{ 
                                      m: 0.5, 
                                      bgcolor: i % 2 === 0 ? 'primary.lighter' : 'background.paper',
                                      fontWeight: 500,
                                    }}
                                  />
                                ))}
                                {pageCount > 20 && (
                                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                                    ... and {pageCount - 20} more
                                  </Typography>
                                )}
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </TabPanel>
                    
                    <TabPanel value={splitMethod} index={1}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Enter page ranges separated by commas (e.g., "1-3, 5, 7-10"). Each range will become a separate PDF.
                      </Typography>
                      
                      <TextField
                        fullWidth
                        label="Page Ranges"
                        placeholder="e.g., 1-3, 5, 7-10"
                        value={pageRanges}
                        onChange={(e) => setPageRanges(e.target.value)}
                        error={!isValidPageRanges()}
                        helperText={!isValidPageRanges() && "Please enter valid page ranges within document limits"}
                        sx={{ mb: 3 }}
                      />
                      
                      {pageRanges && isValidPageRanges() && (
                        <Alert 
                          severity="info"
                          icon={<AlertIcon size={18} />}
                          sx={{ mb: 3, borderRadius: 2 }}
                        >
                          This will create {pageRanges.split(',').length} PDF files based on your specified ranges.
                        </Alert>
                      )}
                    </TabPanel>
                    
                    <TabPanel value={splitMethod} index={2}>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Enter specific page numbers separated by commas (e.g., "1, 3, 5"). Each page will be extracted into a separate PDF.
                      </Typography>
                      
                      <TextField
                        fullWidth
                        label="Page Numbers"
                        placeholder="e.g., 1, 3, 5"
                        value={extractPages}
                        onChange={(e) => setExtractPages(e.target.value)}
                        error={!isValidExtractPages()}
                        helperText={!isValidExtractPages() && "Please enter valid page numbers within document limits"}
                        sx={{ mb: 3 }}
                      />
                      
                      {extractPages && isValidExtractPages() && (
                        <Alert 
                          severity="info" 
                          icon={<AlertIcon size={18} />}
                          sx={{ mb: 3, borderRadius: 2 }}
                        >
                          This will extract {extractPages.split(',').length} pages from your document.
                        </Alert>
                      )}
                    </TabPanel>
                  </Box>
                  
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ScissorsIcon />}
                      onClick={handleSplit}
                      disabled={!isValid() || isProcessing}
                      sx={{
                        px: 4,
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
                      {isProcessing ? 'Processing...' : 'Split PDF'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Splitting your PDF file...
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
                      PDF Split Successfully
                    </Typography>
                    <Typography variant="body2">
                      {processedFiles.length} {processedFiles.length === 1 ? 'file' : 'files'} created from {file.name}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    Download Files
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {processedFiles.map((file, index) => (
                      <Grid item xs={6} sm={4} md={3} key={index}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            borderRadius: 2,
                            transition: 'all 0.2s ease',
                            '&:hover': {
                              borderColor: 'primary.main',
                              boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                            }
                          }}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                              <Box
                                sx={{
                                  width: 60,
                                  height: 60,
                                  bgcolor: alpha(theme.palette.error.main, 0.1),
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 2,
                                }}
                              >
                                {/* <FilePdfIcon size={28} color={theme.palette.error.main} /> */}
                              </Box>
                            </Box>
                            
                            <Typography 
                              variant="body2" 
                              align="center" 
                              fontWeight={500}
                              sx={{ mb: 0.5 }}
                            >
                              Page {file.page}
                            </Typography>
                            
                            <Typography 
                              variant="caption" 
                              color="text.secondary" 
                              align="center"
                              sx={{ display: 'block', mb: 1.5 }}
                            >
                              {(file.size / 1024).toFixed(0)} KB
                            </Typography>
                            
                            <Button
                              fullWidth
                              variant="outlined"
                              size="small"
                              startIcon={<DownloadIcon size={14} />}
                              onClick={() => handleDownloadFile(file)}
                            >
                              Download
                            </Button>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                
                <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider' }}>
                  <Button
                    variant="outlined"
                    startIcon={<RefreshIcon size={16} />}
                    onClick={handleReset}
                  >
                    Split Another PDF
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon size={16} />}
                    onClick={handleDownloadAll}
                  >
                    Download All Files
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Split a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Choose split method',
                    description: 'Select how you want to split your PDF - into individual pages, by page ranges, or extract specific pages.'
                  },
                  {
                    title: 'Configure options',
                    description: 'Enter page numbers or ranges depending on your selected method.'
                  },
                  {
                    title: 'Split and download',
                    description: 'Click the "Split PDF" button and download your files individually or as a ZIP archive.'
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
                Common Uses for PDF Splitting
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Extract Key Pages',
                    description: 'Pull out only the pages you need from lengthy documents',
                  },
                  {
                    title: 'Create Chapters',
                    description: 'Divide large documents into manageable sections',
                  },
                  {
                    title: 'Remove Pages',
                    description: 'Extract all pages except those you want to remove',
                  },
                  {
                    title: 'Share Selectively',
                    description: 'Share only relevant portions of confidential documents',
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        height: '100%',
                        boxShadow: 'none',
                        '&:hover': {
                          borderColor: 'primary.main',
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
              
              <Box sx={{ mt: 4, p: 3, bgcolor: alpha(theme.palette.warning.main, 0.1), borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  <AlertIcon size={16} style={{ marginRight: 8, verticalAlign: 'middle' }} />
                  Need Help?
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  If you're having trouble with splitting your PDF, check our <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>help guides</Box> or <Box component="span" sx={{ color: 'primary.main', fontWeight: 500 }}>contact support</Box>.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default SplitPDFPage;