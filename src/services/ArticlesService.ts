import { IArticlesList } from '../interfaces/IArticlesList'
import { IArticle, IArticleResponse } from '../interfaces/IArticle'

import { baseApi } from './baseAPI'

interface IArticleParams {
  page: number
  limit?: number
}

interface IArticleRequest {
  article: {
    title: string
    description: string
    body: string
    tagList?: string[]
    slug?: string
  }
}

export const articlesAPI = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchArticlesList: build.query<IArticlesList, IArticleParams>({
      query: ({ page, limit = 5 }) => ({
        url: 'articles',
        params: {
          limit,
          offset: (page - 1) * limit,
        },
      }),
      providesTags: () => ['Article'],
    }),
    fetchArticle: build.query<IArticle, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
      }),
      transformResponse: (response: IArticleResponse) => response.article,
      providesTags: () => ['Article'],
    }),
    createNewArticle: build.mutation<IArticleResponse, IArticleRequest>({
      query: (body) => ({
        url: 'articles',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Article'],
    }),
    editArticle: build.mutation<IArticleResponse, IArticleRequest>({
      query: (body) => {
        const { article } = body
        return {
          url: `articles/${article.slug}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Article'],
    }),
    deleteArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
    followArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['Article'],
    }),
    unfollowArticle: build.mutation<IArticleResponse, string>({
      query: (slug) => ({
        url: `/articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Article'],
    }),
  }),
})

export const {
  useFetchArticlesListQuery,
  useFetchArticleQuery,
  useCreateNewArticleMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useFollowArticleMutation,
  useUnfollowArticleMutation,
} = articlesAPI
