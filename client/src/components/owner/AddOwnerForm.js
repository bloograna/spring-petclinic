import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';

class AddOwnerForm extends Component {
  // I FUCKING NEED THE REF

  renderGroup = (
    controlId,
    type,
    pattern,
    label,
    placeHolder,
    feedBack,
    onChange
  ) => {
    return (
      <Form.Group as={Col} md="4" controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          required
          type={type ? type : 'text'}
          pattern={pattern ? pattern : '[A-Za-z]+'}
          placeholder={placeHolder}
          onChange={onChange}
        />
        <Form.Control.Feedback type="invalid">{feedBack}</Form.Control.Feedback>
      </Form.Group>
    );
  };

  render() {
    const { formValidated, onChange, getRef } = this.props;
    // <Form noValidate validated={formValidated} onSubmit={onSubmit}>
    return (
      <Form noValidate validated={formValidated} ref={getRef}>
        <Form.Row>
          {this.renderGroup(
            'firstName',
            null,
            null,
            'First Name',
            'First Name',
            'Please enter a first name, no space allowed',
            onChange
          )}
          {this.renderGroup(
            'lastName',
            null,
            null,
            'Last Name',
            'Last Name',
            'Please enter a last name, no space allowed',
            onChange
          )}
        </Form.Row>
        <Form.Row>
          {this.renderGroup(
            'address',
            null,
            '[A-Za-z 0-9]+',
            'Address',
            '',
            'Please enter an address',
            onChange
          )}
          {this.renderGroup(
            'city',
            null,
            '[A-Za-z ]+',
            'City',
            '',
            'Please enter a city',
            onChange
          )}
        </Form.Row>
        <Form.Row>
          {this.renderGroup(
            'telephone',
            'tel',
            '[0-9]{10}',
            'Telephone',
            '',
            'Please enter a valid pohne number (10 digits)',
            onChange
          )}
        </Form.Row>
      </Form>
    );
  }
}

AddOwnerForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired
};

export default AddOwnerForm;
