'use client';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { getArticle } from '@/api';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import SafeHtmlComponent from '@/components/SafeHtml';
import type { GetArticleContentItem } from '@/types';

const StyledSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75vh',
}));
const LoadContent: FC<{
  articleId: string;
  articleType: string;
  content: GetArticleContentItem | null;
  pageName: string;
  setContent: (articleContent: {
    [key: string]: GetArticleContentItem;
  }) => void;
}> = ({ articleId, articleType, content, pageName, setContent }) => {
  const { pageTitle, setPageTitle, setError } = useContext(AppContext);

  useEffect(() => {
    if (content) return;

    const fetchContent = async () => {
      const { data, error } = await getArticle({
        id: articleId,
        type: articleType,
      });

      if (!error) {
        setContent({ [articleId]: data?.[0] as GetArticleContentItem });
      } else {
        setError(error as Error);
      }
    };

    fetchContent();
  }, [articleId, articleType, content, setContent, setError]);

  useEffect(() => {
    if (pageTitle === pageName) return;
    setPageTitle(pageName);
  }, [pageTitle, pageName, setPageTitle]);

  return (
    <div>
      <main>
        <ContentContainer sx={{ paddingBottom: '50px', paddingTop: '92px' }}>
          {content ? (
            <div>
              <Typography variant="h1">{content.title}</Typography>
              {content.subtitle && (
                <Typography variant="h4">{content.subtitle}</Typography>
              )}
              {content.imageUrl && (
                <img
                  alt={content.title ?? ''}
                  src={content.imageUrl}
                  style={{ marginTop: '20px', width: '100%', height: 'auto' }}
                />
              )}
              <SafeHtmlComponent dirtyHtml={content.body} />
            </div>
          ) : (
            <StyledSpinnerWrapper>
              <CircularProgress />
            </StyledSpinnerWrapper>
          )}
        </ContentContainer>
      </main>
    </div>
  );
};

export default LoadContent;
