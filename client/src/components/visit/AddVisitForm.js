import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import { capitalize } from 'lodash';
import CommonForm from '../common/CommonForm';

const AddVisitForm = ({
  formValidated,
  vets,
  onAddButtonClick,
  onHideAddVisitModal
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4" controlId="firstName">
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
      <Form.Group as={Col} md="4" controlId="lastName">
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
    <Form.Row>{constructSpecialtiesMultiSelect(vets)}</Form.Row>
    <Form.Row>
      <Button onClick={onHideAddVisitModal}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Form.Row>
  </CommonForm>
);

const constructSpecialtiesMultiSelect = vets => {
  const vetOptions = [];
  vets.forEach(vet => {
    vetOptions.push(
      <option value={vet.id} id={`vet-option-${vet}`}>
        {capitalize(vet.lastname)}
      </option>
    );
  });

  return (
    <Form.Group controlId="available-vets">
      <Form.Label>With Doctor</Form.Label>
      <Form.Control as="select" name="visitVet">
        {vetOptions}
      </Form.Control>
    </Form.Group>
  );
};

AddVisitForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  vets: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired
};

export default AddVisitForm;
