import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { IUser } from '../interfaces/IUser'

import { baseApi } from './baseAPI'

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

export const authAPI = baseApi.injectEndpoints({
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
      invalidatesTags: ['Article'],
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
