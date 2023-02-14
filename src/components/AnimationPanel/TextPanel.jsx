import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './TextPanel.module.css'

const SPEED_FACTOR = 1; // higher = slower

const TextPanel = ({
  robotParams,
  textLinksRef,
  textParamsRef
}) => {

  // const [isTextDisplayed, setIsTextDisplayed] = useState(false);

  const textLinksList = () => {
    let textList = [];
    textList = robotParams.map((robotParam) => ({
      theta: robotParam.theta,
      r: robotParam.r,
      d: robotParam.d,
      alpha: robotParam.alpha,
      delay: 1550 * SPEED_FACTOR
    }));
    
    textList[0].delay = 0;
    return textList;
  }

  const textLinksSpring = useSpring({
    ref: textLinksRef,
    from: {
      theta: robotParams[0].theta,
      r: robotParams[0].r,
      d: robotParams[0].d,
      alpha: robotParams[0].alpha
    },
    to: textLinksList(),
    config: {duration: 50 * SPEED_FACTOR}
  });

  

  return (
    <animated.div
      className={styles.textPanel}
    >
      <animated.p>{textLinksSpring.theta.to(val => "1) Rot( z, " + Math.floor(val) + " )")}</animated.p>
      <animated.p>{textLinksSpring.r.to(val => "2) Trans( z, " + Math.floor(val) + " )")}</animated.p>
      <animated.p>{textLinksSpring.d.to(val => "3) Trans( x, " + Math.floor(val) + " )")}</animated.p>
      <animated.p>{textLinksSpring.alpha.to(val => "4) Rot( x, " + Math.floor(val) + " )")}</animated.p>
    </animated.div>
  )
};

export default TextPanel;