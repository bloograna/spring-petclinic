import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import { capitalize } from 'lodash';

class AddVetForm extends Component {
  constructSpecialtiesMultiSelect = (specialties, onChange) => {
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
        <Form.Control as="select" multiple onChange={onChange}>
          {specialtyOptions}
        </Form.Control>
      </Form.Group>
    );
  };
  render() {
    const { formValidated, onChange, getRef, specialties } = this.props;
    return (
      <Form noValidate validated={formValidated} ref={getRef}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="firstName">
            <Form.Label id="vet-form-firstname">First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              pattern={'[A-Za-z]+'}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a first name with no spaces
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label id="vet-form-lastname">Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              pattern={'[A-Za-z]+'}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a last name with no spaces
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {this.constructSpecialtiesMultiSelect(specialties, onChange)}
        </Form.Row>
      </Form>
    );
  }
}

AddVetForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  specialties: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired
};

export default AddVetForm;
