import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react'
// import { Matrix4 } from 'three';

const SquareRod = ({ robotParam }) => {

  const squareRodRef = useRef();
  const matElements = robotParam.globalCenterT.elements;

  useFrame(() => {
    // console.log(robotParam.globalT.elements);
    // const testMat = new Matrix4();
    // testMat.set(
    //   1,0,0,1,
    //   0,1,0,2,
    //   0,0,1,3,
    //   0,0,0,1
    // );
    // console.log(testMat.elements);
    // squareRodRef.current.matrix.set(...testMat.transpose().elements);
    squareRodRef.current.matrix.fromArray(matElements);
    // squareRodRef.current.position.set(2,2,3);
  }, [])
  // console.log(robotParam);

  return (
    <mesh ref={squareRodRef} matrixAutoUpdate={false}>
      <boxGeometry args={[robotParam.d,1,1]} />
      <meshStandardMaterial />
    </mesh>
  )
}

export default SquareRod;