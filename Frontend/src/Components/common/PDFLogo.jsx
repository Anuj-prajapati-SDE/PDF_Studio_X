import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const PdfLogo = ({ size = 40, light = false }) => {
  const mainColor = light ? '#ffffff' : '#4361ee';
  const textColor = light ? '#ffffff' : '#1f2937';
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ rotate: -10, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <Box
          sx={{
            position: 'relative',
            width: size,
            height: size * 1.3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'visible',
          }}
        >
          {/* Document base */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: size * 0.8,
              height: size * 1.1,
              background: mainColor,
              borderRadius: size * 0.05,
              boxShadow: light ? '0 4px 12px rgba(255, 255, 255, 0.2)' : '0 4px 12px rgba(67, 97, 238, 0.3)',
            }}
          />
          
          {/* Folded corner */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: size * 0.2,
              width: size * 0.25,
              height: size * 0.25,
              backgroundColor: light ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)',
              clipPath: 'polygon(0 0, 100% 100%, 100% 0)',
              zIndex: 2,
            }}
          />
          
          {/* PDF text */}
          <Box
            sx={{
              position: 'absolute',
              top: size * 0.4,
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 900,
              fontSize: size * 0.4,
              letterSpacing: '-0.05em',
              color: light ? 'rgba(255, 255, 255, 0.9)' : 'white',
              zIndex: 3,
            }}
          >
            PDF
          </Box>
          
          {/* Front page */}
          <Box
            component={motion.div}
            initial={{ x: size * 0.1, opacity: 0.5 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              position: 'absolute',
              top: size * 0.1,
              left: size * 0.1,
              width: size * 0.8,
              height: size * 1.1,
              background: 'white',
              borderRadius: size * 0.05,
              border: `${size * 0.01}px solid rgba(0, 0, 0, 0.1)`,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)',
              zIndex: 1,
            }}
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default PdfLogo;