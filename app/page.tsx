'use client';
import { useEffect, useState } from 'react';

import { getArticle } from '@/api';
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
        <div>
          {content &&
            content.map(({ articleId, body, title }) => (
              <div key={articleId}>
                <h1>{title}</h1>
                <div>{body}</div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
