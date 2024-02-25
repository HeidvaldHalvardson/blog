import React, { useEffect } from 'react'
import { SubmitHandler, useForm, FieldValues } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import FormButton from '../UI/FormButton/FormButton'
import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import ErrorMessageValidation from '../UI/ErrorMessage/ErrorMessageValidation'
import CustomLink from '../../UI/CustomLink/CustomLink'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType, useCreateUserMutation } from '../../../services/AuthenticationService'

import styles from './SignUp.module.scss'

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FieldValues>({
    mode: 'onChange',
  })

  const navigate = useNavigate()
  const location = useLocation()

  const [createUser, { error, isSuccess }] = useCreateUserMutation()

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        setError(key, { message: serverMessages.errors[key] })
      }
    }
  }, [error])

  useEffect(() => {
    if (isSuccess) {
      location.state?.from ? navigate(location.state.from) : navigate('/articles')
    }
  }, [isSuccess])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const newUser = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }
    await createUser(newUser)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create new account</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <CustomInputForm
          label="Username"
          register={register}
          errors={errors}
          options={getOptions().username}
          name="username"
          placeholder="Username"
          type="text"
        />
        <CustomInputForm
          label="Email address"
          register={register}
          errors={errors}
          options={getOptions().email}
          name="email"
          placeholder="Email address"
          type="email"
        />
        <CustomInputForm
          label="Password"
          register={register}
          errors={errors}
          options={getOptions().password}
          placeholder="Password"
          name="password"
          type="password"
        />
        <CustomInputForm
          label="Repeat Password"
          register={register}
          errors={errors}
          options={getOptions(watch).confirmPassword}
          placeholder="Password"
          name="confirmPassword"
          type="password"
        />
        <div className={styles.line}></div>
        <div>
          <label className={styles.label} htmlFor="agreement">
            <input
              className={`visually-hidden ${styles.input}`}
              id="agreement"
              {...register('agreement', getOptions().checkboxRequired)}
              type="checkbox"
            />
            <div className={styles.mark}></div>I agree to the processing of my personal information
          </label>
          <ErrorMessageValidation errors={errors} name="agreement" />
        </div>
        <div className={styles.footer}>
          <FormButton>Create</FormButton>
          <p className={styles.text}>
            Already have an account?
            <span className={styles.link}>
              <CustomLink to={'/sign-in'}> Sign In.</CustomLink>
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
