import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Typography, Paper, List, ListItem, ListItemText, ListItemIcon, IconButton, Divider, 
  LinearProgress, Alert, Container, Card } from '@mui/material';
import { Delete as DeleteIcon, Description as DescriptionIcon, DragIndicator as DragIndicatorIcon } from '@mui/icons-material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MergeIcon from '@mui/icons-material/Merge';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import toast from 'react-hot-toast';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Mock implementation - replace with actual API call in production
const mergePDFs = async (files) => {
  // This is a placeholder for the actual API call
  // In a real implementation, you would use FormData to send files to your backend
  const formData = new FormData();
  files.forEach(file => {
    formData.append('pdfs', file);
  });

  try {
    // Replace with your actual API endpoint
    const response = await axios.post('http://localhost:5000/api/pdf/merge', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      responseType: 'blob'
    });
    
    return {
      success: true,
      data: response.data,
      message: 'PDFs merged successfully!'
    };
  } catch (error) {
    console.error('Error merging PDFs:', error);
    return {
      success: false,
      message: 'Failed to merge PDFs. Please try again.'
    };
  }
};

const MergePDFPage = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    // Only accept PDF files
    const pdfFiles = acceptedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== acceptedFiles.length) {
      toast.error('Only PDF files are accepted');
    }
    
    if (pdfFiles.length > 0) {
      // Add preview URLs to the files
      const newFiles = pdfFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxSize: 50 * 1024 * 1024 // 50 MB
  });

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newFiles[index].preview);
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      toast.error('Please upload at least 2 PDF files to merge');
      return;
    }

    setError(null);
    setIsProcessing(true);
    
    try {
      // In a real implementation, send files to your backend
      const result = await mergePDFs(files);
      
      if (result.success) {
        // Create a Blob from the PDF Stream
        const file = new Blob([result.data], { type: 'application/pdf' });
        // Create a link to download
        setProcessedFile(URL.createObjectURL(file));
        toast.success('PDFs merged successfully!');
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch (err) {
      console.error('Error merging PDFs:', err);
      setError('An unexpected error occurred. Please try again.');
      toast.error('Failed to merge PDFs');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedFile;
    link.setAttribute('download', 'merged-document.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();
    toast.success('Download started');
  };

  const handleReset = () => {
    // Clean up all object URLs
    files.forEach(file => URL.revokeObjectURL(file.preview));
    if (processedFile) {
      URL.revokeObjectURL(processedFile);
    }
    
    setFiles([]);
    setProcessedFile(null);
    setError(null);
  };
  
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(files);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setFiles(items);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight={600}>
        Merge PDF Files
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph align="center" sx={{ mb: 4 }}>
        Combine multiple PDF files into a single document. Drag to reorder pages as needed.
      </Typography>
      
      {!processedFile ? (
        <Box sx={{ mb: 4 }}>
          <Paper
            {...getRootProps()}
            sx={{
              p: 4,
              border: '2px dashed',
              borderColor: isDragActive ? 'primary.main' : 'divider',
              borderRadius: 2,
              bgcolor: isDragActive ? 'rgba(25, 118, 210, 0.04)' : 'background.paper',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              textAlign: 'center',
              mb: 3,
              '&:hover': {
                borderColor: 'primary.main',
                bgcolor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              {isDragActive ? 'Drop PDFs here' : 'Drag & Drop PDF files here'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              or click to browse files (max 50MB each)
            </Typography>
          </Paper>
          
          {files.length > 0 && (
            <Card variant="outlined" sx={{ mb: 3, borderRadius: 2 }}>
              <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                <Typography variant="h6">
                  {files.length} {files.length === 1 ? 'File' : 'Files'} Selected
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drag and drop to reorder files. The PDFs will be merged in the order shown.
                </Typography>
              </Box>
              
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="pdfList">
                  {(provided) => (
                    <List ref={provided.innerRef} {...provided.droppableProps}>
                      {files.map((file, index) => (
                        <Draggable key={`${file.name}-${index}`} draggableId={`${file.name}-${index}`} index={index}>
                          {(provided) => (
                            <ListItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              secondaryAction={
                                <IconButton 
                                  edge="end" 
                                  aria-label="delete" 
                                  onClick={() => handleRemoveFile(index)}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              }
                              sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                mb: 1,
                                mx: 1,
                              }}
                            >
                              <ListItemIcon {...provided.dragHandleProps}>
                                <DragIndicatorIcon />
                              </ListItemIcon>
                              <ListItemIcon>
                                <DescriptionIcon />
                              </ListItemIcon>
                              <ListItemText 
                                primary={file.name} 
                                secondary={`${(file.size / (1024 * 1024)).toFixed(2)} MB`} 
                              />
                            </ListItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </List>
                  )}
                </Droppable>
              </DragDropContext>
              
              {files.length > 0 && (
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={handleReset}
                  >
                    Clear All
                  </Button>
                  <Button 
                    variant="contained"
                    color="primary"
                    startIcon={<MergeIcon />}
                    onClick={handleMerge}
                    disabled={files.length < 2 || isProcessing}
                  >
                    Merge PDFs
                  </Button>
                </Box>
              )}
            </Card>
          )}
          
          {isProcessing && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Merging your PDF files...
              </Typography>
              <LinearProgress />
            </Box>
          )}
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Box 
            sx={{ 
              display: 'inline-flex', 
              bgcolor: 'success.light', 
              color: 'success.contrastText',
              p: 2,
              borderRadius: '50%',
              mb: 2
            }}
          >
            <CheckIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            PDFs Merged Successfully!
          </Typography>
          <Typography variant="body1" paragraph color="text.secondary">
            Your PDF files have been combined into a single document
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
            <Button 
              variant="outlined"
              onClick={handleReset}
            >
              Merge More Files
            </Button>
            <Button 
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={handleDownload}
            >
              Download PDF
            </Button>
          </Box>
        </Box>
      )}
      
      <Box sx={{ mt: 6 }}>
        <Divider sx={{ mb: 4 }} />
        <Typography variant="h6" gutterBottom>
          How to Merge PDF Files
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          1. Upload two or more PDF files by dragging them into the upload area or by clicking to browse your files.
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          2. Rearrange the files by dragging them into the desired order. The PDFs will be merged in the sequence shown.
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          3. Click "Merge PDFs" to combine your files into one PDF document.
        </Typography>
        <Typography variant="body2" paragraph color="text.secondary">
          4. Download your merged PDF file when processing is complete.
        </Typography>
      </Box>
    </Container>
  );
};

export default MergePDFPage;