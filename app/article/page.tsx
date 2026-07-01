'use client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import LoadContent from '@/components/LoadContent';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'Articles';

export default function Article() {
  const [content, setContent] = useState<GetArticleContentItem | null>(null);
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  const articleType = searchParams.get('type');

  const setContentCallback = useCallback(
    (content: { [key: string]: GetArticleContentItem }) => {
      setContent(content[articleId ?? ''] ?? null);
    },
    [articleId]
  );

  return (
    <LoadContent
      articleId={articleId ?? ''}
      articleType={articleType ?? ''}
      content={content}
      pageName={PAGE_TITLE}
      setContent={setContentCallback}
    />
  );
}
