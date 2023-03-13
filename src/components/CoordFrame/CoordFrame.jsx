import React from 'react'
import { useState, useEffect, useRef } from 'react'

import AxisLine from './AxisLine';
import MatrixOverlay from './MatrixOverlay';

const CoordFrame = ({
  frameLength,
  frameThickness,
  robotParam,
  robotParams,
  isAnimate,
  isVisible,
  matrixDisplayValue
}) => {

  const frameRef = useRef();
  const [isFrameHovered, setIsFrameHovered] = useState(false);

  useEffect(() => {
    frameRef.current.matrix = robotParam.globalT;
  }, [robotParam]);

  return (
    <group
      ref={frameRef}
      visible={isVisible}
      matrix={robotParam.globalT}
      matrixAutoUpdate={false}
      onPointerEnter={() => setIsFrameHovered(true)}
      onPointerLeave={() => setIsFrameHovered(false)}
    >
      <AxisLine
        direction={"x"}
        length={frameLength}
        width={frameThickness}
        isAnimate={isAnimate}
        isVisible={isVisible}
        isFrameHovered={isFrameHovered}
        frameId={robotParam.linkId}
      />
      <AxisLine
        direction={"y"}
        length={frameLength}
        width={frameThickness}
        isAnimate={isAnimate}
        isVisible={isVisible}
        isFrameHovered={isFrameHovered}
        frameId={robotParam.linkId}
      />
      <AxisLine
        direction={"z"}
        length={frameLength}
        width={frameThickness}
        isAnimate={isAnimate}
        isVisible={isVisible}
        isFrameHovered={isFrameHovered}
        frameId={robotParam.linkId}
      />
      <mesh>
        <sphereGeometry args={[0.25]} />
        <meshStandardMaterial color='orange'/>
      </mesh>
      <MatrixOverlay
        robotParam={robotParam}
        robotParams={robotParams}
        matrixDisplayValue={isAnimate ? '0' : matrixDisplayValue}
      />
    </group>
  );
};

export default CoordFrame;