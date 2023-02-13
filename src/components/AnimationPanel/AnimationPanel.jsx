import React from 'react';
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

  const textLinksRef = useSpringRef();
  const textParamsRef = useSpringRef();

  const handleAnimateLinks = () => {
    setAnimationType("links");
    setIsAnimate(true);
    animateLinksRef.start();
    animateLinksRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightLinksRef.start();
    highlightLinksRef.set({top: 172});
    textLinksRef.start();
  }

  const handleAnimateParams = async () => {
    setAnimationType("params");
    setIsAnimate(true);
    animateParamsRef.start();
    animateParamsRef.set({position: [0.01,0.01,0.01], quaternion: [0,0,0,1]});
    highlightParamsRef.start();
    highlightParamsRef.set({top: 172, left: 76});
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
        textLinksRef={textLinksRef}
        textParamsRef={textParamsRef}
      />
    </div>
  )
};

export default AnimationPanel;