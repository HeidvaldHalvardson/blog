import { createApi } from '@reduxjs/toolkit/query/react'

import { IArticlesList } from '../interfaces/IArticlesList'
import { IArticle, IArticleResponse } from '../interfaces/IArticle'

import { BaseQuery } from './BaseQuery'

interface IArticleParams {
  page: number
  limit?: number
}

interface INewArticleRequest {
  article: {
    title: string
    description: string
    body: string
    tags?: string[]
  }
}

export const articlesAPI = createApi({
  reducerPath: 'articlesAPI',
  refetchOnFocus: true,
  baseQuery: BaseQuery,
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
    createNewArticle: build.mutation<IArticleResponse, Partial<INewArticleRequest>>({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useFetchArticlesListQuery, useFetchArticleQuery, useCreateNewArticleMutation } = articlesAPI
