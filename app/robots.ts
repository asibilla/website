import type { MetadataRoute } from 'next';

import { ASSETS_URL } from '@/constants';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ASSETS_URL}/sitemap.xml`,
  };
}
