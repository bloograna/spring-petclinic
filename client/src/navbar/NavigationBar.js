import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import PropTypes from 'prop-types';

const NavigationBar = ({ onHomeClick, onOwnerClick, onFindVetClick }) => (
  <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
    <Navbar.Brand href="#home">Pet Clinic Admin Panel</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
        <Nav.Link onClick={onOwnerClick}>Find Owners</Nav.Link>
        <Nav.Link onClick={onFindVetClick}>Veterinarians</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavigationBar.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
  onOwnerClick: PropTypes.func.isRequired,
  onFindVetClick: PropTypes.func.isRequired
};

export default NavigationBar;
