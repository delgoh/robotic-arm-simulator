import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

import styles from './Display.module.css';
import Robot from './Robot';

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

const CanvasControls = (props) => {
  const canvasRef = useRef();
  const orbitRef = useRef();
  const [gridScale, setGridScale] = useState(20);

  useEffect(() => {
    const onZoom = () => {
      const camDist = orbitRef.current.getDistance();
      if (camDist > 40) setGridScale(Math.floor((camDist - 20) / 20) * 20);
    };

    const currentCanvas = canvasRef.current;
    currentCanvas.addEventListener('wheel', onZoom);
    return () => {
      currentCanvas.removeEventListener('wheel', onZoom);
    }
  }, []);

  return (
    <div className={styles.display} ref={canvasRef}>
      <Canvas camera={{position: [-20, 5, 20], fov: 25}} >
        {props.children}
        <OrbitControls ref={orbitRef}/>
        <gridHelper args={[gridScale , gridScale / 2]} />
      </Canvas>
    </div>
  )
};

const Display = ({robotParams, setRobotParams}) => {

  return (
    <CanvasControls>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-8, 0, 0]} /> */}
      <Robot robotParams={robotParams} setRobotParams={setRobotParams} />
      <Stats />
    </CanvasControls>
  )
}

export default Display;