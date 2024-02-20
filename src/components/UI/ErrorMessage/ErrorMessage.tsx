import React from 'react'
import { Alert } from 'antd'

interface IError {
  message: string
}

const ErrorMessage: React.FC<IError> = ({ message }) => {
  return <Alert message={message} type="error" />
}

export default ErrorMessage
