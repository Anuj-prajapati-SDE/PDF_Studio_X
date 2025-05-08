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
  TextField,
  Tabs,
  Tab,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  Tooltip,
  alpha,
  useTheme,
} from '@mui/material';
import {
   
  Lock as LockIcon,
  Unlock as UnlockIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Eye as EyeIcon,
  EyeOff as EyeOffIcon,
  Shield as ShieldIcon,
  AlertCircle as AlertCircleIcon,
  Check as CheckIcon,
  Key as KeyIcon,
  RefreshCw as RefreshIcon,
  File as FileIcon,
  Info as InfoIcon,
  HelpCircle as HelpCircleIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

// TabPanel component for tab content
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`protect-pdf-tabpanel-${index}`}
      aria-labelledby={`protect-pdf-tab-${index}`}
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

const ProtectPDFPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);
  
  // Password protection settings
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Permission settings
  const [permissions, setPermissions] = useState({
    printing: true,
    copying: true,
    editing: false,
    commenting: true,
    formFilling: true,
    contentExtraction: false,
  });
  
  // Password removal settings
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showUnlockPassword, setShowUnlockPassword] = useState(false);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setFile(null);
    setError(null);
    resetFormFields();
  };
  
  const resetFormFields = () => {
    setPassword('');
    setConfirmPassword('');
    setUnlockPassword('');
    setPermissions({
      printing: true,
      copying: true,
      editing: false,
      commenting: true,
      formFilling: true,
      contentExtraction: false,
    });
  };
  
  // Handle permission change
  const handlePermissionChange = (event) => {
    setPermissions({
      ...permissions,
      [event.target.name]: event.target.checked
    });
  };
  
  // Handle file upload for protecting PDF
  const onProtectDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      
      if (pdfFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setFile(pdfFile);
      toast.success('PDF uploaded successfully');
    }
  }, []);
  
  const {
    getRootProps: getProtectRootProps,
    getInputProps: getProtectInputProps,
    isDragActive: isProtectDragActive,
  } = useDropzone({
    onDrop: onProtectDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });
  
  // Handle file upload for unlocking PDF
  const onUnlockDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const pdfFile = acceptedFiles[0];
      
      if (pdfFile.type !== 'application/pdf') {
        toast.error('Please upload a PDF file');
        return;
      }
      
      setFile(pdfFile);
      toast.success('Protected PDF uploaded successfully');
    }
  }, []);
  
  const {
    getRootProps: getUnlockRootProps,
    getInputProps: getUnlockInputProps,
    isDragActive: isUnlockDragActive,
  } = useDropzone({
    onDrop: onUnlockDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  });
  
  // Process PDF protection
  const handleProtectPDF = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to protect');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setError('Passwords do not match. Please enter matching passwords.');
      return;
    }
    
    if (password.length < 4) {
      toast.error('Password must be at least 4 characters long');
      setError('Please use a stronger password (minimum 4 characters)');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would call an API to protect the PDF
      setProcessedFile({
        url: '#', // Mock URL
        name: file.name,
        size: file.size,
        protected: true,
      });
      
      toast.success('PDF protected successfully!');
    } catch (err) {
      console.error('Error protecting PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to protect PDF');
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Process PDF unlocking
  const handleUnlockPDF = async () => {
    if (!file) {
      toast.error('Please upload a protected PDF file');
      return;
    }
    
    if (unlockPassword.length === 0) {
      toast.error('Please enter the PDF password');
      setError('Password is required to unlock the PDF');
      return;
    }
    
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate processing time with a longer delay to mimic password verification
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Simulate a random success/failure for demo purposes
      const isSuccessful = Math.random() > 0.3; // 70% chance of success
      
      if (isSuccessful) {
        setProcessedFile({
          url: '#', // Mock URL
          name: file.name,
          size: file.size,
          protected: false,
        });
        toast.success('PDF unlocked successfully!');
      } else {
        throw new Error('Incorrect password');
      }
    } catch (err) {
      console.error('Error unlocking PDF:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      toast.error(err.message || 'Failed to unlock PDF');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDownload = () => {
    toast.success('Downloading your PDF');
    // In a real app, this would initiate the download
  };
  
  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    resetFormFields();
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
  
  // Validation
  const canProtect = () => {
    return (
      file && 
      password &&
      password === confirmPassword &&
      password.length >= 4
    );
  };
  
  const canUnlock = () => {
    return file && unlockPassword.length > 0;
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
            {activeTab === 0 ? 'Protect PDF' : 'Unlock PDF'}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {activeTab === 0 
              ? 'Secure your PDF documents with password protection and permission controls'
              : 'Remove password protection from your PDF documents'
            }
          </Typography>
        </Box>

        {!processedFile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card sx={{ borderRadius: 4, mb: 4, overflow: 'visible' }}>
              <CardContent sx={{ p: 0 }}>
                <Tabs
                  value={activeTab}
                  onChange={handleTabChange}
                  variant="fullWidth"
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      py: 2.5,
                      fontWeight: 600,
                    },
                  }}
                >
                  <Tab 
                    icon={<LockIcon size={18} />} 
                    iconPosition="start"
                    label="Protect PDF" 
                    id="protect-pdf-tab-0"
                    aria-controls="protect-pdf-tabpanel-0" 
                  />
                  <Tab 
                    icon={<UnlockIcon size={18} />} 
                    iconPosition="start"
                    label="Unlock PDF" 
                    id="protect-pdf-tab-1"
                    aria-controls="protect-pdf-tabpanel-1" 
                  />
                </Tabs>

                {/* Protect PDF tab */}
                <TabPanel value={activeTab} index={0}>
                  {!file ? (
                    <Paper
                      {...getProtectRootProps()}
                      elevation={0}
                      variant="outlined"
                      sx={{
                        borderRadius: 4,
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: isProtectDragActive ? 'primary.main' : 'divider',
                        bgcolor: isProtectDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                        p: 6,
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <input {...getProtectInputProps()} />
                      
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
                        {isProtectDragActive
                          ? "Drop PDF here"
                          : "Drag & drop PDF file here"
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
                    </Paper>
                  ) : (
                    <Box>
                      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
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
                          <Typography variant="h6" noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                          </Typography>
                        </Box>
                        
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<RefreshIcon size={16} />}
                          onClick={handleReset}
                        >
                          Change
                        </Button>
                      </Box>
                      
                      <Divider sx={{ my: 3 }} />
                      
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Set Password Protection
                      </Typography>
                      
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Confirm Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={confirmPassword && password !== confirmPassword}
                            helperText={confirmPassword && password !== confirmPassword ? 'Passwords do not match' : ''}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </Grid>
                      
                      <Alert 
                        severity="info" 
                        icon={<InfoIcon size={18} />}
                        sx={{ mb: 4, borderRadius: 2 }}
                      >
                        Choose a strong password with a mix of letters, numbers, and symbols. Remember your password - it cannot be recovered if lost.
                      </Alert>
                      
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Set Document Permissions
                        <Tooltip title="These permissions control what users can do with your PDF even after entering the correct password">
                          <IconButton size="small" sx={{ ml: 1, color: 'text.secondary' }}>
                            <HelpCircleIcon size={16} />
                          </IconButton>
                        </Tooltip>
                      </Typography>
                      
                      <Card 
                        variant="outlined" 
                        sx={{ 
                          p: 3, 
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                          mb: 3,
                        }}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.printing} 
                                    onChange={handlePermissionChange} 
                                    name="printing" 
                                  />
                                }
                                label="Allow printing"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.copying} 
                                    onChange={handlePermissionChange} 
                                    name="copying" 
                                  />
                                }
                                label="Allow copying text and graphics"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.editing} 
                                    onChange={handlePermissionChange} 
                                    name="editing" 
                                  />
                                }
                                label="Allow document editing"
                              />
                            </FormGroup>
                          </Grid>
                          
                          <Grid item xs={12} md={6}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.commenting} 
                                    onChange={handlePermissionChange} 
                                    name="commenting" 
                                  />
                                }
                                label="Allow commenting"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.formFilling} 
                                    onChange={handlePermissionChange} 
                                    name="formFilling" 
                                  />
                                }
                                label="Allow form filling"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox 
                                    checked={permissions.contentExtraction} 
                                    onChange={handlePermissionChange} 
                                    name="contentExtraction" 
                                  />
                                }
                                label="Allow content extraction"
                              />
                            </FormGroup>
                          </Grid>
                        </Grid>
                      </Card>
                    </Box>
                  )}
                </TabPanel>

                {/* Unlock PDF tab */}
                <TabPanel value={activeTab} index={1}>
                  {!file ? (
                    <Paper
                      {...getUnlockRootProps()}
                      elevation={0}
                      variant="outlined"
                      sx={{
                        borderRadius: 4,
                        borderStyle: 'dashed',
                        borderWidth: 2,
                        borderColor: isUnlockDragActive ? 'primary.main' : 'divider',
                        bgcolor: isUnlockDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                        p: 6,
                        textAlign: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <input {...getUnlockInputProps()} />
                      
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
                        <LockIcon size={36} />
                      </Box>
                      
                      <Typography 
                        variant="h6" 
                        component={motion.div}
                        variants={itemVariants} 
                        gutterBottom
                      >
                        {isUnlockDragActive
                          ? "Drop protected PDF here"
                          : "Drag & drop password-protected PDF here"
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
                    </Paper>
                  ) : (
                    <Box>
                      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
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
                            position: 'relative',
                          }}
                        >
                          {/* <FilePdfIcon size={24} color={theme.palette.error.main} /> */}
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: -4,
                              right: -4,
                              bgcolor: 'warning.main',
                              borderRadius: '50%',
                              width: 20,
                              height: 20,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '2px solid white',
                            }}
                          >
                            <LockIcon size={10} color="white" />
                          </Box>
                        </Box>
                        
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" noWrap>
                            {file.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {(file.size / (1024 * 1024)).toFixed(2)} MB • Password Protected
                          </Typography>
                        </Box>
                        
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<RefreshIcon size={16} />}
                          onClick={handleReset}
                        >
                          Change
                        </Button>
                      </Box>
                      
                      <Divider sx={{ my: 3 }} />
                      
                      <Typography variant="h6" gutterBottom fontWeight={600}>
                        Enter Document Password
                      </Typography>
                      
                      <Box sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
                        <TextField
                          fullWidth
                          label="Password"
                          type={showUnlockPassword ? 'text' : 'password'}
                          value={unlockPassword}
                          onChange={(e) => setUnlockPassword(e.target.value)}
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <KeyIcon size={18} color={theme.palette.text.secondary} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowUnlockPassword(!showUnlockPassword)}
                                  edge="end"
                                >
                                  {showUnlockPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                        <Alert 
                          severity="warning" 
                          icon={<AlertCircleIcon size={18} />}
                          sx={{ borderRadius: 2 }}
                        >
                          Enter the correct password to remove protection. If you don't know the password, contact the document owner.
                        </Alert>
                      </Box>
                    </Box>
                  )}
                </TabPanel>
                
                {/* Action buttons for both tabs */}
                {file && (
                  <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                    {activeTab === 0 ? (
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <ShieldIcon />}
                        onClick={handleProtectPDF}
                        disabled={!canProtect() || isProcessing}
                        sx={{
                          py: 1.5,
                          borderRadius: 3,
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
                        {isProcessing ? 'Protecting PDF...' : 'Protect PDF'}
                      </Button>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <UnlockIcon />}
                        onClick={handleUnlockPDF}
                        disabled={!canUnlock() || isProcessing}
                        sx={{
                          py: 1.5,
                          borderRadius: 3,
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
                    )}
                  </Box>
                )}
              </CardContent>
            </Card>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {activeTab === 0 ? 'Protecting your PDF...' : 'Unlocking your PDF...'}
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
                      {activeTab === 0 ? 'PDF Protected Successfully' : 'PDF Unlocked Successfully'}
                    </Typography>
                    <Typography variant="body2">
                      {activeTab === 0 
                        ? 'Your PDF is now password protected and ready to download'
                        : 'Protection has been removed from your PDF'
                      }
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha(theme.palette.error.main, 0.1),
                      borderRadius: 2,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FilePdfIcon size={40} color={theme.palette.error.main} />
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        right: -10,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: activeTab === 0 ? 'primary.main' : 'success.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                      }}
                    >
                      {activeTab === 0 ? <LockIcon size={16} /> : <UnlockIcon size={16} />}
                    </Box>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {(processedFile.size / (1024 * 1024)).toFixed(2)} MB • {activeTab === 0 ? 'Password Protected' : 'Unlocked'} • {new Date().toLocaleString()}
                  </Typography>
                  
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<DownloadIcon />}
                    onClick={handleDownload}
                    sx={{
                      px: 4,
                      borderRadius: '50px',
                    }}
                  >
                    Download PDF
                  </Button>
                </Box>
                
                <Divider />
                
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Button
                    variant="text"
                    onClick={handleReset}
                    startIcon={activeTab === 0 ? <ShieldIcon size={16} /> : <UnlockIcon size={16} />}
                    color="primary"
                  >
                    {activeTab === 0 ? 'Protect Another PDF' : 'Unlock Another PDF'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Info Section */}
        <Box sx={{ mt: 8 }}>
          <Divider sx={{ mb: 4 }} />
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom fontWeight={700}>
                {activeTab === 0 ? 'How to Protect a PDF' : 'How to Unlock a PDF'}
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {(activeTab === 0 ? [
                  {
                    title: 'Upload your file',
                    description: 'Drag and drop your PDF file into the upload area or click to browse your files.'
                  },
                  {
                    title: 'Set password',
                    description: 'Enter a strong password and confirm it to protect your PDF document.'
                  },
                  {
                    title: 'Choose permissions',
                    description: 'Select which actions should be allowed (printing, editing, copying, etc).'
                  },
                  {
                    title: 'Protect and download',
                    description: 'Click "Protect PDF" and download your password-protected document.'
                  }
                ] : [
                  {
                    title: 'Upload protected PDF',
                    description: 'Drag and drop your password-protected PDF into the upload area.'
                  },
                  {
                    title: 'Enter password',
                    description: 'Enter the correct password that was used to protect the document.'
                  },
                  {
                    title: 'Unlock and download',
                    description: 'Click "Unlock PDF" and download your unprotected document.'
                  },
                  {
                    title: 'Verify removal',
                    description: 'Open the downloaded PDF to confirm protection has been successfully removed.'
                  }
                ]).map((step, index) => (
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
                {activeTab === 0 ? 'Security Tips' : 'Troubleshooting'}
              </Typography>
              
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  p: 3,
                  height: '100%',
                }}
              >
                {activeTab === 0 ? (
                  <Box>
                    <Alert 
                      severity="info" 
                      icon={<InfoIcon size={20} />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        PDF Security Levels
                      </Typography>
                      <Typography variant="body2">
                        Our system uses strong 256-bit AES encryption to secure your documents.
                      </Typography>
                    </Alert>
                    
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Best Practices:
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Use a strong password with a mix of letters, numbers, and symbols
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Don't use personally identifiable information in your password
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        Store your password securely - we cannot recover it if lost
                      </Typography>
                      <Typography component="li" variant="body2">
                        Consider limiting permissions based on your security needs
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    <Alert 
                      severity="warning" 
                      icon={<AlertCircleIcon size={20} />}
                      sx={{ mb: 3, borderRadius: 2 }}
                    >
                      <Typography variant="subtitle2" fontWeight={600}>
                        Cannot Unlock Without Password
                      </Typography>
                      <Typography variant="body2">
                        Our tool requires the correct password to unlock a PDF. We cannot bypass security measures.
                      </Typography>
                    </Alert>
                    
                    <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                      Common Issues:
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" fontWeight={600}>Incorrect password:</Box> Double-check for typos and case sensitivity
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" fontWeight={600}>Unknown password:</Box> Contact the document creator for the password
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                        <Box component="span" fontWeight={600}>Complex encryption:</Box> Some enterprise PDFs use additional security that our tool cannot process
                      </Typography>
                      <Typography component="li" variant="body2">
                        <Box component="span" fontWeight={600}>Corrupt file:</Box> Try redownloading the original PDF if possible
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ProtectPDFPage;