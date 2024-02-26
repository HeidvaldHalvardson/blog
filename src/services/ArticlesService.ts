import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { IArticlesList } from '../interfaces/IArticlesList'
import { IArticle, IArticleResponse } from '../interfaces/IArticle'

interface IArticleParams {
  page: number
  limit?: number
}

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    fetchArticlesList: build.query<IArticlesList, IArticleParams>({
      query: ({ page, limit = 5 }) => ({
        url: 'articles',
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
    }),
    fetchArticle: build.query<IArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
      transformResponse: (response: IArticleResponse) => response.article,
    }),
  }),
})

export const { useFetchArticlesListQuery, useFetchArticleQuery } = articlesAPI
