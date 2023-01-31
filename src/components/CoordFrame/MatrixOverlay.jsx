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
      distanceFactor={20}
    >
      <div className={styles.leftBracket}>
        <div className={styles.leftBracketInner}></div>
      </div>
      <div className={styles.centerNumbers}>
        {globalTElems.map((globalTElem, index) => {
          return <div key={index} >{globalTElem.toFixed(DECIMAL_PLACES)}</div>
        })}
      </div>
      <div className={styles.rightBracket}>
        <div className={styles.rightBracketInner}></div>
      </div>
    </Html>
  )
};

export default MatrixOverlay;