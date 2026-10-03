import type { MetadataRoute } from 'next';

import { ASSETS_URL } from '@/constants';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${ASSETS_URL}/`,
    },
    {
      url: `${ASSETS_URL}/about/`,
    },
    {
      url: `${ASSETS_URL}/articles/`,
    },
  ];
}
