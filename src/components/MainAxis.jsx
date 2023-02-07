import React from 'react'
import { Html } from '@react-three/drei';

const AXIS_THICKNESS = 0.05;

const MainAxis = ({gridSize}) => {
  return (
    <>
      <mesh>
        <boxGeometry args={[gridSize * 1.1, AXIS_THICKNESS, AXIS_THICKNESS]} />
        <meshStandardMaterial color={"red"}/>
      </mesh>
      <Html position={[gridSize * 0.55, 1, 0]} style={{color: "red", fontWeight: "bold", fontSize: 24}} >+x</Html>
      <Html position={[-gridSize * 0.55, 1, 0]} style={{color: "red", fontWeight: "bold", fontSize: 24}} >&#8209;x</Html>

      <mesh>
        <boxGeometry args={[AXIS_THICKNESS, gridSize * 1.1, AXIS_THICKNESS]} />
        <meshStandardMaterial color={"green"}/>
      </mesh>
      <Html position={[0, gridSize * 0.55, 0]} style={{color: "green", fontWeight: "bold", fontSize: 24}} >+y</Html>
      <Html position={[0, -gridSize * 0.55, 0]} style={{color: "green", fontWeight: "bold", fontSize: 24}} >&#8209;y</Html>
      
      <mesh>
        <boxGeometry args={[AXIS_THICKNESS, AXIS_THICKNESS, gridSize * 1.1]} />
        <meshStandardMaterial color={"blue"}/>
      </mesh>
      <Html position={[0, 1, gridSize * 0.55]} style={{color: "blue", fontWeight: "bold", fontSize: 24}} >+z</Html>
      <Html position={[0, 1, -gridSize * 0.55]} style={{color: "blue", fontWeight: "bold", fontSize: 24}} >&#8209;z</Html>      
    </>
  )
};

export default MainAxis;