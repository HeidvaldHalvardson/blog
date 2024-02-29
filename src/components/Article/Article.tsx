import React from 'react'
import Markdown from 'markdown-to-jsx'
import { useParams } from 'react-router-dom'

import ArticleHeader from '../ArticleHeader/ArticleHeader'
import IsNotFound from '../IsNotFound/IsNotFound'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'
import Spinner from '../UI/Spinner/Spinner'
import { useFetchArticleQuery } from '../../services/ArticlesService'

import styles from './Artitcle.module.scss'

const Article: React.FC = () => {
  const { param } = useParams()

  if (!param) {
    return <IsNotFound />
  }

  const { isLoading, isError, data } = useFetchArticleQuery(param)

  if (!data) {
    return null
  }

  const {
    title,
    tagList,
    favorited,
    body,
    favoritesCount,
    description,
    createdAt,
    slug,
    author: { username, image },
  } = data

  return (
    <div className={styles.wrapper}>
      {isLoading ? <Spinner /> : null}
      {isError ? <ErrorMessage message={'Something is wrong! Please refresh this page...'} /> : null}
      {!isLoading && !isError && (
        <ArticleHeader
          title={title}
          isLiked={favorited}
          likes={favoritesCount}
          tags={tagList}
          name={username}
          createdAt={createdAt}
          image={image}
          desc={description}
          slug={slug}
        />
      )}
      <div className={styles.body}>{body && <Markdown>{body}</Markdown>}</div>
    </div>
  )
}

export default Article
