import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { articlesAPI } from '../services/ArticlesService'

export const store = configureStore({
  reducer: {
    [articlesAPI.reducerPath]: articlesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesAPI.middleware),
})

setupListeners(store.dispatch)
