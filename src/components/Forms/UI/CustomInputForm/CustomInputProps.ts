import { FieldErrors, FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  label?: string
  register: UseFormRegister<T>
  errors: FieldErrors
  options?: RegisterOptions
  name: Path<T>
  type: string
  placeholder?: string
}
