export type AppContextType = {
  articleContent: {
    [key: string]: GetArticleContentItem;
  };
  articleTypes: ReferenceDataResponseItem[];
  error: Error | null;
  getArticleContent: (articleId: string) => GetArticleContentItem | null;
  pageTitle: string;
  setArticleContent: (articleContent: {
    [key: string]: GetArticleContentItem;
  }) => void;
  setArticleTypes: (articleTypes: ReferenceDataResponseItem[]) => void;
  setError: (error: Error | null) => void;
  setPageTitle: (pageTitle: string) => void;
};

export type GetArticleParams = {
  id?: string;
  type?: string;
};

export type GetArticleContentItem = {
  articleId: string;
  articleType: string;
  body: string;
  date: string;
  displayTitle: string;
  imageUrl: string;
  subtitle: string;
  title: string;
};

export type GetArticleResponseItem = {
  'article-id': string;
  'article-type': string;
  displayTitle: string;
  content?: {
    body: string;
    imageUrl?: string;
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
