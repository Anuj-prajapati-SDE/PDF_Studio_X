import React, { useState, useCallback, useRef } from 'react';
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
  Tab,
  Tabs,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Switch,
  FormControlLabel,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  alpha,
  useTheme,
  Chip,
} from '@mui/material';
import {
  FilePlus as FilePlusIcon,
  Image as ImageIcon,
  Type as TextIcon,
  File as FileIcon,
  Download as DownloadIcon,
  Trash2 as TrashIcon,
  Plus as PlusIcon,
  Settings as SettingsIcon,
  Check as CheckIcon,
  Upload as UploadIcon,
  RefreshCw as RefreshIcon,
  AlignLeft as AlignLeftIcon,
  AlignCenter as AlignCenterIcon,
  AlignRight as AlignRightIcon,
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  PenTool as PenToolIcon,
  Zap as ZapIcon,
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
      id={`create-pdf-tabpanel-${index}`}
      aria-labelledby={`create-pdf-tab-${index}`}
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

const CreatePDFPage = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  // Blank PDF options
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState('A4');
  const [orientation, setOrientation] = useState('portrait');
  const [margins, setMargins] = useState(20);

  // From text options
  const [textContent, setTextContent] = useState('');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontSize, setFontSize] = useState(12);
  const [textAlignment, setTextAlignment] = useState('left');
  const [textStyles, setTextStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  // From images options
  const [images, setImages] = useState([]);
  const [imagesPerPage, setImagesPerPage] = useState(1);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState(true);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Handle image uploads
  const onDropImages = useCallback(acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    }));

    setImages(prev => [...prev, ...newImages]);
    toast.success(`${acceptedFiles.length} image${acceptedFiles.length > 1 ? 's' : ''} added`);
  }, []);

  const {
    getRootProps: getImageRootProps,
    getInputProps: getImageInputProps,
    isDragActive: isImageDragActive,
  } = useDropzone({
    onDrop: onDropImages,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleRemoveImage = (imageId) => {
    const imageToRemove = images.find(img => img.id === imageId);
    if (imageToRemove?.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    setImages(images.filter(img => img.id !== imageId));
    toast.success('Image removed');
  };

  const handleClearImages = () => {
    images.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
    setImages([]);
    toast.success('All images cleared');
  };

  // Text styling methods
  const toggleTextStyle = (style) => {
    setTextStyles(prev => ({
      ...prev,
      [style]: !prev[style],
    }));
  };

  // Create PDF methods
  const handleCreatePDF = async () => {
    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real app, this would call an API to generate the PDF
      // For now, we'll simulate success
      setProcessedFile({
        url: '#', // Mock URL - in a real app, this would be the download URL
        name: 'document.pdf',
        size: Math.floor(Math.random() * 1000000) + 100000, // Random size between 100KB-1.1MB
      });
      
      toast.success('PDF created successfully!');
    } catch (err) {
      console.error('Error creating PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to create PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your PDF');
    // In a real app, this would initiate the download
  };

  const handleReset = () => {
    // Clean up resources
    images.forEach(img => {
      if (img.preview) {
        URL.revokeObjectURL(img.preview);
      }
    });
    
    // Reset all state
    setProcessedFile(null);
    setError(null);
    setPageCount(1);
    setPageSize('A4');
    setOrientation('portrait');
    setMargins(20);
    setTextContent('');
    setFontFamily('Arial');
    setFontSize(12);
    setTextAlignment('left');
    setTextStyles({ bold: false, italic: false, underline: false });
    setImages([]);
    setImagesPerPage(1);
    setPreserveAspectRatio(true);
    
    toast.success('Form reset');
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
  const isValid = () => {
    if (activeTab === 0) {
      // Blank PDF validation
      return pageCount > 0 && pageCount <= 100;
    } else if (activeTab === 1) {
      // Text to PDF validation
      return textContent.trim().length > 0;
    } else if (activeTab === 2) {
      // Images to PDF validation
      return images.length > 0;
    }
    return false;
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
            Create PDF
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Generate new PDF documents from scratch, text content, or images.
          </Typography>
        </Box>

        {!processedFile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card sx={{ borderRadius: 4, mb: 4 }}>
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
                    icon={<FileIcon size={18} />} 
                    iconPosition="start"
                    label="Blank PDF" 
                    id="create-pdf-tab-0"
                    aria-controls="create-pdf-tabpanel-0" 
                  />
                  <Tab 
                    icon={<TextIcon size={18} />} 
                    iconPosition="start"
                    label="From Text" 
                    id="create-pdf-tab-1"
                    aria-controls="create-pdf-tabpanel-1" 
                  />
                  <Tab 
                    icon={<ImageIcon size={18} />} 
                    iconPosition="start"
                    label="From Images" 
                    id="create-pdf-tab-2"
                    aria-controls="create-pdf-tabpanel-2" 
                  />
                </Tabs>

                <Box sx={{ p: 3 }}>
                  {/* Blank PDF Tab */}
                  <TabPanel value={activeTab} index={0}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Number of Pages"
                          type="number"
                          value={pageCount}
                          onChange={(e) => setPageCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                          inputProps={{ min: 1, max: 100 }}
                          helperText="Maximum 100 pages"
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="page-size-label">Page Size</InputLabel>
                          <Select
                            labelId="page-size-label"
                            id="page-size"
                            value={pageSize}
                            label="Page Size"
                            onChange={(e) => setPageSize(e.target.value)}
                          >
                            <MenuItem value="A4">A4 (210 × 297 mm)</MenuItem>
                            <MenuItem value="A5">A5 (148 × 210 mm)</MenuItem>
                            <MenuItem value="Letter">Letter (8.5 × 11 in)</MenuItem>
                            <MenuItem value="Legal">Legal (8.5 × 14 in)</MenuItem>
                            <MenuItem value="Tabloid">Tabloid (11 × 17 in)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                          <InputLabel id="orientation-label">Orientation</InputLabel>
                          <Select
                            labelId="orientation-label"
                            id="orientation"
                            value={orientation}
                            label="Orientation"
                            onChange={(e) => setOrientation(e.target.value)}
                          >
                            <MenuItem value="portrait">Portrait</MenuItem>
                            <MenuItem value="landscape">Landscape</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Margins (mm)"
                          type="number"
                          value={margins}
                          onChange={(e) => setMargins(Math.max(0, Math.min(50, parseInt(e.target.value) || 0)))}
                          inputProps={{ min: 0, max: 50 }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Card 
                          variant="outlined" 
                          sx={{ 
                            p: 3, 
                            borderRadius: 2, 
                            bgcolor: alpha(theme.palette.primary.main, 0.03) 
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <ZapIcon size={18} color={theme.palette.primary.main} style={{ marginRight: 10 }} />
                            <Typography variant="subtitle1" fontWeight={600}>
                              Preview
                            </Typography>
                          </Box>
                          
                          <Box 
                            sx={{ 
                              width: '100%',
                              height: 250,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Page preview */}
                            <Box 
                              sx={{ 
                                width: orientation === 'portrait' ? 150 : 210,
                                height: orientation === 'portrait' ? 210 : 150,
                                bgcolor: 'white',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                position: 'relative',
                                borderRadius: 1,
                              }}
                            >
                              {/* Margins visualization */}
                              <Box 
                                sx={{ 
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  border: `1px dashed ${alpha(theme.palette.primary.main, 0.5)}`,
                                  borderWidth: `${margins/5}px`,
                                }}
                              />
                              
                              <Typography 
                                variant="caption" 
                                sx={{ 
                                  position: 'absolute', 
                                  top: '50%', 
                                  left: '50%', 
                                  transform: 'translate(-50%, -50%)',
                                  color: 'text.secondary',
                                  fontStyle: 'italic',
                                }}
                              >
                                {pageSize} • {orientation}
                              </Typography>
                            </Box>
                            
                            <Typography 
                              variant="body2"
                              color="text.secondary"
                              sx={{ 
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                              }}
                            >
                              {pageCount} {pageCount === 1 ? 'page' : 'pages'}
                            </Typography>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* From Text Tab */}
                  <TabPanel value={activeTab} index={1}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Box 
                          sx={{ 
                            mb: 2, 
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1,
                            alignItems: 'center',
                          }}
                        >
                          <FormControl sx={{ width: 150 }}>
                            <InputLabel id="font-family-label">Font</InputLabel>
                            <Select
                              labelId="font-family-label"
                              id="font-family"
                              value={fontFamily}
                              label="Font"
                              size="small"
                              onChange={(e) => setFontFamily(e.target.value)}
                            >
                              <MenuItem value="Arial">Arial</MenuItem>
                              <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                              <MenuItem value="Courier New">Courier New</MenuItem>
                              <MenuItem value="Georgia">Georgia</MenuItem>
                              <MenuItem value="Verdana">Verdana</MenuItem>
                            </Select>
                          </FormControl>
                          
                          <TextField
                            label="Size"
                            type="number"
                            value={fontSize}
                            size="small"
                            onChange={(e) => setFontSize(Math.max(8, Math.min(72, parseInt(e.target.value) || 12)))}
                            inputProps={{ min: 8, max: 72 }}
                            sx={{ width: 80 }}
                          />
                          
                          <Box sx={{ display: 'flex', ml: { xs: 0, sm: 1 } }}>
                            <Tooltip title="Bold">
                              <IconButton 
                                size="small" 
                                color={textStyles.bold ? 'primary' : 'default'}
                                onClick={() => toggleTextStyle('bold')}
                                sx={{ 
                                  bgcolor: textStyles.bold ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <BoldIcon size={18} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Italic">
                              <IconButton 
                                size="small" 
                                color={textStyles.italic ? 'primary' : 'default'}
                                onClick={() => toggleTextStyle('italic')}
                                sx={{ 
                                  bgcolor: textStyles.italic ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <ItalicIcon size={18} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Underline">
                              <IconButton 
                                size="small" 
                                color={textStyles.underline ? 'primary' : 'default'}
                                onClick={() => toggleTextStyle('underline')}
                                sx={{ 
                                  bgcolor: textStyles.underline ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <UnderlineIcon size={18} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          
                          <Box sx={{ display: 'flex', ml: { xs: 0, sm: 'auto' } }}>
                            <Tooltip title="Align Left">
                              <IconButton 
                                size="small" 
                                color={textAlignment === 'left' ? 'primary' : 'default'}
                                onClick={() => setTextAlignment('left')}
                                sx={{ 
                                  bgcolor: textAlignment === 'left' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <AlignLeftIcon size={18} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Align Center">
                              <IconButton 
                                size="small" 
                                color={textAlignment === 'center' ? 'primary' : 'default'}
                                onClick={() => setTextAlignment('center')}
                                sx={{ 
                                  bgcolor: textAlignment === 'center' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <AlignCenterIcon size={18} />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Align Right">
                              <IconButton 
                                size="small" 
                                color={textAlignment === 'right' ? 'primary' : 'default'}
                                onClick={() => setTextAlignment('right')}
                                sx={{ 
                                  bgcolor: textAlignment === 'right' ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                                  borderRadius: 1,
                                }}
                              >
                                <AlignRightIcon size={18} />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </Box>
                        
                        <TextField
                          fullWidth
                          label="Text Content"
                          multiline
                          rows={10}
                          value={textContent}
                          onChange={(e) => setTextContent(e.target.value)}
                          placeholder="Enter the text you want to convert to PDF..."
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              fontFamily: fontFamily,
                              fontSize: `${fontSize}px`,
                              fontWeight: textStyles.bold ? 700 : 400,
                              fontStyle: textStyles.italic ? 'italic' : 'normal',
                              textDecoration: textStyles.underline ? 'underline' : 'none',
                              '& textarea': {
                                textAlign: textAlignment,
                              }
                            }
                          }}
                        />
                      </Grid>
                      
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={<Switch checked={pageSize === 'A4'} onChange={(e) => setPageSize(e.target.checked ? 'A4' : 'Letter')} />}
                          label="Use A4 paper size"
                        />
                      </Grid>
                    </Grid>
                  </TabPanel>

                  {/* From Images Tab */}
                  <TabPanel value={activeTab} index={2}>
                    {images.length === 0 ? (
                      <Paper
                        {...getImageRootProps()}
                        elevation={0}
                        variant="outlined"
                        sx={{
                          borderRadius: 4,
                          borderStyle: 'dashed',
                          borderWidth: 2,
                          borderColor: isImageDragActive ? 'primary.main' : 'divider',
                          bgcolor: isImageDragActive ? alpha(theme.palette.primary.main, 0.05) : 'background.paper',
                          p: 6,
                          textAlign: 'center',
                          cursor: 'pointer',
                          mb: 4,
                        }}
                      >
                        <input {...getImageInputProps()} />
                        
                        <Box
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
                        
                        <Typography variant="h6" gutterBottom>
                          {isImageDragActive
                            ? "Drop images here"
                            : "Drag & drop images here"
                          }
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">
                          or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600 }}>browse files</Box> from your computer
                        </Typography>
                        
                        <Box sx={{ mt: 2 }}>
                          <Chip 
                            label="Supported formats: JPG, PNG, GIF, WEBP" 
                            size="small" 
                            variant="outlined" 
                          />
                        </Box>
                      </Paper>
                    ) : (
                      <>
                        <Box sx={{ mb: 4 }}>
                          <Typography variant="h6" gutterBottom>
                            {images.length} {images.length === 1 ? 'Image' : 'Images'} Selected
                          </Typography>
                          
                          <Grid container spacing={2} sx={{ mb: 3 }}>
                            {images.map((image) => (
                              <Grid item xs={6} sm={4} md={3} key={image.id}>
                                <Card sx={{ position: 'relative', borderRadius: 2 }}>
                                  <Box
                                    component="img"
                                    src={image.preview}
                                    alt="Preview"
                                    sx={{
                                      width: '100%',
                                      height: 160,
                                      objectFit: 'cover',
                                      borderRadius: '8px 8px 0 0',
                                    }}
                                  />
                                  <Box sx={{ p: 1.5 }}>
                                    <Typography variant="body2" noWrap>
                                      {image.file.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {(image.file.size / (1024 * 1024)).toFixed(2)} MB
                                    </Typography>
                                  </Box>
                                  <IconButton
                                    size="small"
                                    onClick={() => handleRemoveImage(image.id)}
                                    sx={{
                                      position: 'absolute',
                                      top: 8,
                                      right: 8,
                                      bgcolor: 'rgba(0,0,0,0.5)',
                                      color: 'white',
                                      '&:hover': {
                                        bgcolor: 'rgba(0,0,0,0.7)',
                                      },
                                      width: 28,
                                      height: 28,
                                    }}
                                  >
                                    <TrashIcon size={14} />
                                  </IconButton>
                                </Card>
                              </Grid>
                            ))}
                            
                            <Grid item xs={6} sm={4} md={3}>
                              <Card 
                                {...getImageRootProps()}
                                sx={{ 
                                  height: '100%',
                                  minHeight: 220,
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  borderRadius: 2,
                                  border: '2px dashed',
                                  borderColor: 'divider',
                                  bgcolor: 'background.paper',
                                  p: 2,
                                  cursor: 'pointer',
                                  '&:hover': {
                                    borderColor: 'primary.main',
                                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                                  },
                                }}
                              >
                                <input {...getImageInputProps()} />
                                <PlusIcon size={30} color={theme.palette.text.secondary} />
                                <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                                  Add More Images
                                </Typography>
                              </Card>
                            </Grid>
                          </Grid>
                          
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<TrashIcon size={16} />}
                            onClick={handleClearImages}
                            size="small"
                          >
                            Clear All Images
                          </Button>
                        </Box>
                        
                        <Divider sx={{ my: 3 }} />
                        
                        <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                          Layout Options
                        </Typography>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6} md={4}>
                            <TextField
                              fullWidth
                              select
                              label="Images Per Page"
                              value={imagesPerPage}
                              onChange={(e) => setImagesPerPage(parseInt(e.target.value))}
                            >
                              <MenuItem value={1}>1 image per page</MenuItem>
                              <MenuItem value={2}>2 images per page</MenuItem>
                              <MenuItem value={4}>4 images per page</MenuItem>
                              <MenuItem value={6}>6 images per page</MenuItem>
                            </TextField>
                          </Grid>
                          
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControlLabel
                              control={
                                <Switch 
                                  checked={preserveAspectRatio}
                                  onChange={(e) => setPreserveAspectRatio(e.target.checked)}
                                />
                              }
                              label="Preserve aspect ratio"
                            />
                          </Grid>
                          
                          <Grid item xs={12} sm={6} md={4}>
                            <FormControl fullWidth>
                              <InputLabel id="page-size-label">Page Size</InputLabel>
                              <Select
                                labelId="page-size-label"
                                id="page-size"
                                value={pageSize}
                                label="Page Size"
                                onChange={(e) => setPageSize(e.target.value)}
                              >
                                <MenuItem value="A4">A4 (210 × 297 mm)</MenuItem>
                                <MenuItem value="A5">A5 (148 × 210 mm)</MenuItem>
                                <MenuItem value="Letter">Letter (8.5 × 11 in)</MenuItem>
                                <MenuItem value="Legal">Legal (8.5 × 14 in)</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </TabPanel>
                </Box>

                <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', textAlign: 'right' }}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    sx={{ mr: 2 }}
                  >
                    Reset
                  </Button>
                  
                  <Button
                    variant="contained"
                    startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <FilePlusIcon size={16} />}
                    onClick={handleCreatePDF}
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
                    {isProcessing ? 'Creating...' : 'Create PDF'}
                  </Button>
                </Box>
              </CardContent>
            </Card>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Creating your PDF...
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
                      PDF Created Successfully
                    </Typography>
                    <Typography variant="body2">
                      Your PDF document is ready to download
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
                      <FileIcon size={40} color={theme.palette.error.main} />
                    </Box>
                    
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: -10,
                        right: -10,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'success.main',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid white',
                      }}
                    >
                      <CheckIcon size={16} />
                    </Box>
                  </Box>
                  
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    {processedFile.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {(processedFile.size / (1024 * 1024)).toFixed(2)} MB • Created {new Date().toLocaleString()}
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
                    startIcon={<FilePlusIcon size={16} />}
                    onClick={handleReset}
                    color="primary"
                  >
                    Create Another PDF
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
                How to Create a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Choose your creation method',
                    description: 'Select whether you want to create a blank PDF, convert text to PDF, or convert images to PDF.'
                  },
                  {
                    title: 'Configure settings',
                    description: 'Set page size, orientation, and other options depending on your chosen method.'
                  },
                  {
                    title: 'Add your content',
                    description: 'Enter text or upload images based on the selected creation method.'
                  },
                  {
                    title: 'Create and download',
                    description: 'Click the "Create PDF" button and download your new PDF document.'
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
                PDF Creation Tips
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Optimize Image Resolution',
                    description: 'For image-based PDFs, use high-resolution images while keeping file size manageable.',
                  },
                  {
                    title: 'Fonts Matter',
                    description: 'Choose readable fonts when creating text-based PDFs, especially for documents intended for screen reading.',
                  },
                  {
                    title: 'Consider Page Orientation',
                    description: 'Use landscape for wide content like tables, and portrait for text-heavy documents.',
                  },
                  {
                    title: 'Set Appropriate Margins',
                    description: 'Leave enough margin space to ensure content is visible when printed or viewed on different devices.',
                  },
                ].map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Card
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
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
              
              <Box
                sx={{
                  mt: 3,
                  p: 3,
                  bgcolor: alpha(theme.palette.info.main, 0.08),
                  borderRadius: 2,
                  border: `1px solid ${alpha(theme.palette.info.main, 0.2)}`,
                }}
              >
                <Typography variant="subtitle1" fontWeight={600} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PenToolIcon size={16} style={{ marginRight: 8 }} color={theme.palette.info.main} />
                  Advanced PDF Creation
                </Typography>
                <Typography variant="body2">
                  Need more advanced features like headers, footers, page numbers, or custom watermarks? 
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 500, ml: 0.5 }}>
                    Upgrade to our Pro version
                  </Box> for enhanced PDF creation capabilities.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </motion.div>
  );
};

export default CreatePDFPage;