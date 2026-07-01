'use client';
import { useContext } from 'react';

import { AppContext } from '@/components/AppContext';
import LoadContent from '@/components/LoadContent';
import { HOMEPAGE_ARTICLE_ID } from '@/constants';

const PAGE_TITLE = 'Home';

export default function Home() {
  const { getArticleContent, setArticleContent } = useContext(AppContext);

  return (
    <div>
      <main>
        <LoadContent
          articleId={HOMEPAGE_ARTICLE_ID}
          articleType="homepage"
          content={getArticleContent(HOMEPAGE_ARTICLE_ID)}
          pageName={PAGE_TITLE}
          setContent={setArticleContent}
        />
      </main>
    </div>
  );
}
