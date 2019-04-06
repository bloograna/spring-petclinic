import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import { capitalize } from 'lodash';
import CommonForm from '../common/CommonForm';

const AddPetForm = ({
  pet,
  formValidated,
  petTypes,
  onAddButtonClick,
  onHideAddPetModal
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4">
        <Form.Label id="pet-form-firstname">Name</Form.Label>
        <Form.Control
          name="name"
          required
          type="text"
          placeholder={'Name'}
          pattern={'[A-Za-z]+'}
          defaultValue={pet && pet.name ? pet.name : ''}
        />
        <Form.Control.Feedback type="invalid">
          Please enter a name with no spaces
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4">
        <Form.Label id="pet-form-lastname">Birthday</Form.Label>
        <Form.Control
          name="birthDate"
          required
          type="date"
          pattern={'[0-9]{4}-[0-9]{2}-[0-9]{2}'}
          defaultValue={pet && pet.birthDate ? pet.birthDate : ''}
        />
        <Form.Control.Feedback type="invalid">
          Invalidate date. yyyy-MM-dd
        </Form.Control.Feedback>
      </Form.Group>
    </Form.Row>
    <Form.Row>{constructSpecialtiesSelect(pet, petTypes)}</Form.Row>
    <Form.Control
      hidden
      name="id"
      defaultValue={pet && pet.id ? pet.id : null}
    />
    <Form.Row>
      <Button onClick={onHideAddPetModal}>Cancel</Button>
      <Button type="submit">{pet && pet.id ? 'Update' : 'Add'}</Button>
    </Form.Row>
  </CommonForm>
);

const constructSpecialtiesSelect = (pet, species) => {
  const specieOptions = [];
  species.forEach(specie => {
    specieOptions.push(
      <option value={specie.id} key={`specie-option-${specie.id}`}>
        {capitalize(specie.name)}
      </option>
    );
  });

  return (
    <Form.Group controlId="petType">
      <Form.Label>Pet Type</Form.Label>
      <Form.Control
        required
        as="select"
        name="type"
        defaultValue={pet && pet.type ? pet.type.id : ''}
      >
        {specieOptions}
      </Form.Control>
    </Form.Group>
  );
};

AddPetForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  petTypes: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onHideAddPetModal: PropTypes.func.isRequired,
  pet: PropTypes.shape({})
};

export default AddPetForm;
