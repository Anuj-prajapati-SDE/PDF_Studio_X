import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#738eef',
      dark: '#2934b5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f72585',
      light: '#f95ca3',
      dark: '#c4006e',
      contrastText: '#ffffff', 
    },
    background: {
      default: '#f8faff',
      paper: '#ffffff',
      dark: '#1a1a2e',
      light: '#fafafa',
      card: 'rgba(255, 255, 255, 0.95)',
    },
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    info: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
      disabled: '#9ca3af',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    action: {
      active: '#6b7280',
      hover: 'rgba(67, 97, 238, 0.04)',
      selected: 'rgba(67, 97, 238, 0.12)',
      disabled: 'rgba(67, 97, 238, 0.38)',
      disabledBackground: 'rgba(67, 97, 238, 0.12)',
      focus: 'rgba(67, 97, 238, 0.12)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2.25rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: '1rem',
      lineHeight: 1.4,
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      fontWeight: 600,
      letterSpacing: '0.06em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
    '0 3px 6px rgba(0,0,0,0.06), 0 3px 6px rgba(0,0,0,0.13)',
    '0 10px 20px rgba(0,0,0,0.05), 0 6px 6px rgba(0,0,0,0.12)',
    '0 14px 28px rgba(0,0,0,0.08), 0 10px 10px rgba(0,0,0,0.1)',
    '0 19px 38px rgba(0,0,0,0.12), 0 15px 12px rgba(0,0,0,0.1)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 24px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
          },
        },
        sizeLarge: {
          height: 52,
          fontSize: '1rem',
        },
        containedPrimary: {
          backgroundImage: 'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #3a56d4 0%, #2c3eb6 100%)',
            boxShadow: '0 8px 25px rgba(67, 97, 238, 0.28)',
          },
        },
        containedSecondary: {
          backgroundImage: 'linear-gradient(135deg, #f72585 0%, #e31b70 100%)',
          '&:hover': {
            backgroundImage: 'linear-gradient(135deg, #e31b70 0%, #c4006e 100%)',
            boxShadow: '0 8px 25px rgba(247, 37, 133, 0.28)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.07)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-5px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: 16,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundImage: 'none',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1f2937',
          padding: '10px 16px',
          fontSize: '0.75rem',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 8,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '16px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

// Create a responsive theme
const theme = responsiveFontSizes(baseTheme);

export default theme;