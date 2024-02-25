import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import FormButton from '../UI/FormButton/FormButton'
import CustomLink from '../../UI/CustomLink/CustomLink'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType, useLoginUserMutation } from '../../../services/AuthenticationService'
import { setAuthUser } from '../../../slices/authSlice'

import styles from './SignIn.module.scss'

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FieldValues>({
    mode: 'onChange',
  })

  const navigate = useNavigate()
  const location = useLocation()

  const [loginUser, { error, isSuccess, data }] = useLoginUserMutation()

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        setError(key, { message: serverMessages.errors[key] })
      }
    }
  }, [error])

  useEffect(() => {
    if (isSuccess && data) {
      console.log(data)
      setAuthUser(data)
      location.state?.from ? navigate(location.state.from) : navigate('/articles')
    }
  }, [isSuccess, data])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loginBody = {
      user: {
        email: data.email,
        password: data.password,
      },
    }

    await loginUser(loginBody)
  }

  return (
    <div className={styles.wrapper}>
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
