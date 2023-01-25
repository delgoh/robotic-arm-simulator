import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import CoordFrame from './CoordFrame/CoordFrame'
// import { Matrix4 } from 'three';

// const updateAllT = (robotParams) => {
//     const noOfLinks = robotParams.length;
//     const currentGlobalT = new Matrix4();
//     let robotParam = {};
//     let theta = 0, r = 0, d = 0, alpha = 0;
//     let sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;

//     for (let i = 0; i < noOfLinks; i++) {
//       robotParam = robotParams[i];
//       ({theta, r, d, alpha} = robotParam);
//       sinTheta = Math.sin(theta);
//       cosTheta = Math.cos(theta);
//       sinAlpha = Math.sin(alpha);
//       cosAlpha = Math.cos(alpha);
  
//       robotParam.relativeT.set(
//         cosTheta, (-1)*cosAlpha*sinTheta, sinAlpha*sinTheta, d*cosTheta,
//         sinTheta, cosAlpha*cosTheta, (-1)*sinAlpha*cosTheta, d*sinTheta,
//         0, sinAlpha, cosAlpha, r,
//         0, 0, 0, 1
//       );
      
//       currentGlobalT.multiply(robotParam.relativeT);
  
//       robotParam.globalT.copy(currentGlobalT);
//     };
// };
  // const noOfLinks = robotParams.length;
  // const currentGlobalT = new Matrix4();
  // let robotParam = {};
  // let theta = 0, r = 0, d = 0, alpha = 0;
  // let sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;

  // for (let i = 0; i < noOfLinks; i++) {
  //   robotParam = robotParams[i];
  //   ({theta, r, d, alpha} = robotParam);
  //   sinTheta = Math.sin(theta);
  //   cosTheta = Math.cos(theta);
  //   sinAlpha = Math.sin(alpha);
  //   cosAlpha = Math.cos(alpha);

  //   robotParam.relativeT.set(
  //     cosTheta, (-1)*cosAlpha*sinTheta, sinAlpha*sinTheta, d*cosTheta,
  //     sinTheta, cosAlpha*cosTheta, (-1)*sinAlpha*cosTheta, d*sinTheta,
  //     0, sinAlpha, cosAlpha, r,
  //     0, 0, 0, 1
  //   );
    
  //   currentGlobalT.multiply(robotParam.relativeT);

  //   robotParam.globalT.copy(currentGlobalT);
  // }
// };

const Robot = ({robotParams}) => {

  // updateAllT(robotParams);

  // useEffect(() => {
  //   updateAllT(robotParams);
  // }, [robotParams]);

  // // CREATE NEW USEEFFECT, BUT RUN UPDATEALLT DEFINITION DIRECTLY (NO NEED TO PASS SETROBOTPARAMS)
  // useEffect(() => {
  //   setRobotParams((prevRobotParams) => {
  //     const newRobotParams = [...prevRobotParams];
  
  //     const noOfLinks = newRobotParams.length;
  //     const currentGlobalT = new Matrix4();
  //     let robotParam = {};
  //     let theta = 0, r = 0, d = 0, alpha = 0;
  //     let sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;
  
  //     for (let i = 0; i < noOfLinks; i++) {
  //       robotParam = newRobotParams[i];
  //       ({theta, r, d, alpha} = robotParam);
  //       sinTheta = Math.sin(theta);
  //       cosTheta = Math.cos(theta);
  //       sinAlpha = Math.sin(alpha);
  //       cosAlpha = Math.cos(alpha);
    
  //       robotParam.relativeT.set(
  //         cosTheta, (-1)*cosAlpha*sinTheta, sinAlpha*sinTheta, d*cosTheta,
  //         sinTheta, cosAlpha*cosTheta, (-1)*sinAlpha*cosTheta, d*sinTheta,
  //         0, sinAlpha, cosAlpha, r,
  //         0, 0, 0, 1
  //       );
        
  //       currentGlobalT.multiply(robotParam.relativeT);
    
  //       robotParam.globalT.copy(currentGlobalT);
  //     }
  
  //     return newRobotParams;
  //   });
  // }, []);

  // const frameRef = useRef([]);

  // useEffect(() => {
  //   frameRef.current.setMatrixAt()
  // }, [robotParams])

  return (
    <>
      {robotParams.map((robotParam) => {
        return <CoordFrame
            key={robotParam.linkId}
            robotParam={robotParam}
            // ref={el => frameRef.current[robotParam.linkId] = el}
         />  
      })}
    </>
  );
}

export default Robot;