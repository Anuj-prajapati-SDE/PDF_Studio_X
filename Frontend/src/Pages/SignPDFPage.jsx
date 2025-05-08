import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import SignatureCanvas from 'react-signature-canvas';
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
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Tab,
  Tabs,
  FormControlLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
//   FilePdf as FilePdfIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  Edit2 as SignatureIcon,
  Type as TypeIcon,
  Image as ImageIcon,
  Plus as PlusIcon,
  Move as MoveIcon,
  X as XIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`signature-tabpanel-${index}`}
      aria-labelledby={`signature-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `signature-tab-${index}`,
    'aria-controls': `signature-tabpanel-${index}`,
  };
}

const SignPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [signatureType, setSignatureType] = useState(0); // 0: Draw, 1: Type, 2: Upload
  const [signatureOptions, setSignatureOptions] = useState({
    textSignature: '',
    textFont: 'handwriting',
    textColor: '#000000',
    isSignatureCreated: false,
    signaturePreview: null,
    signaturePosition: 'lastPage',
    signatureSize: 'medium',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);
  const [pagePreviewOpen, setPagePreviewOpen] = useState(false);
  const signaturePadRef = useRef(null);
  
  // Current date and time
  const currentDateTime = "2025-05-04 06:33:03";
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
      setProcessedFile(null);
      setError(null);
    }
  }, []);

  // For uploading signature image
  const onDropSignature = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      
      if (!imageFile.type.startsWith('image/')) {
        toast.error('Please upload an image file (JPG, PNG, etc.)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setSignatureOptions({
          ...signatureOptions,
          signaturePreview: reader.result,
          isSignatureCreated: true,
        });
      };
      reader.readAsDataURL(imageFile);
    }
  }, [signatureOptions]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const { getRootProps: getSignatureRootProps, getInputProps: getSignatureInputProps } = useDropzone({
    onDrop: onDropSignature,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleSignatureTypeChange = (event, newValue) => {
    setSignatureType(newValue);
    // Reset signature when changing type
    setSignatureOptions({
      ...signatureOptions,
      isSignatureCreated: false,
      signaturePreview: null,
      textSignature: '',
    });
    
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
  };

  const handleOptionChange = (name) => (event) => {
    setSignatureOptions({
      ...signatureOptions,
      [name]: event.target.value,
    });
  };

  const createDrawnSignature = () => {
    if (signaturePadRef.current && !signaturePadRef.current.isEmpty()) {
      const signatureDataUrl = signaturePadRef.current.toDataURL('image/png');
      setSignatureOptions({
        ...signatureOptions,
        signaturePreview: signatureDataUrl,
        isSignatureCreated: true,
      });
      toast.success('Signature created');
    } else {
      toast.error('Please draw your signature');
    }
  };

  const createTextSignature = () => {
    if (!signatureOptions.textSignature.trim()) {
      toast.error('Please enter your name for the signature');
      return;
    }
    
    // In a real app, we would render the text with the selected font and color
    // For now, we'll simulate it
    setSignatureOptions({
      ...signatureOptions,
      isSignatureCreated: true,
      signaturePreview: 'text-signature-preview', // This would be a real generated image in a real app
    });
    toast.success('Text signature created');
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
    }
    
    setSignatureOptions({
      ...signatureOptions,
      isSignatureCreated: false,
      signaturePreview: null,
      textSignature: '',
    });
  };

  const handleSign = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to sign');
      return;
    }
    
    if (!signatureOptions.isSignatureCreated) {
      toast.error('Please create a signature first');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate PDF signing process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // In a real app, we would actually embed the signature into the PDF
      setProcessedFile({
        name: file.name.replace('.pdf', '_signed.pdf'),
        size: file.size * 1.01, // Slightly larger due to signature
        url: '#', // Mock URL
        signatureType: signatureType === 0 ? 'drawn' : signatureType === 1 ? 'text' : 'image',
        signaturePosition: signatureOptions.signaturePosition,
      });
      
      toast.success('PDF signed successfully!');
    } catch (err) {
      console.error('Error signing PDF:', err);
      setError('An unexpected error occurred while signing the PDF. Please try again.');
      toast.error('Failed to sign PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your signed PDF');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    clearSignature();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handlePreviewPages = () => {
    setPagePreviewOpen(true);
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
                Sign PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add your signature to PDF documents easily and professionally
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
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    borderRadius: 4, 
                    mb: { xs: 3, md: 0 },
                    height: '100%',
                  }}
                >
                  <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Upload PDF
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Select the PDF you want to sign
                      </Typography>
                    </Box>
                    
                    <Box 
                      sx={{ 
                        p: 3, 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: file ? 'flex-start' : 'center',
                      }}
                    >
                      {!file ? (
                        <Paper
                          {...getRootProps()}
                          elevation={0}
                          variant="outlined"
                          sx={{
                            borderRadius: 3,
                            borderStyle: 'dashed',
                            borderWidth: 2,
                            borderColor: isDragActive ? 'primary.main' : 'divider',
                            bgcolor: isDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                            p: 6,
                            textAlign: 'center',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <input {...getInputProps()} />
                          
                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: '50%',
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              color: 'primary.main',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 2,
                            }}
                          >
                            <UploadIcon size={30} />
                          </Box>
                          
                          <Typography variant="h6" gutterBottom>
                            {isDragActive
                              ? "Drop your PDF here"
                              : "Drag & drop PDF file here"
                            }
                          </Typography>
                          
                          <Typography variant="body2" color="text.secondary">
                            or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse files</Box>
                          </Typography>
                          
                          <Box sx={{ mt: 2 }}>
                            <Chip 
                              label="Maximum file size: 100MB" 
                              size="small" 
                              variant="outlined" 
                            />
                          </Box>
                        </Paper>
                      ) : (
                        <>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                            <Box
                              sx={{
                                bgcolor: alpha(theme.palette.error.main, 0.1),
                                width: 48,
                                height: 48,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 2,
                                mr: 2,
                                flexShrink: 0,
                              }}
                            >
                              {/* <FilePdfIcon size={24} color={theme.palette.error.main} /> */}
                            </Box>
                            
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
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
                              onClick={handleReset}
                              startIcon={<TrashIcon size={16} />}
                            >
                              Change
                            </Button>
                          </Box>
                          
                          <Divider sx={{ my: 2 }} />
                          
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                            Signature Position
                          </Typography>
                          
                          <FormControl component="fieldset" sx={{ mb: 3 }}>
                            <RadioGroup
                              value={signatureOptions.signaturePosition}
                              onChange={handleOptionChange('signaturePosition')}
                            >
                              <FormControlLabel 
                                value="lastPage" 
                                control={<Radio />} 
                                label="Last page (most common)" 
                              />
                              <FormControlLabel 
                                value="allPages" 
                                control={<Radio />} 
                                label="All pages" 
                              />
                              <FormControlLabel 
                                value="specificPage" 
                                control={<Radio />} 
                                label="Specific page" 
                              />
                            </RadioGroup>
                          </FormControl>
                          
                          {signatureOptions.signaturePosition === 'specificPage' && (
                            <Button
                              variant="outlined"
                              size="small"
                              startIcon={<MoveIcon size={16} />}
                              onClick={handlePreviewPages}
                              sx={{ mb: 3, alignSelf: 'flex-start' }}
                            >
                              Choose Page & Position
                            </Button>
                          )}
                          
                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="signature-size-label">Signature Size</InputLabel>
                            <Select
                              labelId="signature-size-label"
                              id="signature-size"
                              value={signatureOptions.signatureSize}
                              onChange={handleOptionChange('signatureSize')}
                              label="Signature Size"
                            >
                              <MenuItem value="small">Small</MenuItem>
                              <MenuItem value="medium">Medium (Recommended)</MenuItem>
                              <MenuItem value="large">Large</MenuItem>
                            </Select>
                          </FormControl>
                          
                          <Alert 
                            severity="info" 
                            icon={<InfoIcon size={18} />}
                            sx={{ mt: 'auto', borderRadius: 2 }}
                          >
                            <Typography variant="body2">
                              Digital signatures added with this tool are visible on the document but are not electronically certified. For legally binding e-signatures, consider our Pro plan.
                            </Typography>
                          </Alert>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 4 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Typography variant="h6" fontWeight={600}>
                        Create Your Signature
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Choose how you want to create your signature
                      </Typography>
                    </Box>
                    
                    <Box sx={{ px: 3, pt: 2 }}>
                      <Tabs 
                        value={signatureType} 
                        onChange={handleSignatureTypeChange}
                        aria-label="signature creation options"
                        variant="fullWidth"
                      >
                        <Tab 
                          icon={<SignatureIcon size={18} />} 
                          label="Draw" 
                          {...a11yProps(0)}
                          sx={{ 
                            minHeight: 'unset', 
                            py: 1.5,
                          }} 
                        />
                        <Tab 
                          icon={<TypeIcon size={18} />} 
                          label="Type" 
                          {...a11yProps(1)}
                          sx={{ minHeight: 'unset', py: 1.5 }} 
                        />
                        <Tab 
                          icon={<ImageIcon size={18} />} 
                          label="Upload" 
                          {...a11yProps(2)}
                          sx={{ minHeight: 'unset', py: 1.5 }} 
                        />
                      </Tabs>
                    </Box>
                    
                    <Box sx={{ px: 3, pb: 3 }}>
                      <TabPanel value={signatureType} index={0}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Box
                            sx={{ 
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              bgcolor: 'background.paper',
                              mb: 2,
                              p: 1,
                              height: 200,
                            }}
                          >
                            {!signatureOptions.isSignatureCreated ? (
                              <SignatureCanvas
                                ref={signaturePadRef}
                                penColor="black"
                                canvasProps={{
                                  width: '100%',
                                  height: 198,
                                  className: 'signature-canvas'
                                }}
                              />
                            ) : (
                              <Box
                                component="img"
                                src={signatureOptions.signaturePreview}
                                alt="Your signature"
                                sx={{
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain',
                                }}
                              />
                            )}
                          </Box>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {signatureOptions.isSignatureCreated ? (
                              <Button 
                                variant="outlined" 
                                color="error" 
                                onClick={clearSignature}
                                startIcon={<TrashIcon size={16} />}
                              >
                                Clear
                              </Button>
                            ) : (
                              <>
                                <Button 
                                  variant="outlined" 
                                  color="error" 
                                  onClick={() => signaturePadRef.current && signaturePadRef.current.clear()}
                                  startIcon={<TrashIcon size={16} />}
                                >
                                  Clear
                                </Button>
                                <Button 
                                  variant="contained" 
                                  onClick={createDrawnSignature}
                                  startIcon={<CheckIcon size={16} />}
                                >
                                  Save Signature
                                </Button>
                              </>
                            )}
                          </Box>
                        </Box>
                      </TabPanel>
                      
                      <TabPanel value={signatureType} index={1}>
                        <Box>
                          <TextField
                            label="Type Your Name"
                            fullWidth
                            variant="outlined"
                            value={signatureOptions.textSignature}
                            onChange={handleOptionChange('textSignature')}
                            placeholder="Your signature name"
                            sx={{ mb: 3 }}
                          />
                          
                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="font-style-label">Font Style</InputLabel>
                            <Select
                              labelId="font-style-label"
                              id="font-style"
                              value={signatureOptions.textFont}
                              onChange={handleOptionChange('textFont')}
                              label="Font Style"
                            >
                              <MenuItem value="handwriting">Handwriting</MenuItem>
                              <MenuItem value="formal">Formal</MenuItem>
                              <MenuItem value="classic">Classic</MenuItem>
                              <MenuItem value="modern">Modern</MenuItem>
                            </Select>
                          </FormControl>
                          
                          <FormControl fullWidth sx={{ mb: 3 }}>
                            <InputLabel id="text-color-label">Signature Color</InputLabel>
                            <Select
                              labelId="text-color-label"
                              id="text-color"
                              value={signatureOptions.textColor}
                              onChange={handleOptionChange('textColor')}
                              label="Signature Color"
                            >
                              <MenuItem value="#000000">Black</MenuItem>
                              <MenuItem value="#0000FF">Blue</MenuItem>
                              <MenuItem value="#FF0000">Red</MenuItem>
                              <MenuItem value="#006400">Dark Green</MenuItem>
                            </Select>
                          </FormControl>
                          
                          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                            {signatureOptions.isSignatureCreated ? (
                              <Button 
                                variant="outlined" 
                                color="error" 
                                onClick={clearSignature}
                                startIcon={<TrashIcon size={16} />}
                              >
                                Clear
                              </Button>
                            ) : (
                              <Button 
                                variant="contained" 
                                onClick={createTextSignature}
                                startIcon={<CheckIcon size={16} />}
                                disabled={!signatureOptions.textSignature.trim()}
                              >
                                Create Signature
                              </Button>
                            )}
                          </Box>
                          
                          {signatureOptions.isSignatureCreated && (
                            <Box
                              sx={{
                                mt: 2,
                                p: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 2,
                                textAlign: 'center',
                              }}
                            >
                              <Typography 
                                variant="h5" 
                                sx={{ 
                                  fontFamily: 
                                    signatureOptions.textFont === 'handwriting' ? 'Dancing Script, cursive' : 
                                    signatureOptions.textFont === 'formal' ? 'Playfair Display, serif' : 
                                    signatureOptions.textFont === 'classic' ? 'Times New Roman, serif' : 
                                    'Montserrat, sans-serif',
                                  color: signatureOptions.textColor,
                                  fontWeight: signatureOptions.textFont === 'modern' ? 500 : 400,
                                }}
                              >
                                {signatureOptions.textSignature}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TabPanel>
                      
                      <TabPanel value={signatureType} index={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          {!signatureOptions.isSignatureCreated ? (
                            <Paper
                              {...getSignatureRootProps()}
                              elevation={0}
                              variant="outlined"
                              sx={{
                                borderRadius: 3,
                                borderStyle: 'dashed',
                                borderWidth: 2,
                                borderColor: isDragActive ? 'primary.main' : 'divider',
                                bgcolor: alpha(theme.palette.background.default, 0.4),
                                p: 4,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 3,
                                height: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <input {...getSignatureInputProps()} />
                              
                              <Box
                                sx={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: '50%',
                                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                  color: 'primary.main',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mb: 2,
                                }}
                              >
                                <UploadIcon size={24} />
                              </Box>
                              
                              <Typography variant="body1" gutterBottom>
                                Upload your signature image
                              </Typography>
                              
                              <Typography variant="body2" color="text.secondary">
                                Drag & drop or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse</Box>
                              </Typography>
                              
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                                Supports JPG, PNG, GIF (Max: 5MB)
                              </Typography>
                            </Paper>
                          ) : (
                            <Box sx={{ mb: 3 }}>
                              <Box
                                sx={{ 
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 2,
                                  bgcolor: 'background.paper',
                                  p: 2,
                                  mb: 2,
                                  height: 150,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Box
                                  component="img"
                                  src={signatureOptions.signaturePreview}
                                  alt="Your uploaded signature"
                                  sx={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                  }}
                                />
                              </Box>
                              
                              <Button 
                                variant="outlined" 
                                color="error" 
                                onClick={clearSignature}
                                startIcon={<TrashIcon size={16} />}
                              >
                                Clear
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </TabPanel>
                    </Box>
                    
                    <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <EditIcon size={16} />}
                        onClick={handleSign}
                        disabled={isProcessing || !file || !signatureOptions.isSignatureCreated}
                        sx={{
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
                        {isProcessing ? 'Signing PDF...' : 'Sign PDF'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Adding your signature to the PDF...
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
                      PDF Signed Successfully!
                    </Typography>
                    <Typography variant="body2">
                      Your signature has been added to the document
                    </Typography>
                  </Box>
                </Stack>
              </Box>
              
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={5} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Box 
                      sx={{ 
                        maxWidth: 320,
                        mx: { xs: 'auto', md: '0' }
                      }}
                    >
                      <Box
                        sx={{
                          height: 300,
                          width: '100%',
                          backgroundColor: alpha(theme.palette.background.paper, 0.8),
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          position: 'relative',
                          mb: 2,
                        }}
                      >
                        {/* Mock PDF display with signature */}
                        <Box 
                          sx={{ 
                            flex: 1,
                            backgroundColor: 'background.paper',
                            p: 2,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {/* <FilePdfIcon 
                            size={48} 
                            color={alpha(theme.palette.text.primary, 0.1)}
                            style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                            }}
                          /> */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 20,
                              right: 20,
                              maxWidth: 120,
                              maxHeight: 60,
                              p: 1,
                              border: '2px solid',
                              borderColor: alpha(theme.palette.primary.main, 0.3),
                              borderRadius: 1,
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                            }}
                          >
                            {/* Simplified signature preview */}
                            {processedFile.signatureType === 'text' ? (
                              <Typography variant="body1" sx={{ fontFamily: 'Dancing Script, cursive' }}>
                                {username}
                              </Typography>
                            ) : (
                              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SignatureIcon size={32} color={theme.palette.primary.main} />
                              </Box>
                            )}
                          </Box>
                        </Box>
                        
                        <Box 
                          sx={{ 
                            height: 40,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            borderTop: '1px solid',
                            borderColor: alpha(theme.palette.primary.main, 0.1),
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {processedFile.name}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" textAlign="center">
                        {formatFileSize(processedFile.size)}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        sx={{ 
                          mt: 2,
                          py: 1.5,
                          borderRadius: '50px',
                        }}
                      >
                        Download Signed PDF
                      </Button>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={7}>
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
                          Signature Details
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Signature Type
                              </Typography>
                              <Typography variant="body1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                {processedFile.signatureType}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Position
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {processedFile.signaturePosition === 'lastPage' 
                                  ? 'Last Page' 
                                  : processedFile.signaturePosition === 'allPages' 
                                  ? 'All Pages' 
                                  : 'Specific Page'}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Date Signed
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {currentDateTime.split(' ')[0]}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Signer
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {username}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    
                    <Alert 
                      severity="success" 
                      icon={<CheckIcon size={18} />}
                      sx={{ mb: 3, borderRadius: 3 }}
                    >
                      <Typography variant="body2">
                        Your PDF has been successfully signed. The signature has been placed in the position you selected. You can now download the signed document.
                      </Typography>
                    </Alert>
                    
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon size={16} />}
                        fullWidth
                        onClick={handleReset}
                      >
                        Sign Another PDF
                      </Button>
                      
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                          setProcessedFile(null);
                        }}
                      >
                        Add Another Signature
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            
            <Alert 
              severity="info" 
              icon={<InfoIcon size={20} />} 
              sx={{ mb: 4, borderRadius: 3 }}
            >
              <AlertTitle>What's Next?</AlertTitle>
              <Typography variant="body2">
                Your signed PDF is now ready for sharing. For a legally binding electronic signature with verification, consider upgrading to our Pro plan which includes certified digital signatures compliant with e-signature laws.
              </Typography>
            </Alert>
          </motion.div>
        )}
        
        {/* Page preview dialog */}
        <Dialog
          open={pagePreviewOpen}
          onClose={() => setPagePreviewOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Select Page & Position
            <IconButton
              aria-label="close"
              onClick={() => setPagePreviewOpen(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}
            >
              <XIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" paragraph>
              Click on the page where you want to place your signature. You can adjust the exact position after selecting a page.
            </Typography>
            
            <Grid container spacing={2}>
              {/* Mock pages - in a real app, these would be actual PDF page previews */}
              {Array.from({ length: 3 }, (_, i) => (
                <Grid item xs={12} sm={6} md={4} key={`page-${i+1}`}>
                  <Card 
                    variant="outlined" 
                    sx={{ 
                      borderRadius: 2, 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        boxShadow: '0 0 0 1px ' + theme.palette.primary.main,
                      }
                    }}
                    onClick={() => toast.success(`Signature will be placed on page ${i+1}`)}
                  >
                    <Box
                      sx={{
                        height: 200,
                        bgcolor: 'background.paper',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {/* <FilePdfIcon size={32} color={alpha(theme.palette.text.primary, 0.2)} /> */}
                    </Box>
                    <Box sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="body2">Page {i+1}</Typography>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setPagePreviewOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="contained"
              onClick={() => {
                toast.success('Page and position saved');
                setPagePreviewOpen(false);
              }}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Sign a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop or browse to upload the PDF file you want to sign.'
                  },
                  {
                    title: 'Create your signature',
                    description: 'Draw, type, or upload an image of your signature using the available options.'
                  },
                  {
                    title: 'Choose signature placement',
                    description: 'Select where in the document your signature should appear.'
                  },
                  {
                    title: 'Download signed document',
                    description: 'Save your signed PDF for sharing or printing.'
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
                Signature Types Explained
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Drawn Signature',
                    description: 'Closest to a traditional signature. Draw directly using your mouse, trackpad, or touchscreen.',
                  },
                  {
                    title: 'Typed Signature',
                    description: 'Convert your name to a signature-style font that looks handwritten but is perfectly legible.',
                  },
                  {
                    title: 'Uploaded Signature',
                    description: 'Scan your physical signature and upload it as an image for the most authentic representation.',
                  },
                  {
                    title: 'Certified Signatures (Pro)',
                    description: 'Digital signatures that include identity verification and tamper-proof security features.',
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
                    Legal Considerations
                  </Typography>
                  <Typography variant="body2" paragraph>
                    While this tool adds your signature visually to documents, some official purposes may require certified digital signatures with encryption and verification. Check the requirements of your recipient before signing important legal documents.
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

export default SignPDFPage;