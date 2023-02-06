import React from 'react';
import { Html } from "@react-three/drei";

import styles from './MatrixOverlay.module.css';

const DECIMAL_PLACES = 2;

const MatrixOverlay = ({ robotParam }) => {
  
  const copyGlobalT = robotParam.globalT.clone();
  copyGlobalT.transpose();
  const globalTElems = copyGlobalT.elements;

  return (
    <Html
      className={styles.matrixOverlay}
      center
      distanceFactor={15}
    >
      <div className={`${styles.bracket} ${styles.leftRoundedCorner}`}>
        <div className={`${styles.bracketInner} ${styles.innerLeft} ${styles.leftRoundedCorner}`}></div>
      </div>
      <div className={styles.centerNumbers}>
        {globalTElems.map((globalTElem, index) => {
          return <div key={index} >{globalTElem.toFixed(DECIMAL_PLACES)}</div>
        })}
      </div>
      <div className={`${styles.bracket} ${styles.rightRoundedCorner}`}>
        <div className={`${styles.bracketInner} ${styles.innerRight} ${styles.rightRoundedCorner}`}></div>
      </div>
    </Html>
  )
};

export default MatrixOverlay;