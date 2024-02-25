import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import FormButton from '../UI/FormButton/FormButton'
import CustomLink from '../../UI/CustomLink/CustomLink'
import { getOptions } from '../UI/options'

import styles from './Profile.module.scss'

const Profile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    reset()
  }
  return (
    <div className={styles.wrapper}>
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
          name="avatar"
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
