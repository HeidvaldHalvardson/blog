import React, { useEffect } from 'react'
import { format } from 'date-fns'
import { useLocation, useNavigate } from 'react-router-dom'
import { Popconfirm } from 'antd'

import {
  useDeleteArticleMutation,
  useFollowArticleMutation,
  useUnfollowArticleMutation,
} from '../../services/ArticlesService'
import { useAppSelector } from '../../store/hooks'
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
  const navigate = useNavigate()
  const location = useLocation()
  const {
    user: { token },
  } = useAppSelector((state) => state.authReducer)

  const [deleteArticle] = useDeleteArticleMutation()
  const [followArticle] = useFollowArticleMutation()
  const [unfollowArticle] = useUnfollowArticleMutation()

  const createdDate = format(new Date(createdAt), 'MMMM d, yyyy')

  const authUser = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '{}').user.username

  let isEditMode = name === authUser

  useEffect(() => {
    isEditMode = name === authUser
  }, [token])

  const isOneArticle = location.pathname === '/articles'

  // const toggleFollow = () => {
  //   if (isLiked) {
  //     followArticle(slug)
  //   }
  //   unfollowArcticle(slug)
  // }

  const confirm = () => {
    deleteArticle(slug)
    navigate('/articles')
  }

  const editHandler = () => {
    navigate('edit')
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
          {isLiked ? (
            <div onClick={() => unfollowArticle(slug)}>
              <HeartOn />
            </div>
          ) : (
            <div onClick={() => followArticle(slug)}>
              <HeartOff />
            </div>
          )}
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
          <Popconfirm
            title=""
            description="Are you sure to delete this article?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button color="red" size="small">
              Delete
            </Button>
          </Popconfirm>
          <Button color="green" size="small" onClick={() => editHandler()}>
            Edit
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default ArticleHeader
