'use client';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { getArticle } from '@/api';
import ContentContainer from '@/components/ContentContainer';
import type { GetArticleContentItem } from '@/types';

export default function Home() {
  const [content, setContent] = useState<GetArticleContentItem[] | null>(null);
  useEffect(() => {
    const fetchContent = async () => {
      const articleData = await getArticle({ type: 'homepage' });
      if (!('error' in articleData)) {
        setContent(articleData as GetArticleContentItem[]);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <main>
        <ContentContainer>
          {content &&
            content.map(({ articleId, body, title }) => (
              <div key={articleId}>
                <Typography variant="h1">{title}</Typography>
                <Typography variant="body1">{body}</Typography>
              </div>
            ))}
        </ContentContainer>
      </main>
    </div>
  );
}
