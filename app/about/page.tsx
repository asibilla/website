import type { Metadata } from 'next';

import { getArticle } from '@/api';
import ArticleContent from '@/components/ArticleContent';
import SetPageTitle from '@/components/SetPageTitle';
import { ABOUT_ARTICLE_ID } from '@/constants';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'About Me';

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: 'About Andy Sibilla.',
  openGraph: {
    title: `${PAGE_TITLE} | andysibilla.com`,
    description: 'About Andy Sibilla.',
    url: '/about/',
    siteName: 'andysibilla.com',
    type: 'website',
  },
};

export default async function About() {
  const { data, error } = await getArticle({
    id: ABOUT_ARTICLE_ID,
    type: 'about',
  });

  const content = data?.[0] as GetArticleContentItem | undefined;

  if (error || !content) {
    throw error ?? new Error('Failed to fetch about article');
  }

  return (
    <>
      <SetPageTitle pageName={PAGE_TITLE} />
      <ArticleContent content={content} hideDate />
    </>
  );
}
