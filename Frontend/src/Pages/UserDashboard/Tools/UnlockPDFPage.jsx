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
  TextField,
  IconButton,
  InputAdornment,
  Chip,
  useTheme,
  alpha,
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
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Shield as ShieldIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const UnlockPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-04 06:59:45";
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
      setPassword(''); // Reset password when changing files
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleUnlock = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to unlock');
      return;
    }

    if (!password.trim()) {
      toast.error('Please enter the password for this PDF');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate PDF unlock process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For this mock implementation, we'll always succeed
      // In a real app, we would attempt to decrypt the PDF with the password
      // and handle the possibility of incorrect passwords
      
      setProcessedFile({
        name: file.name.replace('.pdf', '_unlocked.pdf'),
        size: file.size,
        url: '#', // Mock URL
      });
      
      toast.success('PDF unlocked successfully!');
    } catch (err) {
      console.error('Error unlocking PDF:', err);
      setError('The password you entered is incorrect. Please try again.');
      toast.error('Failed to unlock PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your unlocked PDF');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    setPassword('');
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
                Unlock PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Remove password protection from your PDF files
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
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Card sx={{ borderRadius: 4, mb: 4 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            width: 48,
                            height: 48,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                          }}
                        >
                          <UnlockIcon size={24} color={theme.palette.primary.main} />
                        </Box>
                        
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            Upload Password-Protected PDF
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Enter the password to unlock your document
                          </Typography>
                        </Box>
                      </Stack>
                    </Box>
                    
                    <Box sx={{ p: 3 }}>
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
                            mb: 3,
                          }}
                        >
                          <input {...getInputProps()} />
                          
                          <Box
                            component={motion.div}
                            variants={itemVariants}
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
                              mx: 'auto',
                            }}
                          >
                            <UploadIcon size={30} />
                          </Box>
                          
                          <Typography 
                            variant="h6" 
                            component={motion.div}
                            variants={itemVariants} 
                            gutterBottom
                          >
                            {isDragActive
                              ? "Drop your protected PDF here"
                              : "Drag & drop password-protected PDF here"
                            }
                          </Typography>
                          
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            component={motion.div}
                            variants={itemVariants}
                          >
                            or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>browse files</Box>
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
                        <>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              mb: 4,
                            }}
                          >
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
                              }}
                            >
                              {/* <FilePdfIcon size={24} color={theme.palette.error.main} /> */}
                            </Box>
                            
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" gutterBottom sx={{ wordBreak: 'break-word' }}>
                                {file.name}
                              </Typography>
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="body2" color="text.secondary">
                                  {formatFileSize(file.size)}
                                </Typography>
                                <Box
                                  sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                                    color: 'warning.dark',
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 1,
                                  }}
                                >
                                  <LockIcon size={14} style={{ marginRight: 5 }} />
                                  <Typography variant="caption" fontWeight={500}>
                                    Password Protected
                                  </Typography>
                                </Box>
                              </Stack>
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
                          
                          <Typography variant="subtitle1" fontWeight={600} gutterBottom sx={{ mb: 2 }}>
                            Enter PDF Password
                          </Typography>
                          
                          <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            sx={{ mb: 3 }}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                  >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                          
                          {error && (
                            <Alert 
                              severity="error" 
                              sx={{ mb: 3, borderRadius: 2 }}
                            >
                              {error}
                            </Alert>
                          )}
                          
                          <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <UnlockIcon size={16} />}
                            onClick={handleUnlock}
                            disabled={isProcessing || !password}
                            sx={{
                              py: 1.5,
                              mb: 3,
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
                            {isProcessing ? 'Unlocking PDF...' : 'Unlock PDF'}
                          </Button>
                          
                          <Alert 
                            severity="info" 
                            icon={<InfoIcon size={18} />}
                            sx={{ borderRadius: 2 }}
                          >
                            <Typography variant="body2">
                              We don't store your password or PDF content. All processing happens in your browser for maximum security.
                            </Typography>
                          </Alert>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>

                {isProcessing && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Removing password protection...
                    </Typography>
                    <LinearProgress sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                )}
              </Grid>
            </Grid>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
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
                          PDF Unlocked Successfully!
                        </Typography>
                        <Typography variant="body2">
                          Your password protection has been removed
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                  
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box
                      sx={{
                        maxWidth: 320,
                        mx: 'auto',
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{
                          height: 220,
                          width: '100%',
                          backgroundColor: alpha(theme.palette.background.default, 0.5),
                          borderRadius: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          position: 'relative',
                          mb: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                          }}
                        >
                          {/* <FilePdfIcon 
                            size={64} 
                            color={alpha(theme.palette.error.main, 0.2)}
                          /> */}
                        </Box>
                        
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.background.paper, 0.9),
                            width: 80,
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '3px solid',
                            borderColor: alpha(theme.palette.success.main, 0.3),
                            boxShadow: '0 0 0 8px ' + alpha(theme.palette.background.paper, 0.4),
                          }}
                        >
                          <UnlockIcon size={32} color={theme.palette.success.main} />
                        </Box>
                      </Box>
                      
                      <Typography variant="h6" fontWeight={600}>
                        {processedFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatFileSize(processedFile.size)} • No Password Protection
                      </Typography>
                      
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        sx={{ 
                          mt: 3,
                          py: 1.5,
                          borderRadius: '50px',
                        }}
                      >
                        Download Unlocked PDF
                      </Button>
                    </Box>
                  </CardContent>
                  
                  <Divider />
                  
                  <Box 
                    sx={{ 
                      p: 3,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<RefreshIcon size={16} />}
                      onClick={handleReset}
                    >
                      Unlock Another PDF
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
                    Your PDF is now unlocked and can be accessed without a password. You can now freely open, edit, and share this document without password restrictions. For security, remember to use password protection on sensitive documents when sharing with others.
                  </Typography>
                </Alert>
              </Grid>
            </Grid>
          </motion.div>
        )}
        
        {/* How-to Guide Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                How to Unlock a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your password-protected PDF',
                    description: 'Drag and drop or browse to upload the PDF file you want to unlock.'
                  },
                  {
                    title: 'Enter the PDF password',
                    description: 'Type in the password that was used to protect the document.'
                  },
                  {
                    title: 'Click "Unlock PDF"',
                    description: 'Wait while we process your document and remove the password protection.'
                  },
                  {
                    title: 'Download your unlocked PDF',
                    description: 'Save your newly accessible PDF for easy editing and sharing.'
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
                Important Information
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Password Requirements',
                    description: 'You must know the original password to unlock the PDF. This tool cannot bypass or crack unknown passwords.',
                  },
                  {
                    title: 'Data Security',
                    description: 'All processing happens in your browser. We never store your PDF content or passwords on our servers.',
                  },
                  {
                    title: 'File Size Limitations',
                    description: 'Files up to 50MB can be processed. For larger files, please consider using our desktop application.',
                  },
                  {
                    title: 'PDF Versions',
                    description: 'This tool works with PDFs protected with standard passwords (not certificate security).',
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
                    Only unlock PDFs that you have the legal right to access. Removing password protection from documents without permission may violate intellectual property rights or confidentiality agreements.
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

export default UnlockPDFPage;