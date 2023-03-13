import React from 'react'
import { useSpring, animated } from '@react-spring/web'

import styles from './HighlightBox.module.css'

const HighlightBox = ({
  robotParams,
  isAnimate,
  animationType,
  highlightLinksRef,
  highlightParamsRef,
  animationSpeed
}) => {

  const offL = 58;
  const boxW = 56;
  const linksOffsetTop = [0, 38, 76, 114, 151, 189, 228];
  const paramsOffsetLeft = [offL, offL+boxW, offL+boxW*2, offL+boxW*3];

  const animateLinksList = () => {
    let animationList = [];
    animationList = linksOffsetTop.slice(0, robotParams.length).map(topOffset => (
      { top: topOffset, delay: 1400 * animationSpeed }
    ));
    animationList[0].delay = 0;
    return animationList;
  };

  const animateParamsList = () => {
    let animationList = [];
    animationList = linksOffsetTop.slice(0, robotParams.length).flatMap(topOffset => (
      paramsOffsetLeft.map(leftOffset => (
        { top: topOffset, left: leftOffset, delay: 1400 * animationSpeed }
      ))
    ));
    animationList[0].delay = 0;
    return animationList;
  };

  const linksSpring = useSpring({
    ref: highlightLinksRef,
    from: {top: 0},
    to: animateLinksList(),
    config: {duration: 200 * animationSpeed}
  });

  const paramsSpring = useSpring({
    ref: highlightParamsRef,
    from: {top: 0, left: 66},
    to: animateParamsList(),
    config: {duration: 200 * animationSpeed}
  });

  return (
    <animated.div
      className={`${styles.highlightBox} ${styles[animationType]}`}
      style={{
        display: isAnimate ? 'block' : 'none',
        top: animationType === 'links' ? linksSpring.top : paramsSpring.top,
        left: animationType === 'links' ? 0 : paramsSpring.left
      }}
    />
  );
};

export default HighlightBox;