import React from 'react'
import { useSpring, animated } from '@react-spring/web'

import styles from './HighlightBox.module.css'

const SPEED_FACTOR = 1; // higher = slower
const linksOffsetTop = [172, 209, 247, 285, 322, 360, 398];
const paramsOffsetLeft = [76, 152, 228, 304];

const HighlightBox = ({
  robotParams,
  isAnimate,
  animationType,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const animateLinksList = () => {
    let animationList = [];
    animationList = linksOffsetTop.slice(0, robotParams.length).map(topOffset => (
      { top: topOffset, delay: 1400 * SPEED_FACTOR }
    ));
    animationList[0].delay = 0;
    return animationList;
  }

  const animateParamsList = () => {
    let animationList = [];
    animationList = linksOffsetTop.slice(0, robotParams.length).flatMap(topOffset => (
      paramsOffsetLeft.map(leftOffset => (
        { top: topOffset, left: leftOffset, delay: 1400 * SPEED_FACTOR }
      ))
    ));
    animationList[0].delay = 0;
    return animationList;
  }

  const linksSpring = useSpring({
    ref: highlightLinksRef,
    to: animateLinksList(),
    config: {duration: 200 * SPEED_FACTOR}
  });

  const paramsSpring = useSpring({
    ref: highlightParamsRef,
    to: animateParamsList(),
    config: {duration: 200 * SPEED_FACTOR}
  });

  return (
    <animated.div
      className={`${styles.highlightBox} ${styles[animationType]}`}
      style={{
        display: isAnimate ? 'block' : 'none',
        top: animationType === 'links' ? linksSpring.top : paramsSpring.top,
        left: animationType === 'links' ? 10 : paramsSpring.left
      }}
    />
  )
}

export default HighlightBox;