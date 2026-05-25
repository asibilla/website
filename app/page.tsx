'use client';
import { useEffect, useState } from 'react';

import { getArticle } from '@/api';
import type { GetArticleResponse } from '@/types';


export default function Home() {
  const [content, setContent] = useState<GetArticleResponse | null>(null);
  useEffect(() => {
    const fetchContent = async () => {
      const content = await getArticle({ type: 'homepage' });
      console.log(content);
      if ('title' in content && 'body' in content) {
        setContent(content);
      }
    };

    fetchContent();
  }, [])

  return (
    <div>
      <main>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          {content && (
            <>
              <h1>{content.title}</h1>
              <div>{content.body}</div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
