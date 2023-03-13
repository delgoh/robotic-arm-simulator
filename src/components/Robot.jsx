import { useState, useEffect } from 'react';
import { BufferGeometry, Vector3, Quaternion } from 'three';

import CoordFrame from './CoordFrame/CoordFrame'

const Robot = ({
  robotParams,
  isAnimate,
  matrixDisplayValue,
  isFrameVisibleArr,
  isLineVisible
}) => {

  const [linkLines, setLinkLines] = useState([]);
  const lineGeometry = new BufferGeometry().setFromPoints(linkLines);

  useEffect(() => {
    setLinkLines(robotParams.map((robotParam) => {
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3();
      robotParam.globalT.decompose(pos, quat, scale);
      return pos;
    }));
  }, [robotParams]);

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam, index) => {
        return <CoordFrame
          key={robotParam.linkId}
          frameLength={2}
          frameThickness={0.15}
          robotParam={robotParam}
          robotParams={robotParams}
          isVisible={isFrameVisibleArr[index]}
          isAnimate={isAnimate}
          matrixDisplayValue={matrixDisplayValue}
        />
      })}
      {isLineVisible &&
        <line geometry={lineGeometry}>
          <lineBasicMaterial
            attach='material'
            color='#000080'
            linecap='round'
            linejoin='round'
          />
        </line>
      }
    </group>
  );
};

export default Robot;