import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Col } from 'react-bootstrap';
import { capitalize } from 'lodash';

class AddPetForm extends Component {
  constructSpecialtiesSelect = (species, onChange) => {
    const specieOptions = [];
    species.forEach(specie => {
      specieOptions.push(
        <option value={specie.id} id={`specie-option-${specie}`}>
          {capitalize(specie.name)}
        </option>
      );
    });

    return (
      <Form.Group controlId="petType">
        <Form.Label>Pet Type</Form.Label>
        <Form.Control required as="select" onChange={onChange}>
          {specieOptions}
        </Form.Control>
      </Form.Group>
    );
  };

  render() {
    const { formValidated, onChange, getRef, petTypes } = this.props;
    return (
      <Form noValidate validated={formValidated} ref={getRef}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="petName">
            <Form.Label id="pet-form-firstname">Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              pattern={'[A-Za-z]+'}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a name with no spaces
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="petBirthdate">
            <Form.Label id="pet-form-lastname">Birthday</Form.Label>
            <Form.Control
              required
              type="date"
              pattern={'[0-9]{4}-[0-9]{2}-[0-9]{2}'}
              onChange={onChange}
            />
            <Form.Control.Feedback type="invalid">
              Invalidate date. yyyy-MM-dd
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {this.constructSpecialtiesSelect(petTypes, onChange)}
        </Form.Row>
      </Form>
    );
  }
}

AddPetForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  petTypes: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  getRef: PropTypes.func.isRequired
};

export default AddPetForm;
