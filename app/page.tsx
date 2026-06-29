'use client';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { getArticle } from '@/api';
import ContentContainer from '@/components/ContentContainer';
import SafeHtmlComponent from '@/components/SafeHtml';
import type { GetArticleContentItem } from '@/types';

export default function Home() {
  const [content, setContent] = useState<GetArticleContentItem[] | null>(null);
  useEffect(() => {
    const fetchContent = async () => {
      const articleData = await getArticle({
        id: '5bfd113b-1cdb-4613-9c34-fc4f89e1e8fc',
        type: 'homepage',
      });
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
                <SafeHtmlComponent dirtyHtml={body} />
              </div>
            ))}
        </ContentContainer>
      </main>
    </div>
  );
}
