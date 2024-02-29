import React from 'react'
import { format } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDeleteArticleMutation } from '../../services/ArticlesService'
import CustomLink from '../UI/CustomLink/CustomLink'
import HeartOff from '../UI/Hearts/HeartOff'
import HeartOn from '../UI/Hearts/HeartOn'
import Tags from '../UI/Tags/Tags'
import Button from '../UI/Buttons/Button'

import { IArticleHeader } from './IArticleHeader'
import styles from './ArticleHeader.module.scss'

const ArticleHeader: React.FC<IArticleHeader> = ({
  title,
  isLiked,
  likes,
  tags,
  name,
  image,
  createdAt,
  desc,
  slug,
}) => {
  const navigator = useNavigate()
  const location = useLocation()

  const [deleteArticle] = useDeleteArticleMutation()

  const createdDate = format(new Date(createdAt), 'MMMM d, yyyy')

  const authUser = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}').user.username

  const isEditMode = name === authUser
  const isOneArticle = location.pathname === '/articles'

  const deleteHandler = () => {
    deleteArticle(slug)
    navigator('/articles')
  }

  const editHandler = () => {
    navigator('edit')
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.inner}>
          {isOneArticle ? (
            <CustomLink to={slug}>
              <h3 className={styles.title}>{title}</h3>
            </CustomLink>
          ) : (
            <h3 className={styles.title}>{title}</h3>
          )}
          {isLiked ? <HeartOn /> : <HeartOff />}
          <span className={styles.likes}>{likes}</span>
        </div>
        <Tags tags={tags} />
      </div>
      <div className={`${styles.author} ${styles.right}`}>
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.date}>{createdDate}</p>
        </div>
        <img className={styles.img} src={image} alt="Avatar author." />
      </div>
      <div className={styles.left}>{desc}</div>
      {!isOneArticle && isEditMode ? (
        <div className={`${styles.buttons} ${styles.right}`}>
          <Button type="red" size="small" onClick={() => deleteHandler()}>
            Delete
          </Button>
          <Button type="green" size="small" onClick={() => editHandler()}>
            Edit
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default ArticleHeader
