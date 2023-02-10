import React from 'react';
import { Matrix4 } from 'three';
import Button from 'react-bootstrap/Button';

import styles from './ParametersPanel.module.css'
import PanelHeader from './PanelHeader';
import LinkHeader from './LinkHeader';
import LinkEntry from './LinkEntry';
import HighlightBox from '../AnimationPanel/HighlightBox';

const MAX_LINKS = 7; // inclusive of base link (link 0)

const ParametersPanel = ({
  robotParams,
  setRobotParams,
  isAnimate,
  animationType,
  highlightLinksRef,
  highlightParamsRef
}) => {

  const handleAddLink = () => {

    const noOfLinks = robotParams.length;
    if (noOfLinks < MAX_LINKS) {
      setRobotParams((prevState) => {
        return [...prevState, {
          linkId: noOfLinks,
          theta: noOfLinks.toString(), //-1.57079, //-0.78539,
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
      {robotParams.map((robotParam, i) => (
        <LinkEntry
          key={robotParam.linkId}
          robotParam={robotParam}
          setRobotParams={setRobotParams}
        />
      ))}
      <Button
        className='mt-4'
        variant='primary'
        style={{margin: "0 15px 0 0"}}
        onClick={handleAddLink}>
        Add Link
      </Button>
      <Button
        className='mt-4'
        variant='primary'
        onClick={handleDeleteLink}>
        Delete Link
      </Button>
      <HighlightBox
        robotParams={robotParams}
        isAnimate={isAnimate}
        animationType={animationType}
        highlightLinksRef={highlightLinksRef}
        highlightParamsRef={highlightParamsRef}
      />
    </div>
  )
};

export default ParametersPanel;