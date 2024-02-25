import React from 'react'

import styles from './Buttons.module.scss'
import { IButtonProps } from './interface'

const Button: React.FC<IButtonProps> = ({ children, size, type, onClick }) => {
  const typeStyle = type ? styles[type] : null
  const sizeStyle = size ? styles[size] : styles.large
  const classes = `${styles.button} ${typeStyle} ${sizeStyle}`

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
