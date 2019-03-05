import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import { capitalize } from 'lodash';
import CommonForm from '../common/CommonForm';

const AddVetForm = ({
  formValidated,
  specialties,
  onAddButtonClick,
  onHideAddVetModal
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4">
        <Form.Label id="vet-form-firstname">First Name</Form.Label>
        <Form.Control
          required
          name="firstName"
          type="text"
          placeholder="First Name"
          pattern={'[A-Za-z]+'}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a first name with no spaces
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4">
        <Form.Label id="vet-form-lastname">Last Name</Form.Label>
        <Form.Control
          required
          name="lastName"
          type="text"
          placeholder="Last Name"
          pattern={'[A-Za-z]+'}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a last name with no spaces
        </Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Form.Row>{constructSpecialtiesMultiSelect(specialties)}</Form.Row>
    <Form.Row>
      <Button onClick={onHideAddVetModal}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Form.Row>
  </CommonForm>
);

const constructSpecialtiesMultiSelect = specialties => {
  const specialtyOptions = [];
  specialties.forEach(specialty => {
    specialtyOptions.push(
      <option value={specialty.id} id={`specialty-option-${specialty}`}>
        {capitalize(specialty.name)}
      </option>
    );
  });
  specialtyOptions.push(<option id={`specialty-option-none`}>None</option>);
  return (
    <Form.Group controlId="specialties">
      <Form.Label>Specialties (can select multiple)</Form.Label>
      <Form.Control as="select" multiple name="specialties">
        {specialtyOptions}
      </Form.Control>
    </Form.Group>
  );
};

AddVetForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  specialties: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onHideAddVetModal: PropTypes.func.isRequired
};

export default AddVetForm;
