import React from 'react'
import CoordFrame from './CoordFrame/CoordFrame'

const Robot = ({
  robotParams,
  isAnimate,
  matrixDisplayValue,
  isFrameVisibleArr
}) => {

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam, index) => {
        return <CoordFrame
          key={robotParam.linkId}
          robotParam={robotParam}
          robotParams={robotParams}
          isVisible={isFrameVisibleArr[index]}
          isAnimate={isAnimate}
          matrixDisplayValue={matrixDisplayValue}
        />  
      })}
    </group>
  );
}

export default Robot;