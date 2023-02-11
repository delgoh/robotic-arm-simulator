import React from 'react'
import { Vector3, Quaternion, Matrix4 } from 'three';
import { useSpring, animated } from '@react-spring/three'

import CoordFrame from '../CoordFrame/CoordFrame'

const SPEED_FACTOR = 1; // higher = slower

const AnimatedFrame = ({
  robotParams,
  isAnimate,
  setIsAnimate,
  animationType,
  animateLinksRef,
  animateParamsRef
}) => {

  const animateLinksList = (params) => {
    let animationList = [];
    animationList = params.map((param) => {
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3();
      param.globalT.decompose(pos, quat, scale);

      return {
        position: pos.toArray(),
        quaternion: quat.toArray(),
        delay: 600 * SPEED_FACTOR
      };
    });
    animationList[0].delay = 200 * SPEED_FACTOR;
    animationList[animationList.length - 1].onRest = () => setIsAnimate(false);
    return animationList;
  }

  const animateParamsList = (params) => {
    let animationList = [];
    const currentMatrix = new Matrix4();
    const operationMatrix = new Matrix4();
    const posArr = [];
    const quatArr = [];
    const scaleArr = [];
    for (let i = 0; i < 4; i++) {
      posArr[i] = new Vector3();
      quatArr[i] = new Quaternion();
      scaleArr[i] = new Vector3();
    }
    animationList = params.flatMap((param) => {
      let {theta, r, d, alpha} = param;
      operationMatrix.makeRotationZ((parseFloat(theta) + 0.0001) * (Math.PI / 180)); // Rotate about z-axis by theta
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[0], quatArr[0], scaleArr[0]);
      operationMatrix.makeTranslation(0, 0, (parseFloat(r) + 0.0001)); // Translate along z-axis by r
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[1], quatArr[1], scaleArr[1]);
      operationMatrix.makeTranslation((parseFloat(d) + 0.0001), 0, 0); // Translate along x-axis by d
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[2], quatArr[2], scaleArr[2]);
      operationMatrix.makeRotationX((parseFloat(alpha) + 0.0001) * (Math.PI / 180)); // Rotate about x-axis by alpha
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[3], quatArr[3], scaleArr[3]);

      return Array.from(Array(4).keys()).map((index) => ({
        position: posArr[index].toArray(),
        quaternion: quatArr[index].toArray(),
        delay: 600 * SPEED_FACTOR
      }));
    });
    animationList[0].delay = 200 * SPEED_FACTOR;
    animationList[animationList.length - 1].onRest = () => setIsAnimate(false);
    console.log("frame list: ", animationList);
    return animationList;
  }

  const frameLinksSpring = useSpring({
    ref: animateLinksRef,
    to: animateLinksList(robotParams),
    config: {duration: 1000 * SPEED_FACTOR, delay: 1200 * SPEED_FACTOR}
  });

  const frameParamsSpring = useSpring({
    ref: animateParamsRef,
    to: animateParamsList(robotParams),
    config: {duration: 1000 * SPEED_FACTOR, delay: 1200 * SPEED_FACTOR}
  });

  return (
    <>
      <animated.group
        position={frameLinksSpring.position}
        quaternion={frameLinksSpring.quaternion}
        visible={isAnimate && animationType === 'links'}
      >
        <CoordFrame
          key={robotParams[0].linkId}
          robotParam={robotParams[0]}
          matrixDisplayValue={'0'}
        />
      </animated.group>
      <animated.group
        position={frameParamsSpring.position}
        quaternion={frameParamsSpring.quaternion}
        visible={isAnimate && animationType === 'params'}
      >
        <CoordFrame
          key={robotParams[0].linkId}
          robotParam={robotParams[0]}
          matrixDisplayValue={'0'}
        />
      </animated.group>
    </>
  )
}

export default AnimatedFrame;