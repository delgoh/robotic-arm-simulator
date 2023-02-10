import React, { useState, useEffect } from 'react';
import { Matrix4 } from 'three';
import { Html } from "@react-three/drei";

import styles from './MatrixOverlay.module.css';

const DECIMAL_PLACES = 2;

const MatrixOverlay = ({ robotParam, matrixDisplayValue }) => {

  const [matrixElems, setMatrixElems] = useState([]);

  useEffect(() => {
    let displayMatrix = new Matrix4();

    if (matrixDisplayValue === "1") displayMatrix = robotParam.relativeT.clone();
    else if (matrixDisplayValue === "2") displayMatrix = robotParam.globalT.clone();

    displayMatrix.transpose();
    setMatrixElems(displayMatrix.elements);
  }, [matrixDisplayValue, robotParam]);

  return (
    <Html
      style={{opacity: matrixDisplayValue === '0' ? 0 : 1}}
      className={styles.matrixOverlay}
      center
      distanceFactor={15}
    >
      <div className={`${styles.bracket} ${styles.leftRoundedCorner}`}>
        <div className={`${styles.bracketInner} ${styles.innerLeft} ${styles.leftRoundedCorner}`}></div>
      </div>
      <div className={styles.centerNumbers}>
        {matrixElems.map((matrixElem, index) => {
          return <div key={index} >{matrixElem.toFixed(DECIMAL_PLACES)}</div>
        })}
      </div>
      <div className={`${styles.bracket} ${styles.rightRoundedCorner}`}>
        <div className={`${styles.bracketInner} ${styles.innerRight} ${styles.rightRoundedCorner}`}></div>
      </div>
    </Html>
  )
};

export default MatrixOverlay;