import { useState } from 'react';

import styles from './ScrollableInput.module.css';
import scrollIcon from '../../assets/icons/input-scrollable.png';

const ScrollableInput = ({
  robotParam,
  updateParams,
  updateMatrices
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const [prevVal, setPrevVal] = useState(0);
  const type = robotParam.type;

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseDown = (e, isAngle) => {
    if (isAngle) setPrevVal((robotParam.theta).slice(0, -1));
    else setPrevVal(robotParam.d);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    setIsHovered(false);
  };

  const handleInputChange = (e, isAngle) => {
    let newState = {...robotParam};
    let updatedVal = Math.round((parseFloat(prevVal) + parseFloat(e.target.value)) * 10) / 10;
    let updatedStr = updatedVal.toString();
    if (isAngle) updatedStr += "\u00B0"; // add degree symbol
    newState[isAngle ? 'theta' : 'd'] = updatedStr;
    updateParams(newState);
    updateMatrices();
  }
  
  return (
    <>
      <img
        id={type === 'Revolute' ? 'theta' : 'd'}
        src={scrollIcon}
        alt='scroll icon'
        className={styles.scrollIcon}
        draggable='false'
        onMouseOver={() => handleMouseOver()}
        style={{left: type === 'Revolute' ? '102px' : '158px'}}
      />
      {isHovered &&
        <input
          className={`${styles.scrollRange}`}
          type='range'
          onMouseDown={(e) => handleMouseDown(e, type === 'Revolute')}
          onMouseUp={() => handleMouseUp()}
          onMouseOut={() => handleMouseOut()}
          onChange={(e) => handleInputChange(e, type === 'Revolute')}
          min={type === 'Revolute' ? -180 : -10}
          max={type === 'Revolute' ? 180 : 10}
          defaultValue={0}
          step={type === 'Revolute' ? 1 : 0.1}
          style={{left: type === 'Revolute' ? '108px' : '164px'}}
        />
      }
    </>
  );
};

export default ScrollableInput;