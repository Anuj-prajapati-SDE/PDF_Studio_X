import React from 'react';
import { 
  Container, Box, Typography, Grid, Card, Button, Chip,
  useMediaQuery, useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeatureSection = ({ tools }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        py: { xs: 8, md: 10 },
        my: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 6, md: 8 },
        }}>
          <Chip
            label="Features"
            color="primary"
            sx={{
              fontWeight: 600,
              px: 2.5,
              py: 3,
              borderRadius: '50px',
              mb: 3,
            }}
          />
          
          <Typography
            variant={isMobile ? "h3" : "h2"}
            component="h2"
            sx={{
              fontWeight: 800,
              mb: { xs: 2, md: 3 },
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}
          >
            Every PDF Tool You Need
          </Typography>
          
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{ 
              maxWidth: '700px', 
              mx: 'auto', 
              fontWeight: 400,
              lineHeight: 1.6,
              opacity: 0.9,
            }}
          >
            From simple conversions to complex editing, our suite of tools handles it all
            with unmatched precision and ease.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 2.5 }} justifyContent={'center'}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={8} md={6} lg={2} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: { xs: 'auto', lg: '300px' }, // Fixed height for laptop screens
                  minHeight: { xs: '300px', sm: '350px' }, // Minimum height for smaller screens
                  borderRadius: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  color: 'white',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateZ(10px) translateY(-12px) scale(1.03)',
                  }
                }}
              >
                <Box
                  sx={{
                    width: { xs: 60, md: 70 },
                    height: { xs: 60, md: 70 },
                    borderRadius: 3,
                    bgcolor: tool.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.15) rotate(8deg)',
                    }
                  }}
                >
                  {tool.icon}
                </Box>

                <Typography 
                  variant="h5" 
                  gutterBottom 
                  fontWeight={700}
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    mb: 1.5,
                  }}
                >
                  {tool.title}
                </Typography>

                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{
                    mb: 3, 
                    opacity: 0.85,
                    lineHeight: 1.6,
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  {tool.description}
                </Typography>

                <Box sx={{ mt: 'auto' }}>
                  <Button
                    variant="text"
                    component={RouterLink}
                    to={tool.path}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ 
                      fontWeight: 600, 
                      color: tool.color,
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: `${tool.color}10`,
                        transform: 'translateX(8px) scale(1.05)',
                      },
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                    }}
                  >
                    Try Now
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeatureSection;