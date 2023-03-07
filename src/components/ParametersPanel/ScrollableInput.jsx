import { useState } from 'react';

import styles from './ScrollableInput.module.css';
import scrollIcon from '../../assets/icons/input-scrollable.png';

const ScrollableInput = ({
  robotParam
}) => {

  const [isHovered, setIsHovered] = useState(false);
  const type = robotParam.type;

  const handleMouseOver = (e) => {
    setIsHovered(true);
  }

  const handleMouseOut = (e) => {
    setIsHovered(false);
  }
  
  return (
    <>
      <img
        id={robotParam.linkId}
        src={scrollIcon}
        alt='scroll icon'
        className={styles.scrollIcon}
        draggable='false'
        onMouseOver={(e) => handleMouseOver(e)}
        style={{left: type === 'Revolute' ? '102px' : '158px'}}
      />
      {isHovered &&
        <input
          className={`${styles.scrollRange}`}
          type='range'
          onMouseOut={(e) => handleMouseOut(e)}
          min={0}
          max={100}
          defaultValue={50}
          step={type === 'Revolute' ? 1 : 0.1}
          style={{left: type === 'Revolute' ? '102px' : '158px'}}
        />
      }
    </>
  );
};

export default ScrollableInput;