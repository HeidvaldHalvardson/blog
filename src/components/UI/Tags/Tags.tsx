import React from 'react';
import styles from './Tag.module.scss'

type TTagProps = {
  children: string
}

const Tag: React.FC<TTagProps> = ({ children }) => {
  return (
    <div className={styles.tag}>
      {children}
    </div>
  );
};

export default Tag;