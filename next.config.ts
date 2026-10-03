import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'export',
  serverExternalPackages: ['isomorphic-dompurify'],
  trailingSlash: true,
};

export default nextConfig;
