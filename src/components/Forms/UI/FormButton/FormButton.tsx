import React from 'react'

import styles from './FormButton.module.scss'
import { IFormButtonProps } from './interface'

const FormButton: React.FC<IFormButtonProps> = ({ children }) => {
  return <button className={styles.button}>{children}</button>
}

export default FormButton
