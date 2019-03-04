import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Col, Form, Button } from 'react-bootstrap';
import CommonForm from '../common/CommonForm';

const AddOwnerForm = ({
  formValidated,
  onHideAddOwnerModal,
  onAddButtonClick
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      {renderGroup(
        'firstName',
        null,
        null,
        'First Name',
        'First Name',
        'Please enter a first name, no space allowed'
      )}
      {renderGroup(
        'lastName',
        null,
        null,
        'Last Name',
        'Last Name',
        'Please enter a last name, no space allowed'
      )}
    </Form.Row>
    <Form.Row>
      {renderGroup(
        'address',
        null,
        '[A-Za-z 0-9]+',
        'Address',
        '',
        'Please enter an address'
      )}
      {renderGroup(
        'city',
        null,
        '[A-Za-z ]+',
        'City',
        '',
        'Please enter a city'
      )}
    </Form.Row>
    <Form.Row>
      {renderGroup(
        'telephone',
        'tel',
        '[0-9]{10}',
        'Telephone',
        '',
        'Please enter a valid pohne number (10 digits)'
      )}
    </Form.Row>
    <Form.Row>
      <Button onClick={onHideAddOwnerModal}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Form.Row>
  </CommonForm>
);

const renderGroup = (
  controlId,
  type,
  pattern,
  label,
  placeHolder,
  feedBack
) => (
  <FormGroup as={Col} md="4" controlId={controlId}>
    <Form.Label>{label}</Form.Label>
    <FormControl
      name={controlId}
      required
      type={type ? type : 'text'}
      pattern={pattern ? pattern : '[A-Za-z]+'}
      placeholder={placeHolder}
    />
    <FormControl.Feedback type="invalid">{feedBack}</FormControl.Feedback>
  </FormGroup>
);

AddOwnerForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onHideAddOwnerModal: PropTypes.func.isRequired
};

export default AddOwnerForm;
