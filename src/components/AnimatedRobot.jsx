import React from 'react'
import CoordFrame from './CoordFrame/CoordFrame'
import { useSpring, animated } from '@react-spring/three'

const AnimatedRobot = ({robotParams, isAnimate, setIsAnimate}) => {

  

  return (
    // stopgap solution to prevent matrix at 0,0,0 from not scaling
    <animated.group position={[0.01,0.01,0.01]}>
      {robotParams.map((robotParam) => {
        return <CoordFrame
          isVisible={robotParam.isVisible}
          key={robotParam.linkId}
          robotParam={robotParam}
        />  
      })}
    </animated.group>
  );
}

export default AnimatedRobot;