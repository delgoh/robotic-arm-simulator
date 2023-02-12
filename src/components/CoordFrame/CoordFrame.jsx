import React from 'react'
import { useEffect, useRef } from 'react'
import AxisLine from './AxisLine';
import ClickSphere from './ClickSphere';
import MatrixOverlay from './MatrixOverlay';

const FRAME_LENGTH = 2;
const FRAME_THICKNESS = 0.15;

const CoordFrame = ({
  robotParam,
  robotParams,
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
      <ClickSphere size={0.5} />
      <MatrixOverlay
        robotParam={robotParam}
        robotParams={robotParams}
        matrixDisplayValue={matrixDisplayValue}
      />
    </group>
  );
};

export default CoordFrame;