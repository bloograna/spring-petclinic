import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Col, Form } from 'react-bootstrap';
import CommonForm from '../common/CommonForm';

class AddOwnerForm extends Component {
  // I FUCKING NEED THE REF

  renderGroup = (controlId, type, pattern, label, placeHolder, feedBack) => {
    return (
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
  };

  render() {
    const { formValidated, onChange } = this.props;
    // <Form noValidate validated={formValidated} onSubmit={onSubmit}>
    return (
      <CommonForm onChange={onChange} formValidated={formValidated}>
        <Form.Row>
          {this.renderGroup(
            'firstName',
            null,
            null,
            'First Name',
            'First Name',
            'Please enter a first name, no space allowed'
          )}
          {this.renderGroup(
            'lastName',
            null,
            null,
            'Last Name',
            'Last Name',
            'Please enter a last name, no space allowed'
          )}
        </Form.Row>
        <Form.Row>
          {this.renderGroup(
            'address',
            null,
            '[A-Za-z 0-9]+',
            'Address',
            '',
            'Please enter an address'
          )}
          {this.renderGroup(
            'city',
            null,
            '[A-Za-z ]+',
            'City',
            '',
            'Please enter a city'
          )}
        </Form.Row>
        <Form.Row>
          {this.renderGroup(
            'telephone',
            'tel',
            '[0-9]{10}',
            'Telephone',
            '',
            'Please enter a valid pohne number (10 digits)'
          )}
        </Form.Row>
      </CommonForm>
    );
  }
}

AddOwnerForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AddOwnerForm;
