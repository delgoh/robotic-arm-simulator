import React from 'react'
import CoordFrame from './CoordFrame/CoordFrame'

const Robot = ({robotParams}) => {

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam) => {
        return <CoordFrame
          isVisible={robotParam.isVisible}
          key={robotParam.linkId}
          robotParam={robotParam}
        />  
      })}
    </group>
  );
}

export default Robot;