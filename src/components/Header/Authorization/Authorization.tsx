import React from 'react'
import Button from "../../UI/Buttons/Button";
import styles from './Authorization.module.scss'

const Authorization: React.FC = () => {
  return (
    <div className={styles.auth}>
      <Button onClick={() => console.log("sign in")}>Sign In</Button>
      <Button onClick={() => console.log('sign up')} type='green'>Sign Up</Button>
    </div>
  )
}

export default Authorization