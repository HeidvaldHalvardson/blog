import React from 'react'

import ErrorMessageValidation from '../ErrorMessage/ErrorMessageValidation'
import { InputProps } from '../InputPropsTypes'

const Email: React.FC<InputProps> = ({ register, label, errors }) => {
  const regExp = RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  )

  return (
    <>
      <label>{label}</label>
      <input
        {...register('email', {
          required: 'Email is required field.',
          pattern: {
            value: regExp,
            message: 'Please enter a valid email address.',
          },
        })}
        placeholder={label}
      />
      <ErrorMessageValidation errors={errors} name="email" />
    </>
  )
}

export default Email
