import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import { articlesAPI } from '../services/ArticlesService'
import { authAPI } from '../services/AuthorizationService'
import authReducer from '../reducers/authSlice'

export const store = configureStore({
  reducer: {
    authReducer,
    [articlesAPI.reducerPath]: articlesAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesAPI.middleware, authAPI.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
