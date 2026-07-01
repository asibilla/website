'use client';
import { CircularProgress } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState } from 'react';

import LoadContent from '@/components/LoadContent';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'Articles';

function ArticleContent() {
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

export default function Article() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '75vh',
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <ArticleContent />
    </Suspense>
  );
}
