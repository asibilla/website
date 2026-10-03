import type { Metadata } from 'next';

import { OG_IMAGE } from '@/constants';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles by Andy Sibilla.',
  openGraph: {
    title: 'Articles | andysibilla.com',
    description: 'Articles by Andy Sibilla.',
    url: '/articles/',
    siteName: 'andysibilla.com',
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
