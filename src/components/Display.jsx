import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stats, OrbitControls } from '@react-three/drei';

import styles from './Display.module.css';
import MainAxis from './MainAxis';
import Robot from './Robot';
import AnimatedFrame from './AnimationPanel/AnimatedFrame';

const CanvasControls = (props) => {
  const canvasRef = useRef();
  const orbitRef = useRef();
  const [gridSize, setgridSize] = useState(20);

  useEffect(() => {
    const onZoom = () => {
      const camDist = orbitRef.current.getDistance();
      if (camDist > 40) setgridSize(Math.floor((camDist - 20) / 20) * 20);
    };

    const currentCanvas = canvasRef.current;
    currentCanvas.addEventListener('wheel', onZoom);
    return () => {
      currentCanvas.removeEventListener('wheel', onZoom);
    }
  }, []);

  return (
    <div className={styles.display} ref={canvasRef}>
      <Canvas
        camera={{position: [-20, 5, 20], fov: 25}}>
        {props.children}
        <OrbitControls ref={orbitRef}/>
        <MainAxis gridSize={gridSize} />
        <gridHelper args={[gridSize , gridSize / 2]} />
      </Canvas>
      <MouseControlPanel />
      <ScalePanel />
    </div>
  )
};

const MouseControlPanel = (props) => {
  return (
    <div className={styles.mouseControlPanel}>
      <div className={styles.leftClickText}>Rotate</div>
      <div className={styles.scrollText}>Zoom</div>
      <div className={styles.rightClickText}>Pan</div>
    </div>
  )
}

const ScalePanel = (props) => {
  return (
    <div className={styles.scalePanel}>
      {"Grid scale: 1 cell = 2 units"}
    </div>
  )
}

const Display = ({robotParams, setRobotParams, isAnimate}) => {

  return (
    <CanvasControls>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Robot robotParams={robotParams} />
      <AnimatedFrame robotParams={robotParams} isAnimate={isAnimate} />
      {/* <AnimatedRobot robotParams={robotParams} isAnimate={isAnimate} setIsAnimate={setIsAnimate} /> */}
      {/* <Stats /> */}
    </CanvasControls>
  )
}

export default Display;