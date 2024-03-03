import React from 'react'

import CustomLink from '../../../UI/CustomLink/CustomLink'
import Button from '../../../UI/Buttons/Button'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { logout } from '../../../../reducers/authSlice'

import styles from './Authorized.module.scss'

const Authorized: React.FC = () => {
  const dispatch = useAppDispatch()
  const { username, image } = useAppSelector((state) => state.authReducer.user)

  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <>
      <CustomLink to="new-article">
        <Button color="green" size="small">
          Create article
        </Button>
      </CustomLink>
      <CustomLink to="profile">
        <div className={styles.user}>
          <span className={styles.username}>{username}</span>
          <img
            className={styles.image}
            src={image ? image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            alt="Avatar."
          />
        </div>
      </CustomLink>
      <Button color="black" onClick={() => handleLogout()}>
        Log Out
      </Button>
    </>
  )
}

export default Authorized
