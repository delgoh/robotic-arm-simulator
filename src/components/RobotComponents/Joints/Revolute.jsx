import React from 'react'

export default function Revolute({ robotParam }) {
  return (
    <mesh position={[0,3,0]}>
      <boxGeometry args={[5,1,1]} />
      <meshStandardMaterial args={[1,1,1]}/>
    </mesh>
  )
}
