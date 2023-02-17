import React, { useState } from 'react';
import { useSpringRef } from '@react-spring/web';
import { Button } from 'react-bootstrap';

import styles from './AnimationPanel.module.css'
import TextPanel from './TextPanel';

const AnimationPanel = ({
  robotParams,
  isAnimate,
  setIsAnimate,
  setAnimationType,
  animateLinksRef,
  animateParamsRef,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const [isAnimateParams, setIsAnimateParams] = useState(true);
  const textRef = useSpringRef();

  const handleAnimateLinks = async () => {
    await setAnimationType("links");
    await setIsAnimate(true);
    await setIsAnimateParams(false);
    await animateLinksRef.start();
    await highlightLinksRef.start();
    await textRef.start();
  }

  const handleAnimateParams = async () => {
    await setAnimationType("params");
    await setIsAnimate(true);
    await setIsAnimateParams(true);
    await animateParamsRef.start();
    await highlightParamsRef.start();
    await textRef.start();
  }

  return (
    <div className={styles.animationPanel}>
      <Button
        className='mt-4'
        variant='success'
        disabled={isAnimate}
        style={{margin: "0 15px 0 0"}}
        onClick={handleAnimateLinks}>
        Animate by Links
      </Button>
      <Button
        className='mt-4'
        variant='success'
        disabled={isAnimate}
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