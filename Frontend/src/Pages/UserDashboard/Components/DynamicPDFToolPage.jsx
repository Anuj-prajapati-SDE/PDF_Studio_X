import React, { useState, useCallback, useEffect } from 'react';
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
  Container,
  Divider,
  LinearProgress,
  Alert,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Switch,
  Chip,
  Tooltip,
  IconButton,
  useTheme,
  alpha,
  AlertTitle,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  PictureAsPdf as FilePdfIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Warning as AlertCircleIcon,
  Info as InfoIcon,
  Bolt as ZapIcon,
  Compress as CompressIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  AutoAwesome as AutoAwesomeIcon,
  Tune as TuneIcon,
  Description as FileTextIcon,
} from '@mui/icons-material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import axios from 'axios';
import { getApiUrl } from '../../../utils/api';

// Configuration-driven dynamic component for PDF tools
const DynamicPDFToolPage = ({ config }) => {
  const theme = useTheme();
  
  // Core state management
  const [file, setFile] = useState(null);
  const [settings, setSettings] = useState(config.defaultSettings || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Animation hooks
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // File upload handler
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const uploadedFile = acceptedFiles[0];
      
      // Check file type based on configuration
      const acceptedTypes = config.acceptedFileTypes || { 'application/pdf': ['.pdf'] };
      const fileTypeValid = Object.keys(acceptedTypes).some(type => 
        uploadedFile.type === type || uploadedFile.type.startsWith(type)
      );
      
      if (!fileTypeValid) {
        const expectedFormats = Object.values(acceptedTypes).flat().join(', ');
        toast.error(`Please upload a valid file format: ${expectedFormats}`);
        return;
      }
      
      setFile({
        file: uploadedFile,
        preview: URL.createObjectURL(uploadedFile),
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      });
      toast.success(config.messages?.uploadSuccess || 'File uploaded successfully');
      setProcessedFile(null);
      setError(null);
    }
  }, [config.messages, config.acceptedFileTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: config.acceptedFileTypes || {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: config.maxFileSize || 50 * 1024 * 1024, // Default 50MB
  });

  // Settings handlers
  const handleSettingChange = (settingKey, value) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: value
    }));
  };

  // Main processing function
  const handleProcess = async () => {
    if (!file) {
      const fileType = config.acceptedFileTypes ? 
        (Object.keys(config.acceptedFileTypes)[0].includes('word') ? 'document' : 'file') : 
        'PDF file';
      toast.error(`Please upload a ${fileType} to ${config.actionName?.toLowerCase()}`);
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Call the configured processing function
      const result = await config.processFunction(file.file, settings);
      
      if (result.success) {
        setProcessedFile(result.data);
        toast.success(result.message || config.messages?.processSuccess);
      } else {
        setError(result.message || config.messages?.processError);
        toast.error(result.message || config.messages?.processError);
      }
    } catch (err) {
      console.error(`Error processing PDF:`, err);
      const errorMessage = config.messages?.processError || 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (config.downloadFunction) {
      config.downloadFunction(processedFile);
    } else {
      toast.success(config.messages?.downloadSuccess || 'Downloading your processed PDF');
    }
  };

  const handleReset = () => {
    if (file?.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setProcessedFile(null);
    setError(null);
    setSettings(config.defaultSettings || {});
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get appropriate file icon based on file type
  const getFileIcon = () => {
    if (!file) return <FilePdfIcon sx={{ color: 'white', fontSize: 24 }} />;
    
    const fileType = file.file.type;
    const fileName = file.file.name.toLowerCase();
    
    if (fileType.includes('word') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return <FileTextIcon sx={{ color: 'white', fontSize: 24 }} />;
    }
    
    return <FilePdfIcon sx={{ color: 'white', fontSize: 24 }} />;
  };

  // Render settings based on configuration
  const renderSettings = () => {
    if (!config.settings) return null;

    return config.settings.map((setting, index) => {
      // Check conditional display
      if (setting.conditionalDisplay && !setting.conditionalDisplay(settings)) {
        return null;
      }

      switch (setting.type) {
        case 'slider':
          return (
            <Box key={index} sx={{ mb: 4 }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {setting.label}
                </Typography>
                {setting.showValue && (
                  <Typography variant="body2" sx={{ color: config.theme?.primary || '#7df9ff', fontWeight: 600 }}>
                    {settings[setting.key]}{setting.unit || ''}
                  </Typography>
                )}
              </Stack>
              <Slider
                value={settings[setting.key] || setting.defaultValue}
                onChange={(_, value) => handleSettingChange(setting.key, value)}
                min={setting.min || 0}
                max={setting.max || 100}
                step={setting.step || 1}
                marks={setting.marks}
                sx={{
                  mt: 2,
                  color: config.theme?.primary || '#7df9ff',
                  '& .MuiSlider-track': {
                    background: setting.gradient || `linear-gradient(135deg, ${config.theme?.primary || '#7df9ff'} 0%, ${config.theme?.secondary || '#60a5fa'} 100%)`,
                    border: 'none',
                    height: 6,
                  },
                  '& .MuiSlider-thumb': {
                    background: setting.gradient || `linear-gradient(135deg, ${config.theme?.primary || '#7df9ff'} 0%, ${config.theme?.secondary || '#60a5fa'} 100%)`,
                    border: `2px solid ${config.theme?.primary || '#7df9ff'}`,
                    boxShadow: `0 4px 12px ${config.theme?.primary || '#7df9ff'}40`,
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: `0 0 0 8px ${config.theme?.primary || '#7df9ff'}20`,
                    },
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              />
              {setting.description && (
                <Typography variant="caption" sx={{ 
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: { xs: '0.75rem', md: '0.8rem' }
                }}>
                  {setting.description}
                </Typography>
              )}
            </Box>
          );

        case 'switch':
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={settings[setting.key] || setting.defaultValue} 
                    onChange={(e) => handleSettingChange(setting.key, e.target.checked)}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: config.theme?.primary || '#7df9ff',
                        '& + .MuiSwitch-track': {
                          backgroundColor: config.theme?.primary || '#7df9ff',
                        },
                      },
                      '& .MuiSwitch-track': {
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                    {setting.label}
                  </Typography>
                }
              />
            </Box>
          );

        case 'select':
          return (
            <Box key={index} sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  {setting.label}
                </InputLabel>
                <Select
                  value={settings[setting.key] || setting.defaultValue}
                  onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                  sx={{
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: config.theme?.primary || '#7df9ff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: config.theme?.primary || '#7df9ff',
                    },
                  }}
                >
                  {setting.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          );

        default:
          return null;
      }
    });
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      overflow: 'hidden',
      bgcolor: config.theme?.background || '#030018',
      color: 'white',
      minHeight: '100vh',
    }}>
      {/* Premium animated background */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          right: '-10%',
          bottom: '-20%',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        {/* Animated particles */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={`particle-${i}`}
            component={motion.div}
            initial={{
              x: Math.random() * 400 - 200,
              y: Math.random() * 400 - 200,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              opacity: Math.random() * 0.3 + 0.1,
              scale: Math.random() * 0.5 + 0.3,
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 20 + i * 5,
              ease: 'linear',
            }}
            sx={{
              position: 'absolute',
              top: `${20 + i * 10}%`,
              left: `${10 + i * 12}%`,
              width: 60,
              height: 60,
              background: i % 3 === 0 
                ? 'linear-gradient(135deg, rgba(125, 249, 255, 0.1) 0%, rgba(104, 54, 230, 0.1) 100%)'
                : i % 3 === 1
                ? 'linear-gradient(135deg, rgba(104, 54, 230, 0.1) 0%, rgba(230, 54, 189, 0.1) 100%)'
                : 'linear-gradient(135deg, rgba(230, 54, 189, 0.1) 0%, rgba(255, 214, 10, 0.1) 100%)',
              borderRadius: '50%',
              filter: 'blur(20px)',
            }}
          />
        ))}
      </Box>

      {/* Lens flare effect */}
      <Box
        component={motion.div}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '25rem',
          height: '25rem',
          background: `radial-gradient(circle, ${config.theme?.primary || 'rgba(125, 249, 255, 0.3)'} 0%, rgba(125, 249, 255, 0) 70%)`,
          filter: 'blur(80px)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hero Header */}
          <Box sx={{ 
            mb: { xs: 4, md: 6 }, 
            textAlign: { xs: 'center', md: 'left' },
            maxWidth: { xs: '100%', md: '800px' } 
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Typography 
                variant="h2" 
                component="h1"   
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                  lineHeight: { xs: 1.2, md: 1.1 },
                  mb: { xs: 2, md: 3 },
                  background: config.titleGradient || 'linear-gradient(90deg, #ffffff, #7df9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                }}
              >
                {config.title}
              </Typography>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Typography 
                variant="h6" 
                sx={{
                  mb: { xs: 3, md: 4 },
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  lineHeight: 1.6,
                  maxWidth: '600px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                {config.description}
              </Typography>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Sidebar - Tool Info */}
          <Grid item xs={12} lg={4} xl={3}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Card sx={{ 
                borderRadius: '20px', 
                mb: { xs: 3, lg: 4 }, 
                position: { lg: 'sticky' }, 
                top: '100px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
              }}>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Stack direction="row" alignItems="center" sx={{ mb: 3 }}>
                    <Avatar sx={{ 
                      bgcolor: config.theme?.iconBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                      background: config.theme?.iconBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                      width: 48, 
                      height: 48,
                      mr: 2,
                      boxShadow: `0 8px 25px ${config.theme?.primary || 'rgba(104, 54, 230, 0.3)'}`,
                    }}>
                      {config.icon || <CompressIcon sx={{ fontSize: 24, color: 'white' }} />}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}>
                        {config.toolName}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        {config.toolDescription}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  {config.steps && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 2,
                        fontWeight: 600 
                      }}>
                        How it works:
                      </Typography>
                      <Stack spacing={2}>
                        {config.steps.map((step, index) => (
                          <Stack key={index} direction="row" spacing={2} alignItems="center">
                            <Box sx={{
                              width: 24,
                              height: 24,
                              borderRadius: '50%',
                              background: step.color || `linear-gradient(135deg, ${config.theme?.primary || '#7df9ff'} 0%, ${config.theme?.secondary || '#60a5fa'} 100%)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <Typography variant="caption" sx={{ color: 'white', fontWeight: 'bold' }}>
                                {index + 1}
                              </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {step.text}
                            </Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </Box>
                  )}
                  
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: '12px',
                      background: `rgba(125, 249, 255, 0.1)`,
                      border: `1px solid rgba(125, 249, 255, 0.2)`,
                    }}
                  >
                    <Typography variant="caption" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      display: 'block',
                      mb: 1
                    }}>
                      Current Status:
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      <Chip 
                        label={file ? '1 File Ready' : 'No File'}
                        size="small"
                        sx={{ 
                          bgcolor: file ? 'rgba(125, 249, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                          color: file ? '#7df9ff' : 'white',
                          fontWeight: 500,
                        }}
                      />
                      <Chip 
                        label={file ? 'Ready to Process' : 'Upload PDF'}
                        size="small"
                        sx={{ 
                          bgcolor: file ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: file ? '#22c55e' : '#ef4444',
                        }}
                      />
                    </Stack>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>

          {/* Main Content Area */}
          <Grid item xs={12} lg={8} xl={9}>
            {!processedFile ? (
              <>
                {/* Upload Area */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  {!file ? (
                    <Card
                      sx={{
                        borderRadius: '24px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(20px)',
                        border: isDragActive 
                          ? `2px dashed ${config.theme?.primary || '#7df9ff'}` 
                          : '2px dashed rgba(255, 255, 255, 0.1)',
                        boxShadow: isDragActive
                          ? `0 20px 40px ${config.theme?.primary || 'rgba(125, 249, 255, 0.2)'}`
                          : '0 15px 35px rgba(0, 0, 0, 0.2)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: `rgba(125, 249, 255, 0.5)`,
                          background: 'rgba(125, 249, 255, 0.02)',
                          boxShadow: '0 25px 50px rgba(125, 249, 255, 0.15)',
                        },
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      
                      <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                        <Box
                          component={motion.div}
                          animate={{
                            y: isDragActive ? -10 : [0, -5, 0],
                            scale: isDragActive ? 1.1 : [1, 1.05, 1],
                          }}
                          transition={{
                            duration: isDragActive ? 0.3 : 2,
                            repeat: isDragActive ? 0 : Infinity,
                            ease: 'easeInOut',
                          }}
                          sx={{
                            width: { xs: 80, md: 100 },
                            height: { xs: 80, md: 100 },
                            borderRadius: '50%',
                            background: config.theme?.iconBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: { xs: 3, md: 4 },
                            mx: 'auto',
                            boxShadow: `0 15px 35px ${config.theme?.primary || 'rgba(104, 54, 230, 0.4)'}`,
                          }}
                        >
                          <UploadIcon sx={{ fontSize: { xs: 32, md: 40 } }} />
                        </Box>
                        
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            mb: { xs: 2, md: 3 },
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                          }}
                        >
                          {isDragActive
                            ? 'Drop PDF file here'
                            : config.uploadTitle || 'Upload PDF File'
                          }
                        </Typography>
                        
                        <Typography 
                          variant="body1" 
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            mb: { xs: 3, md: 4 },
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            maxWidth: '500px',
                            mx: 'auto',
                            lineHeight: 1.6,
                          }}
                        >
                          {config.uploadDescription || 'Drag & drop your PDF file here or browse files from your device'}
                        </Typography>
                        
                        <Chip 
                          label={`Supported: PDF files (max ${Math.floor((config.maxFileSize || 50 * 1024 * 1024) / (1024 * 1024))}MB)`} 
                          size="small" 
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            px: 1,
                            fontSize: { xs: '0.75rem', md: '0.8rem' },
                          }}
                        />
                      </CardContent>
                    </Card>
                  ) : (
                    /* File Uploaded - Settings Panel */
                    <Card
                      sx={{
                        borderRadius: '20px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                        {/* File Info */}
                        <Box sx={{ mb: 4, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', pb: 3 }}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar sx={{ 
                              bgcolor: config.theme?.primary || '#7df9ff',
                              width: 48,
                              height: 48,
                            }}>
                              {getFileIcon()}
                            </Avatar>
                            
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" sx={{ 
                                color: 'white', 
                                fontWeight: 500,
                                fontSize: { xs: '1rem', md: '1.1rem' },
                                mb: 0.5,
                              }}>
                                {file.file.name}
                              </Typography>
                              <Typography variant="body2" sx={{ 
                                color: 'rgba(255, 255, 255, 0.6)',
                                fontSize: { xs: '0.8rem', md: '0.9rem' }
                              }}>
                                {formatFileSize(file.file.size)}
                              </Typography>
                            </Box>
                            
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={handleReset}
                              startIcon={<RefreshIcon />}
                              sx={{
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                color: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '12px',
                                '&:hover': {
                                  borderColor: config.theme?.primary || '#7df9ff',
                                  color: config.theme?.primary || '#7df9ff',
                                },
                              }}
                            >
                              Change File
                            </Button>
                          </Stack>
                        </Box>
                        
                        {/* Dynamic Settings */}
                        {config.settings && config.settings.length > 0 && (
                          <>
                            <Typography variant="h6" sx={{ 
                              color: 'white', 
                              fontWeight: 600, 
                              mb: 3,
                              fontSize: { xs: '1.1rem', md: '1.2rem' }
                            }}>
                              {config.settingsTitle || 'Settings'}
                            </Typography>
                            
                            {renderSettings()}
                          </>
                        )}
                        
                        {config.alerts && config.alerts.length > 0 && (
                          <Stack spacing={2} sx={{ mt: 3 }}>
                            {config.alerts.map((alert, index) => (
                              <Alert 
                                key={index}
                                severity={alert.type || "info"} 
                                icon={<InfoIcon />}
                                sx={{ 
                                  borderRadius: '12px',
                                  bgcolor: `rgba(59, 130, 246, 0.1)`,
                                  border: `1px solid rgba(59, 130, 246, 0.2)`,
                                  color: config.theme?.primary || '#7df9ff',
                                  '& .MuiAlert-icon': {
                                    color: config.theme?.primary || '#7df9ff',
                                  },
                                }}
                              >
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                                  {alert.message}
                                </Typography>
                              </Alert>
                            ))}
                          </Stack>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </motion.div>

                {/* Processing Progress */}
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        borderRadius: '20px',
                        mb: { xs: 3, md: 4 },
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                        <Box
                          component={motion.div}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            background: config.theme?.iconBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            mx: 'auto',
                            boxShadow: `0 15px 35px ${config.theme?.primary || 'rgba(104, 54, 230, 0.4)'}`,
                          }}
                        >
                          <SettingsIcon sx={{ fontSize: 28 }} />
                        </Box>
                        
                        <Typography variant="h6" sx={{ 
                          color: 'white', 
                          fontWeight: 600, 
                          mb: 2,
                          fontSize: { xs: '1rem', md: '1.1rem' }
                        }}>
                          {config.processingMessage || 'Processing PDF File...'}
                        </Typography>
                        
                        <Typography variant="body2" sx={{ 
                          color: 'rgba(255, 255, 255, 0.7)', 
                          mb: 3 
                        }}>
                          {config.processingDescription || 'Please wait while we process your file'}
                        </Typography>
                        
                        <LinearProgress
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              background: config.theme?.iconBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                              borderRadius: 4,
                            },
                          }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Action Button */}
                {file && !isProcessing && !processedFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <Stack 
                      direction={{ xs: 'column', sm: 'row' }} 
                      spacing={2} 
                      justifyContent="center"
                      sx={{ mb: 4 }}
                    >
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleProcess}
                        startIcon={config.actionIcon || <CompressIcon />}
                        sx={{
                          background: config.theme?.buttonBackground || 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
                          borderRadius: '16px',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          boxShadow: `0 12px 30px ${config.theme?.primary || 'rgba(104, 54, 230, 0.3)'}`,
                          minWidth: { xs: '100%', sm: '200px' },
                          '&:hover': {
                            boxShadow: `0 20px 40px ${config.theme?.primary || 'rgba(104, 54, 230, 0.4)'}`,
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {config.actionName || 'Process PDF'}
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={handleReset}
                        startIcon={<RefreshIcon />}
                        sx={{
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          borderRadius: '16px',
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          px: { xs: 4, md: 6 },
                          py: { xs: 1.5, md: 2 },
                          textTransform: 'none',
                          minWidth: { xs: '100%', sm: '140px' },
                          '&:hover': {
                            borderColor: config.theme?.primary || '#7df9ff',
                            color: config.theme?.primary || '#7df9ff',
                            bgcolor: `rgba(125, 249, 255, 0.05)`,
                          },
                        }}
                      >
                        Clear
                      </Button>
                    </Stack>
                  </motion.div>
                )}

                {/* Error Display */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert 
                      severity="error" 
                      sx={{
                        borderRadius: '12px',
                        bgcolor: 'rgba(255, 68, 68, 0.1)',
                        border: '1px solid rgba(255, 68, 68, 0.2)',
                        color: '#ff6b6b',
                        mb: 4,
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}
              </>
            ) : (
              /* Success Result */
              config.renderResult ? config.renderResult(processedFile, handleDownload, handleReset) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Card
                    sx={{
                      borderRadius: '20px',
                      mb: { xs: 3, md: 4 },
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                      overflow: 'hidden'
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 4 }, textAlign: 'center' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          mb: 3,
                          mx: 'auto',
                        }}
                      >
                        <CheckIcon sx={{ fontSize: 24 }} />
                      </Box>
                      
                      <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
                        {config.successTitle || 'Processing Complete!'}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        mb: 4 
                      }}>
                        {config.successMessage || 'Your PDF file has been processed successfully'}
                      </Typography>
                      
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                        sx={{ 
                          px: { xs: 4, md: 6 }, 
                          py: { xs: 1.5, md: 2 },
                          borderRadius: '16px',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          textTransform: 'none',
                          boxShadow: '0 12px 30px rgba(34, 197, 94, 0.3)',
                          minWidth: { xs: '200px', sm: '250px' },
                          mb: 3,
                          '&:hover': {
                            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.4)',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Download Result
                      </Button>
                      
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                          variant="outlined"
                          startIcon={<RefreshIcon />}
                          onClick={handleReset}
                          sx={{
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            color: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '12px',
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: config.theme?.primary || '#7df9ff',
                              color: config.theme?.primary || '#7df9ff',
                              bgcolor: 'rgba(125, 249, 255, 0.05)',
                            },
                          }}
                        >
                          Process Another
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            )}

            {/* Features Section */}
            {config.features && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: { xs: 2, md: 4 } }}>
                  {config.features.map((feature, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4}>
                      <Card
                        sx={{
                          borderRadius: '16px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          p: 3,
                          textAlign: 'center',
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.05)',
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 56,
                            height: 56,
                            background: feature.iconBackground || `linear-gradient(135deg, ${config.theme?.primary || '#7df9ff'} 0%, ${config.theme?.secondary || '#60a5fa'} 100%)`,
                            mb: 2,
                            mx: 'auto',
                          }}
                        >
                          {feature.icon || <StarIcon sx={{ fontSize: 28, color: 'white' }} />}
                        </Avatar>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {feature.description}
                        </Typography>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            )}

            {/* How It Works Section */}
            {config.howItWorks && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <Card
                  sx={{
                    borderRadius: '20px',
                    mt: { xs: 4, md: 6 },
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="h5" sx={{ 
                      color: 'white', 
                      fontWeight: 700, 
                      mb: 4,
                      textAlign: 'center'
                    }}>
                      {config.howItWorks.title || 'How It Works'}
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {config.howItWorks.steps.map((step, index) => (
                        <Grid key={index} item xs={12} sm={6} md={3}>
                          <Box sx={{ textAlign: 'center' }}>
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                background: step.background || `linear-gradient(135deg, ${config.theme?.primary || '#7df9ff'} 0%, ${config.theme?.secondary || '#60a5fa'} 100%)`,
                                mb: 2,
                                mx: 'auto',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                              }}
                            >
                              {index + 1}
                            </Avatar>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {step.description}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DynamicPDFToolPage;