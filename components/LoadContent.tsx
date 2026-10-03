'use client';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { getArticle } from '@/api';
import ArticleContent from '@/components/ArticleContent';
import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import SetPageTitle from '@/components/SetPageTitle';
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
  hideDate?: boolean;
  pageName: string;
  setContent: (articleContent: {
    [key: string]: GetArticleContentItem;
  }) => void;
}> = ({ articleId, articleType, content, hideDate, pageName, setContent }) => {
  const { setError } = useContext(AppContext);

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

  return (
    <>
      <SetPageTitle pageName={pageName} />
      {content ? (
        <ArticleContent content={content} hideDate={hideDate} />
      ) : (
        <div>
          <main>
            <ContentContainer
              sx={{ paddingBottom: '50px', paddingTop: '92px' }}
            >
              <StyledSpinnerWrapper>
                <CircularProgress />
              </StyledSpinnerWrapper>
            </ContentContainer>
          </main>
        </div>
      )}
    </>
  );
};

export default LoadContent;
