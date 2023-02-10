import React from 'react'
import { useSpring, animated } from '@react-spring/web'

import styles from './HighlightBox.module.css'

const linksOffsetTop = [192, 230, 268, 306, 344, 382, 420];

const HighlightBox = ({
  robotParams,
  isAnimate,
  animationType,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const generateAnimationList = () => {
    let animationList = [];
    animationList = linksOffsetTop.slice(0, robotParams.length).map(height => (
      { top: height, delay: 1400 }
    ));
    animationList[0].delay = 0;
    return animationList;
  }

  const linksSpring = useSpring({
    ref: highlightLinksRef,
    to: generateAnimationList(),
    config: {duration: 200}
  });

  const paramsSpring = useSpring({
    ref: highlightParamsRef,
  });

  return (
    <animated.div
      className={`${styles.highlightBox} ${styles[animationType]}`}
      style={{
        display: isAnimate ? 'block' : 'none',
        top: animationType === 'links' ? linksSpring.top : paramsSpring.top
        // top: 222
      }}
    />
  )
}

export default HighlightBox;