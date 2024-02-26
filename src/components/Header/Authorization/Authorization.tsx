import React from 'react'

import { useAppSelector } from '../../../store/hooks'

import Authorized from './Authorized/Authorized'
import NotAuthorized from './NotAuthorized/NotAuthorized'
import styles from './Authorization.module.scss'

const Authorization: React.FC = () => {
  const {
    user: { token },
  } = useAppSelector((state) => state.authReducer)
  return <div className={styles.auth}>{token ? <Authorized /> : <NotAuthorized />}</div>
}

export default Authorization
