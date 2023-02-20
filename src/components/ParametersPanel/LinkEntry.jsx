import { useEffect } from 'react';
import { Matrix4 } from 'three';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LinkEntry = ({
  robotParam,
  setRobotParams,
  isAnimate,
  linkRef
}) => {

  useEffect(() => {
    setRobotParams((prevRobotParams) => {
      updateAllT(prevRobotParams);
      return prevRobotParams;
    });
  }, [setRobotParams]);

  const handleInputChange = (e) => {
    let newState = {...robotParam};

    if (!isNaN(e.target.value) || e.target.value === "-") {
      newState[e.target.id] = e.target.value;

      setRobotParams((prevRobotParams) => {
        let newRobotParams = [...prevRobotParams];
        newRobotParams[newState.linkId] = newState;
        return newRobotParams;
      })
    }
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "" || e.target.value === "-") {
      let newState = {...robotParam};
      newState[e.target.id] = "0";
      setRobotParams((prevRobotParams) => {
        let newRobotParams = [...prevRobotParams];
        newRobotParams[newState.linkId] = newState;
        return newRobotParams;
      })
    }
    handleUpdateMatrix(e);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleInputBlur(e);
  };

  const handleUpdateMatrix = (e) => {
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      newRobotParams = updateAllT(newRobotParams);
      return newRobotParams;
    });
  }

  const updateAllT = (paramsArray) => {
    const noOfLinks = paramsArray.length;
    const currentGlobalT = new Matrix4();
    let updatedParamsArray = [...paramsArray];
    let thetaStr = "", rStr = "", dStr = "", alphaStr = "";
    let r = 0, d = 0, sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;

    for (let i = 0; i < noOfLinks; i++) {
      thetaStr = updatedParamsArray[i].theta;
      rStr = updatedParamsArray[i].r;
      dStr = updatedParamsArray[i].d;
      alphaStr = updatedParamsArray[i].alpha;

      sinTheta = Math.sin(parseFloat(thetaStr) * (Math.PI / 180));
      cosTheta = Math.cos(parseFloat(thetaStr) * (Math.PI / 180));
      sinAlpha = Math.sin(parseFloat(alphaStr) * (Math.PI / 180));
      cosAlpha = Math.cos(parseFloat(alphaStr) * (Math.PI / 180));
      r = parseFloat(rStr);
      d = parseFloat(dStr);
  
      updatedParamsArray[i].relativeT.set(
        cosTheta, (-1)*cosAlpha*sinTheta, sinAlpha*sinTheta, d*cosTheta,
        sinTheta, cosAlpha*cosTheta, (-1)*sinAlpha*cosTheta, d*sinTheta,
        0, sinAlpha, cosAlpha, r,
        0, 0, 0, 1
      );
      
      currentGlobalT.multiply(updatedParamsArray[i].relativeT);
  
      updatedParamsArray[i].globalT.copy(currentGlobalT);
    };

    return updatedParamsArray;
  };

  return (
    <InputGroup ref={linkRef}>
      <InputGroup.Text id="linkText">Link {robotParam.linkId}</InputGroup.Text>
      <Form.Control
        id='theta'
        value={robotParam.theta}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='r'
        value={robotParam.r}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='d'
        value={robotParam.d}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='alpha'
        value={robotParam.alpha}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
    </InputGroup>
  );
};

export default LinkEntry;