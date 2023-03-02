import React, { useState } from 'react';
import { Quaternion, Vector3 } from 'three';
import { useSpringRef } from '@react-spring/web';
import { Button } from 'react-bootstrap';

import styles from './AnimationPanel.module.css';
import TextPanel from './TextPanel';
import PanelToggle from '../PanelToggle';

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
  setAnimationSpeed,
  isAnimPanelOpen,
  setIsAnimPanelOpen
}) => {

  const [isAnimateParams, setIsAnimateParams] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const textRef = useSpringRef();

  const getStartPose = (initialParam) => {
    let pos = new Vector3();
    const quat = new Quaternion();
    const scale = new Vector3();
    initialParam.globalT.decompose(pos, quat, scale);

    return {
      position: pos.toArray().map(val => val + 0.001),
      quaternion: quat.toArray()
    };
  };

  const getStartText = (initialParam) => ({
    theta: (initialParam.theta).slice(0, -1),
    r: initialParam.r,
    d: initialParam.d,
    alpha: (initialParam.alpha).slice(0, -1),
    color1: 'rgb(0,0,0)',
    color2: 'rgb(0,0,0)',
    color3: 'rgb(0,0,0)',
    color4: 'rgb(0,0,0)'
  });

  const handleAnimateLinks = async () => {
    await Promise.all([
      setAnimationType("links"),
      setIsAnimate(true),
      setIsAnimateParams(false)
    ]);
    await Promise.all([
      animateLinksRef.set(getStartPose(robotParams[0])),
      highlightLinksRef.set({top: 0}),
      textRef.set(getStartText(robotParams[0]))
    ]);
    await Promise.all([
      animateLinksRef.start(),
      highlightLinksRef.start(),
      textRef.start()
    ]);
  };

  const handleAnimateParams = async () => {
    await Promise.all([
      setAnimationType("params"),
      setIsAnimate(true),
      setIsAnimateParams(true)
    ]);
    await Promise.all([
      animateParamsRef.set(getStartPose(robotParams[0])),
      highlightParamsRef.set({top: 0, left: 66}),
      textRef.set(getStartText(robotParams[0]))
    ]);
    await Promise.all([
      animateParamsRef.start(),
      highlightParamsRef.start(),
      textRef.start()
    ]);
  };

  const handlePause = () => {
    setIsPaused(isPaused => {
      if (!isPaused) {
        animateLinksRef.pause();
        animateParamsRef.pause();
        highlightLinksRef.pause();
        textRef.pause();
      } else {
        animateLinksRef.resume();
        animateParamsRef.resume();
        highlightLinksRef.resume();
        textRef.resume();
      }
      return !isPaused;
    });
  };

  const handleStop = () => {
    animateLinksRef.stop();
    animateParamsRef.stop();
    highlightLinksRef.stop();
    textRef.stop();
    setIsAnimate(false);
    setIsPaused(false);
  };

  return (
    <>
      <div className={`${styles.animationPanel} ${isAnimPanelOpen ? '' : styles.hidden}`}>
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
            className={`${!isPaused ? styles.pauseButton : styles.playButton} mt-3`}
            variant='success'
            disabled={!isAnimate}
            onClick={handlePause}>
            {!isPaused ? "Pause" : "Resume"}
          </Button>
          <Button
            className={`${styles.stopButton} mt-3 ms-3`}
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
      <PanelToggle
        isPanelOpen={isAnimPanelOpen}
        setIsPanelOpen={setIsAnimPanelOpen}
        topPos='79%'
      />
    </>
  );
};

export default AnimationPanel;