'use client';
import { Typography } from '@mui/material';
import type { FC } from 'react';

import ContentContainer from '@/components/ContentContainer';
import SafeHtmlComponent from '@/components/SafeHtml';
import type { GetArticleContentItem } from '@/types';
import { formatDate } from '@/utils';

const ArticleContent: FC<{
  content: GetArticleContentItem;
  hideDate?: boolean;
}> = ({ content, hideDate }) => {
  return (
    <div>
      <main>
        <ContentContainer sx={{ paddingBottom: '50px', paddingTop: '92px' }}>
          <div>
            <Typography variant="h1">{content.title}</Typography>
            {!hideDate && (
              <Typography variant="h4">
                {content.subtitle && `${content.subtitle} | `}{' '}
                {formatDate(content.date)}
              </Typography>
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
        </ContentContainer>
      </main>
    </div>
  );
};

export default ArticleContent;
