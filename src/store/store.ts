import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { articlesAPI } from '../services/ArticlesService'
import { authenticationAPI } from '../services/AuthenticationService'
import authReducer from '../slices/authSlice'

const rootReducer = combineReducers({
  authReducer,
  [articlesAPI.reducerPath]: articlesAPI.reducer,
  [authenticationAPI.reducerPath]: authenticationAPI.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(articlesAPI.middleware, authenticationAPI.middleware),
})

setupListeners(store.dispatch)

type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
