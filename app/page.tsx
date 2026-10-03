import type { Metadata } from 'next';

import { getArticle } from '@/api';
import ArticleContent from '@/components/ArticleContent';
import SetPageTitle from '@/components/SetPageTitle';
import { HOMEPAGE_ARTICLE_ID } from '@/constants';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'Home';

export const metadata: Metadata = {
  // Root page shares the layout segment, so the title template does not apply.
  title: {
    absolute: `${PAGE_TITLE} | andysibilla.com`,
  },
  description: 'Your premier source for poor writing.',
  openGraph: {
    title: `${PAGE_TITLE} | andysibilla.com`,
    description: 'Your premier source for poor writing.',
    url: '/',
    siteName: 'andysibilla.com',
    type: 'website',
  },
};

export default async function Home() {
  const { data, error } = await getArticle({
    id: HOMEPAGE_ARTICLE_ID,
    type: 'homepage',
  });

  const content = data?.[0] as GetArticleContentItem | undefined;

  if (error || !content) {
    throw error ?? new Error('Failed to fetch homepage article');
  }

  return (
    <>
      <SetPageTitle pageName={PAGE_TITLE} />
      <ArticleContent content={content} hideDate />
    </>
  );
}
