import React, { useEffect } from 'react'
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import CustomInputForm from '../UI/CustomInputForm/CustomInputForm'
import Button from '../../UI/Buttons/Button'
import FormButton from '../UI/FormButton/FormButton'
import { getOptions } from '../UI/options'
import { isFetchBaseQueryErrorType } from '../../../services/AuthorizationService'
import {
  useCreateNewArticleMutation,
  useEditArticleMutation,
  useFetchArticleQuery,
} from '../../../services/ArticlesService'

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
  const navigate = useNavigate()
  const param = useParams()

  const isCreate = location.pathname === '/new-article'

  const title = isCreate ? 'Create new article' : 'Edit article'

  const sendArticleMutation = isCreate ? useCreateNewArticleMutation : useEditArticleMutation

  const [sendArticle, { error, isSuccess, data }] = sendArticleMutation()

  const slug = isCreate ? undefined : param.param

  const defaultValues = {
    title: '',
    desc: '',
    text: '',
    tags: [{ tag: '' }],
  }

  if (!isCreate && slug) {
    const { data } = useFetchArticleQuery(slug)
    if (data) {
      defaultValues.title = data.title
      defaultValues.desc = data.description
      defaultValues.text = data.body
      const tags: { tag: string }[] = []
      data.tagList.map((tag) => {
        tags.push({ tag })
      })
      if (tags.length) {
        defaultValues.tags = tags
      }
    }
  }

  const {
    register,
    formState: { errors },
    setError,
    clearErrors,
    control,
    handleSubmit,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues,
  })

  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control,
  })

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

  useEffect(() => {
    if (isSuccess && data) {
      isCreate ? navigate('/articles') : navigate(`/articles/${slug}`)
      clearErrors()
    }
  }, [isSuccess, data])

  const onSubmit: SubmitHandler<FormValues> = async (dataForm) => {
    const tagsList: string[] = []
    dataForm.tags.map((item) => {
      if (item.tag) {
        tagsList.push(item.tag)
      }
    })
    await sendArticle({
      article: {
        title: dataForm.title,
        description: dataForm.desc,
        body: dataForm.text,
        tagList: tagsList,
        slug,
      },
    })
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                <div className={styles.input}>
                  <CustomInputForm
                    register={register}
                    errors={errors}
                    name={`tags.${id}.tag`}
                    placeholder="Tag"
                    type="text"
                  />
                </div>
                {fields.length !== 1 ? (
                  <Button type="red" onClick={() => remove(id)}>
                    Delete
                  </Button>
                ) : (
                  <Button type="red">Delete</Button>
                )}
                {id === fields.length - 1 && (
                  <Button type="blue" onClick={() => append({ tag: '' })}>
                    Add Tag
                  </Button>
                )}
              </div>
            )
          })}
        </div>
        <div className={styles.submit}>
          <FormButton>Send</FormButton>
        </div>
      </form>
    </div>
  )
}

export default ArticleForm
