import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseAPI',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog.kata.academy/api/',
    prepareHeaders: (headers) => {
      if (localStorage.getItem('token')) {
        headers.set('Authorization', `Token ${localStorage.getItem('token')}`)
      }

      headers.set('Content-Type', 'application/json')
    },
  }),
  tagTypes: ['Article'],
  endpoints: () => ({}),
})
