import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../../../store/hooks'

const PrivateRoute: React.FC = () => {
  const {
    user: { token },
  } = useAppSelector((state) => state.authReducer)

  let isAuth = !!localStorage.getItem('token')

  useEffect(() => {
    isAuth = !!localStorage.getItem('token')
  }, [token])

  return isAuth ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateRoute
