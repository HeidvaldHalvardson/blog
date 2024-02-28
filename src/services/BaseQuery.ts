import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BaseQuery = fetchBaseQuery({
  baseUrl: 'https://blog.kata.academy/api/',
  prepareHeaders: (headers) => {
    if (localStorage.getItem('token')) {
      headers.set('Authorization', `Token ${localStorage.getItem('token')}`)
    }

    headers.set('Content-Type', 'application/json')
  },
})
