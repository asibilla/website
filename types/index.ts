export type AppContextType = {
  articleTypes: ReferenceDataResponseItem[];
  error: Error | null;
  homepageContent: GetArticleContentItem | null;
  setArticleTypes: (articleTypes: ReferenceDataResponseItem[]) => void;
  setError: (error: Error | null) => void;
  setHomepageContent: (homepageContent: GetArticleContentItem | null) => void;
};

export type GetArticleParams = {
  id?: string;
  type?: string;
};

export type GetArticleContentItem = {
  articleId: string;
  body: string;
  date: string;
  displayTitle: string;
  subtitle: string;
  title: string;
};

export type GetArticleResponseItem = {
  'article-id': string;
  'article-type': string;
  displayTitle: string;
  content?: {
    body: string;
    subtitle: string;
    title: string;
  };
  date: string;
};

export type GetArticleResponse = {
  response: {
    items: GetArticleResponseItem[];
  };
};

export type NormalizedApiResponse = {
  data: GetArticleContentItem[] | ReferenceDataResponseItem[] | null;
  error: Error | null;
};

export type ReferenceDataResponseItem = {
  key: string;
  label: string;
};
