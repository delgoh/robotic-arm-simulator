import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { pages } from './pageData';
import { images } from './importPageImages';
import { useState } from 'react';

const TutorialPage = ({
  isTutorialDisplayed,
  setIsTutorialDisplayed
}) => {

  const noOfPages = pages.length;
  const [pageNumber, setPageNumber] = useState(0);
  const [isPrevVisible, setIsPrevVisible] = useState(false);

  const handleButton = (type) => {
    if (type === "increase") {
      setIsPrevVisible(true);
      if (pageNumber < noOfPages - 1) setPageNumber(pageNo => pageNo + 1);
      else setIsTutorialDisplayed(false);

    } else if (type === "decrease") {
      if (pageNumber > 0) setPageNumber(pageNo => pageNo - 1);
      else setIsPrevVisible(false);
    }
  };

  return (
    <Modal
      show={isTutorialDisplayed}
      onHide={() => setIsTutorialDisplayed(false)}
      size='lg'
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {pages[pageNumber].header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{whiteSpace: 'pre-wrap'}}>{pages[pageNumber].body}</p>
        {images[pageNumber] &&
          <img
            src={images[pageNumber]}
            alt={pageNumber}
            style={{
              display: 'block',
              margin: '0 auto',
              width: '80%'
            }}
          />
        }
      </Modal.Body>
      <Modal.Footer>
        <Button
          className='me-auto'
          variant='outline-primary'
          onClick={() => setIsTutorialDisplayed(false)}
        >
          Skip Tutorial
        </Button>
        {isPrevVisible &&
          <Button
            onClick={() => handleButton("decrease")}
          >
            Previous
          </Button>
        }
        <Button
          variant={pageNumber === noOfPages - 1 ? 'success' : 'primary'}
          onClick={() => handleButton("increase")}
        >
          {pageNumber === noOfPages - 1 ? "Finish" : "Next"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialPage;