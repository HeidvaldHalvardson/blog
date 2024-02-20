import React from 'react'

import CustomLink from '../UI/CustomLink/CustomLink'

import Authorization from './Authorization/Authorization'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <CustomLink to={'/'}>
          <h2 className={styles.title}>Realworld Blog</h2>
        </CustomLink>
        <Authorization />
      </div>
    </header>
  )
}

export default Header
