'use client';
import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import type { FC } from 'react';

import { AppContext } from '@/components/AppContext';
import ContentContainer from '@/components/ContentContainer';
import type { GetArticleContentItem } from '@/types';

const StyledSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75vh',
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
        <ContentContainer sx={{ paddingTop: '92px' }}>
          <Typography variant="h2">Select an Article</Typography>
          {content ? (
            content.map((item) => (
              <div key={item.articleId}>
                <Link
                  href={`/article/?id=${item.articleId}&type=${item.articleType}`}
                >
                  <Typography variant="body1">{item.displayTitle}</Typography>
                </Link>
              </div>
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
