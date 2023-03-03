import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const TutorialButton = ({ setIsTutorialDisplayed }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant='outline-primary'
      className='ms-auto mt-2 me-2'
      onClick={() => setIsTutorialDisplayed(true)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      style={{
        zIndex: 1,
        borderRadius: '30px',
        fontWeight: '600',
        transition: '0.3s'
      }}
    >
      {isHovered ? 'Tutorial' : '?'}
    </Button>
  );
};

export default TutorialButton;