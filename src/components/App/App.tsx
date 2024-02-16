import React from 'react'
import styles from './App.module.scss'
import Header from "../Header/Header";
import ArticleList from "../ArticleList/ArticleList";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />
      <ArticleList />
    </div>
  )
}

export default App