import React from 'react';
import styles from './ArticleList.module.scss'
import ArticleItem from "./ArticleItem/ArticleItem";
import Pagination from "../UI/Pagination/Pagination";

const ArticleList: React.FC = () => {
  const arr = [1,2,3,4,5]
  const total = 50
  return (
    <section className={styles.page}>
      <h1 className="visually-hidden">Articles List</h1>
      <ul className={styles.list}>
        {
          arr.map((item) => {
            return <ArticleItem />
          })
        }
      </ul>
      <Pagination total={total} current={1} pageSize={5} onChange={() => console.log('page changed')} />
    </section>
  );
};

export default ArticleList;