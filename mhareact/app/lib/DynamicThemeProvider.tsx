'use client';

import { useMemo } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeConfig } from '../data/index';
import { useAppSelector } from '../store/hooks';

export default function DynamicThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useAppSelector((s) => s.ui.isDark);

  const dark = themeConfig.darkPalette;
  const light = themeConfig.palette;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          primary:    isDark ? { main: dark.primary.main,   light: dark.primary.light,   dark: dark.primary.dark,   contrastText: dark.primary.contrastText }
                             : { main: light.primary.main,  light: light.primary.light,  dark: light.primary.dark,  contrastText: light.primary.contrastText },
          secondary:  isDark ? { main: dark.secondary.main, light: dark.secondary.light, dark: dark.secondary.dark, contrastText: dark.secondary.contrastText }
                             : { main: light.secondary.main,light: light.secondary.light,dark: light.secondary.dark,contrastText: light.secondary.contrastText },
          error:      isDark ? { main: dark.error.main,   light: dark.error.light,   dark: dark.error.dark   }
                             : { main: light.error.main,  light: light.error.light,  dark: light.error.dark  },
          warning:    isDark ? { main: dark.warning.main,  light: dark.warning.light,  dark: dark.warning.dark  }
                             : { main: light.warning.main, light: light.warning.light, dark: light.warning.dark },
          success:    isDark ? { main: dark.success.main,  light: dark.success.light,  dark: dark.success.dark  }
                             : { main: light.success.main, light: light.success.light, dark: light.success.dark },
          info:       isDark ? { main: dark.info.main,    light: dark.info.light,    dark: dark.info.dark    }
                             : { main: light.info.main,   light: light.info.light,   dark: light.info.dark   },
          background: isDark ? { default: dark.background.default, paper: dark.background.paper }
                             : { default: light.background.default, paper: light.background.paper },
          text:       isDark ? { primary: dark.text.primary, secondary: dark.text.secondary }
                             : { primary: light.text.primary, secondary: light.text.secondary },
          divider:    isDark ? dark.divider : undefined,
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
          MuiCard:   { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: '1px solid', borderColor: isDark ? '#30363D' : '#E5EAF0' } } },
          MuiPaper:  { defaultProps: { elevation: 0 }, styleOverrides: { root: { border: '1px solid', borderColor: isDark ? '#30363D' : '#E5EAF0' } } },
          MuiChip:   { styleOverrides: { root: { fontWeight: 600 } } },
          MuiTab:    { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, fontSize: '0.875rem' } } },
          MuiButton: { styleOverrides: { root: { textTransform: 'none', borderRadius: 8 } } },
        },
      }),
    [isDark, dark, light]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
