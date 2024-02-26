import React, { useEffect } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { message } from 'antd'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import FormButton from '../UI/FormButton/FormButton'
import { getOptions } from '../UI/options'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { isFetchBaseQueryErrorType, useEditUserMutation } from '../../../services/AuthorizationService'
import { setAuthUser } from '../../../reducers/authSlice'

import styles from './Profile.module.scss'

const Profile: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()

  const [editUser, { error, isSuccess, data }] = useEditUserMutation()

  const { user } = useAppSelector((state) => state.authReducer)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
    clearErrors,
  } = useForm<FieldValues>({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      image: user.image,
      email: user.email,
    },
  })

  useEffect(() => {
    reset({
      username: user.username,
      image: user.image,
      email: user.email,
    })
  }, [user])

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        setError(key, { message: serverMessages.errors[key] })
      }
      messageApi.open({ type: 'error', content: `${serverMessages.errors.message}` })
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
      messageApi.open({ type: 'success', content: 'Your profile has been updated.' })
    }
  }, [isSuccess, data])

  const onSubmit: SubmitHandler<FieldValues> = async (dataForm) => {
    await editUser({
      user: {
        email: dataForm.email,
        image: dataForm.image,
        username: dataForm.username,
        password: dataForm.password,
        token: user.token,
      },
    })
  }
  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <h1 className={styles.title}>Edit Profile</h1>
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
          label="New Password"
          register={register}
          errors={errors}
          options={getOptions().password}
          placeholder="New Password"
          name="password"
          type="password"
        />
        <CustomInputForm
          label="Avatar image (url)"
          register={register}
          errors={errors}
          options={getOptions().image}
          placeholder="Avatar image"
          name="image"
          type="text"
        />
        <div className={styles.footer}>
          <FormButton>Save</FormButton>
        </div>
      </form>
    </div>
  )
}

export default Profile
