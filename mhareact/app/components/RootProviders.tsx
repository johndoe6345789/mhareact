'use client';

import { type ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import StoreProvider from '../store/StoreProvider';
import DynamicThemeProvider from '../lib/DynamicThemeProvider';
import AppHeader from './AppHeader';
import NavTabs from './NavTabs';
import GlobalSearch from './GlobalSearch';
import GlobalSnackbar from './GlobalSnackbar';
import ScrollToTopFab from './ScrollToTopFab';

export default function RootProviders({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <StoreProvider>
        <DynamicThemeProvider>
          <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppHeader />
            <GlobalSearch />
            <GlobalSnackbar />
            <NavTabs />
            <Container maxWidth="xl" sx={{ py: 4 }}>
              {children}
            </Container>
            <ScrollToTopFab />
          </Box>
        </DynamicThemeProvider>
      </StoreProvider>
    </AppRouterCacheProvider>
  );
}
