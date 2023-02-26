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
        r: "0",
        d: "0",
        alpha: "0\u00B0",
        relativeT: new Matrix4(),
        globalT: new Matrix4(),
        isVisible: true
      }];
    });
  };

  const handleDeleteLink = () => {
    setRobotParams((prevState) => {
      const newState = [...prevState];
      newState.pop();
      return newState;
    });
  };

  const handleClearInputs = () => {
    setRobotParams((prevState) => {
      const noOfLinks = prevState.length;
      const newState = [];
      for (let i = 0; i < noOfLinks; i++) {
        newState.push({
          linkId: i,
          theta: "0\u00B0",
          r: "0",
          d: "0",
          alpha: "0\u00B0",
          relativeT: new Matrix4(),
          globalT: new Matrix4(),
          isVisible: true
        });
      }
      return newState;
    });
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