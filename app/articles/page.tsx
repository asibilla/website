'use client';
import { useContext, useEffect, useState } from 'react';

import { getArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import LoadContentList from '@/components/LoadContentList';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'Articles';

export default function Home() {
  const { setError } = useContext(AppContext);
  const [content, setContent] = useState<GetArticleContentItem[] | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await getArticle({
        type: 'articles',
      });
      if (!error) {
        setContent(data as GetArticleContentItem[]);
      } else {
        setError(error as Error);
      }
    };
    fetchContent();
  }, [setError]);

  return <LoadContentList content={content} pageName={PAGE_TITLE} />;
}
