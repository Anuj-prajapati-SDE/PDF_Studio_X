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
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
  InputAdornment,
  Chip,
  useTheme,
  alpha,
} from '@mui/material';
import {
  
  Upload as UploadIcon,
  Download as DownloadIcon,
  RefreshCw as RefreshIcon,
  Trash2 as TrashIcon,
  Check as CheckIcon,
  AlertCircle as AlertCircleIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  Edit2 as EditTextIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Image as ImageIcon,
  Type as TypeIcon,
  Link as LinkIcon,
  Plus as PlusIcon,
  XCircle as XCircleIcon,
  Move as MoveIcon,
  RotateCw as RotateCwIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  MoreVertical as MoreVerticalIcon,
  Settings as SettingsIcon,
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
      id={`pdf-edit-tabpanel-${index}`}
      aria-labelledby={`pdf-edit-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `pdf-edit-tab-${index}`,
    'aria-controls': `pdf-edit-tabpanel-${index}`,
  };
}

// Mock PDF page preview component
const PDFPagePreview = ({ pageNumber, totalPages, onPageChange }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', mb: 2 }}>
        <Box
          sx={{
            width: '100%',
            height: 500,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Typography variant="h1" sx={{ color: alpha(theme.palette.text.primary, 0.05), userSelect: 'none', position: 'absolute' }}>
            PDF
          </Typography>
          
          {/* Sample page content - would be actual PDF page in real app */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0,
              backgroundImage: `url(https://picsum.photos/seed/${pageNumber}/800/1000)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'opacity(0.7)',
            }} 
          />
          
          {/* Editor overlay here in real implementation */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              bgcolor: alpha(theme.palette.background.paper, 0.75),
              color: 'text.secondary',
              px: 1.5,
              py: 0.5,
              borderRadius: 2,
              fontSize: '0.75rem',
              fontWeight: 500,
              backdropFilter: 'blur(4px)',
              border: '1px solid',
              borderColor: alpha(theme.palette.divider, 0.5),
            }}
          >
            <Tooltip title="Use the tools on the right to edit this page">
              <EditIcon size={14} style={{ marginRight: 5, verticalAlign: 'middle' }} />
            </Tooltip>
            Interactive Editor
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 1 }}>
          <IconButton 
            disabled={pageNumber <= 1} 
            onClick={() => onPageChange(pageNumber - 1)}
            sx={{ 
              color: pageNumber <= 1 ? 'text.disabled' : 'primary.main',
            }}
          >
            <ChevronLeftIcon size={24} />
          </IconButton>
          
          <Typography sx={{ mx: 2, fontWeight: 500 }}>
            Page {pageNumber} of {totalPages}
          </Typography>
          
          <IconButton 
            disabled={pageNumber >= totalPages} 
            onClick={() => onPageChange(pageNumber + 1)}
            sx={{ 
              color: pageNumber >= totalPages ? 'text.disabled' : 'primary.main',
            }}
          >
            <ChevronRightIcon size={24} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const EditPDFPage = () => {
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Simulated total pages
  const [activeTab, setActiveTab] = useState(0);
  const [editHistory, setEditHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  
  // Current date and time
  const currentDateTime = "2025-05-04 07:38:19";
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
      setEditHistory([]);
      
      // Simulate getting total pages from the PDF
      const simulatedPageCount = Math.floor(Math.random() * 10) + 2; // 2-11 pages
      setTotalPages(simulatedPageCount);
      setCurrentPage(1);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleAddText = () => {
    // In a real app, this would add a text element to the PDF editor
    const newEdit = {
      type: 'text',
      content: 'Sample Text',
      page: currentPage,
      timestamp: new Date().toISOString()
    };
    
    setEditHistory([...editHistory, newEdit]);
    toast.success('Text element added');
  };
  
  const handleAddImage = () => {
    // Simulate adding an image
    const newEdit = {
      type: 'image',
      content: 'Image Added',
      page: currentPage,
      timestamp: new Date().toISOString()
    };
    
    setEditHistory([...editHistory, newEdit]);
    toast.success('Image placeholder added');
  };
  
  const handleAddLink = () => {
    // Simulate adding a link
    const newEdit = {
      type: 'link',
      content: 'https://example.com',
      page: currentPage,
      timestamp: new Date().toISOString()
    };
    
    setEditHistory([...editHistory, newEdit]);
    toast.success('Link added');
  };
  
  const handleRotatePage = () => {
    // Simulate rotating the current page
    const newEdit = {
      type: 'rotate',
      content: '90° Clockwise',
      page: currentPage,
      timestamp: new Date().toISOString()
    };
    
    setEditHistory([...editHistory, newEdit]);
    toast.success('Page rotated 90° clockwise');
  };
  
  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };
  
  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };
  
  const handleUndoEdit = () => {
    if (editHistory.length > 0) {
      const newHistory = [...editHistory];
      newHistory.pop();
      setEditHistory(newHistory);
      toast.success('Last edit undone');
    }
  };

  const handleSaveChanges = async () => {
    if (!file) {
      toast.error('Please upload a PDF file to edit');
      return;
    }
    
    if (editHistory.length === 0) {
      toast.error('No changes have been made to save');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // Simulate PDF editing process
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // In a real app, we would apply all the edits to the PDF
      
      setProcessedFile({
        name: file.name.replace('.pdf', '_edited.pdf'),
        size: file.size * 1.02, // Slightly larger due to edits
        totalPages: totalPages,
        changesCount: editHistory.length,
        url: '#', // Mock URL
      });
      
      toast.success('PDF edited successfully!');
    } catch (err) {
      console.error('Error editing PDF:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to edit PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    toast.success('Downloading your edited PDF');
    // In a real app, this would download the actual file
  };

  const handleReset = () => {
    setFile(null);
    setProcessedFile(null);
    setError(null);
    setEditHistory([]);
    setCurrentPage(1);
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
                Edit PDF
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Add text, images, links, and make other edits to your PDF
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
              {!file ? (
                <Grid item xs={12}>
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
                      or <Box component="span" sx={{ color: 'primary.main', fontWeight: 600, cursor: 'pointer' }}>browse files</Box>
                    </Typography>
                    
                    <Box component={motion.div} variants={itemVariants} sx={{ mt: 2 }}>
                      <Chip 
                        label="Maximum file size: 100MB" 
                        size="small" 
                        variant="outlined" 
                      />
                    </Box>
                  </Paper>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          bgcolor: alpha(theme.palette.error.main, 0.1),
                          width: 36,
                          height: 36,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                          mr: 2,
                        }}
                      >
                      
                      </Box>
                      
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body1" fontWeight={500}>
                          {file.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatFileSize(file.size)} • {totalPages} page{totalPages !== 1 ? 's' : ''}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={handleReset}
                        startIcon={<TrashIcon size={16} />}
                      >
                        Change
                      </Button>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={8} lg={9}>
                    <Card sx={{ borderRadius: 4 }}>
                      <CardContent sx={{ p: 0 }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3, py: 1 }}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1" fontWeight={600}>
                              PDF Editor
                            </Typography>
                            
                            <Box>
                              <Tooltip title="Undo Last Edit">
                                <IconButton 
                                  size="small" 
                                  color="primary" 
                                  onClick={handleUndoEdit}
                                  disabled={editHistory.length === 0}
                                >
                                  <RefreshIcon size={18} />
                                </IconButton>
                              </Tooltip>
                              
                              <Tooltip title="Save Changes">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={handleSaveChanges}
                                  disabled={editHistory.length === 0}
                                  sx={{ ml: 1 }}
                                >
                                  <SaveIcon size={18} />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </Stack>
                        </Box>
                        
                        <PDFPagePreview 
                          pageNumber={currentPage} 
                          totalPages={totalPages} 
                          onPageChange={handlePageChange}
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={4} lg={3}>
                    <Card sx={{ borderRadius: 4, height: '100%' }}>
                      <CardContent sx={{ p: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <Tabs 
                            value={activeTab} 
                            onChange={handleTabChange} 
                            variant="fullWidth"
                            indicatorColor="primary"
                            textColor="primary"
                          >
                            <Tab 
                              icon={<EditIcon size={16} />} 
                              iconPosition="start" 
                              label="Tools" 
                              {...a11yProps(0)} 
                              sx={{ textTransform: 'none', fontWeight: 500 }}
                            />
                            <Tab 
                              icon={
                                <Badge color="primary" badgeContent={editHistory.length} showZero>
                                  <SettingsIcon size={16} />
                                </Badge>
                              } 
                              iconPosition="start" 
                              label="Changes" 
                              {...a11yProps(1)} 
                              sx={{ textTransform: 'none', fontWeight: 500 }}
                            />
                          </Tabs>
                        </Box>
                        
                        <TabPanel value={activeTab} index={0}>
                          <List disablePadding>
                            <ListItem button onClick={handleAddText} disabled={!file}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <TypeIcon size={18} />
                              </ListItemIcon>
                              <ListItemText primary="Add Text" />
                            </ListItem>
                            
                            <ListItem button onClick={handleAddImage} disabled={!file}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <ImageIcon size={18} />
                              </ListItemIcon>
                              <ListItemText primary="Add Image" />
                            </ListItem>
                            
                            <ListItem button onClick={handleAddLink} disabled={!file}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <LinkIcon size={18} />
                              </ListItemIcon>
                              <ListItemText primary="Add Link" />
                            </ListItem>
                            
                            <ListItem button onClick={handleRotatePage} disabled={!file}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <RotateCwIcon size={18} />
                              </ListItemIcon>
                              <ListItemText primary="Rotate Page" />
                            </ListItem>
                            
                            <ListItem button onClick={handleMoreClick} disabled={!file}>
                              <ListItemIcon sx={{ minWidth: 40 }}>
                                <MoreVerticalIcon size={18} />
                              </ListItemIcon>
                              <ListItemText primary="More Options" />
                            </ListItem>
                          </List>
                          
                          <Menu
                            anchorEl={moreAnchorEl}
                            open={Boolean(moreAnchorEl)}
                            onClose={handleMoreClose}
                            PaperProps={{
                              sx: { width: 200 },
                            }}
                          >
                            <MenuItem onClick={() => {
                              handleMoreClose();
                              toast.success('Delete Page functionality');
                            }}>
                              <ListItemIcon>
                                <TrashIcon size={18} />
                              </ListItemIcon>
                              <ListItemText>Delete Page</ListItemText>
                            </MenuItem>
                            
                            <MenuItem onClick={() => {
                              handleMoreClose();
                              toast.success('Move Page functionality');
                            }}>
                              <ListItemIcon>
                                <MoveIcon size={18} />
                              </ListItemIcon>
                              <ListItemText>Move Page</ListItemText>
                            </MenuItem>
                            
                            <MenuItem onClick={() => {
                              handleMoreClose();
                              toast.success('Add Blank Page functionality');
                            }}>
                              <ListItemIcon>
                                <PlusIcon size={18} />
                              </ListItemIcon>
                              <ListItemText>Add Blank Page</ListItemText>
                            </MenuItem>
                          </Menu>
                          
                          <Box sx={{ mt: 'auto', p: 2 }}>
                            <Button
                              variant="contained"
                              fullWidth
                              size="large"
                              startIcon={isProcessing ? <RefreshIcon className="rotating" /> : <SaveIcon size={16} />}
                              onClick={handleSaveChanges}
                              disabled={isProcessing || !file || editHistory.length === 0}
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
                              {isProcessing ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                          </Box>
                        </TabPanel>
                        
                        <TabPanel value={activeTab} index={1}>
                          {editHistory.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 6, px: 2 }}>
                              <Typography variant="body2" color="text.secondary" gutterBottom>
                                No changes made yet
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Use the tools tab to edit your PDF
                              </Typography>
                            </Box>
                          ) : (
                            <List dense disablePadding>
                              {editHistory.map((edit, index) => (
                                <ListItem key={index} divider={index < editHistory.length - 1}>
                                  <ListItemIcon sx={{ minWidth: 36 }}>
                                    {edit.type === 'text' && <TypeIcon size={16} />}
                                    {edit.type === 'image' && <ImageIcon size={16} />}
                                    {edit.type === 'link' && <LinkIcon size={16} />}
                                    {edit.type === 'rotate' && <RotateCwIcon size={16} />}
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={`${edit.type.charAt(0).toUpperCase() + edit.type.slice(1)} added`}
                                    secondary={`Page ${edit.page} • ${edit.content}`}
                                    primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                                    secondaryTypographyProps={{ variant: 'caption' }}
                                  />
                                  <ListItemSecondaryAction>
                                    <IconButton edge="end" size="small" onClick={() => {
                                      const newHistory = [...editHistory];
                                      newHistory.splice(index, 1);
                                      setEditHistory(newHistory);
                                      toast.success('Edit removed');
                                    }}>
                                      <XCircleIcon size={16} />
                                    </IconButton>
                                  </ListItemSecondaryAction>
                                </ListItem>
                              ))}
                            </List>
                          )}
                        </TabPanel>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              )}
            </Grid>

            {isProcessing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Saving your PDF changes...
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
                          PDF Edited Successfully!
                        </Typography>
                        <Typography variant="body2">
                          Your changes have been saved to the PDF
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
                              height: 320,
                              width: '100%',
                              backgroundColor: alpha(theme.palette.background.default, 0.5),
                              borderRadius: 3,
                              display: 'flex',
                              flexDirection: 'column',
                              overflow: 'hidden',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              position: 'relative',
                              mb: 2,
                            }}
                          >
                            {/* PDF Preview */}
                            <Box 
                              sx={{ 
                                flex: 1,
                                backgroundColor: 'background.paper',
                                border: '1px solid',
                                borderColor: alpha(theme.palette.divider, 0.5),
                                m: 2,
                                borderRadius: 1,
                                p: 1,
                                display: 'flex',
                                flexDirection: 'column',
                              }}
                            >
                              {/* PDF mockup */}
                              <Box 
                                sx={{ 
                                  flex: 1, 
                                  backgroundImage: 'url(https://picsum.photos/seed/1/800/1000)', 
                                  backgroundSize: 'cover',
                                  borderRadius: 1, 
                                }}
                              />
                              
                              <Box sx={{ height: 40, mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                                  1 / {totalPages}
                                </Typography>
                                <Chip 
                                  label={`${editHistory.length} edit${editHistory.length !== 1 ? 's' : ''}`} 
                                  color="primary" 
                                  size="small" 
                                  variant="outlined" 
                                  sx={{ height: 24 }} 
                                />
                              </Box>
                            </Box>
                            
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                borderRadius: '50%',
                                bgcolor: alpha(theme.palette.background.paper, 0.85),
                                color: 'primary.main',
                                width: 64,
                                height: 64,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
                                border: '3px solid',
                                borderColor: alpha(theme.palette.primary.main, 0.2),
                                backdropFilter: 'blur(4px)',
                              }}
                            >
                              <EditIcon size={28} color={theme.palette.primary.main} />
                            </Box>
                          </Box>
                          
                          <Typography variant="body1" fontWeight={600}>
                            {processedFile.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatFileSize(processedFile.size)} • {processedFile.totalPages} page{processedFile.totalPages !== 1 ? 's' : ''}
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
                            Download Edited PDF
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
                              Editing Summary
                            </Typography>
                            
                            <Grid container spacing={2}>
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Changes Applied
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                    {processedFile.changesCount} edit{processedFile.changesCount !== 1 ? 's' : ''}
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12} sm={6}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Pages Edited
                                  </Typography>
                                  <Typography variant="body1" fontWeight={500}>
                                    {/* Count unique pages that were edited */}
                                    {new Set(editHistory.map(edit => edit.page)).size} of {processedFile.totalPages}
                                  </Typography>
                                </Box>
                              </Grid>
                              
                              <Grid item xs={12}>
                                <Box>
                                  <Typography variant="caption" color="text.secondary" display="block">
                                    Edit Types
                                  </Typography>
                                  <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                    {Array.from(new Set(editHistory.map(edit => edit.type))).map((type, index) => (
                                      <Chip 
                                        key={index}
                                        label={`${type.charAt(0).toUpperCase() + type.slice(1)}`} 
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                      />
                                    ))}
                                  </Box>
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
                            Your PDF has been successfully edited. All {processedFile.changesCount} changes have been applied and saved to the document.
                          </Typography>
                        </Alert>
                        
                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                          <Button
                            variant="outlined"
                            startIcon={<RefreshIcon size={16} />}
                            fullWidth
                            onClick={handleReset}
                          >
                            Edit Another PDF
                          </Button>
                          
                          <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={() => {
                              setProcessedFile(null);
                            }}
                          >
                            Continue Editing
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
                  <AlertTitle>Next Steps</AlertTitle>
                  <Typography variant="body2">
                    You can now download your edited PDF, continue making additional changes, or use our other PDF tools to further modify your document. If you need to make more complex edits, consider using our desktop PDF editor for advanced features.
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
                How to Edit a PDF
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                {[
                  {
                    title: 'Upload your PDF',
                    description: 'Drag and drop or browse to upload the PDF file you want to edit.'
                  },
                  {
                    title: 'Navigate to the page',
                    description: 'Use the page navigation controls to find the page you want to edit.'
                  },
                  {
                    title: 'Make your edits',
                    description: 'Use the tools panel to add text, images, links, or rotate pages as needed.'
                  },
                  {
                    title: 'Save your changes',
                    description: 'Click "Save Changes" and download your edited PDF.'
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
                What You Can Edit
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {[
                  {
                    title: 'Add & Edit Text',
                    description: 'Insert new text or edit existing text in your PDF document.',
                  },
                  {
                    title: 'Insert Images',
                    description: 'Add logos, signatures, photos or other images to your PDF pages.',
                  },
                  {
                    title: 'Add Hyperlinks',
                    description: 'Create clickable links to websites or other pages in the document.',
                  },
                  {
                    title: 'Organize Pages',
                    description: 'Rotate, delete, or reorder pages to arrange your document.',
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
                    Editing Limitations
                  </Typography>
                  <Typography variant="body2" paragraph>
                    This online editor is best for basic edits and additions. For complex document restructuring or editing of secured PDFs, you may need to use a desktop PDF editor. Some PDFs with complex formatting or scanned content might have limited editability.
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

export default EditPDFPage;