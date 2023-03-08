import React from 'react'
import { Vector3, Quaternion, Matrix4 } from 'three';
import { useSpring, animated } from '@react-spring/three'

import CoordFrame from '../CoordFrame/CoordFrame'

const AnimatedFrame = ({
  robotParams,
  isAnimate,
  setIsAnimate,
  animationType,
  animateLinksRef,
  animateParamsRef,
  animationSpeed,
  setIsFrameVisibleArr
}) => {

  const createNewParam = () => ({
    linkId: -1,
    theta: "0\u00B0",
    r: "0",
    d: "0",
    alpha: "0\u00B0",
    relativeT: new Matrix4(),
    globalT: new Matrix4(),
    isVisible: true
  })

  const getStartPose = (initialParam) => {
    let pos = new Vector3();
    const quat = new Quaternion();
    const scale = new Vector3();
    initialParam.globalT.decompose(pos, quat, scale);

    return {
      position: pos.toArray(),
      quaternion: quat.toArray()
    };
  };

  const animateLinksList = (params) => {
    let animationList = [];
    animationList = params.map((param, paramIndex) => {
      const pos = new Vector3();
      const quat = new Quaternion();
      const scale = new Vector3();
      param.globalT.decompose(pos, quat, scale);

      return {
        position: pos.toArray().map((val) => val + 0.0002 * paramIndex), // small offset to cause animation delay to occur
        quaternion: quat.toArray(),
        delay: 600 * animationSpeed,
        onRest: () => setIsFrameVisibleArr((prev) => {
          const updateArr = [...prev];
          updateArr[paramIndex] = true;
          return updateArr;
        })
      };
    });
    animationList[0].delay = 200 * animationSpeed;
    animationList[animationList.length - 1].onRest = () => {
      setIsAnimate(false);
      setIsFrameVisibleArr(Array(params.length).fill(true));
    }
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
    animationList = params.flatMap((param, paramIndex) => {
      let {theta, d, r, alpha} = param;
      theta = theta.slice(0, -1);
      alpha = alpha.slice(0, -1);
      operationMatrix.makeRotationZ((parseFloat(theta) + 0.0001) * (Math.PI / 180)); // Rotate about z-axis by theta
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[0], quatArr[0], scaleArr[0]);
      operationMatrix.makeTranslation(0, 0, (parseFloat(d) + 0.0001)); // Translate along z-axis by d
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[1], quatArr[1], scaleArr[1]);
      operationMatrix.makeTranslation((parseFloat(r) + 0.0001), 0, 0); // Translate along x-axis by r
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[2], quatArr[2], scaleArr[2]);
      operationMatrix.makeRotationX((parseFloat(alpha) + 0.0001) * (Math.PI / 180)); // Rotate about x-axis by alpha
      currentMatrix.multiply(operationMatrix);
      currentMatrix.decompose(posArr[3], quatArr[3], scaleArr[3]);

      return Array.from(Array(4).keys()).map((index) => ({
        position: posArr[index].toArray(),
        quaternion: quatArr[index].toArray(),
        delay: 600 * animationSpeed,
        onRest: () => index === 3 && setIsFrameVisibleArr((prev) => {
          const updateArr = [...prev];
          updateArr[paramIndex] = true;
          return updateArr;
        })
      }));
    });
    animationList[0].delay = 200 * animationSpeed;
    animationList[animationList.length - 1].onRest = () => {
      setIsAnimate(false);
      setIsFrameVisibleArr(Array(params.length).fill(true));
    }
    return animationList;
  }

  const frameLinksSpring = useSpring({
    ref: animateLinksRef,
    from: getStartPose(robotParams[0]),
    to: animateLinksList(robotParams),
    config: {duration: 1000 * animationSpeed}
  });

  const frameParamsSpring = useSpring({
    ref: animateParamsRef,
    from: getStartPose(robotParams[0]),
    to: animateParamsList(robotParams),
    config: {duration: 1000 * animationSpeed}
  });

  return (
    <>
      <animated.group
        position={frameLinksSpring.position}
        quaternion={frameLinksSpring.quaternion}
        visible={isAnimate && animationType === 'links'}
      >
        <CoordFrame
          key='animatedLinkFrame'
          robotParam={createNewParam()}
          matrixDisplayValue={'0'}
        />
      </animated.group>
      <animated.group
        position={frameParamsSpring.position}
        quaternion={frameParamsSpring.quaternion}
        visible={isAnimate && animationType === 'params'}
      >
        <CoordFrame
          key='animatedParamFrame'
          robotParam={createNewParam()}
          matrixDisplayValue={'0'}
        />
      </animated.group>
    </>
  )
}

export default AnimatedFrame;