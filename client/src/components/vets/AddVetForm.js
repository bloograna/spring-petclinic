import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Col } from 'react-bootstrap';
import { capitalize } from 'lodash';

const AddVetForm = ({ formValidated, specialties, onChange, onSubmit }) => (
  <Form noValidate validated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="First Name"
          onChange={onChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a first name
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Last Name"
          onChange={onChange}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a last name
        </Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Form.Row>
      {constructSpecialtiesMultiSelect(specialties, onChange)}
    </Form.Row>
    <Button variant="primary" onClick={onSubmit}>
      Add
    </Button>
  </Form>
);

const constructSpecialtiesMultiSelect = (specialties, onChange) => {
  const specialtyOptions = [];
  specialties.forEach(specialty => {
    specialtyOptions.push(
      <option value={specialty.id}>{capitalize(specialty.name)}</option>
    );
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
