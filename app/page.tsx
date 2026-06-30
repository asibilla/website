'use client';
import { CircularProgress, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';

import { getArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import SafeHtmlComponent from '@/components/SafeHtml';
import { HOMEPAGE_ARTICLE_ID } from '@/constants';
import type { GetArticleContentItem } from '@/types';

const PAGE_TITLE = 'Home';

export default function Home() {
  const { homepageContent, pageTitle, setHomepageContent, setPageTitle } =
    useContext(AppContext);

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

  useEffect(() => {
    if (pageTitle === PAGE_TITLE) return;
    setPageTitle('Home');
  }, [pageTitle, setPageTitle]);

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
