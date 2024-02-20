import React from 'react'
import { format } from 'date-fns'

import CustomLink from '../UI/CustomLink/CustomLink'
import HeartOff from '../UI/Hearts/HeartOff'
import HeartOn from '../UI/Hearts/HeartOn'
import Tags from '../UI/Tags/Tags'

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
  slug = undefined,
}) => {
  const createdDate = format(new Date(createdAt), 'MMMM d, yyyy')

  return (
    <div className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.block}>
          <div className={styles.inner}>
            {slug ? (
              <CustomLink to={slug} style={{ textDecoration: 'none' }}>
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
        <div className={styles.author}>
          <div>
            <p className={styles.name}>{name}</p>
            <p className={styles.date}>{createdDate}</p>
          </div>
          <img className={styles.img} src={image} alt="Avatar author." />
        </div>
      </div>
      <div className={styles.desc}>{desc}</div>
    </div>
  )
}

export default ArticleHeader
