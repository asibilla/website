'use client';
import noop from 'lodash.noop';
import type { FC } from 'react';
import { createContext, useState } from 'react';
import type {
  AppContextType,
  GetArticleContentItem,
  ReferenceDataResponseItem,
} from '@/types';

export const AppContext = createContext<AppContextType>({
  articleTypes: [],
  error: null,
  homepageContent: null,
  pageTitle: '',
  setArticleTypes: noop,
  setError: noop,
  setHomepageContent: noop,
  setPageTitle: noop,
});

export const AppContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [error, setError] = useState<Error | null>(null);
  const [articleTypes, setArticleTypes] = useState<ReferenceDataResponseItem[]>(
    []
  );
  const [homepageContent, setHomepageContent] =
    useState<GetArticleContentItem | null>(null);
  const [pageTitle, setPageTitle] = useState<string>('');

  return (
    <AppContext.Provider
      value={{
        articleTypes,
        error,
        homepageContent,
        pageTitle,
        setArticleTypes,
        setError,
        setHomepageContent,
        setPageTitle,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
