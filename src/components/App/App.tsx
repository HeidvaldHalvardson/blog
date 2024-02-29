import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Layout from '../Layout/Layout'
import ArticleList from '../ArticleList/ArticleList'
import IsNotFound from '../IsNotFound/IsNotFound'
import Article from '../Article/Article'
import SignIn from '../Forms/SignIn/SignIn'
import SignUp from '../Forms/SignUp/SignUp'
import Profile from '../Forms/Profile/Profile'
import ArticleForm from '../Forms/ArticleForm/ArticleForm'
import PrivateRoute from '../UI/PrivateRoute/PrivateRoute'
import { useAppDispatch } from '../../store/hooks'
import { setAuthUser } from '../../reducers/authSlice'

import styles from './App.module.scss'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      dispatch(setAuthUser(user.user))
    }
  }, [])

  return (
    <div className={styles.app}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Navigate to={'articles'} />} />
          <Route path={'articles'} element={<ArticleList />} />
          <Route path={'articles/:param'} element={<Article />} />
          <Route path={'sign-in'} element={<SignIn />} />
          <Route path={'sign-up'} element={<SignUp />} />
          <Route path={'profile'} element={<Profile />} />
          <Route element={<PrivateRoute />}>
            <Route path={'new-article'} element={<ArticleForm />} />
            <Route path={'/articles/:param/edit'} element={<ArticleForm />} />
          </Route>
          <Route path={'*'} element={<IsNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
