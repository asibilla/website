import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Articles by Andy Sibilla.',
  openGraph: {
    title: 'Articles | andysibilla.com',
    description: 'Articles by Andy Sibilla.',
    url: '/article/',
    siteName: 'andysibilla.com',
    type: 'website',
  },
};

export default function ArticleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
