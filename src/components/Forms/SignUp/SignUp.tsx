import React from 'react'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'

import Button from '../../UI/Buttons/Button'
import Email from '../UI/Email/Email'
import UserName from '../UI/UserName/UserName'
import Password from '../UI/Password/Password'

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data.email, data.password, data.username)
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UserName register={register} errors={errors} label="Username" />
      <Email register={register} errors={errors} label="Email address" />
      <Password label="Password" register={register} errors={errors} />
      {/*<label>*/}
      {/*  Password*/}
      {/*  <input*/}
      {/*    {...register('password', { required: 'Your password needs to be at least 6 characters.' })}*/}
      {/*    placeholder="Password"*/}
      {/*  />*/}
      {/*</label>*/}
      {/*<label>*/}
      {/*  Repeat Password*/}
      {/*  <input {...register('password', { required: 'Passwords must match.' })} placeholder="Password" />*/}
      {/*</label>*/}
      {/*<label>*/}
      {/*  <input*/}
      {/*    {...register('agree', { required: 'Consent to the processing of personal data is required.' })}*/}
      {/*    type="checkbox"*/}
      {/*  />*/}
      {/*  I agree to the processing of my personal information*/}
      {/*  {errors.agree && <div>{errors.agree.message}</div>}*/}
      {/*</label>*/}
      <Button type="blue">Create</Button>
    </form>
  )
}

export default SignUp
