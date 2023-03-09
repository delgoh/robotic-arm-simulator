import React from 'react'
import CoordFrame from './CoordFrame/CoordFrame'

const Robot = ({
  robotParams,
  matrixDisplayValue,
  isFrameVisibleArr
}) => {

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam, index) => {
        // console.log(isFrameVisibleArr[index]);
        return <CoordFrame
          key={robotParam.linkId}
          robotParam={robotParam}
          robotParams={robotParams}
          isVisible={isFrameVisibleArr[index]}
          matrixDisplayValue={matrixDisplayValue}
        />  
      })}
    </group>
  );
}

export default Robot;