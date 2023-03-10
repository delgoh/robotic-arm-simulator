import React from 'react'

import styles from './LinkHeader.module.css';

const LinkHeader = () => {
  return (
    <div className={styles.parent}>
      <span className={styles.header}>&nbsp;&nbsp;</span>
      <span className={styles.header}>&theta;</span>
      <span className={styles.header}>d</span>
      <span className={styles.header}>r</span>
      <span className={styles.header}>&alpha;</span>
      <span className={styles.header}>Type</span>
    </div>
  )
}

export default LinkHeader;