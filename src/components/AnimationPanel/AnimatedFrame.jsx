import React, { useEffect } from 'react'
import CoordFrame from '../CoordFrame/CoordFrame'
import { useSpring, useSpringRef, animated } from '@react-spring/three'

const AnimatedFrame = ({robotParams, isAnimate}) => {

  const api = useSpringRef();
  const frameSpring = useSpring({
    ref: api,
    from: { position: [1,0,0] },
    to: [
      { position: [3,2,1], rotation: [1,2,3] },
      { position: [1,3,1], rotation: [2,1,0] },
      { position: [1,0,0], rotation: [0,0,0] },
    ],
    config: { duration: 2000 }
  });

  useEffect(() => {
    api.start();
  }, [isAnimate]);

  // const handleClick = () => {
  //   api.start();
  // }

  return (
    <animated.group
      position={frameSpring.position}
      rotation={frameSpring.rotation}
      key={isAnimate}
    >
      <CoordFrame
        key={robotParams[0].linkId}
        robotParam={robotParams[0]}
      />
    </animated.group>
  )
}

export default AnimatedFrame;