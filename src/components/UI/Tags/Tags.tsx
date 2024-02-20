import React from 'react'

import styles from './Tags.module.scss'

interface ITagsProps {
  tags: string[]
}

const Tags: React.FC<ITagsProps> = ({ tags }) => {
  return (
    <div className={styles.tags}>
      {tags.map((tag, id) => {
        if (!tag) {
          return
        }

        if (tag && tag.length > 10) {
          tag = tag.slice(0, 10) + '...'
        }

        return (
          <span key={id} className={styles.tag}>
            {tag}
          </span>
        )
      })}
    </div>
  )
}

export default Tags
