'use client';
import { useContext } from 'react';

import { AppContext } from '@/components/AppContext';
import LoadContent from '@/components/LoadContent';
import { ABOUT_ARTICLE_ID } from '@/constants';

const PAGE_TITLE = 'About Me';

export default function About() {
  const { getArticleContent, setArticleContent } = useContext(AppContext);

  return (
    <LoadContent
      articleId={ABOUT_ARTICLE_ID}
      articleType="about"
      content={getArticleContent(ABOUT_ARTICLE_ID)}
      hideDate={true}
      pageName={PAGE_TITLE}
      setContent={setArticleContent}
    />
  );
}
