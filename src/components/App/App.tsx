import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Layout from '../Layout/Layout'
import ArticleList from '../ArticleList/ArticleList'
import IsNotFound from '../IsNotFound/IsNotFound'
import Article from '../Article/Article'

import styles from './App.module.scss'

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path={'/'} element={<Layout />}>
          <Route index element={<Navigate to={'articles'} />} />
          <Route path={'articles'} element={<ArticleList />} />
          <Route path={'articles/:param'} element={<Article />} />
          <Route path={'*'} element={<IsNotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
