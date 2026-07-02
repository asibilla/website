'use client';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import type { GetArticleContentItem } from '@/types';
import { formatDate } from '@/utils';

const StyledSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75vh',
}));

const StyledLineContainer = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  fontWeight: 600,
  justifyContent: 'space-between',
  padding: '4px 0',
  width: '100%',
}));

const LoadContent: FC<{
  content: GetArticleContentItem[] | null;
  pageName: string;
}> = ({ content, pageName }) => {
  const { pageTitle, setPageTitle } = useContext(AppContext);

  useEffect(() => {
    if (pageTitle === pageName) return;
    setPageTitle(pageName);
  }, [pageTitle, pageName, setPageTitle]);

  return (
    <div>
      <main>
        <ContentContainer
          sx={{ minHeight: '85vh', paddingBottom: '50px', paddingTop: '92px' }}
        >
          <Typography variant="h2" sx={{ marginBottom: '8px' }}>
            Select an Article
          </Typography>
          {content ? (
            content.map((item) => (
              <StyledLineContainer key={item.articleId}>
                <div key={item.articleId}>
                  <Link
                    href={`/article/?id=${item.articleId}&type=${item.articleType}`}
                  >
                    <Typography variant="body1">{item.displayTitle}</Typography>
                  </Link>
                </div>
                <div>
                  <Typography variant="body2">
                    {formatDate(item.date)}
                  </Typography>
                </div>
              </StyledLineContainer>
            ))
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
