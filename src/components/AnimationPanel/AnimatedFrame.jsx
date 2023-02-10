import React from 'react'
import { Vector3, Quaternion } from 'three';
import { useSpring, animated } from '@react-spring/three'

import CoordFrame from '../CoordFrame/CoordFrame'

const AnimatedFrame = ({
  robotParams,
  isAnimate,
  setIsAnimate,
  animationType,
  animationFrameRef
}) => {

  const generateAnimationList = (params) => {

    let animationList = [];
    if (animationType === 'links') {

      animationList = params.map((param) => {
        const pos = new Vector3();
        const quat = new Quaternion();
        const scale = new Vector3();
        param.globalT.decompose(pos, quat, scale);
  
        return {
          position: pos.toArray(),
          quaternion: quat.toArray(),
          delay: 600
        };
      });

    } else if (animationType === 'params') {

      animationList = params.map((param) => {
        const pos = new Vector3();
        const quat = new Quaternion();
        const scale = new Vector3();
        param.globalT.decompose(pos, quat, scale);
  
        return {
          position: pos.toArray(),
          quaternion: quat.toArray(),
          delay: 600
        };
      });
    }
    
    animationList[0].delay = 200;
    animationList[animationList.length - 1].onRest = () => setIsAnimate(false);
    return animationList;
  }

  const frameSpring = useSpring({
    ref: animationFrameRef,
    to: generateAnimationList(robotParams),
    config: {duration: 1000, delay: 1200}
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
        isMatrixVisible={false}
      />
    </animated.group>
  )
}

export default AnimatedFrame;