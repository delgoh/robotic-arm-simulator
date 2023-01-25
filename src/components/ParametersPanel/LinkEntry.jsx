import React from 'react'
import { Matrix4 } from 'three';

import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup';

const LinkEntry = ({robotParam, setRobotParams}) => {

  const handleInputChange = (e) => {
    let newState = {...robotParam};

    // TO ADD: IF NUMBER ENDS WITH '.' OR CHARACTER, IGNORE (HALFWAY TYPING FLOAT / INVALID CHAR)
    if (e.target.value === "") newState[e.target.id] = 0;
    else if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(e.target.value)) {
      newState[e.target.id] = parseFloat(e.target.value);

      setRobotParams((prevRobotParams) => {
        let newRobotParams = [...prevRobotParams];
        newRobotParams[newState.linkId] = newState;
        // newRobotParams = updateAllT(newRobotParams);
        return newRobotParams;
      });
    }
  };

  const handleUpdateMatrix = (e) => {
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      // if (e.target.value === "") newRobotParams[e.target.id] = "0";
      newRobotParams = updateAllT(newRobotParams);
      return newRobotParams;
    });
  }

  const updateAllT = (paramsArray) => {
    const noOfLinks = paramsArray.length;
    const currentGlobalT = new Matrix4();
    let updatedParamsArray = [...paramsArray];
    let theta = 0, r = 0, d = 0, alpha = 0;
    let sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;

    for (let i = 0; i < noOfLinks; i++) {
      ({theta, r, d, alpha} = updatedParamsArray[i]);
      sinTheta = Math.sin(theta);
      cosTheta = Math.cos(theta);
      sinAlpha = Math.sin(alpha);
      cosAlpha = Math.cos(alpha);
  
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
    <InputGroup>
      <InputGroup.Text id="linkText">Link {robotParam.linkId}</InputGroup.Text>
      <Form.Control id='theta' value={robotParam.theta} onChange={handleInputChange} onBlur={handleUpdateMatrix} />
      <Form.Control id='r' value={robotParam.r} onChange={handleInputChange} onBlur={handleUpdateMatrix} />
      <Form.Control id='d' value={robotParam.d} onChange={handleInputChange} onBlur={handleUpdateMatrix} />
      <Form.Control id='alpha' value={robotParam.alpha} onChange={handleInputChange} onBlur={handleUpdateMatrix} />
    </InputGroup>
  );
};

export default LinkEntry;