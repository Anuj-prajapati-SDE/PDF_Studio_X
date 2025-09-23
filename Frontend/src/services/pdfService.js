import axios from 'axios';

// Base URL from environment variables or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add authentication token to requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// PDF Service functions
const pdfService = {
  /**
   * Create a PDF from uploaded images
   * @param {FileList} images - The image files to convert to PDF
   * @param {Object} options - PDF creation options
   * @param {string} options.pageSize - Page size (A4, Letter, etc.)
   * @param {number} options.imagesPerPage - Number of images per page
   * @param {boolean} options.preserveAspectRatio - Whether to preserve image aspect ratio
   * @returns {Promise} - Promise that resolves to the created PDF data
   */
  createPDFFromImages: async (images, options = {}) => {
    try {
      // Create form data for file upload
      const formData = new FormData();
      
      // Add each image to form data
      Array.from(images).forEach((image) => {
        formData.append('images', image);
      });
      
      // Add options to form data
      Object.keys(options).forEach((key) => {
        formData.append(key, options[key]);
      });
      
      // Set content type to multipart/form-data for file upload
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      
      // Make the API request
      const response = await apiClient.post('/pdf/create-from-images', formData, config);
      
      return response.data;
    } catch (error) {
      console.error('Error creating PDF:', error);
      throw error;
    }
  },
  
  /**
   * Get the download URL for a PDF
   * @param {string} filename - The filename of the PDF to download
   * @returns {string} - The full URL for downloading the PDF
   */
  getPDFDownloadUrl: (filename) => {
    return `${API_BASE_URL}/pdf/download/${filename}`;
  },
};

export default pdfService;