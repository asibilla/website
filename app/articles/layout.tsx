import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles by Andy Sibilla.',
  openGraph: {
    title: 'Articles | andysibilla.com',
    description: 'Articles by Andy Sibilla.',
    url: '/articles/',
    siteName: 'andysibilla.com',
    type: 'website',
  },
};

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
