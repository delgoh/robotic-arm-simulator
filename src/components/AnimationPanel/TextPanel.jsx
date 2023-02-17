import React from 'react'
import { useSpring, animated } from '@react-spring/web'
import styles from './TextPanel.module.css'

const SPEED_FACTOR = 1; // higher = slower

const TextPanel = ({
  robotParams,
  textRef,
  isAnimateParams,
  setIsAnimateParams
}) => {

  const setColorArr = (indexFocus) => {
    const colorArr = ['rgb(200,200,200)', 'rgb(200,200,200)', 'rgb(200,200,200)', 'rgb(200,200,200)'];
    if (indexFocus === -1) return colorArr;
    else {
      colorArr[indexFocus] = 'rgb(0,0,0)';
      return colorArr;
    }
  } 

  const textLinksList = () => {
    let textList = [];

    if(!isAnimateParams) { // animate links
      textList = robotParams.map((robotParam) => ({
        theta: robotParam.theta,
        r: robotParam.r,
        d: robotParam.d,
        alpha: robotParam.alpha,
        color1: 'rgb(0,0,0)',
        color2: 'rgb(0,0,0)',
        color3: 'rgb(0,0,0)',
        color4: 'rgb(0,0,0)',
        delay: 1550 * SPEED_FACTOR
      }));

    } else { // animate parameters
      textList = robotParams.flatMap((robotParam) => (
        Array.from(Array(4).keys()).map((index) => {
          let colorArr = setColorArr(index);
          return ({
            theta: robotParam.theta,
            r: robotParam.r,
            d: robotParam.d,
            alpha: robotParam.alpha,
            color1: colorArr[0],
            color2: colorArr[1],
            color3: colorArr[2],
            color4: colorArr[3],
            delay: 1550 * SPEED_FACTOR
          })
        })
      ));
    }
    
    textList[0].delay = 0;
    textList[textList.length - 1].onRest = () => setIsAnimateParams(false);
    return textList;
  }

  const textSpring = useSpring({
    ref: textRef,
    from: {
      theta: robotParams[0].theta,
      r: robotParams[0].r,
      d: robotParams[0].d,
      alpha: robotParams[0].alpha,
      color1: 'rgb(0,0,0)',
      color2: 'rgb(0,0,0)',
      color3: 'rgb(0,0,0)',
      color4: 'rgb(0,0,0)'
    },
    to: textLinksList(),
    config: {duration: 50 * SPEED_FACTOR}
  });



  return (
    <animated.div
      className={styles.textPanel}
    >
      <animated.h5
        style={{color: textSpring.color1}}
      >
        {textSpring.theta.to(val => "1) Rot( z, " + Math.floor(val) + "\xB0 )")}
      </animated.h5>
      <animated.h5
        style={{color: textSpring.color2}}
      >
        {textSpring.r.to(val => "2) Trans( z, " + Math.floor(val) + " )")}
      </animated.h5>
      <animated.h5
        style={{color: textSpring.color3}}
      >
        {textSpring.d.to(val => "3) Trans( x, " + Math.floor(val) + " )")}
      </animated.h5>
      <animated.h5
        style={{color: textSpring.color4}}
      >
        {textSpring.alpha.to(val => "4) Rot( x, " + Math.floor(val) + "\xB0 )")}
      </animated.h5>
    </animated.div>
  )
};

export default TextPanel;