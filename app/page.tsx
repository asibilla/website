'use client';
import { CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';

import { getArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import SafeHtmlComponent from '@/components/SafeHtml';
import { HOMEPAGE_ARTICLE_ID } from '@/constants';
import type { GetArticleContentItem } from '@/types';

export default function Home() {
  const { homepageContent, setHomepageContent } = useContext(AppContext);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await getArticle({
        id: HOMEPAGE_ARTICLE_ID,
        type: 'homepage',
      });

      if (!error) {
        setHomepageContent(data?.[0] as GetArticleContentItem);
      }
    };

    fetchContent();
  }, [setHomepageContent]);

  return (
    <div>
      <main>
        <ContentContainer>
          {homepageContent ? (
            <div>
              <Typography variant="h1">{homepageContent.title}</Typography>
              <SafeHtmlComponent dirtyHtml={homepageContent.body} />
            </div>
          ) : (
            <CircularProgress />
          )}
        </ContentContainer>
      </main>
    </div>
  );
}
