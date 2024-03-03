import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import FormButton from '../UI/FormButton/FormButton'
import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import ErrorMessageValidation from '../UI/ErrorMessage/ErrorMessageValidation'
import CustomLink from '../../UI/CustomLink/CustomLink'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType, useCreateUserMutation } from '../../../services/AuthorizationService'
import { setAuthUser } from '../../../reducers/authSlice'
import { useAppDispatch } from '../../../store/hooks'

import styles from './SignUp.module.scss'

type FormValues = {
  username: string
  email: string
  password: string
  confirmPassword: string
  agreement: boolean
}

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: false,
    },
  })

  const [createUser, { error, isSuccess, data }] = useCreateUserMutation()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setAuthUser({
          username: data.user.username,
          email: data.user.email,
          token: data.user.token,
          image: data.user.image,
        })
      )
      navigate('/articles')
      clearErrors()
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        if (key === 'username' || key === 'email' || key === 'password' || key === 'confirmPassword') {
          setError(key, { message: serverMessages.errors[key] })
        }
      }
    }
  }, [error])

  const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
    await createUser({ user: { email: dataForm.email, password: dataForm.password, username: dataForm.username } })
  }

  const passwordWatch = watch('password')

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
          options={getOptions(passwordWatch).confirmPassword}
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
