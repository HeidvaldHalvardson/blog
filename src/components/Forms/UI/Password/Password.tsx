import React from 'react'

import ErrorMessageValidation from '../ErrorMessage/ErrorMessageValidation'
import { InputProps } from '../InputPropsTypes'

const Password: React.FC<InputProps> = ({ register, label, errors }) => {
  return (
    <>
      <label>{label}</label>
      <input
        {...register('password', {
          required: 'Password is required field.',
          minLength: {
            value: 6,
            message: 'You can use a minimum of 3 characters.',
          },
          maxLength: {
            value: 40,
            message: 'You can use a maximum of 40 characters.',
          },
        })}
        placeholder={label}
      />
      <ErrorMessageValidation errors={errors} name="password" />
    </>
  )
}

export default Password
