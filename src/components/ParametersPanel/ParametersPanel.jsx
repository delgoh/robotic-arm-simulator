import React, { useState, useEffect } from 'react';
import { Matrix4 } from 'three';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import styles from './ParametersPanel.module.css';
import PanelHeader from './PanelHeader';
import LinkHeader from './LinkHeader';
import LinkEntry from './LinkEntry';
import HighlightBox from '../AnimationPanel/HighlightBox';
import PanelToggle from '../PanelToggle';

const MAX_LINKS = 7; // inclusive of base link (link 0)

const ParametersPanel = ({
  robotParams,
  setRobotParams,
  setMatrixDisplayValue,
  isAnimate,
  animationType,
  highlightLinksRef,
  highlightParamsRef,
  animationSpeed
}) => {

  const [isParamPanelOpen, setIsParamPanelOpen] = useState(true);
  const [isLinksMin, setIsLinksMin] = useState(false);
  const [isLinksMax, setIsLinksMax] = useState(false);

  useEffect(() => {
    updateMatrices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const noOfLinks = robotParams.length;
    if (noOfLinks < MAX_LINKS) setIsLinksMax(false);
    else setIsLinksMax(true);
    if (noOfLinks > 1) setIsLinksMin(false);
    else setIsLinksMin(true);
  }, [robotParams]);

  const handleAddLink = () => {
    setRobotParams((prevState) => {
      return [...prevState, {
        linkId: prevState.length,
        theta: "0\u00B0",
        d: "0",
        r: "0",
        alpha: "0\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      }];
    });
    updateMatrices();
  };

  const handleDeleteLink = () => {
    setRobotParams((prevState) => {
      const newState = [...prevState];
      newState.pop();
      return newState;
    });
    updateMatrices();
  };

  const handleClearInputs = () => {
    setRobotParams((prevState) => {
      const noOfLinks = prevState.length;
      const newState = [];
      for (let i = 0; i < noOfLinks; i++) {
        newState.push({
          linkId: i,
          theta: "0\u00B0",
          d: "0",
          r: "0",
          alpha: "0\u00B0",
          relativeT: new Matrix4(),
          globalT: new Matrix4(),
          isVisible: true
        });
      }
      return newState;
    });
    updateMatrices();
  };

  const updateMatrices = () => {
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      newRobotParams = updateAllT(newRobotParams);
      return newRobotParams;
    });
  };

  const updateAllT = (paramsArray) => {
    const noOfLinks = paramsArray.length;
    const currentGlobalT = new Matrix4();
    let updatedParamsArray = [...paramsArray];
    let thetaStr = "", rStr = "", dStr = "", alphaStr = "";
    let d = 0, r = 0, sinTheta = 0, cosTheta = 0, sinAlpha = 0, cosAlpha = 0;

    for (let i = 0; i < noOfLinks; i++) {
      thetaStr = updatedParamsArray[i].theta;
      dStr = updatedParamsArray[i].d;
      rStr = updatedParamsArray[i].r;
      alphaStr = updatedParamsArray[i].alpha;
      
      thetaStr = thetaStr.slice(0, -1);
      alphaStr = alphaStr.slice(0, -1);

      sinTheta = Math.sin(parseFloat(thetaStr) * (Math.PI / 180));
      cosTheta = Math.cos(parseFloat(thetaStr) * (Math.PI / 180));
      sinAlpha = Math.sin(parseFloat(alphaStr) * (Math.PI / 180));
      cosAlpha = Math.cos(parseFloat(alphaStr) * (Math.PI / 180));
      d = parseFloat(dStr);
      r = parseFloat(rStr);
  
      updatedParamsArray[i].relativeT.set(
        cosTheta, (-1)*cosAlpha*sinTheta, sinAlpha*sinTheta, r*cosTheta,
        sinTheta, cosAlpha*cosTheta, (-1)*sinAlpha*cosTheta, r*sinTheta,
        0, sinAlpha, cosAlpha, d,
        0, 0, 0, 1
      );
      currentGlobalT.multiply(updatedParamsArray[i].relativeT);
      updatedParamsArray[i].globalT.copy(currentGlobalT);
    };

    return updatedParamsArray;
  };

  return (
    <>
      <div className={`${styles.parametersPanel} ${isParamPanelOpen ? '' : styles.hidden}`}>
        <PanelHeader />
        <LinkHeader />
        <div className={styles.linkEntryList}>
          {robotParams.map((robotParam, i) => (
            <LinkEntry
              key={robotParam.linkId}
              robotParam={robotParam}
              setRobotParams={setRobotParams}
              isAnimate={isAnimate}
              updateMatrices={updateMatrices}
            />
          ))}
          <HighlightBox
            robotParams={robotParams}
            isAnimate={isAnimate}
            animationType={animationType}
            highlightLinksRef={highlightLinksRef}
            highlightParamsRef={highlightParamsRef}
            animationSpeed={animationSpeed}
          />
        </div>
        <div className='mt-auto'> 
        {/* styles.parameterButtons */}
          <Button
            className='mt-3'
            variant='primary'
            onClick={handleAddLink}
            disabled={isAnimate || isLinksMax}
          >
            Add Link
          </Button>
          <Button
            className='mt-3 ms-3'
            variant='primary'
            onClick={handleDeleteLink}
            disabled={isAnimate || isLinksMin}
          >
            Delete Link
          </Button>
          <Button
            className='mt-3 ms-5'
            variant='danger'
            onClick={handleClearInputs}
            disabled={isAnimate}
          >
            Clear Inputs
          </Button>
        </div>
        <ToggleButtonGroup
          className='mt-3'
          type="radio"
          name="matrix-radio"
          defaultValue={0}
        >
          {["No Matrix", "Relative", "Global"].map((buttonText, index) => (
            <ToggleButton
              key={index}
              id={`matrix-radio-${index}`}
              variant={index === 0 ? 'outline-secondary' : 'outline-primary'}
              value={index}
              onChange={(e) => setMatrixDisplayValue(e.currentTarget.value)}>
              {buttonText}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      <PanelToggle
        isPanelOpen={isParamPanelOpen}
        setIsPanelOpen={setIsParamPanelOpen}
        topPos='28%'
      />
    </>
  );
};

export default ParametersPanel;