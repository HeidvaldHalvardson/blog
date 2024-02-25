import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { IBody } from '../types/IBody'

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError =>
  typeof error === 'object' && error != null && 'status' in error

export const authenticationAPI = createApi({
  reducerPath: 'authentification',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
  }),
  endpoints: (build) => ({
    createUser: build.mutation<IBody, Partial<IBody>>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<IBody, Partial<IBody>>({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useCreateUserMutation, useLoginUserMutation } = authenticationAPI
