import {
  API_URL,
  ASSETS_URL,
  GET_ARTICLE_PATH,
  GET_REFERENCE_DATA_PATH,
} from '@/constants';
import type {
  GetArticleParams,
  GetArticleResponse,
  NormalizedApiResponse,
  ReferenceDataResponseItem,
} from '@/types';

const createQueryString = (params: GetArticleParams) => {
  const { id = '', type = '' } = params;
  if (!id && !type) {
    return '';
  }
  let queryString = '?';
  if (id) {
    queryString += `id=${id}`;
  }
  if (type) {
    queryString += id ? `&type=${type}` : `type=${type}`;
  }
  return queryString;
};

export const getArticle = async (
  params: GetArticleParams
): Promise<NormalizedApiResponse> => {
  const { id = '', type = '' } = params;
  try {
    const response = await fetch(
      `${API_URL}${GET_ARTICLE_PATH}${createQueryString({ id, type })}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const data: GetArticleResponse = await response.json();
    if ('error' in data || !('response' in data)) {
      throw data.error ?? new Error('Failed to fetch article');
    }
    return {
      data: data.response.items.map(
        ({
          'article-id': articleId,
          'article-type': articleType,
          content,
          date,
          displayTitle,
        }) => ({
          articleId,
          articleType,
          body: content?.body ?? '',
          date,
          displayTitle,
          imageUrl: content?.imageUrl ?? '',
          subtitle: content?.subtitle ?? '',
          title: content?.title ?? '',
        })
      ),
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};

export const getReferenceData = async (): Promise<NormalizedApiResponse> => {
  try {
    const response: Response = await fetch(
      `${ASSETS_URL}${GET_REFERENCE_DATA_PATH}/articleTypes.json`
    );
    const data: ReferenceDataResponseItem[] = await response.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error as Error,
    };
  }
};
