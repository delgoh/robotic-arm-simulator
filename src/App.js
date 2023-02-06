import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Matrix4 } from 'three';

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
        theta: "0", //-1.57079, //-0.78539,
        r: "3",
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
        d: "0",
        alpha: "0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      },
      {
        linkId: 2,
        theta: "0", // 1.57079,
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
        d: "0",
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

  return (
    <div className={styles.bodySection}>
      {/* <SettingsBar /> */}
      <ParametersPanel robotParams={robotParams} setRobotParams={setRobotParams} />
      <AnimationPanel robotParams={robotParams} setRobotParams={setRobotParams} setIsAnimate={setIsAnimate} />
      <Display robotParams={robotParams} setRobotParams={setRobotParams} isAnimate={isAnimate} />
    </div>
  );
};

export default App;
