import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AppContextProvider } from '@/components/AppContext';
import ErrorAlert from '@/components/ErrorAlert';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import { ASSETS_URL } from '@/constants';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_DESCRIPTION = 'Your premier source for poor writing.';

export const metadata: Metadata = {
  metadataBase: new URL(ASSETS_URL),
  title: {
    default: 'andysibilla.com',
    template: '%s | andysibilla.com',
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: 'andysibilla.com',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} style={{ colorScheme: 'dark' }}>
      <body>
        <AppContextProvider>
          <ThemeRegistry>
            <Header />
            {children}
            <ErrorAlert />
            <Footer />
          </ThemeRegistry>
        </AppContextProvider>
      </body>
    </html>
  );
}
