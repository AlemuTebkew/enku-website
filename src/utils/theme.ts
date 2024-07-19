// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FC2779', // Replace with your primary color
    },
    secondary: {
      main: '#FF92BB', // Replace with your secondary color
    },
    background: {
      default: '#FFFFFF', // Replace with your background color
    },
    text: {
      primary: '#000000', // Replace with your primary text color
      secondary: '#555555', // Replace with your secondary text color
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif', // Replace with your preferred font
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#FC2779', // Replace with your primary color
        },
      },
    },
  },
});

export default theme;
