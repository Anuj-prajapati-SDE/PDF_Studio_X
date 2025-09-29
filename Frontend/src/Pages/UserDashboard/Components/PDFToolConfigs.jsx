import React from 'react';
import {
  Compress as CompressIcon,
  PictureAsPdf as MergeIcon,
  CallSplit as SplitIcon,
  Image as ConvertIcon,
  Lock as ProtectIcon,
  LockOpen as UnlockIcon,
  Crop as CropIcon,
  WaterDrop as WatermarkIcon,
  Edit as EditIcon,
  Bolt as ZapIcon,
  Tune as TuneIcon,
  Star as StarIcon,
  Description as FileTextIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  AutoAwesome as AutoAwesomeIcon,
  SwapVert as SwapVertIcon,
  Layers as LayersIcon,
} from '@mui/icons-material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getApiUrl } from '../../../utils/api';
import { pdfService } from '../../../services';

// Mock API functions - replace with actual implementations
const mockProcessPDF = async (file, settings, type = 'compress') => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1500));
  
  // Mock different results based on type
  const mockResults = {
    compress: {
      originalSize: file.size,
      compressedSize: Math.floor(file.size * (1 - (settings.compressionLevel || 50) * 0.01)),
      compressionPercent: settings.compressionLevel || 50,
      name: file.name,
      url: '#'
    }, 
    split: {
      originalPages: Math.floor(Math.random() * 50) + 10,
      splitPages: settings.pageRange ? settings.pageRange.split('-').length : 2,
      parts: settings.splitBy === 'pages' ? Math.ceil(60 / (settings.pagesPerSplit || 10)) : 1,
      name: file.name,
      url: '#'
    },
    merge: {
      totalFiles: 1, // Would be dynamic in real implementation
      totalPages: Math.floor(Math.random() * 100) + 20,
      mergedSize: file.size * 1.2, // Slightly larger
      name: 'merged-document.pdf',
      url: '#'
    },
    protect: {
      passwordSet: Boolean(settings.password),
      permissions: settings.permissions || [],
      encryption: settings.encryptionLevel || 'AES-256',
      name: file.name,
      url: '#'
    }
  };
  
  return {
    success: true,
    data: mockResults[type] || mockResults.compress,
    message: `PDF ${type} completed successfully!`
  };
};

