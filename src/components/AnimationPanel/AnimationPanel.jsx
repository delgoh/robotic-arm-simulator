import React from 'react'
import { Button } from 'react-bootstrap';

import styles from './AnimationPanel.module.css'

const AnimationPanel = ({robotParams, setRobotParams, setIsAnimate, animationRef}) => {

  const handleAnimate = () => {
    setIsAnimate(true);
    animationRef.start();
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