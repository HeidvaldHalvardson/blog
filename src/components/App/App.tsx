import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Layout from '../Layout/Layout'
import ArticleList from '../ArticleList/ArticleList'
import IsNotFound from '../IsNotFound/IsNotFound'
import Article from '../Article/Article'
import SignIn from '../Forms/SignIn/SignIn'
import SignUp from '../Forms/SignUp/SignUp'
import Profile from '../Forms/Profile/Profile'

import styles from './App.module.scss'

const App: React.FC = () => {
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
          <Route path={'*'} element={<IsNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
