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
        variant='success'
        style={{margin: "0 15px 0 0"}}
        onClick={handleAnimate}>
        Animate by Links
      </Button>
      <Button
        className='mt-4'
        variant='success'
        onClick={handleAnimate}>
        Animate by Parameters
      </Button>
    </div>
  )
};

export default AnimationPanel;