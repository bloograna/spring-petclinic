import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import PropTypes from 'prop-types';

const NavigationBar = ({
  onHomeClick,
  onOwnerClick,
  onVetClick,
  onAppointmentClick
}) => (
  <Navbar variant="dark" bg="dark" expand="lg" sticky="top">
    <Navbar.Brand href="#home">Pet Clinic Admin Panel</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link onClick={onHomeClick}>Home</Nav.Link>
        <Nav.Link onClick={onOwnerClick}>Owners</Nav.Link>
        <Nav.Link onClick={onVetClick}>Veterinarians</Nav.Link>
        <Nav.Link onClick={onAppointmentClick}>Appointments</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavigationBar.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
  onOwnerClick: PropTypes.func.isRequired,
  onVetClick: PropTypes.func.isRequired,
  onAppointmentClick: PropTypes.func.isRequired
};

export default NavigationBar;
