import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { useSpring } from '@react-spring/three';
import { useFrame } from '@react-three/fiber';

import styles from './AnimationPanel.module.css'

const AnimationPanel = ({robotParams, setRobotParams, setIsAnimate}) => {

  const handleAnimate = () => {
    setIsAnimate((prev) => !prev);
  }

  return (
    <div className={styles.animationPanel}>
      <Button
        className='mt-4'
        variant='primary'
        onClick={handleAnimate}>
        Animate
      </Button>
    </div>
  )
};

export default AnimationPanel;