import { FieldValues, UseFormWatch } from 'react-hook-form'

const emailRegExp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
const urlRegExp = /^[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)$/

export const getOptions = (watch?: UseFormWatch<FieldValues>) => ({
  username: {
    required: 'Username is required field.',
    minLength: {
      value: 3,
      message: 'You can use a minimum of 3 characters.',
    },
    maxLength: {
      value: 20,
      message: 'You can use a maximum of 20 characters.',
    },
  },
  password: {
    required: 'Password is required field.',
    minLength: {
      value: 6,
      message: 'You can use a minimum of 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'You can use a maximum of 40 characters.',
    },
  },
  confirmPassword: {
    required: 'Confirm Password is required field.',
    minLength: {
      value: 6,
      message: 'You can use a minimum of 6 characters.',
    },
    maxLength: {
      value: 40,
      message: 'You can use a maximum of 40 characters.',
    },
    validate: (value: string | boolean) => watch && (value === watch('password') || 'Passwords must match.'),
  },
  email: {
    required: 'Email is required field.',
    pattern: {
      value: emailRegExp,
      message: 'Please enter a valid email address.',
    },
  },
  image: {
    pattern: {
      value: urlRegExp,
      message: 'Please enter a valid URL.',
    },
  },
  checkboxRequired: {
    required: 'Consent to the processing of personal data is required.',
  },
})
