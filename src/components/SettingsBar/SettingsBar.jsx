import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ToggleButton from 'react-bootstrap/ToggleButton';

const SettingsBar = () => {

  const [isRelMatDisplayed, setIsRelMatDisplayed] = useState(false);
  const [isGloMatDisplayed, setIsGloMatDisplayed] = useState(false);

  const relMatDisplayedHandler = () => {
    setIsRelMatDisplayed(!isRelMatDisplayed);
  }

  const gloMatDisplayedHandler = () => {
    setIsGloMatDisplayed(!isGloMatDisplayed);
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Robot Arm</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Navbar.Text>Link Matrices</Navbar.Text>
            <ToggleButton
              id="toggle-relative"
              type="checkbox"
              variant="outline-primary"
              checked={isRelMatDisplayed}
              onChange={relMatDisplayedHandler}
            >
                Relative
            </ToggleButton>
            <ToggleButton
              id="toggle-global"
              type="checkbox"
              variant="outline-primary"
              checked={isGloMatDisplayed}
              onChange={gloMatDisplayedHandler}
            >
                Global
            </ToggleButton>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default SettingsBar;