import { FieldErrors, FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputProps {
  label: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  options: RegisterOptions
  name: string
  type: string
  placeholder?: string
}
