import React from 'react'

export default function Prismatic({ robotParam }) {
  return (
    <mesh position={[0,3,0]}>
      <boxGeometry args={[1,1,5]} />
      <meshStandardMaterial args={[1,1,1]}/>
    </mesh>
  )
}
