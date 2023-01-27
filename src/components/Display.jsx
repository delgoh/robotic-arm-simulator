import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

import styles from './Display.module.css';
import Robot from './Robot';
// import TestPoint from './TestPoint'

const Box = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Display = ({robotParams, setRobotParams}) => {

  // const [mainCamera, setMainCamera] = useState({
  //   position: [-20, 5, 20],
  //   fov: 25
  // });

  // useEffect(() => {
  //   console.log(mainCamera.position);
  // }, [mainCamera]);

  // camera={{position: [-20, 5, 20], fov: 25}}

  // const orbitRef = useRef();

  // useFrame(() => {
  //   console.log(orbitRef.current?.object.position);
  // });

  return (
    <div className={styles.display}>
      <Canvas camera={{position: [-20, 5, 20], fov: 25}} >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-8, 0, 0]} />
        <Robot robotParams={robotParams} setRobotParams={setRobotParams} />
        <gridHelper args={[30, 30]} />
        {/* <axesHelper args={[5]}/> */}
        <OrbitControls  />
        {/* <Stats /> */}
      </Canvas>
    </div>
  )
}

export default Display;