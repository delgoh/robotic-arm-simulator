import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Matrix4 } from 'three';
import { useSpringRef } from '@react-spring/three';

import styles from './App.module.css'
import Display from './components/Display';
import ParametersPanel from './components/ParametersPanel/ParametersPanel';
import AnimationPanel from './components/AnimationPanel/AnimationPanel';
import TutorialPage from './components/TutorialPage/TutorialPage';
import TutorialButton from './components/TutorialPage/TutorialButton';


const App = () => {

  const [robotParams, setRobotParams] = useState(
    [
      {
        linkId: 0,
        theta: "0\u00B0",
        d: "0",
        r: "0",
        alpha: "0\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        type: "Base"
      },
      {
        linkId: 1,
        theta: "0\u00B0",
        d: "-3",
        r: "2",
        alpha: "-45\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        type: "Revolute"
      },
      {
        linkId: 2,
        theta: "0\u00B0",
        d: "2",
        r: "6",
        alpha: "0\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        type: "Prismatic"
      },
      {
        linkId: 3,
        theta: "45\u00B0",
        d: "0",
        r: "-4",
        alpha: "0\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        type: "Revolute"
      },
      {
        linkId: 4,
        theta: "0\u00B0",
        d: "5",
        r: "0",
        alpha: "60\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        type: "Prismatic"
      }
    ]
  );
  
  const [isTutorialDisplayed, setIsTutorialDisplayed] = useState(true);
  const [matrixDisplayValue, setMatrixDisplayValue] = useState("0");
  const [isAnimate, setIsAnimate] = useState(false);
  const [animationType, setAnimationType] = useState("links");
  const [animationSpeed, setAnimationSpeed] = useState(1.5);  // higher = slower
  const [isAnimPanelOpen, setIsAnimPanelOpen] = useState(true);
  const [isFrameVisibleArr, setIsFrameVisibleArr] = useState(Array(5).fill(true));
  const [isLineVisible, setIsLineVisible] = useState(true);
  const animateLinksRef = useSpringRef();
  const animateParamsRef = useSpringRef();
  const highlightLinksRef = useSpringRef();
  const highlightParamsRef = useSpringRef();

  return (
    <div className={`${styles.bodySection}`}>
      <ParametersPanel
        robotParams={robotParams}
        setRobotParams={setRobotParams}
        setMatrixDisplayValue={setMatrixDisplayValue}
        isAnimate={isAnimate}
        animationType={animationType}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
        animationSpeed={animationSpeed}
        isLineVisible={isLineVisible}
        setIsLineVisible={setIsLineVisible}
      />
      <AnimationPanel
        robotParams={robotParams}
        isAnimate={isAnimate}
        setIsAnimate={setIsAnimate}
        setAnimationType={setAnimationType}
        setIsFrameVisibleArr={setIsFrameVisibleArr}
        animateLinksRef={animateLinksRef}
        animateParamsRef={animateParamsRef}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        isAnimPanelOpen={isAnimPanelOpen}
        setIsAnimPanelOpen={setIsAnimPanelOpen}
      />
      <Display
        robotParams={robotParams}
        isFrameVisibleArr={isFrameVisibleArr}
        setIsFrameVisibleArr={setIsFrameVisibleArr}
        matrixDisplayValue={matrixDisplayValue}
        isAnimate={isAnimate}
        setIsAnimate={setIsAnimate}
        animationType={animationType}
        animateLinksRef={animateLinksRef}
        animateParamsRef={animateParamsRef}
        animationSpeed={animationSpeed}
        isAnimPanelOpen={isAnimPanelOpen}
        isLineVisible={isLineVisible}
      />
      <TutorialPage
        isTutorialDisplayed={isTutorialDisplayed}
        setIsTutorialDisplayed={setIsTutorialDisplayed}
      />
      <TutorialButton
        setIsTutorialDisplayed={setIsTutorialDisplayed}
      />
      <div className={styles.githubOverlay}>
        Project hosted on <a href="https://github.com/delgoh/robotic-arm-simulator">Github</a>
      </div>
    </div>
  );
};

export default App;
