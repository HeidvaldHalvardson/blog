import React from 'react'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Realworld Blog</h2>
      </div>
    </header>
  )
}

export default Header