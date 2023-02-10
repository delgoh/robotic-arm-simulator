import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
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

  const [isAnimate, setIsAnimate] = useState(false);
  const [animationType, setAnimationType] = useState("links");
  const animationFrameRef = useSpringRef();
  const highlightLinksRef = useSpringRef();
  const highlightParamsRef = useSpringRef();

  return (
    <div className={styles.bodySection}>
      {/* <SettingsBar /> */}
      <ParametersPanel
        robotParams={robotParams}
        setRobotParams={setRobotParams}
        isAnimate={isAnimate}
        animationType={animationType}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
      />
      <AnimationPanel
        setIsAnimate={setIsAnimate}
        setAnimationType={setAnimationType}
        animationFrameRef={animationFrameRef}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
      />
      <Display
        robotParams={robotParams}
        isAnimate={isAnimate}
        setIsAnimate={setIsAnimate}
        animationType={animationType}
        animationFrameRef={animationFrameRef}
      />
    </div>
  );
};

export default App;
