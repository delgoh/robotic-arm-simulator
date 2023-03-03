import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const LinkEntry = ({
  robotParam,
  setRobotParams,
  isAnimate,
  linkRef,
  updateMatrices
}) => {

  const handleInputFocus = (e) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;

    if (inputStr[inputStr.length - 1] === "\u00B0") inputStr = inputStr.slice(0, -1); // remove degree symbol
    if (inputStr === "0") inputStr = ""; // empty input field if 0

    newState[e.target.id] = inputStr;
    updateInputField(newState);
  };

  const handleInputChange = (e, isAngle) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;
    inputStr = inputStr.replace(/\s/g, '');
    if (isAngle && inputStr[inputStr.length - 1] === "\u00B0") inputStr = inputStr.slice(0, -1);// remove degree symbol
    if (!isNaN(inputStr) || inputStr === "+" || inputStr === "-" || inputStr === '.') {
      newState[e.target.id] = inputStr;
      updateInputField(newState);
    }
  };

  const handleInputBlur = (e, isAngle) => {
    let newState = {...robotParam};
    let inputStr = e.target.value;

    if (inputStr.match(/^(\s*|\+|-|\.)$/)) inputStr = "0"; // "0" if input is blank, "+", "-" or "."
    inputStr = parseFloat(inputStr).toString(); // remove leading/trailing zeros
    if (isAngle && inputStr[inputStr.length - 1] !== "\u00B0") inputStr += "\u00B0"; // add degree symbol

    newState[e.target.id] = inputStr;
    updateInputField(newState);

    updateMatrices();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleInputBlur(e);
  };
  
  const updateInputField = (newParamState) => {
    setRobotParams((prevRobotParams) => {
      let newRobotParams = [...prevRobotParams];
      newRobotParams[newParamState.linkId] = newParamState;
      return newRobotParams;
    });
  };

  return (
    <InputGroup ref={linkRef}>
      <InputGroup.Text id="linkText">Link {robotParam.linkId}</InputGroup.Text>
      {[['theta', true], ['d', false], ['r', false], ['alpha', true]].map(([inputName, isAngle]) => (
        <Form.Control
          id={inputName}
          key={inputName}
          value={robotParam[inputName]}
          onFocus={handleInputFocus}
          onChange={e => handleInputChange(e, isAngle)}
          onBlur={e => handleInputBlur(e, isAngle)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          disabled={isAnimate}
        />
      ))}
    </InputGroup>
  );
};

export default LinkEntry;