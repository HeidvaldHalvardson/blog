import React from 'react'

import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'

import styles from './IsNotFound.module.scss'

const IsNotFound: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <ErrorMessage message={'404 not found...'} />
    </div>
  )
}

export default IsNotFound
