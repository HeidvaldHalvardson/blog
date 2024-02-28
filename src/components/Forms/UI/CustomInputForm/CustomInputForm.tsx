import React from 'react'
import { FieldValues } from 'react-hook-form'

import ErrorMessageValidation from '../ErrorMessage/ErrorMessageValidation'

import { InputProps } from './CustomInputProps'
import styles from './CustomInputForm.module.scss'

const CustomInputForm = <T extends FieldValues>({
  register,
  label,
  errors,
  name,
  options,
  type,
  placeholder,
}: InputProps<T>) => {
  return (
    <div className={styles.wrapper}>
      {label ? (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      ) : null}
      {type === 'textarea' ? (
        <textarea
          className={`${styles.input} ${styles.textarea} ${errors && errors[name] ? styles.warning : ''}`}
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={`${styles.input} ${errors && errors[name] ? styles.warning : ''}`}
          id={name}
          {...register(name, options)}
          placeholder={placeholder}
          type={type}
        />
      )}
      <ErrorMessageValidation errors={errors} name={name} />
    </div>
  )
}

export default CustomInputForm
