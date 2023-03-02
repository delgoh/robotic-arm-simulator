import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { pages } from './pageData';
import { images } from './importPageImages';

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
      else handleHide();

    } else if (type === "decrease") {
      if (pageNumber > 0) setPageNumber(pageNo => pageNo - 1);
      if (pageNumber === 1) setIsPrevVisible(false);
    }
  };

  const handleHide = () => {
    setIsTutorialDisplayed(false);
    setPageNumber(0);
    setIsPrevVisible(false);
  };

  return (
    <Modal
      show={isTutorialDisplayed}
      onHide={handleHide}
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
          onClick={handleHide}
        >
          Skip Tutorial
        </Button>
        {isPrevVisible &&
          <Button
            className='me-4'
            onClick={() => handleButton("decrease")}
          >
            Previous
          </Button>
        }
        <h5>{pageNumber + 1} / 6</h5>
        <Button
          variant={pageNumber === noOfPages - 1 ? 'success' : 'primary'}
          className='ms-4'
          onClick={() => handleButton("increase")}
        >
          {pageNumber === noOfPages - 1 ? "Finish" : "Next"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialPage;