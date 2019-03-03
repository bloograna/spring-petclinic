import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';

const AddVetForm = ({ formValidated, specialties, onChange, onSubmit }) => (
  <Form noValidate validated={formValidated} onSubmit={onSubmit}>
    <Form.Row>
      <Form.Group as={Col} md="4" controlId="firstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="First Name"
          onChange={onChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="lastName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Last name"
          onChange={onChange}
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      {constructSpecialtiesMultiSelect(specialties, onChange)}
    </Form.Row>
    <Button variant="primary" onClick={onSubmit}>
      Submit
    </Button>
  </Form>
);

const constructSpecialtiesMultiSelect = (specialties, onChange) => {
  const specialtyOptions = [];
  specialties.forEach(specialty => {
    specialtyOptions.push(<option>{specialty}</option>);
  });
  specialtyOptions.push(<option>None</option>);
  return (
    <Form.Group controlId="specialties">
      <Form.Label>Specialties (can select multiple)</Form.Label>
      <Form.Control as="select" multiple onChange={onChange}>
        {specialtyOptions}
      </Form.Control>
    </Form.Group>
  );
};

AddVetForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  specialties: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddVetForm;
