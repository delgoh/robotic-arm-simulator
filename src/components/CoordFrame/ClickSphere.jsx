import React, { useRef, useState } from 'react'

const ClickSphere = ({size}) => {
  const clickSphereRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  return (
    <mesh
      ref={clickSphereRef}
      scale={isClicked ? 1.5 : 1}
      onClick={(event) => setIsClicked(!isClicked)}
      onPointerOver={(event) => setIsHovered(true)}
      onPointerOut={(event) => setIsHovered(false)}
    >
      <sphereGeometry args={[size]} />
      <meshStandardMaterial color={isHovered ? 'hotpink' : 'orange'}/>
    </mesh>
  )
};

export default ClickSphere;