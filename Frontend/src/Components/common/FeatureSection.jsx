import React from 'react';
import { 
  Container, Box, Typography, Grid, Card, Button, Chip,
  useMediaQuery, useTheme, GlobalStyles
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeatureSection = ({ tools }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <GlobalStyles
        styles={{
          '@keyframes shimmer': {
            '0%': {
              opacity: 0.8,
              transform: 'scale(1)',
            },
            '50%': {
              opacity: 1,
              transform: 'scale(1.02)',
            },
            '100%': {
              opacity: 0.8,
              transform: 'scale(1)',
            },
          },
        }}
      />
      <Box
        sx={{
          py: { xs: 8, md: 10 },
          my: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="lg">
        <Box sx={{ 
          textAlign: 'center', 
          mb: { xs: 8, md: 10 },
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120%',
              height: '200px',
              background: `radial-gradient(ellipse at center, ${theme.palette.primary.main}15 0%, transparent 70%)`,
              borderRadius: '50%',
              zIndex: -1,
            }}
          />

          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Chip
              label="✨ Features"
              color="primary"
              sx={{
                fontWeight: 700,
                px: 3,
                py: 3.5,
                borderRadius: '50px',
                mb: 4,
                fontSize: { xs: '0.875rem', md: '1rem' },
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.palette.primary.main}30`,
                boxShadow: `0 8px 32px ${theme.palette.primary.main}25`,
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                '&:hover': {
                  transform: 'translateY(-2px) scale(1.05)',
                  boxShadow: `0 12px 40px ${theme.palette.primary.main}35`,
                  background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                },
              }}
            />
            
            <Typography
              variant={isMobile ? "h3" : "h1"}
              component="h2"
              sx={{
                fontWeight: 900,
                mb: { xs: 3, md: 4 },
                letterSpacing: '-0.03em',
                lineHeight: { xs: 1.2, md: 1.1 },
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5rem' },
                textShadow: '0 4px 20px rgba(0,0,0,0.1)',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: { xs: '60px', md: '80px' },
                  height: '4px',
                  background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
                  borderRadius: '2px',
                  opacity: 0.7,
                },
              }}
            >
              Every PDF Tool{' '}
              <Box 
                component="span" 
                sx={{ 
                  position: 'relative',
                  '&::before': {
                    content: '"You Need"',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }
                }}
              >
                You Need
              </Box>
            </Typography>
            
            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="text.secondary"
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                fontWeight: 500,
                lineHeight: 1.7,
                opacity: 0.9,
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                mb: 2,
                textShadow: '0 2px 10px rgba(0,0,0,0.1)',
                background: `linear-gradient(135deg, ${theme.palette.text.secondary}, ${theme.palette.text.primary}90)`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              From simple conversions to complex editing, our comprehensive suite of tools 
              handles it all with{' '}
              <Box 
                component="span" 
                sx={{ 
                  fontWeight: 700,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                unmatched precision and ease
              </Box>
              .
            </Typography>

            {/* Stats or badges */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: { xs: 2, md: 4 },
                mt: 4,
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: '20+', sublabel: 'PDF Tools' },
                { label: '99.9%', sublabel: 'Accuracy' },
                { label: '10M+', sublabel: 'Files Processed' },
              ].map((stat, index) => (
                <Box
                  key={index}
                  sx={{
                    textAlign: 'center',
                    opacity: 0.8,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 800,
                      color: theme.palette.primary.main,
                      fontSize: { xs: '1.2rem', md: '1.4rem' },
                    }}
                  >
                    {stat.label}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: { xs: '0.75rem', md: '0.875rem' },
                      fontWeight: 500,
                      opacity: 0.7,
                    }}
                  >
                    {stat.sublabel}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Grid container spacing={{ xs: 2, sm: 3, md: 2.5 }} justifyContent={'center'}>
          {tools.map((tool, index) => (
            <Grid item xs={12} sm={8} md={6} lg={2} key={index}>
              <Card
          
                elevation={0}
                sx={{
                  borderRadius: { xs: 3, md: 4 },
                  p: { xs: 3, md: 4 },
                  transition: 'all 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  width: "350px",
                  height: "300px",
                  color: 'white',
                  flexDirection: 'column',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateZ(5px) translateY(-7px) scale(1.01)',
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
                      border: '1px solid',
                      borderColor: tool.color,
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
    </>
  );
};

export default FeatureSection;