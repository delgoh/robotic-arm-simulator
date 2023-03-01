import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { pages } from './pageData';
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
        <p>
          {pages[pageNumber].body}
        </p>
      </Modal.Body>
      <Modal.Footer>
        {isPrevVisible &&
          <Button
            onClick={() => handleButton("decrease")}>
            Previous
          </Button>
        }
        <Button onClick={() => handleButton("increase")}>
          {pageNumber === noOfPages - 1 ? "Finish" : "Next"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TutorialPage;