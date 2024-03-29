import React, { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import FormButton from '../UI/FormButton/FormButton'
import CustomLink from '../../UI/CustomLink/CustomLink'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType, useLoginUserMutation } from '../../../services/AuthorizationService'
import { setAuthUser } from '../../../reducers/authSlice'
import { useAppDispatch } from '../../../store/hooks'

import styles from './SignIn.module.scss'

type FormValues = {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [messageApi, contextHolder] = message.useMessage()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const [loginUser, { error, isSuccess, data }] = useLoginUserMutation()

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        if (key === 'email' || key === 'password') {
          setError(key, { message: serverMessages.errors[key] })
        }
      }
      messageApi.open({ type: 'error', content: `Email or Password ${serverMessages.errors['email or password']}` })
      clearErrors()
    }
  }, [error])

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
      navigate(-1)
    }
  }, [isSuccess, data])

  const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
    await loginUser({ user: { email: dataForm.email, password: dataForm.password } })
  }

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <h1 className={styles.title}>Sign In</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <div className={styles.footer}>
          <FormButton>Login</FormButton>
          <p className={styles.text}>
            Don’t have an account?
            <span className={styles.link}>
              <CustomLink to={'/sign-up'}> Sign Up.</CustomLink>
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn
