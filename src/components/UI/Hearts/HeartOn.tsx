import React from 'react'

import styles from './Heart.module.scss'

const HeartOn: React.FC = () => {
  return (
    <div className={styles.heart}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8 3.56911C7.26154 2.33835 6.03077 1.47681 4.55385 1.47681C2.46154 1.47681 0.861542 3.07681 0.861542 5.16911C0.861542 9.23065 3.07693 9.84604 8 14.523C12.9231 9.84604 15.1385 9.23065 15.1385 5.16911C15.1385 3.07681 13.5385 1.47681 11.4462 1.47681C9.96923 1.47681 8.73846 2.33835 8 3.56911Z"
          fill="#FF0707"
        />
      </svg>
    </div>
  )
}

export default HeartOn
