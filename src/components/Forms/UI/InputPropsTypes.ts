import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

export interface InputProps {
  label: string
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
}
