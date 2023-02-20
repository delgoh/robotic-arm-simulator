import React from 'react';
import { Matrix4 } from 'three';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

import styles from './ParametersPanel.module.css'
import PanelHeader from './PanelHeader';
import LinkHeader from './LinkHeader';
import LinkEntry from './LinkEntry';
import HighlightBox from '../AnimationPanel/HighlightBox';

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


  const handleAddLink = () => {

    const noOfLinks = robotParams.length;
    if (noOfLinks < MAX_LINKS) {
      setRobotParams((prevState) => {
        return [...prevState, {
          linkId: noOfLinks,
          theta: "0",
          r: "0",
          d: "0",
          alpha: "0",
          relativeT: new Matrix4(),
          globalT: new Matrix4(),
          isVisible: true
        }];
      });
    } else {
      // make popup/popover warning
    }
  }

  const handleDeleteLink = () => {
    const noOfLinks = robotParams.length;
    if (noOfLinks > 1) {
      setRobotParams((prevState) => {
        const newState = [...prevState];
        newState.pop();
        return newState;
      });
    } else {
      // make popup/popover warning
    }
  }

  return (
    <div className={styles.parametersPanel}>
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
      <div className={styles.parameterButtons}>
        <Button
          className='mt-3'
          variant='primary'
          onClick={handleAddLink}
          disabled={isAnimate}
        >
          Add Link
        </Button>
        <Button
          className='mt-3 ms-3'
          variant='primary'
          onClick={handleDeleteLink}
          disabled={isAnimate}
        >
          Delete Link
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
  )
};

export default ParametersPanel;