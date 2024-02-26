import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAuthResponse } from '../services/AuthorizationService'

const initialState: IAuthResponse = {
  user: {
    token: '',
    username: '',
    email: '',
    image: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<{ username: string; email: string; token: string; image: string }>) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          user: action.payload,
        })
      )
      state.user = action.payload
    },
    logout: () => {
      localStorage.clear()
      return initialState
    },
  },
})

export default authSlice.reducer

export const { setAuthUser, logout } = authSlice.actions
