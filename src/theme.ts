// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light', // Change to 'dark' for a sleek night-mode look
    primary: {
      main: '#ff9800', // Vibrant Orange
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ffc107', // Warm Amber
      light: '#ffe082',
      dark: '#ffa000',
      contrastText: '#212121', // Dark text for high readability on amber
    },
    background: {
      default: '#fdfbf7', // Warm, off-white background
      paper: '#ffffff',   // Clean white for cards
    },
    text: {
      primary: '#2d3748',   // Deep slate gray instead of harsh black
      secondary: '#718096', // Muted cool gray
    },
  },
});
