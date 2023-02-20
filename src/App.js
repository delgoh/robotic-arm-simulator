import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Matrix4 } from 'three';
import { useSpringRef } from '@react-spring/three';

import styles from './App.module.css'
import Display from './components/Display';
import ParametersPanel from './components/ParametersPanel/ParametersPanel';
import AnimationPanel from './components/AnimationPanel/AnimationPanel';
// import SettingsBar from './components/SettingsBar/SettingsBar';


const App = () => {

  const [robotParams, setRobotParams] = useState(
    [
      {
        linkId: 0,
        theta: "0",
        r: "0",
        d: "0",
        alpha: "0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      },
      {
        linkId: 1,
        theta: "0",
        r: "-3",
        d: "2",
        alpha: "30",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      },
      {
        linkId: 2,
        theta: "0",
        r: "3",
        d: "9",
        alpha: "0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      },
      {
        linkId: 3,
        theta: "45",
        r: "0",
        d: "-4",
        alpha: "-90",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      },
      {
        linkId: 4,
        theta: "0",
        r: "9",
        d: "0",
        alpha: "60",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      }
    ]
  );
  
  const [matrixDisplayValue, setMatrixDisplayValue] = useState("0");
  const [isAnimate, setIsAnimate] = useState(false);
  const [animationType, setAnimationType] = useState("links");
  const [animationSpeed, setAnimationSpeed] = useState(1.5);  // higher = slower
  const animateLinksRef = useSpringRef();
  const animateParamsRef = useSpringRef();
  const highlightLinksRef = useSpringRef();
  const highlightParamsRef = useSpringRef();

  return (
    <div className={styles.bodySection}>
      <ParametersPanel
        robotParams={robotParams}
        setRobotParams={setRobotParams}
        setMatrixDisplayValue={setMatrixDisplayValue}
        isAnimate={isAnimate}
        animationType={animationType}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
        animationSpeed={animationSpeed}
      />
      <AnimationPanel
        robotParams={robotParams}
        isAnimate={isAnimate}
        setIsAnimate={setIsAnimate}
        setAnimationType={setAnimationType}
        animateLinksRef={animateLinksRef}
        animateParamsRef={animateParamsRef}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <Display
        robotParams={robotParams}
        matrixDisplayValue={matrixDisplayValue}
        isAnimate={isAnimate}
        setIsAnimate={setIsAnimate}
        animationType={animationType}
        animateLinksRef={animateLinksRef}
        animateParamsRef={animateParamsRef}
        animationSpeed={animationSpeed}
      />
    </div>
  );
};

export default App;
