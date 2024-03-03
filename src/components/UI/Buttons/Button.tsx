import React from 'react'

import styles from './Buttons.module.scss'
import { IButtonProps } from './interface'

const Button: React.FC<IButtonProps> = ({ children, size, color, onClick }) => {
  const typeStyle = color ? styles[color] : null
  const sizeStyle = size ? styles[size] : styles.large
  const classes = `${styles.button} ${typeStyle} ${sizeStyle}`

  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default Button
