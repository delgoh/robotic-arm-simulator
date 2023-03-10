import React from 'react'
import { useEffect, useRef } from 'react'
import AxisLine from './AxisLine';
import MatrixOverlay from './MatrixOverlay';

// const FRAME_LENGTH = 2;
// const FRAME_THICKNESS = 0.15;

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

  useEffect(() => {
    frameRef.current.matrix = robotParam.globalT;
  }, [robotParam]);

  return (
    <group ref={frameRef} visible={isVisible} matrix={robotParam.globalT} matrixAutoUpdate={false} >
      <AxisLine direction={"x"} length={frameLength} width={frameThickness} isAnimate={isAnimate}/>
      <AxisLine direction={"y"} length={frameLength} width={frameThickness} isAnimate={isAnimate}/>
      <AxisLine direction={"z"} length={frameLength} width={frameThickness} isAnimate={isAnimate}/>
      <mesh>
        <sphereGeometry args={[0.2]} />
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