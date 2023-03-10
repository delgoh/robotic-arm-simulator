import React from 'react'
import { useEffect, useRef } from 'react'
import AxisLine from './AxisLine';
import MatrixOverlay from './MatrixOverlay';

const FRAME_LENGTH = 2;
const FRAME_THICKNESS = 0.15;

const CoordFrame = ({
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
      <AxisLine direction={"x"} length={FRAME_LENGTH} width={FRAME_THICKNESS}/>
      <AxisLine direction={"y"} length={FRAME_LENGTH} width={FRAME_THICKNESS}/>
      <AxisLine direction={"z"} length={FRAME_LENGTH} width={FRAME_THICKNESS}/>
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