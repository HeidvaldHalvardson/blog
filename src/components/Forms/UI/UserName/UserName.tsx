import React from 'react'

import ErrorMessageValidation from '../ErrorMessage/ErrorMessageValidation'
import { InputProps } from '../InputPropsTypes'

const UserName: React.FC<InputProps> = ({ register, label, errors }) => {
  return (
    <>
      <label>{label}</label>
      <input
        {...register('username', {
          required: 'Username is required field.',
          minLength: {
            value: 3,
            message: 'You can use a minimum of 3 characters.',
          },
          maxLength: {
            value: 20,
            message: 'You can use a maximum of 20 characters.',
          },
        })}
        placeholder={label}
      />
      <ErrorMessageValidation errors={errors} name="username" />
    </>
  )
}

export default UserName
