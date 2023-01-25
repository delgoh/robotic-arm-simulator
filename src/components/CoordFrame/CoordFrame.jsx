import React from 'react'
import { useEffect, useRef } from 'react'
// import { useFrame } from '@react-three/fiber';
import AxisLine from './AxisLine';

const CoordFrame = ({ robotParam }) => {

  const frameRef = useRef();

  useEffect(() => {
    frameRef.current.matrix = robotParam.globalT;
  }, [robotParam]);

  return (
    <group matrix={robotParam.globalT} matrixAutoUpdate={false} ref={frameRef} >
      <AxisLine direction={"x"} length={3} width={0.2}/>
      <AxisLine direction={"y"} length={3} width={0.2}/>
      <AxisLine direction={"z"} length={3} width={0.2}/>
    </group>
  );
};

export default CoordFrame;