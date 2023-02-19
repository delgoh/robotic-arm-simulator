import React, { useState } from 'react';
import { useSpringRef } from '@react-spring/web';
import { Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';

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
  highlightParamsRef,
  animationSpeed,
  setAnimationSpeed
}) => {

  const [isAnimateParams, setIsAnimateParams] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
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

  const handlePause = () => {
    setIsPaused(isPaused => {
      if (!isPaused) {
        animateLinksRef.pause();
        highlightLinksRef.pause();
        textRef.pause();
      } else {
        animateLinksRef.resume();
        highlightLinksRef.resume();
        textRef.resume();
      }
      return !isPaused;
    });
  }

  const handleStop = () => {
    animateLinksRef.stop();
    highlightLinksRef.stop();
    textRef.stop();
    setIsAnimate(false);
    setIsPaused(false);
  }

  return (
    <div className={styles.animationPanel}>
      <div className={styles.animateButtons}>
        <Button
          className='mt-3'
          variant='success'
          disabled={isAnimate}
          onClick={handleAnimateLinks}>
          Animate by Links
        </Button>
        <Button
          className='mt-3 ms-3'
          variant='success'
          disabled={isAnimate}
          onClick={handleAnimateParams}>
          Animate by Parameters
        </Button>
      </div>
      <div>
        <label
          className={`${styles.speedLabel} mt-2`}>
          Animation Speed: </label>
        <input
          className={`${styles.speedRange} ms-3 w-50`}
          type='range'
          onChange={e => setAnimationSpeed(3 - e.currentTarget.value)}
          disabled={isAnimate}
          min={0.5}
          max={2.5}
          defaultValue={1.5}
          step={0.5}
        />
      </div>
      <div>
        <Button
          className='mt-3'
          variant='success'
          disabled={!isAnimate}
          onClick={handlePause}>
          {!isPaused ? "Pause" : "Resume"}
        </Button>
        <Button
          className='mt-3 ms-3'
          variant='success'
          disabled={!isAnimate}
          onClick={handleStop}>
          Stop
        </Button>
      </div>
      <TextPanel
        robotParams={robotParams}
        isAnimateParams={isAnimateParams}
        setIsAnimateParams={setIsAnimateParams}
        textRef={textRef}
        animationSpeed={animationSpeed}
      />
    </div>
  )
};

export default AnimationPanel;