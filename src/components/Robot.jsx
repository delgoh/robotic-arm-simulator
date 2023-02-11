import React from 'react'
import CoordFrame from './CoordFrame/CoordFrame'

const Robot = ({robotParams, matrixDisplayValue}) => {

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam) => {
        return <CoordFrame
          key={robotParam.linkId}
          robotParam={robotParam}
          isVisible={robotParam.isVisible}
          matrixDisplayValue={matrixDisplayValue}
        />  
      })}
    </group>
  );
}

export default Robot;