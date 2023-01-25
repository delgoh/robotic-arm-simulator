import React from 'react'
// import { useFrame } from '@react-three/fiber'

const Base = (props) => {
  return (
    <mesh {...props}>
      <sphereGeometry args={[1,32,16]} />
      <meshStandardMaterial args={[1,1,1]}/>
    </mesh>
  )
}

export default Base;
