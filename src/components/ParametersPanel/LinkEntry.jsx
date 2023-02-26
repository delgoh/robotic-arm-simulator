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

  const handleInputFocus = (e) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;
    if (inputStr[inputStr.length - 1] === "\u00B0") { // remove degree symbol
      inputStr = inputStr.slice(0, -1);
      newState[e.target.id] = inputStr;
      setRobotParams((prevRobotParams) => {
        let newRobotParams = [...prevRobotParams];
        newRobotParams[newState.linkId] = newState;
        return newRobotParams;
      })
    }
  }

  const handleInputChange = (e, isAngle) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;
    if (isAngle && inputStr[inputStr.length - 1] === "\u00B0") { // remove degree symbol
      inputStr = inputStr.slice(0, -1);
    }
    if (!isNaN(inputStr) || inputStr === "-") {
      newState[e.target.id] = inputStr;

      setRobotParams((prevRobotParams) => {
        let newRobotParams = [...prevRobotParams];
        newRobotParams[newState.linkId] = newState;
        return newRobotParams;
      })
    }
  };

  const handleInputBlur = (e, isAngle) => {
    let newState = {...robotParam};
    const inputStr = e.target.value;
    if (inputStr === "" || inputStr === "-") {
      newState[e.target.id] = "0";
    }
    if (isAngle && inputStr[inputStr.length - 1] !== "\u00B0") { // add degree symbol
      newState[e.target.id] += "\u00B0";
    }
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      newRobotParams[newState.linkId] = newState;
      return newRobotParams;
    })
    updateMatrix();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleInputBlur(e);
  };

  const updateMatrix = () => {
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
      
      thetaStr = thetaStr.slice(0, -1);
      alphaStr = alphaStr.slice(0, -1);

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
        onFocus={handleInputFocus}
        onChange={e => handleInputChange(e, true)}
        onBlur={e => handleInputBlur(e, true)}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='r'
        value={robotParam.r}
        onChange={e => handleInputChange(e, false)}
        onBlur={e => handleInputBlur(e, false)}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='d'
        value={robotParam.d}
        onChange={e => handleInputChange(e, false)}
        onBlur={e => handleInputBlur(e, false)}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
      <Form.Control
        id='alpha'
        value={robotParam.alpha}
        onFocus={handleInputFocus}
        onChange={e => handleInputChange(e, true)}
        onBlur={e => handleInputBlur(e, true)}
        onKeyDown={handleKeyDown}
        disabled={isAnimate}
      />
    </InputGroup>
  );
};

export default LinkEntry;