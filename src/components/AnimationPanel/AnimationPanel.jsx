import React from 'react'
import { Button } from 'react-bootstrap';

import styles from './AnimationPanel.module.css'

const AnimationPanel = ({
  setIsAnimate,
  setAnimationType,
  animationFrameRef,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const handleAnimateLinks = () => {
    setIsAnimate(true);
    setAnimationType("links");
    animationFrameRef.start();
    animationFrameRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightLinksRef.start();
    highlightLinksRef.set({top: 192});
  }

  const handleAnimateParams = () => {
    setIsAnimate(true);
    setAnimationType("params");
    animationFrameRef.start();
    animationFrameRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightParamsRef.start();
  }

  return (
    <div className={styles.animationPanel}>
      <Button
        className='mt-4'
        variant='success'
        style={{margin: "0 15px 0 0"}}
        onClick={handleAnimateLinks}>
        Animate by Links
      </Button>
      <Button
        className='mt-4'
        variant='success'
        onClick={handleAnimateParams}>
        Animate by Parameters
      </Button>
    </div>
  )
};

export default AnimationPanel;