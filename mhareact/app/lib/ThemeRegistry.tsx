'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { themeConfig } from '../data/index';

// Build the MUI theme entirely from data.json's "theme" section
const theme = createTheme({
  palette: {
    primary:    { main: themeConfig.palette.primary.main,    light: themeConfig.palette.primary.light,    dark: themeConfig.palette.primary.dark,    contrastText: themeConfig.palette.primary.contrastText },
    secondary:  { main: themeConfig.palette.secondary.main,  light: themeConfig.palette.secondary.light,  dark: themeConfig.palette.secondary.dark,  contrastText: themeConfig.palette.secondary.contrastText },
    error:      { main: themeConfig.palette.error.main,      light: themeConfig.palette.error.light,      dark: themeConfig.palette.error.dark },
    warning:    { main: themeConfig.palette.warning.main,    light: themeConfig.palette.warning.light,    dark: themeConfig.palette.warning.dark },
    success:    { main: themeConfig.palette.success.main,    light: themeConfig.palette.success.light,    dark: themeConfig.palette.success.dark },
    info:       { main: themeConfig.palette.info.main,       light: themeConfig.palette.info.light,       dark: themeConfig.palette.info.dark },
    background: { default: themeConfig.palette.background.default, paper: themeConfig.palette.background.paper },
    text:       { primary: themeConfig.palette.text.primary, secondary: themeConfig.palette.text.secondary },
  },
  shape: { borderRadius: themeConfig.shape.borderRadius },
  typography: {
    fontFamily: themeConfig.typography.fontFamily,
    h1: { fontWeight: themeConfig.typography.h1.fontWeight },
    h2: { fontWeight: themeConfig.typography.h2.fontWeight },
    h3: { fontWeight: themeConfig.typography.h3.fontWeight },
    h4: { fontWeight: themeConfig.typography.h4.fontWeight },
    subtitle1: { fontWeight: themeConfig.typography.subtitle1.fontWeight },
    button: { textTransform: 'none', fontWeight: themeConfig.typography.button.fontWeight },
  },
  components: {
    MuiCard:   { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: '1px solid #E5EAF0' } } },
    MuiPaper:  { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: '1px solid #E5EAF0' } } },
    MuiChip:   { styleOverrides: { root: { fontWeight: 600 } } },
    MuiTab:    { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } },
  },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
