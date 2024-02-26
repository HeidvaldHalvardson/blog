import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { IUser } from '../interfaces/IUser'

interface IAuthRequest {
  user: {
    username?: string
    password?: string
    email?: string
    image?: string
    token?: string
  }
}

export interface IAuthResponse {
  user: IUser
}

export const isFetchBaseQueryErrorType = (error: any): error is FetchBaseQueryError =>
  typeof error === 'object' && error != null && 'status' in error

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers) => {
      if (localStorage.getItem('user')) {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        headers.set('Authorization', `Token ${user.user.token}`)
      }

      headers.set('Content-Type', 'application/json')
    },
  }),
  endpoints: (build) => ({
    createUser: build.mutation<IAuthResponse, Partial<IAuthRequest>>({
      query: (body) => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    loginUser: build.mutation<IAuthResponse, Partial<IAuthRequest>>({
      query: (body) => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),
    editUser: build.mutation<IAuthResponse, Partial<IAuthRequest>>({
      query: (body) => ({
        url: 'user',
        method: 'PUT',
        body,
      }),
    }),
  }),
})

export const { useCreateUserMutation, useLoginUserMutation, useEditUserMutation } = authAPI
