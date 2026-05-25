export type GetArticleParams = {
  id?: string;
  type?: string;
};

export type GetArticleError = {
  message: string;
  raw: Error;
};

export type GetArticleErrorResponse = {
  error: Error;
};

export type GetArticleResponse = {
  body: string;
  title: string;
};
