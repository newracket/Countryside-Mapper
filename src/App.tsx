import React from 'react';
import './App.css';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <Navbar className="nav" bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>Agritourism App</Navbar.Brand>
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#link1">Link 1</Nav.Link>
              <Nav.Link href="#link2">Link 2</Nav.Link>
              <Nav.Link href="#link3">Link 3</Nav.Link>
            </Nav>
            
            <Nav className="ms-auto">
              <Nav.Link href="#login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default App;