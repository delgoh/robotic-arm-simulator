import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

import styles from './LinkEntry.module.css';

const LinkEntry = ({
  robotParam,
  setRobotParams,
  isAnimate,
  linkRef,
  updateMatrices
}) => {

  const updateParams = (newParamState) => {
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      newRobotParams[newParamState.linkId] = newParamState;
      return newRobotParams;
    });
  };

  const handleInputFocus = (e) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;

    if (inputStr[inputStr.length - 1] === "\u00B0") inputStr = inputStr.slice(0, -1); // remove degree symbol
    if (inputStr === "0") inputStr = ""; // empty input field if 0

    newState[e.target.id] = inputStr;
    updateParams(newState);
  };

  const handleInputChange = (e, isAngle) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;
    inputStr = inputStr.replace(/\s/g, '');
    if (isAngle && inputStr[inputStr.length - 1] === "\u00B0") inputStr = inputStr.slice(0, -1);// remove degree symbol
    if (!isNaN(inputStr) || inputStr === "+" || inputStr === "-" || inputStr === '.') {
      newState[e.target.id] = inputStr;
      updateParams(newState);
    }
  };

  const handleInputBlur = (e, isAngle) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;

    if (inputStr.match(/^(\s*|\+|-|\.)$/)) inputStr = "0"; // "0" if input is blank, "+", "-" or "."
    inputStr = parseFloat(inputStr).toString(); // remove leading/trailing zeros
    if (isAngle && inputStr[inputStr.length - 1] !== "\u00B0") inputStr += "\u00B0"; // add degree symbol

    newState[e.target.id] = inputStr;
    updateParams(newState);
    updateMatrices();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleInputBlur(e);
  };
  
  const handleTypeClick = (e) => {
    let newState = {...robotParam};
    if (e.target.innerText === "Revolute") newState.type = "Prismatic";
    else if (e.target.innerText === "Prismatic") newState.type = "Revolute";
    updateParams(newState);
  }

  return (
    <InputGroup
      ref={linkRef}
      className={`mb-1 ${styles.inputGroup}`}
    >
      <InputGroup.Text
        id="linkText"
        className={styles.inputGroupText}
        // style={{width: '60px'}}
      >
        Link {robotParam.linkId}
      </InputGroup.Text>
      {[['theta', true], ['d', false], ['r', false], ['alpha', true]].map(([inputName, isAngle]) => (
        <Form.Control
          id={inputName}
          key={inputName}
          className={styles.formControl}
          value={robotParam[inputName]}
          onFocus={handleInputFocus}
          onChange={e => handleInputChange(e, isAngle)}
          onBlur={e => handleInputBlur(e, isAngle)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          disabled={isAnimate}
        />
      ))}
      <Button
        id={robotParam.linkId}
        variant={robotParam.type !== 'Base' ? 'outline-primary' : 'outline-secondary'}
        className={styles.inputButton}
        disabled={robotParam.type === 'Base'}
        onClick={(e) => handleTypeClick(e)}
      >
        {robotParam.type}
      </Button>
    </InputGroup>
  );
};

export default LinkEntry;