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
  setArticleTypes: noop,
  setError: noop,
  setHomepageContent: noop,
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

  return (
    <AppContext.Provider
      value={{
        articleTypes,
        error,
        homepageContent,
        setArticleTypes,
        setError,
        setHomepageContent,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