// Base configuration object 
export const createPDFToolConfig = (toolType) => {
  const baseConfig = {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    theme: {
      background: '#030018',
      primary: '#7df9ff',
      secondary: '#60a5fa',
      iconBackground: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
      buttonBackground: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
      titleGradient: 'linear-gradient(90deg, #ffffff, #7df9ff)',
    },
    messages: {
      uploadSuccess: 'PDF uploaded successfully',
      processSuccess: 'PDF processed successfully!',
      processError: 'Failed to process PDF. Please try again.',
      downloadSuccess: 'Downloading your processed PDF',
    },
  };

  const configs = {
    compress: {
      ...baseConfig,
      title: 'Compress Your PDF Files',
      description: 'Reduce PDF file size while maintaining exceptional quality with advanced compression algorithms.',
      toolName: 'PDF Compress Tool',
      toolDescription: 'Optimize PDF file size',
      titleGradient : 'linear-gradient(90deg, #ffffff, #7df9ff)',
      actionName: 'Compress PDF',
      actionIcon: <CompressIcon />,
      icon: <CompressIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload PDF File to Compress',
      uploadDescription: 'Drag & drop your PDF file here or browse files from your device',
      processingMessage: 'Compressing PDF File...',
      processingDescription: 'Optimizing your PDF with selected compression settings',
      successTitle: 'Compression Complete!',
      successMessage: 'Your PDF file was compressed successfully',
      settingsTitle: 'Compression Settings',
      
      defaultSettings: {
        compressionLevel: 50,
        imageQuality: 80,
        removeMetadata: true,
      },
      
      settings: [
        {
          type: 'slider',
          key: 'compressionLevel',
          label: 'Compression Level',
          defaultValue: 50,
          min: 25,
          max: 90,
          step: 25,
          showValue: false,
          marks: [
            { value: 25, label: 'Low' },
            { value: 50, label: 'Medium' },
            { value: 75, label: 'High' },
            { value: 90, label: 'Maximum' }
          ],
          description: 'Higher levels reduce file size but may affect quality',
          gradient: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)'
        },
        {
          type: 'slider',
          key: 'imageQuality',
          label: 'Image Quality',
          defaultValue: 80,
          min: 30,
          max: 100,
          step: 10,
          showValue: true,
          unit: '%',
          description: 'Lower quality = smaller file size, but images may appear pixelated'
        },
        {
          type: 'switch',
          key: 'removeMetadata',
          label: 'Remove metadata (author, creation date, etc.)',
          defaultValue: true
        }
      ],
      
      alerts: [
        {
          type: 'info',
          message: 'Higher compression levels may affect document quality. For documents with important images or graphs, we recommend using medium compression.'
        }
      ],
      
      steps: [
        { text: 'Upload PDF file', color: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)' },
        { text: 'Adjust settings', color: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)' },
        { text: 'Download compressed file', color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }
      ],
      
      features: [
        {
          icon: <ZapIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)',
          title: 'Lightning Fast',
          description: 'Compress PDF files in seconds with optimized algorithms'
        },
        {
          icon: <TuneIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
          title: 'Smart Controls',
          description: 'Fine-tune compression levels and quality settings'
        },
        {
          icon: <StarIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
          title: 'Quality Preserved',
          description: 'Maintain document quality while reducing file size'
        }
      ],
      
      howItWorks: {
        title: 'How to Compress PDF Files',
        steps: [
          {
            description: 'Upload your PDF file by dragging it into the upload area',
            background: 'linear-gradient(135deg, #7df9ff 0%, #60a5fa 100%)'
          },
          {
            description: 'Choose your compression level and adjust image quality settings',
            background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)'
          },
          {
            description: 'Click "Compress PDF" and wait for the optimization to complete',
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
          },
          {
            description: 'Download your compressed PDF with significant size reduction',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
          }
        ]
      },
      
      processFunction: (file, settings) => mockProcessPDF(file, settings, 'compress'),
      
      downloadFunction: (processedFile) => {
        toast.success('Downloading compressed PDF');
        // Implement actual download logic here
      },
      
      // Custom result renderer for compress
      renderResult: (processedFile, handleDownload, handleReset) => (
        <div>Custom compress result UI would go here</div>
      )
    },

    split: {
      ...baseConfig,
      title: 'Split Your PDF Files',
      description: 'Divide PDF documents into separate files or extract specific pages with precision and ease.',
      toolName: 'PDF Split Tool',
      toolDescription: 'Split PDF into parts',
      actionName: 'Split PDF',
      actionIcon: <SplitIcon />,
      icon: <SplitIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload PDF File to Split',
      processingMessage: 'Splitting PDF File...',
      successTitle: 'Split Complete!',
      
      theme: {
        ...baseConfig.theme,
        primary: '#f59e0b',
        secondary: '#fbbf24',
        iconBackground: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        buttonBackground: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #f59e0b)',
      },
      
      defaultSettings: {
        splitBy: 'pages',
        pagesPerSplit: 10,
        pageRange: '1-10',
        extractSpecific: false,
      },
      
      settings: [
        {
          type: 'select',
          key: 'splitBy',
          label: 'Split Method',
          defaultValue: 'pages',
          options: [
            { value: 'pages', label: 'By Number of Pages' },
            { value: 'range', label: 'By Page Range' },
            { value: 'bookmarks', label: 'By Bookmarks' }
          ]
        },
        {
          type: 'slider',
          key: 'pagesPerSplit',
          label: 'Pages Per Split',
          defaultValue: 10,
          min: 1,
          max: 50,
          step: 1,
          showValue: true,
          description: 'Number of pages in each split file'
        },
        {
          type: 'switch',
          key: 'extractSpecific',
          label: 'Extract specific pages only',
          defaultValue: false
        }
      ],
      
      features: [
        {
          icon: <SplitIcon sx={{ fontSize: 28, color: 'white' }} />,
          title: 'Precise Splitting',
          description: 'Split by page numbers, ranges, or bookmarks'
        },
        {
          icon: <SpeedIcon sx={{ fontSize: 28, color: 'white' }} />,
          title: 'Bulk Processing',
          description: 'Handle multiple splits in a single operation'
        },
        {
          icon: <SecurityIcon sx={{ fontSize: 28, color: 'white' }} />,
          title: 'Preserve Quality',
          description: 'Maintain original document quality and formatting'
        }
      ],
      
      steps: [
        { text: 'Upload PDF file' },
        { text: 'Choose split method' },
        { text: 'Download split files' }
      ],
      
      processFunction: (file, settings) => mockProcessPDF(file, settings, 'split')
    },

    merge: {
      ...baseConfig,
      title: 'Merge Your PDF Files',
      description: 'Combine multiple PDF documents into a single file with customizable page order and settings.',
      toolName: 'PDF Merge Tool',
      toolDescription: 'Combine multiple PDFs',
      actionName: 'Merge PDFs',
      actionIcon: <MergeIcon />,
      icon: <MergeIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload PDF Files to Merge',
      uploadDescription: 'Drag & drop multiple PDF files here or browse files from your device',
      processingMessage: 'Merging PDF Files...',
      processingDescription: 'Combining your PDF files in the selected order',
      successTitle: 'Merge Complete!',
      successMessage: 'Your PDF files have been successfully merged into one document',
      
      // Special properties for merge operation
      allowMultipleFiles: true,
      minRequiredFiles: 2,
      maxFiles: 20,
      supportFileReordering: true,
      
      theme: {
        ...baseConfig.theme,
        primary: '#22c55e',
        secondary: '#16a34a',
        iconBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        buttonBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #22c55e)',
      },
      
      messages: {
        uploadSuccess: 'PDF files uploaded successfully',
        processSuccess: 'PDF files merged successfully!',
        processError: 'Failed to merge PDF files. Please try again.',
        downloadSuccess: 'Downloading your merged PDF',
        minFilesRequired: 'Please upload at least 2 PDF files to merge',
      },
      
      defaultSettings: {
        mergeOrder: 'custom',
        addBookmarks: true,
        optimizeSize: true,
        includeOutlines: true,
      },
      
      settings: [
        {
          type: 'select',
          key: 'mergeOrder',
          label: 'Merge Order',
          defaultValue: 'custom',
          options: [
            { value: 'custom', label: 'Custom Order (Drag to Reorder)' },
            { value: 'filename', label: 'By Filename (A-Z)' },
            { value: 'date', label: 'By Creation Date' },
            { value: 'size', label: 'By File Size' }
          ],
          description: 'Choose how to order the files in the merged document'
        },
        {
          type: 'switch',
          key: 'addBookmarks',
          label: 'Add bookmarks for each merged file',
          defaultValue: true,
          description: 'Create bookmarks to navigate between original files'
        },
        {
          type: 'switch',
          key: 'includeOutlines',
          label: 'Preserve original document outlines',
          defaultValue: true,
          description: 'Keep the table of contents from original PDFs'
        },
        {
          type: 'switch',
          key: 'optimizeSize',
          label: 'Optimize merged file size',
          defaultValue: true,
          description: 'Apply compression to reduce final file size'
        }
      ],
      
      alerts: [
        {
          type: 'info',
          message: 'You can drag and drop files to reorder them before merging. The final PDF will follow this exact order.'
        }
      ],
      
      steps: [
        { text: 'Upload multiple PDF files', color: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' },
        { text: 'Reorder files if needed', color: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' },
        { text: 'Configure merge settings', color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
        { text: 'Download merged PDF', color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }
      ],
      
      features: [
        {
          icon: <MergeIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          title: 'Smart Merging',
          description: 'Combine unlimited PDFs while preserving quality and formatting'
        },
        {
          icon: <SwapVertIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          title: 'Custom Ordering',
          description: 'Drag and drop to arrange files in your preferred order'
        },
        {
          icon: <LayersIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          title: 'Bookmark Creation',
          description: 'Automatically generate bookmarks for easy navigation'
        }
      ],
      
      howItWorks: {
        title: 'How to Merge PDF Files',
        steps: [
          {
            description: 'Upload multiple PDF files by dragging them into the upload area',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
          },
          {
            description: 'Drag and drop files to reorder them in your preferred sequence',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
          },
          {
            description: 'Configure merge settings like bookmarks and optimization',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
          },
          {
            description: 'Download your merged PDF with all files combined',
            background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
          }
        ]
      },
      
      // Custom processing function for merge
      processFunction: async (files, settings) => {
        // Simulate processing time based on number of files
        const processingTime = 2000 + (files.length * 500);
        await new Promise(resolve => setTimeout(resolve, processingTime));
        
        // Calculate merged file properties
        const totalSize = Array.isArray(files) ? 
          files.reduce((total, file) => total + file.size, 0) : 
          files.size;
        
        let mergedSize = totalSize * 0.95; // Slight optimization
        if (settings.optimizeSize) {
          mergedSize = totalSize * 0.85; // Better compression
        }
        
        const fileCount = Array.isArray(files) ? files.length : 1;
        const totalPages = fileCount * (Math.floor(Math.random() * 10) + 5); // Mock page count
        
        return {
          success: true,
          data: {
            totalFiles: fileCount,
            totalPages: totalPages,
            originalSize: totalSize,
            mergedSize: Math.floor(mergedSize),
            name: 'merged-document.pdf',
            settings: settings,
            url: '#'
          },
          message: `Successfully merged ${fileCount} PDF files into one document!`
        };
      },
      
      downloadFunction: (processedFile) => {
        toast.success('Downloading your merged PDF');
        // Implement actual download logic here
      }
    },

    convert: {
      ...baseConfig,
      title: 'Convert Your PDF Files',
      description: 'Transform PDF documents to various formats including images, Word, Excel, and PowerPoint.',
      toolName: 'PDF Convert Tool',
      toolDescription: 'Convert PDF to other formats',
      actionName: 'Convert PDF',
      actionIcon: <ConvertIcon />,
      icon: <ConvertIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload PDF File to Convert',
      processingMessage: 'Converting PDF File...',
      successTitle: 'Conversion Complete!',
      
      theme: {
        ...baseConfig.theme,
        primary: '#8b5cf6',
        secondary: '#7c3aed',
        iconBackground: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        buttonBackground: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #8b5cf6)',
      },
      
      defaultSettings: {
        outputFormat: 'JPG',
        imageQuality: 95,
        dpi: 300,
        colorSpace: 'RGB',
      },
      
      settings: [
        {
          type: 'select',
          key: 'outputFormat',
          label: 'Output Format',
          defaultValue: 'JPG',
          options: [
            { value: 'JPG', label: 'JPEG Image' },
            { value: 'PNG', label: 'PNG Image' },
            { value: 'WORD', label: 'Microsoft Word' },
            { value: 'EXCEL', label: 'Microsoft Excel' },
            { value: 'POWERPOINT', label: 'PowerPoint' }
          ]
        },
        {
          type: 'slider',
          key: 'imageQuality',
          label: 'Image Quality',
          defaultValue: 95,
          min: 50,
          max: 100,
          step: 5,
          showValue: true,
          unit: '%',
          description: 'Higher quality produces better images but larger files'
        },
        {
          type: 'select',
          key: 'dpi',
          label: 'Resolution (DPI)',
          defaultValue: 300,
          options: [
            { value: 150, label: '150 DPI (Web)' },
            { value: 300, label: '300 DPI (Print)' },
            { value: 600, label: '600 DPI (High Quality)' }
          ]
        }
      ],
      
      processFunction: (file, settings) => mockProcessPDF(file, settings, 'convert')
    },

    protect: {
      ...baseConfig,
      title: 'Protect Your PDF Files',
      description: 'Secure PDF documents with passwords and permission controls to restrict access and editing.',
      toolName: 'PDF Protect Tool',
      toolDescription: 'Add password protection',
      actionName: 'Protect PDF',
      actionIcon: <ProtectIcon />,
      icon: <ProtectIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload PDF File to Protect',
      processingMessage: 'Protecting PDF File...',
      successTitle: 'Protection Applied!',
      
      theme: {
        ...baseConfig.theme,
        primary: '#ef4444',
        secondary: '#dc2626',
        iconBackground: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        buttonBackground: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #ef4444)',
      },
      
      defaultSettings: {
        userPassword: '',
        ownerPassword: '',
        encryptionLevel: 'AES-256',
        allowPrinting: false,
        allowCopying: false,
        allowModifying: false,
      },
      
      settings: [
        {
          type: 'select',
          key: 'encryptionLevel',
          label: 'Encryption Level',
          defaultValue: 'AES-256',
          options: [
            { value: 'AES-128', label: 'AES-128 (Standard)' },
            { value: 'AES-256', label: 'AES-256 (High Security)' }
          ]
        },
        {
          type: 'switch',
          key: 'allowPrinting',
          label: 'Allow printing',
          defaultValue: false
        },
        {
          type: 'switch',
          key: 'allowCopying',
          label: 'Allow copying text and images',
          defaultValue: false
        },
        {
          type: 'switch',
          key: 'allowModifying',
          label: 'Allow document modification',
          defaultValue: false
        }
      ],
      
      alerts: [
        {
          type: 'warning',
          message: 'Remember your password! We cannot recover lost passwords for security reasons.'
        }
      ],
      
      processFunction: (file, settings) => mockProcessPDF(file, settings, 'protect')
    },
    wordToPDF: {
      ...baseConfig,
      title: 'Convert Word to PDF Files',
      description: 'Transform Word documents into professional high-quality PDF files while preserving all formatting and fonts.',
      toolName: 'Word to PDF Tool',
      toolDescription: 'Convert with precision',
      actionName: 'Convert to PDF',
      actionIcon: <FileTextIcon />,
      icon: <FileTextIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload Word Document to Convert',
      uploadDescription: 'Drag & drop your Word document here or browse files from your device',
      processingMessage: 'Converting Word Document to PDF...',
      processingDescription: 'Processing your document with selected quality settings',
      successTitle: 'Conversion Complete!',
      successMessage: 'Your Word document has been successfully converted to PDF',
      settingsTitle: 'Conversion Settings',
      
      // Word-specific file acceptance
      maxFileSize: 50 * 1024 * 1024, // 50MB
      acceptedFileTypes: {
        'application/msword': ['.doc'],
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
        'application/vnd.ms-word.document.macroEnabled.12': ['.docm']
      },
      
      theme: {
        ...baseConfig.theme,
        primary: '#2b5797', // Word blue
        secondary: '#4285f4',
        iconBackground: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
        buttonBackground: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #aac7ff)',
      },
      
      messages: {
        uploadSuccess: 'Word document uploaded successfully',
        processSuccess: 'Word document converted to PDF successfully!',
        processError: 'Failed to convert document. Please try again.',
        downloadSuccess: 'Downloading your PDF file',
      },
      
      defaultSettings: {
        quality: 'high',
        preserveHyperlinks: true,
        preserveFormFields: true,
        fontEmbedding: 'embed',
        pdfVersion: '1.7',
        optimizeSize: true,
        compressionLevel: 70,
      },
      
      settings: [
        {
          type: 'select',
          key: 'quality',
          label: 'PDF Quality',
          defaultValue: 'high',
          options: [
            { value: 'low', label: 'Low (Smaller Size)' },
            { value: 'medium', label: 'Medium (Balanced)' },
            { value: 'high', label: 'High (Best Quality)' }
          ],
          description: 'Higher quality produces better PDFs but larger file sizes'
        },
        {
          type: 'select',
          key: 'pdfVersion',
          label: 'PDF Version',
          defaultValue: '1.7',
          options: [
            { value: '1.4', label: 'PDF 1.4 (Older Systems)' },
            { value: '1.5', label: 'PDF 1.5 (Legacy)' },
            { value: '1.6', label: 'PDF 1.6' },
            { value: '1.7', label: 'PDF 1.7 (Recommended)' }
          ],
          description: 'Choose PDF version for compatibility'
        },
        {
          type: 'select',
          key: 'fontEmbedding',
          label: 'Font Embedding',
          defaultValue: 'embed',
          options: [
            { value: 'none', label: 'No Font Embedding' },
            { value: 'subset', label: 'Subset Fonts (Smaller Size)' },
            { value: 'embed', label: 'Embed All Fonts' }
          ],
          description: 'Font embedding ensures consistent appearance across devices'
        },
        {
          type: 'switch',
          key: 'preserveHyperlinks',
          label: 'Preserve hyperlinks',
          defaultValue: true,
          description: 'Keep clickable links in the PDF'
        },
        {
          type: 'switch',
          key: 'preserveFormFields',
          label: 'Preserve form fields',
          defaultValue: true,
          description: 'Keep interactive form elements'
        },
        {
          type: 'switch',
          key: 'optimizeSize',
          label: 'Optimize PDF size',
          defaultValue: true,
          description: 'Apply compression to reduce file size'
        },
        {
          type: 'slider',
          key: 'compressionLevel',
          label: 'Compression Level',
          defaultValue: 70,
          min: 10,
          max: 95,
          step: 5,
          showValue: true,
          unit: '%',
          description: 'Higher compression may affect image quality',
          conditionalDisplay: (settings) => settings.optimizeSize
        }
      ],
      
      alerts: [
        {
          type: 'info',
          message: 'For documents with complex formatting, we recommend using high quality settings and embedding all fonts to maintain visual fidelity.'
        }
      ],
      
      steps: [
        { text: 'Upload Word document', color: 'linear-gradient(135deg, #aac7ff 0%, #4285f4 100%)' },
        { text: 'Configure settings', color: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)' },
        { text: 'Download PDF file', color: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' }
      ],
      
      features: [
        {
          icon: <FileTextIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)',
          title: 'Perfect Conversion',
          description: 'Maintain all formatting, fonts, and layout elements'
        },
        {
          icon: <StarIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          title: 'Professional Output',
          description: 'Generate high-quality PDFs ready for sharing and printing'
        },
        {
          icon: <SecurityIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          title: 'Secure Processing',
          description: 'Your documents are processed securely and never stored'
        }
      ],
      
      howItWorks: {
        title: 'How to Convert Word to PDF',
        steps: [
          {
            description: 'Upload your Word document by dragging it into the upload area',
            background: 'linear-gradient(135deg, #aac7ff 0%, #4285f4 100%)'
          },
          {
            description: 'Choose quality settings and PDF version based on your needs',
            background: 'linear-gradient(135deg, #2b5797 0%, #4285f4 100%)'
          },
          {
            description: 'Configure font embedding and hyperlink preservation options',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
          },
          {
            description: 'Download your converted PDF with preserved formatting',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
          }
        ]
      },
      
      // Custom processing function for Word to PDF
      processFunction: async (file, settings) => {
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        // Calculate realistic file size based on original and quality settings
        let sizeMultiplier = 1.2; // PDF is often larger than DOCX
        
        if (settings.quality === 'low') {
          sizeMultiplier = 0.9;
        } else if (settings.quality === 'high') {
          sizeMultiplier = 1.3;
        }
        
        if (settings.optimizeSize && settings.compressionLevel) {
          sizeMultiplier *= (1 - (settings.compressionLevel / 200)); // Reduce size based on compression
        }
        
        const originalSize = file.size;
        const convertedSize = Math.floor(originalSize * sizeMultiplier);
        
        return {
          success: true,
          data: {
            originalSize,
            convertedSize,
            name: file.name.replace(/\.docx?$/i, '.pdf'),
            originalName: file.name,
            quality: settings.quality,
            pdfVersion: settings.pdfVersion,
            preserveHyperlinks: settings.preserveHyperlinks,
            preserveFormFields: settings.preserveFormFields,
            optimizeSize: settings.optimizeSize,
            compressionLevel: settings.compressionLevel,
            url: '#'
          },
          message: 'Word document converted to PDF successfully!'
        };
      },
      
      downloadFunction: (processedFile) => {
        toast.success('Downloading your PDF file');
        // Implement actual download logic here
      }
    },

    createPDF: {
      ...baseConfig,
      title: 'Create PDF from Images',
      description: 'Transform your images into professional PDF documents with customizable layouts, watermarks, and formatting options.',
      toolName: 'PDF Creation Tool',
      toolDescription: 'Convert images to PDF',
      actionName: 'Create PDF',
      actionIcon: <FileTextIcon />,
      icon: <FileTextIcon sx={{ fontSize: 24, color: 'white' }} />,
      uploadTitle: 'Upload Images to Create PDF',
      uploadDescription: 'Drag & drop your images here or browse files from your device',
      processingMessage: 'Creating PDF from Images...',
      processingDescription: 'Processing your images with selected layout and customization settings',
      successTitle: 'PDF Created Successfully!',
      successMessage: 'Your PDF document has been created successfully from the uploaded images',
      settingsTitle: 'PDF Creation Settings',
      
      // Image-specific file acceptance
      maxFileSize: 10 * 1024 * 1024, // 10MB per image
      acceptedFileTypes: {
        'image/jpeg': ['.jpg', '.jpeg'],
        'image/png': ['.png'],
        'image/gif': ['.gif'],
        'image/webp': ['.webp']
      },
      
      // Special properties for create PDF (multi-file support)
      allowMultipleFiles: true,
      minRequiredFiles: 1,
      maxFiles: 50,
      supportFileReordering: true,
      
      theme: {
        ...baseConfig.theme,
        primary: '#e65100', // Orange for create
        secondary: '#ff9800',
        iconBackground: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
        buttonBackground: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
        titleGradient: 'linear-gradient(90deg, #ffffff, #ffab40)',
      },
      
      messages: {
        uploadSuccess: 'Images uploaded successfully',
        processSuccess: 'PDF created from images successfully!',
        processError: 'Failed to create PDF. Please try again.',
        downloadSuccess: 'Downloading your created PDF',
        minFilesRequired: 'Please upload at least 1 image to create PDF',
      },
      
      defaultSettings: {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        imagesPerPage: 1,
        pageMargins: 20,
        preserveAspectRatio: true,
        addWatermark: false,
        watermarkText: 'CONFIDENTIAL',
        watermarkOpacity: 0.3,
        watermarkColor: '#FF0000',
        addHeader: false,
        headerText: '',
        addFooter: false,
        footerText: '',
        addPageNumbers: false,
        pageNumberPosition: 'bottom-center'
      },
      
      settings: [
        {
          type: 'select',
          key: 'pageSize',
          label: 'Page Size',
          defaultValue: 'A4',
          options: [
            { value: 'A4', label: 'A4 (210 × 297 mm)' },
            { value: 'A5', label: 'A5 (148 × 210 mm)' },
            { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
            { value: 'Legal', label: 'Legal (8.5 × 14 in)' }
          ],
          description: 'Choose the page size for your PDF document'
        },
        {
          type: 'select',
          key: 'pageOrientation',
          label: 'Page Orientation',
          defaultValue: 'portrait',
          options: [
            { value: 'portrait', label: 'Portrait' },
            { value: 'landscape', label: 'Landscape' }
          ]
        },
        {
          type: 'select',
          key: 'imagesPerPage',
          label: 'Images Per Page',
          defaultValue: 1,
          options: [
            { value: 1, label: '1 image per page' },
            { value: 2, label: '2 images per page' },
            { value: 4, label: '4 images per page' },
            { value: 6, label: '6 images per page' }
          ],
          description: 'How many images to place on each page'
        },
        {
          type: 'slider',
          key: 'pageMargins',
          label: 'Page Margins',
          defaultValue: 20,
          min: 0,
          max: 50,
          step: 5,
          showValue: true,
          unit: 'mm',
          description: 'Margin size around the page content'
        },
        {
          type: 'switch',
          key: 'preserveAspectRatio',
          label: 'Preserve image aspect ratio',
          defaultValue: true,
          description: 'Maintain original image proportions'
        },
        {
          type: 'switch',
          key: 'addWatermark',
          label: 'Add watermark to pages',
          defaultValue: false,
          description: 'Add a watermark overlay to each page'
        },
        {
          type: 'select',
          key: 'watermarkColor',
          label: 'Watermark Color',
          defaultValue: '#FF0000',
          options: [
            { value: '#FF0000', label: 'Red' },
            { value: '#000000', label: 'Black' },
            { value: '#0000FF', label: 'Blue' },
            { value: '#808080', label: 'Gray' }
          ],
          conditionalDisplay: (settings) => settings.addWatermark,
          description: 'Choose watermark text color'
        },
        {
          type: 'slider',
          key: 'watermarkOpacity',
          label: 'Watermark Opacity',
          defaultValue: 0.3,
          min: 0.1,
          max: 1.0,
          step: 0.1,
          showValue: true,
          unit: '',
          conditionalDisplay: (settings) => settings.addWatermark,
          description: 'Transparency level of the watermark'
        },
        {
          type: 'switch',
          key: 'addPageNumbers',
          label: 'Add page numbers',
          defaultValue: false,
          description: 'Include page numbers on each page'
        },
        {
          type: 'select',
          key: 'pageNumberPosition',
          label: 'Page Number Position',
          defaultValue: 'bottom-center',
          options: [
            { value: 'bottom-center', label: 'Bottom Center' },
            { value: 'bottom-right', label: 'Bottom Right' },
            { value: 'bottom-left', label: 'Bottom Left' }
          ],
          conditionalDisplay: (settings) => settings.addPageNumbers,
          description: 'Where to place page numbers'
        }
      ],
      
      alerts: [
        {
          type: 'info',
          message: 'You can drag and drop images to reorder them before creating the PDF. Large images will be optimized for better file size.'
        }
      ],
      
      steps: [
        { text: 'Upload image files', color: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)' },
        { text: 'Configure page layout', color: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)' },
        { text: 'Add customizations', color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' },
        { text: 'Download PDF', color: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' }
      ],
      
      features: [
        {
          icon: <FileTextIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)',
          title: 'Professional PDFs',
          description: 'Create high-quality PDF documents from your images'
        },
        {
          icon: <TuneIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)',
          title: 'Flexible Layout',
          description: 'Customize page sizes, orientation, and image arrangement'
        },
        {
          icon: <AutoAwesomeIcon sx={{ fontSize: 28, color: 'white' }} />,
          iconBackground: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          title: 'Advanced Features',
          description: 'Add watermarks, headers, footers, and page numbers'
        }
      ],
      
      howItWorks: {
        title: 'How to Create PDF from Images',
        steps: [
          {
            description: 'Upload your images by dragging them into the upload area',
            background: 'linear-gradient(135deg, #e65100 0%, #ff9800 100%)'
          },
          {
            description: 'Choose page size, orientation, and how many images per page',
            background: 'linear-gradient(135deg, #6836e6 0%, #8c5eff 100%)'
          },
          {
            description: 'Add watermarks, page numbers, and other customizations',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
          },
          {
            description: 'Download your professionally formatted PDF document',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
          }
        ]
      },
      
      // Custom processing function for create PDF from images
      processFunction: async (files, settings) => {
        try {
          // Call the actual PDF service
          const response = await pdfService.createPDFFromImages(files, settings);
          
          if (response.success) {
            return {
              success: true,
              data: {
                ...response.data,
                url: pdfService.getPDFDownloadUrl(response.data.filename)
              },
              message: response.message || `Successfully created PDF with ${Array.isArray(files) ? files.length : 1} images!`
            };
          } else {
            throw new Error(response.message || 'Failed to create PDF');
          }
        } catch (error) {
          console.error('Error creating PDF:', error);
          return {
            success: false,
            message: error.message || 'Failed to create PDF. Please try again.'
          };
        }
      },
      
      downloadFunction: (processedFile) => {
        if (processedFile && processedFile.url) {
          // Open the download URL in a new tab
          window.open(processedFile.url, '_blank');
          toast.success('Downloading your created PDF');
        } else {
          toast.error('No file available for download');
        }
      }
    }

  };

  return configs[toolType] || configs.compress;
};

// Export individual configurations for easy import
export const compressConfig = createPDFToolConfig('compress');
export const splitConfig = createPDFToolConfig('split');
export const mergeConfig = createPDFToolConfig('merge');
export const convertConfig = createPDFToolConfig('convert');
export const protectConfig = createPDFToolConfig('protect');
export const wordToPDFConfig = createPDFToolConfig('wordToPDF');
export const createPDFConfig = createPDFToolConfig('createPDF');

// Default export
export default createPDFToolConfig;