import React from 'react'
import styles from './Tags.module.scss'

type TTagsProps = {
  tags: string[]
}

const Tags: React.FC<TTagsProps> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => {
        return <span className={styles.tag}>{`Tag ${tag}`}</span>
      })}
    </div>
  )
}

export default Tags;