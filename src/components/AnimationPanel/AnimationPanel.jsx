import React, { useState } from 'react';
import { useSpringRef } from '@react-spring/web';
import { Button } from 'react-bootstrap';

import styles from './AnimationPanel.module.css'
import TextPanel from './TextPanel';

const AnimationPanel = ({
  robotParams,
  setIsAnimate,
  setAnimationType,
  animateLinksRef,
  animateParamsRef,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const [isAnimateParams, setIsAnimateParams] = useState(true);
  const textRef = useSpringRef();

  const handleAnimateLinks = () => {
    setAnimationType("links");
    setIsAnimate(true);
    animateLinksRef.start();
    animateLinksRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightLinksRef.start();
    highlightLinksRef.set({top: 172});
    textRef.start();
    setIsAnimateParams(false);
  }

  const handleAnimateParams = async () => {
    setAnimationType("params");
    setIsAnimate(true);
    animateParamsRef.start();
    animateParamsRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightParamsRef.start();
    highlightParamsRef.set({top: 172, left: 76});
    textRef.start();
    setIsAnimateParams(true);
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
      <TextPanel
        robotParams={robotParams}
        isAnimateParams={isAnimateParams}
        setIsAnimateParams={setIsAnimateParams}
        textRef={textRef}
      />
    </div>
  )
};

export default AnimationPanel;