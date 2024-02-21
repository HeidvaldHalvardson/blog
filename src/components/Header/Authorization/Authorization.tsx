import React from 'react'

import Button from '../../UI/Buttons/Button'
import CustomLink from '../../UI/CustomLink/CustomLink'

import styles from './Authorization.module.scss'

const Authorization: React.FC = () => {
  return (
    <div className={styles.auth}>
      <CustomLink to={'sign-in'}>
        <Button>Sign In</Button>
      </CustomLink>
      <CustomLink to={'sign-up'}>
        <Button type="green">Sign Up</Button>
      </CustomLink>
    </div>
  )
}

export default Authorization
