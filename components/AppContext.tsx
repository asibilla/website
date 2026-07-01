'use client';
import noop from 'lodash.noop';
import type { FC } from 'react';
import { createContext, useCallback, useState } from 'react';
import type {
  AppContextType,
  GetArticleContentItem,
  ReferenceDataResponseItem,
} from '@/types';

export const AppContext = createContext<AppContextType>({
  articleContent: {},
  articleTypes: [],
  error: null,
  getArticleContent: () => null,
  pageTitle: '',
  setArticleContent: noop,
  setArticleTypes: noop,
  setError: noop,
  setPageTitle: noop,
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [articles, setArticles] = useState<{
    [key: string]: GetArticleContentItem;
  }>({});
  const [articleTypes, setArticleTypes] = useState<ReferenceDataResponseItem[]>(
    []
  );

  const [error, setError] = useState<Error | null>(null);
  const [pageTitle, setPageTitle] = useState<string>('');

  const getArticleContent = useCallback(
    (articleId: string) => {
      return articles[articleId] ?? null;
    },
    [articles]
  );

  const setArticleContent = useCallback(
    (articleContent: { [key: string]: GetArticleContentItem }) => {
      setArticles((prevArticles) => ({ ...prevArticles, ...articleContent }));
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        articleContent: articles,
        articleTypes,
        error,
        getArticleContent,
        pageTitle,
        setArticleContent,
        setArticleTypes,
        setError,
        setPageTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
