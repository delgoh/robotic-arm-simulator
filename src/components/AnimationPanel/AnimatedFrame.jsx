import React from 'react'
import { Vector3, Quaternion } from 'three';
import { useSpring, animated } from '@react-spring/three'

import CoordFrame from '../CoordFrame/CoordFrame'

const AnimatedFrame = ({robotParams, isAnimate, setIsAnimate, animationRef}) => {

  const generateAnimationList = (params) => {
    const animationList = params.map((param) => {
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3();
      param.globalT.decompose(pos, quat, scale);

      return {
        position: pos.toArray(),
        quaternion: quat.toArray()
      };
    });

    animationList[params.length - 1].onRest = () => setIsAnimate(false);

    return animationList;
  }

  const frameSpring = useSpring({
    ref: animationRef,
    from: {position: [0,0,0], quaternion: [0,0,0,1]},
    to: generateAnimationList(robotParams),
    config: { duration: 2000 }
  });

  return (
    <animated.group
      position={frameSpring.position}
      quaternion={frameSpring.quaternion}
      visible={isAnimate}
    >
      <CoordFrame
        key={robotParams[0].linkId}
        robotParam={robotParams[0]}
      />
    </animated.group>
  )
}

export default AnimatedFrame;