import React, { useState } from 'react'

import Pagination from '../UI/Pagination/Pagination'
import ArticleHeader from '../ArticleHeader/ArticleHeader'
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage'
import Spinner from '../UI/Spinner/Spinner'
import { useFetchArticlesListQuery } from '../../services/ArticlesService'

import styles from './ArticleList.module.scss'

const ArticleList: React.FC = () => {
  const [page, setPage] = useState(1)
  const { isLoading, isError, data } = useFetchArticlesListQuery({ page })

  const listView =
    !isLoading && !isError && data ? (
      <>
        <ul className={styles.list}>
          {data.articles.map(
            ({
              slug,
              favorited,
              favoritesCount,
              title,
              tagList,
              description,
              createdAt,
              author: { image, username },
            }) => {
              return (
                <li className={styles.li} key={slug}>
                  <ArticleHeader
                    slug={slug}
                    favorited={favorited}
                    likes={favoritesCount}
                    title={title}
                    tags={tagList}
                    desc={description}
                    image={image}
                    name={username}
                    createdAt={createdAt}
                  />
                </li>
              )
            }
          )}
        </ul>
        <Pagination total={data.articlesCount} current={page} pageSize={5} onChange={(page) => setPage(page)} />
      </>
    ) : null

  return (
    <section className={styles.page}>
      <h1 className="visually-hidden">Articles List</h1>
      {isLoading ? <Spinner /> : null}
      {isError && !isLoading && !data ? (
        <ErrorMessage message={'Something is wrong! Please refresh this page...'} />
      ) : null}
      {listView}
    </section>
  )
}

export default ArticleList
