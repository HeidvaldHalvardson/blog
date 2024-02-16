import React from 'react';
import styles from "./ArticleHeader.module.scss";
import {TArticleHeader} from "./types";
import HeartOff from "../../Hearts/HeartOff";
import HeartOn from "../../Hearts/HeartOn";
import Tags from "../../Tags/Tags";

const ArticleHeader: React.FC<TArticleHeader> = ({ title, isLiked, likes, tags }) => {
  const authorDefaultSrc = `${process.env.PUBLIC_URL}/assets/author-default.png`
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <div className={styles.inner}>
          <h3>{title}</h3>
          {isLiked ? <HeartOn /> : <HeartOff />}
          <span className={styles.likes}>{likes}</span>
        </div>
        <Tags tags={tags} />
      </div>
      <div>
        <div>
          <p className={styles.name}>John Doe</p>
          <p className={styles.date}>March 5, 2020</p>
        </div>
        <img src={authorDefaultSrc} alt="Avatar author."/>
      </div>
    </header>
  )
}

export default ArticleHeader
