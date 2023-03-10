import React from 'react'

const AxisLine = ({ direction, length, width, isAnimate }) => {
  if (direction === "x") {
    return (
      <mesh position={[length/2, 0, 0]}>
        <boxGeometry args={[length, width, width]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'red'}/>
      </mesh>
    );
  } else if (direction === "y") {
    return (
      <mesh position={[0, length/2, 0]}>
        <boxGeometry args={[width, length, width]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'green'}/>
      </mesh>
    );
  } else if (direction === "z") {
    return (
      <mesh position={[0, 0, length/2]}>
        <boxGeometry args={[width, width, length]} />
        <meshStandardMaterial color={isAnimate ? 'grey' : 'blue'}/>
      </mesh>
    );
  }
};

export default AxisLine;