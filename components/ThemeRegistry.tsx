'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import { AppContextProvider } from '@/components/AppContext';
import { theme } from '@/theme';

export default function ThemeRegistry({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContextProvider>{children}</AppContextProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
