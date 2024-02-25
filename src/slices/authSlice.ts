import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IBody } from '../types/IBody'

const initialState: IBody = {
  user: {
    token: '',
    username: '',
    email: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<IBody>) {
      console.log(action.payload)
      localStorage.setItem('token', JSON.stringify(action.payload))
      state = action.payload
    },
  },
})

export default authSlice.reducer

export const { setAuthUser } = authSlice.actions
