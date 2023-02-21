import React from 'react';

import panelArrowIcon from '../assets/icons/panel-arrow.png';

const PanelToggle = ({ isPanelOpen, setIsPanelOpen, topPos }) => {

  return (
    <div
      onClick={() => setIsPanelOpen(prev => !prev)}
      style={{
        height: '80px',
        width: '30px',
        position: 'absolute',
        display: 'flex',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: topPos,
        left: isPanelOpen ? '390px' : '0px',
        transform: `translateY(-50%)`,
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        background: 'rgba(200, 200, 200, 0.5)',
        transition: '0.5s'
      }}
    >
      <img
        src={panelArrowIcon}
        alt=''
        height='40px'
        width='18px'
        margin='auto'
        style={{
          transform: isPanelOpen ? 'scaleX(-1)' : '',
          transition: '0.5s'
        }}
      />
      
    </div>
  );
};

export default PanelToggle;