import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../../store/hooks'

const PrivateRoute: React.FC = () => {
  const {
    user: { token },
  } = useAppSelector((state) => state.authReducer)

  const isAuth = token && localStorage.getItem('token')

  return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateRoute
