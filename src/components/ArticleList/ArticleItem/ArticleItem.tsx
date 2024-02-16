import React from 'react'
import styles from './ArticleItem.module.scss'

import ArticleHeader from "../../UI/ArticleHeader/ArticleHeader";

const ArticleItem: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <ArticleHeader isLiked={false} likes={12} tags={['1', '2']} title="Some article title"/>
      <div className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Cumque laboriosam obcaecati quisquam! A aliquam amet aperiam, eligendi, explicabo facere magni molestiae nobis nulla quae recusandae sed.
        Magni odio soluta tenetur!
      </div>
    </div>
  )
}

export default ArticleItem