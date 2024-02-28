import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useLocation } from 'react-router-dom'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import Button from '../../UI/Buttons/Button'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType } from '../../../services/AuthorizationService'
import { useCreateNewArticleMutation } from '../../../services/ArticlesService'

import styles from './ArticleForm.module.scss'

type FormValues = {
  title: string
  desc: string
  text: string
  tags: {
    tag: string
  }[]
}

const ArticleForm: React.FC = () => {
  const location = useLocation()

  const title = location.pathname === '/new-article' ? 'Create new article' : 'Edit article'

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    control,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      desc: '',
      text: '',
      tags: [{ tag: 'asdasd' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

  const [createNewUser, { error, isSuccess }] = useCreateNewArticleMutation()

  useEffect(() => {
    if (error && isFetchBaseQueryErrorType(error)) {
      const serverMessages = JSON.parse(JSON.stringify(error.data))
      for (const key in serverMessages.errors) {
        if (key === 'title' || key === 'desc' || key === 'text' || key === 'tags') {
          setError(key, { message: serverMessages.errors[key] })
        }
      }
      clearErrors()
    }
  }, [error])

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <form className={styles.form}>
        <CustomInputForm
          label="Title"
          register={register}
          errors={errors}
          options={getOptions().title}
          name="title"
          type="text"
          placeholder="Title"
        />
        <CustomInputForm
          label="Short description"
          register={register}
          errors={errors}
          options={getOptions().desc}
          name="desc"
          type="text"
          placeholder="Short description"
        />
        <CustomInputForm
          label="Text"
          register={register}
          errors={errors}
          options={getOptions().text}
          name="text"
          type="textarea"
          placeholder="Text"
        />
        <div className={styles.tags}>
          <label className={styles.label}>Tags</label>
          {fields.map((field, id) => {
            return (
              <div key={field.id} className={styles.tag}>
                <CustomInputForm
                  register={register}
                  errors={errors}
                  name={`tags.${id}`}
                  placeholder="Tag"
                  type="text"
                />
                <Button type="red" onClick={() => remove(id)}>
                  Delete
                </Button>
                {id === fields.length - 1 && (
                  <Button type="blue" onClick={() => append({ tag: '' })}>
                    Add Tag
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      </form>
    </div>
  )
}

export default ArticleForm
