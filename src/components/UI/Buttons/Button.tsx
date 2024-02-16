import React from 'react'
import styles from './Buttons.module.scss'

type TButtonProps = {
  type?: 'green' | 'red' | 'black' | 'blue'
  size?: 'small'
  children: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<TButtonProps> = ({ children, size, type, onClick }) => {

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