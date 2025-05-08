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
  TextField,
  Slider,
  useTheme,
  alpha,
} from '@mui/material';
// import {FilePdf as FilePdfIcon} from 'react-feather';
import {
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Zap as ZapIcon,
  Edit3 as WatermarkIcon,
  Image as ImageIcon,
} from 'react-feather';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const WatermarkPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [watermarkOptions, setWatermarkOptions] = useState({
    type: 'text', // 'text' or 'image'
    text: 'CONFIDENTIAL',
    textColor: '#FF0000',
    opacity: 30,
    fontSize: 48,
    angle: 45,
    position: 'center',
    pages: 'all',
    imageFile: null,
    imagePreview: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Current date and time
  const currentDateTime = "2025-05-04 06:46:59";
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

  // For uploading watermark image
  const onDropWatermarkImage = useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      const imageFile = acceptedFiles[0];
      
      if (!imageFile.type.startsWith('image/')) {
        toast.error('Please upload an image file (JPG, PNG, etc.)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = () => {
        setWatermarkOptions({
          ...watermarkOptions,
          imageFile: imageFile,
          imagePreview: reader.result,
        });
        toast.success('Watermark image uploaded');
      };
      reader.readAsDataURL(imageFile);
    }
  }, [watermarkOptions]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const { getRootProps: getWatermarkImageRootProps, getInputProps: getWatermarkImageInputProps } = useDropzone({
    onDrop: onDropWatermarkImage,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/svg+xml': ['.svg'],
      'image/webp': ['.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const handleOptionChange = (name) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setWatermarkOptions({
      ...watermarkOptions,
      [name]: value,
    });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setWatermarkOptions({
      ...watermarkOptions,
      [name]: newValue,
    });
  };

  const handleClearImageWatermark = () => {
    setWatermarkOptions({
      ...watermarkOptions,
      imageFile: null,
      imagePreview: null,
    });
  };

  const handleWatermark = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to watermark');
      return;
    }
    
    if (watermarkOptions.type === 'text' && !watermarkOptions.text.trim()) {
      toast.error('Please enter watermark text');
      return;
    }
    
    if (watermarkOptions.type === 'image' && !watermarkOptions.imageFile) {
      toast.error('Please upload a watermark image');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate PDF watermarking process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setProcessedFile({
        name: file.name.replace('.pdf', '_watermarked.pdf'),
        size: file.size * 1.05, // Slightly larger due to watermark
        url: '#', // Mock URL
        watermarkType: watermarkOptions.type,
        watermarkText: watermarkOptions.text,
        pages: watermarkOptions.pages === 'all' 
          ? 'All pages' 
          : watermarkOptions.pages === 'first' 
            ? 'First page only' 
            : 'Last page only',
      });
      
      toast.success('PDF watermarked successfully!');
    } catch (err) {
      console.error('Error watermarking PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to watermark PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your watermarked PDF');
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
                Add Watermark to PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add text or image watermarks to your PDF documents
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
                        Select the PDF you want to add a watermark to
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
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                          
                          <Box
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              p: 2,
                              mb: 3,
                              bgcolor: alpha(theme.palette.background.default, 0.5),
                              position: 'relative',
                              height: 240,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              overflow: 'hidden',
                            }}
                          >
                            {/* PDF preview mockup */}
                            <Box 
                              sx={{ 
                                position: 'relative',
                                width: '80%',
                                height: '90%',
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: alpha(theme.palette.text.primary, 0.1),
                                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              {/* <FilePdfIcon 
                                size={40} 
                                color={alpha(theme.palette.text.primary, 0.1)}
                              /> */}
                              
                              {/* Watermark preview */}
                              {watermarkOptions.type === 'text' && (
                                <Typography
                                  variant="h4"
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${watermarkOptions.angle}deg)`,
                                    color: watermarkOptions.textColor,
                                    opacity: watermarkOptions.opacity / 100,
                                    fontSize: `${watermarkOptions.fontSize}px`,
                                    fontWeight: 'bold',
                                    whiteSpace: 'nowrap',
                                    userSelect: 'none',
                                    textTransform: 'uppercase',
                                  }}
                                >
                                  {watermarkOptions.text}
                                </Typography>
                              )}
                              
                              {watermarkOptions.type === 'image' && watermarkOptions.imagePreview && (
                                <Box
                                  component="img"
                                  src={watermarkOptions.imagePreview}
                                  alt="Watermark preview"
                                  sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${watermarkOptions.angle}deg)`,
                                    maxWidth: '70%',
                                    maxHeight: '70%',
                                    opacity: watermarkOptions.opacity / 100,
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                          
                          <Alert 
                            severity="info" 
                            icon={<InfoIcon size={18} />}
                            sx={{ mt: 'auto', mb: 0, borderRadius: 2 }}
                          >
                            <Typography variant="body2">
                              Preview shows an approximate representation of the watermark. The actual placement may vary slightly in the final PDF.
                            </Typography>
                          </Alert>
                        </Box>
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
                        Watermark Settings
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Customize how your watermark will appear
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3 }}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Watermark Type</FormLabel>
                        <RadioGroup
                          row
                          value={watermarkOptions.type}
                          onChange={handleOptionChange('type')}
                          sx={{ mb: 3 }}
                        >
                          <FormControlLabel value="text" control={<Radio />} label="Text" />
                          <FormControlLabel value="image" control={<Radio />} label="Image" />
                        </RadioGroup>
                      </FormControl>
                      
                      {watermarkOptions.type === 'text' ? (
                        <Box sx={{ mb: 3 }}>
                          <TextField
                            label="Watermark Text"
                            fullWidth
                            value={watermarkOptions.text}
                            onChange={handleOptionChange('text')}
                            sx={{ mb: 3 }}
                            placeholder="e.g., CONFIDENTIAL, DRAFT, etc."
                          />
                          
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <FormControl fullWidth>
                                <InputLabel id="text-color-label">Text Color</InputLabel>
                                <Select
                                  labelId="text-color-label"
                                  id="text-color"
                                  value={watermarkOptions.textColor}
                                  onChange={handleOptionChange('textColor')}
                                  label="Text Color"
                                >
                                  <MenuItem value="#FF0000">Red</MenuItem>
                                  <MenuItem value="#000000">Black</MenuItem>
                                  <MenuItem value="#0000FF">Blue</MenuItem>
                                  <MenuItem value="#808080">Gray</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ width: '100%' }}>
                                <Typography variant="body2" gutterBottom>
                                  Font Size: {watermarkOptions.fontSize}px
                                </Typography>
                                <Slider
                                  value={watermarkOptions.fontSize}
                                  onChange={handleSliderChange('fontSize')}
                                  min={12}
                                  max={96}
                                  marks={[
                                    { value: 12, label: '12px' },
                                    { value: 48, label: '48px' },
                                    { value: 96, label: '96px' },
                                  ]}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      ) : (
                        <Box sx={{ mb: 3 }}>
                          {!watermarkOptions.imageFile ? (
                            <Paper
                              {...getWatermarkImageRootProps()}
                              elevation={0}
                              variant="outlined"
                              sx={{
                                borderRadius: 2,
                                borderStyle: 'dashed',
                                borderWidth: 2,
                                borderColor: 'divider',
                                bgcolor: alpha(theme.palette.background.default, 0.5),
                                p: 3,
                                textAlign: 'center',
                                cursor: 'pointer',
                                mb: 3,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: 'primary.main',
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                }
                              }}
                            >
                              <input {...getWatermarkImageInputProps()} />
                              <ImageIcon size={36} color={theme.palette.text.secondary} />
                              <Typography variant="body1" sx={{ mt: 1 }}>
                                Upload a watermark image
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                PNG or JPG with transparency recommended
                              </Typography>
                            </Paper>
                          ) : (
                            <Box sx={{ mb: 3 }}>
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  p: 2,
                                  border: '1px solid',
                                  borderColor: 'divider',
                                  borderRadius: 2,
                                  mb: 2,
                                }}
                              >
                                <Box
                                  component="img"
                                  src={watermarkOptions.imagePreview}
                                  alt="Watermark image"
                                  sx={{
                                    height: 60,
                                    maxWidth: 120,
                                    objectFit: 'contain',
                                    mr: 2,
                                  }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography variant="body2" noWrap>
                                    {watermarkOptions.imageFile.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {formatFileSize(watermarkOptions.imageFile.size)}
                                  </Typography>
                                </Box>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  color="error"
                                  onClick={handleClearImageWatermark}
                                >
                                  Change
                                </Button>
                              </Box>
                            </Box>
                          )}
                        </Box>
                      )}
                      
                      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                        Watermark Appearance
                      </Typography>
                      
                      <Grid container spacing={3} sx={{ mb: 3 }}>
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            Opacity: {watermarkOptions.opacity}%
                          </Typography>
                          <Slider
                            value={watermarkOptions.opacity}
                            onChange={handleSliderChange('opacity')}
                            min={10}
                            max={100}
                          />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <Typography variant="body2" gutterBottom>
                            Rotation Angle: {watermarkOptions.angle}°
                          </Typography>
                          <Slider
                            value={watermarkOptions.angle}
                            onChange={handleSliderChange('angle')}
                            min={0}
                            max={359}
                            marks={[
                              { value: 0, label: '0°' },
                              { value: 90, label: '90°' },
                              { value: 180, label: '180°' },
                              { value: 270, label: '270°' },
                            ]}
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel id="position-label">Position</InputLabel>
                            <Select
                              labelId="position-label"
                              id="position"
                              value={watermarkOptions.position}
                              onChange={handleOptionChange('position')}
                              label="Position"
                            >
                              <MenuItem value="center">Center (Default)</MenuItem>
                              <MenuItem value="top-left">Top Left</MenuItem>
                              <MenuItem value="top-right">Top Right</MenuItem>
                              <MenuItem value="bottom-left">Bottom Left</MenuItem>
                              <MenuItem value="bottom-right">Bottom Right</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth>
                            <InputLabel id="pages-label">Apply To Pages</InputLabel>
                            <Select
                              labelId="pages-label"
                              id="pages"
                              value={watermarkOptions.pages}
                              onChange={handleOptionChange('pages')}
                              label="Apply To Pages"
                            >
                              <MenuItem value="all">All Pages</MenuItem>
                              <MenuItem value="first">First Page Only</MenuItem>
                              <MenuItem value="last">Last Page Only</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                      <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <WatermarkIcon size={16} />}
                        onClick={handleWatermark}
                        disabled={isProcessing || !file || (watermarkOptions.type === 'image' && !watermarkOptions.imageFile)}
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
                        {isProcessing ? 'Adding Watermark...' : 'Add Watermark'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Adding watermark to your PDF...
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
                      Watermark Added Successfully!
                    </Typography>
                    <Typography variant="body2">
                      Your PDF has been watermarked and is ready to download
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
                          backgroundColor: alpha(theme.palette.background.default, 0.5),
                          borderRadius: 2,
                          display: 'flex',
                          flexDirection: 'column',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          position: 'relative',
                          mb: 2,
                        }}
                      >
                        {/* Mock PDF display with watermark */}
                        <Box 
                          sx={{ 
                            flex: 1,
                            backgroundColor: 'background.paper',
                            p: 2,
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderColor: alpha(theme.palette.divider, 0.5),
                            m: 2,
                            borderRadius: 1,
                          }}
                        >
                          {/* <FilePdfIcon 
                            size={48} 
                            color={alpha(theme.palette.text.primary, 0.1)}
                          />
                           */}
                          {/* Simplified watermark preview */}
                          {processedFile.watermarkType === 'text' && (
                            <Typography
                              variant="h4"
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${watermarkOptions.angle}deg)`,
                                color: watermarkOptions.textColor,
                                opacity: watermarkOptions.opacity / 100,
                                fontSize: `${watermarkOptions.fontSize * 0.8}px`,
                                fontWeight: 'bold',
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                                textTransform: 'uppercase',
                              }}
                            >
                              {processedFile.watermarkText}
                            </Typography>
                          )}
                          
                          {processedFile.watermarkType === 'image' && watermarkOptions.imagePreview && (
                            <Box
                              component="img"
                              src={watermarkOptions.imagePreview}
                              alt="Watermark preview"
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: `translate(-50%, -50%) rotate(${watermarkOptions.angle}deg)`,
                                maxWidth: '70%',
                                maxHeight: '70%',
                                opacity: watermarkOptions.opacity / 100,
                              }}
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Typography variant="body1" fontWeight={600}>
                        {processedFile.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
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
                        Download Watermarked PDF
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
                          Watermark Details
                        </Typography>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Watermark Type
                              </Typography>
                              <Typography variant="body1" fontWeight={500} sx={{ textTransform: 'capitalize' }}>
                                {processedFile.watermarkType}
                              </Typography>
                            </Box>
                          </Grid>
                          
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Applied To
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {processedFile.pages}
                              </Typography>
                            </Box>
                          </Grid>
                          
                          {processedFile.watermarkType === 'text' && (
                            <Grid item xs={12} sm={6}>
                              <Box>
                                <Typography variant="caption" color="text.secondary" display="block">
                                  Watermark Text
                                </Typography>
                                <Typography variant="body1" fontWeight={500}>
                                  {processedFile.watermarkText}
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          
                          <Grid item xs={12} sm={6}>
                            <Box>
                              <Typography variant="caption" color="text.secondary" display="block">
                                Opacity
                              </Typography>
                              <Typography variant="body1" fontWeight={500}>
                                {watermarkOptions.opacity}%
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
                        Your watermark has been applied successfully. The watermark will appear on {processedFile.pages.toLowerCase()} of your document.
                      </Typography>
                    </Alert>
                    
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Button
                        variant="outlined"
                        startIcon={<RefreshIcon size={16} />}
                        fullWidth
                        onClick={handleReset}
                      >
                        Watermark Another PDF
                      </Button>
                      
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => {
                          setProcessedFile(null);
                        }}
                      >
                        Modify Watermark
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
              <AlertTitle>Important</AlertTitle>
              <Typography variant="body2">
                This watermark is permanently embedded in your PDF. If you need to make changes to the watermark, you'll need to start over with the original PDF document.
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
                How to Add a Watermark to PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop or browse to upload the PDF file you want to watermark.'
                  },
                  {
                    title: 'Choose watermark type',
                    description: 'Select whether you want to add a text watermark or an image watermark.'
                  },
                  {
                    title: 'Customize your watermark',
                    description: 'Set the text/image, opacity, position, angle, and other appearance settings.'
                  },
                  {
                    title: 'Download your watermarked PDF',
                    description: 'Click "Add Watermark" and then download your watermarked document.'
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
                Watermark Best Practices
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Choose the Right Opacity',
                    description: '30-40% opacity is usually ideal for watermarks to be visible without obstructing content.',
                  },
                  {
                    title: 'Use Diagonal Placement',
                    description: 'A 45° angle works best for text watermarks, making them harder to remove.',
                  },
                  {
                    title: 'Consider Image Transparency',
                    description: 'For image watermarks, use PNG files with transparency to avoid blocking content.',
                  },
                  {
                    title: 'Match Document Purpose',
                    description: 'Use "DRAFT" for works in progress, "CONFIDENTIAL" for sensitive materials, or your logo for branding.',
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
                    Important Note
                  </Typography>
                  <Typography variant="body2" paragraph>
                    Watermarks added with this tool become a permanent part of your PDF. While they add a layer of visual security, they don't prevent unauthorized copying of content. For highly sensitive documents, consider using our PDF encryption feature along with watermarking.
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

export default WatermarkPDFPage;