import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, GlobalStyles } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// Theme
import theme from './theme';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import HomePage from './pages/HomePage';
import MergePDFPage from './pages/MergePDFPage';
import SplitPDFPage from './pages/SplitPDFPage';
import ConvertPDFPage from './pages/ConvertPDFPage';
import CreatePDFPage from './Pages/CreatePDFPage';
import ProtectPDFPage from './Pages/ProtectedPDFPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './Pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';
import CompressPDFPage from './Pages/CompressPDFpage';
import PDFToWordPage from './Pages/PDFToWordPage';
import PDFToPowerPointPage from './Pages/PDFToPowerPointPage';
import PDFToExcelPage from './Pages/PDFToExcelPage';
import WordToPDFPage from './Pages/WordToPDFPage';
import PowerPointToPDFPage from './Pages/PowerPointToPDFPage';
import ExcelToPDFPage from './Pages/ExcelToPDFPage';
import ImageCompressionPage from './Pages/ImageCompressionPage';
import PDFToJPGPage from './Pages/PDFToJPGPage';
import SignPDFPage from './Pages/SignPDFPage';
import WatermarkPDFPage from './Pages/WaterMarkPDFPage';
import UnlockPDFPage from './Pages/UnlockPDFPage';
import CropPDFPage from './Pages/CropPDFPage';
import EditPDFPage from './Pages/EditPDFPage';
import SignupPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
// import JPGToPDFPage from './Pages/JPGToPDF.JSX';

// Global styles
const globalStyles = {
  '*::-webkit-scrollbar': {
    width: '8px',
    height: '8px',
  },
  '*::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '10px',
  },
  '*::-webkit-scrollbar-thumb': {
    background: '#c1c1c1',
    borderRadius: '10px',
    '&:hover': {
      background: '#a8a8a8',
    },
  },
  'a': {
    textDecoration: 'none',
  },
  '.glassmorphism': {
    background: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  '.text-gradient': {
    backgroundImage: 'linear-gradient(to right, #4361ee, #3a0ca3)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '.text-gradient-pink': {
    backgroundImage: 'linear-gradient(to right, #f72585, #7209b7)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  '.bg-gradient': {
    backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)',
  },
  '.bg-gradient-light': {
    backgroundImage: 'linear-gradient(135deg, rgba(67, 97, 238, 0.1) 0%, rgba(58, 12, 163, 0.1) 100%)',
  },
  '.bg-gradient-secondary': {
    backgroundImage: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)',
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
  '.float-animation': {
    animation: 'float 6s ease-in-out infinite',
  },
  '.shadow-card': {
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
  },
  '.transition-all': {
    transition: 'all 0.3s ease',
  },
};

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
            fontSize: '16px',
          }
        }} 
      />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="pricing" element={<PricingPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="login" element={<LoginPage />} />
            
            </Route>
            <Route path="/tools" element={<DashboardLayout />}>
              <Route path="merge-pdf" element={<MergePDFPage />} />
              <Route path="split-pdf" element={<SplitPDFPage />} />
              <Route path="convert-pdf" element={<ConvertPDFPage />} />
              <Route path="create-pdf" element={<CreatePDFPage />} />
              <Route path="protect-pdf" element={<ProtectPDFPage />} />
              <Route path="compress-pdf" element={<CompressPDFPage />} />
              <Route path="pdf-to-word" element={<PDFToWordPage />} />
              <Route path="pdf-to-power-point" element={<PDFToPowerPointPage />} />
              <Route path="pdf-to-excel" element={<PDFToExcelPage/>} />
              <Route path="word-to-pdf" element={<WordToPDFPage/>} />
              <Route path="power-point-to-pdf" element={<PowerPointToPDFPage/>} />
              <Route path="excel-to-pdf" element={<ExcelToPDFPage/>} />
              <Route path="image-compression" element={<ImageCompressionPage/>} />
              <Route path="pdf-to-jpg" element={<PDFToJPGPage/>} />
              {/* <Route path="jpg-to-pdf" element={<JPGToPDFPage/>} /> */}
              <Route path="add-sign" element={<SignPDFPage/>} />
              <Route path="watermark-pdf" element={<WatermarkPDFPage/>} />
              <Route path="unlock-pdf" element={<UnlockPDFPage/>} />
              <Route path="crop-pdf" element={<CropPDFPage/>} />
              <Route path="edit-pdf" element={<EditPDFPage/>} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;