import React from 'react';
import styles from "./ArticleHeader.module.scss";
import {IArticleHeader} from "./types";
import HeartOff from "../Hearts/HeartOff";
import HeartOn from "../Hearts/HeartOn";
import Tags from "../Tags/Tags";

const ArticleHeader: React.FC<IArticleHeader> = ({ title, isLiked, likes, tags }) => {
  const authorDefaultSrc = `${process.env.PUBLIC_URL}/assets/author-default.png`

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.inner}>
          <h3 className={styles.title}>{title}</h3>
          {isLiked ? <HeartOn /> : <HeartOff />}
          <span className={styles.likes}>{likes}</span>
        </div>
        <Tags tags={tags} />
      </div>
      <div className={styles.author}>
        <div>
          <p className={styles.name}>John Doe</p>
          <p className={styles.date}>March 5, 2020</p>
        </div>
        <img className={styles.img} src={authorDefaultSrc} alt="Avatar author."/>
      </div>
    </header>
  )
}

export default ArticleHeader
