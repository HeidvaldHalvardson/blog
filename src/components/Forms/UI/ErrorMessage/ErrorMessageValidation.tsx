import React from 'react'
import { ErrorMessage } from '@hookform/error-message'

import styles from './ErrorMessageValidation.module.scss'
import { IErrorMessageValidationProps } from './IErrorMessageValidation'

const ErrorMessageValidation: React.FC<IErrorMessageValidationProps> = ({ name, errors }) => {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => <div className={styles.message}>{message}</div>}
    />
  )
}

export default ErrorMessageValidation
