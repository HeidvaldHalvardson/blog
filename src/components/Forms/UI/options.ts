const isValidEmail = (email: string) => {
  const emailPattern = new RegExp(
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  )

  return emailPattern.test(email)
}

const isValidUrl = (url: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
      '((\\d{1,3}\\.){3}\\d{1,3}))' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$',
    'i'
  )
  const empty = new RegExp('^s*$')
  return urlPattern.test(url) || empty.test(url)
}

export const getOptions = (watch?: string) => ({
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
    validate: (value: string) => watch && (value === watch || 'Passwords must match.'),
  },
  email: {
    required: 'Email is required field.',
    validate: (value: string) => isValidEmail(value) || 'Please enter a valid email address.',
  },
  image: {
    validate: (value: string) => isValidUrl(value) || 'Please enter a valid URL.',
  },
  checkboxRequired: {
    required: 'Consent to the processing of personal data is required.',
  },
  title: {
    required: 'Title is required field.',
  },
  desc: {
    required: 'Short description is required field.',
  },
  text: {
    required: 'Text is required field.',
  },
})
