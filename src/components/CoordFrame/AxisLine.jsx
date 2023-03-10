import React from 'react'

const AxisLine = ({ direction, length, width }) => {
  if (direction === "x") {
    return (
      <mesh position={[length/2, 0, 0]}>
        <boxGeometry args={[length, width, width]} />
        <meshStandardMaterial color={"red"}/>
      </mesh>
    );
  } else if (direction === "y") {
    return (
      <mesh position={[0, length/2, 0]}>
        <boxGeometry args={[width, length, width]} />
        <meshStandardMaterial color={"green"}/>
      </mesh>
    );
  } else if (direction === "z") {
    return (
      <mesh position={[0, 0, length/2]}>
        <boxGeometry args={[width, width, length]} />
        <meshStandardMaterial color={"blue"}/>
      </mesh>
    );
  }
};

export default AxisLine;