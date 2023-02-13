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
    to: textLinksList(),
    config: {duration: 50 * SPEED_FACTOR}
  });

  return (
    <animated.div
      className={styles.textPanel}
    >
      {/* {textLinksSpring.theta.to(val => "Hello" + interpolate(Math.floor(val)))} */}
      {/* {textLinksSpring.theta.interpolate(val => "Rot" + Math.floor(val))} */}
{/* 2) Trans( z, ${parseFloat(robotParam.r).toFixed(2)} )
3) Trans( x, ${parseFloat(robotParam.d).toFixed(2)} )
4) Rot( x, ${parseFloat(robotParam.alpha).toFixed(2)} ) */}
      {/* {textLinksSpring.text} */}
    </animated.div>
  )
};

export default TextPanel;