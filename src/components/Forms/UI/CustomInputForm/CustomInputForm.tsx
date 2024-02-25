import React from 'react'

import ErrorMessageValidation from '../ErrorMessage/ErrorMessageValidation'

import { InputProps } from './CustomInputProps'
import styles from './CustomInputForm.module.scss'

const CustomInputForm: React.FC<InputProps> = ({ register, label, errors, name, options, type, placeholder }) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={`${styles.input} ${errors[name] ? styles.warning : ''}`}
        id={name}
        {...register(name, options)}
        placeholder={placeholder}
        type={type}
      />
      <ErrorMessageValidation errors={errors} name={name} />
    </div>
  )
}

export default CustomInputForm
