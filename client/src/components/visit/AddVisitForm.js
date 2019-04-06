import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import CommonForm from '../common/CommonForm';
import DropdownSearch from './DropdownSearch';

const formatOwnerData = owners =>
  owners.map(owner => {
    const { firstName, lastName, id } = owner;
    return { id, name: lastName + ', ' + firstName };
  });

const formatPetData = (petsByOwner, activeOwner) => {
  const cleanArray = [];
  if (isEmpty(petsByOwner) || !activeOwner) {
    return [];
  } else {
    // need another check in the case data hasnt returned
    const pets = petsByOwner[activeOwner];
    if (pets) {
      Object.values(pets).forEach(pet => {
        const { name, id } = pet;
        cleanArray.push({ name, id });
      });
    }
    return cleanArray;
  }
};

const getActiveOwnerInfo = (owners, activeOwnerId) => {
  const owner = formatOwnerData(
    owners.filter(owner => owner.id === activeOwnerId)
  )[0].name;
  return owner;
};

const getActivePetInfo = (pets, activeOwnerId, activePetId) => {
  const pet = formatPetData(pets, activeOwnerId).filter(
    pet => pet.id === activePetId
  )[0].name;
  return pet;
};

const AddVisitForm = ({
  formValidated,
  owners,
  activeOwner,
  activePet,
  vets,
  pets,
  onAddButtonClick,
  onHideAddVisitModal,
  searchPetsByOwnerId,
  selectPet
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4" controlId="firstName">
        <DropdownSearch
          title={
            activeOwner ? getActiveOwnerInfo(owners, activeOwner) : 'Owner'
          }
          dropdownOptions={formatOwnerData(owners)}
          onClick={searchPetsByOwnerId}
        />
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="lastName">
        <DropdownSearch
          title={
            activeOwner && activePet
              ? getActivePetInfo(pets, activeOwner, activePet)
              : 'Pet'
          }
          dropdownOptions={activeOwner ? formatPetData(pets, activeOwner) : []}
          onClick={selectPet}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label id="visit-form-time">Appointment Time</Form.Label>
        <Form.Control
          name="birthDate"
          required
          type="datetime-local"
          // pattern={'[0-9]{4}-[0-9]{2}-[0-9]{2}'}
        />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Button onClick={onHideAddVisitModal}>Cancel</Button>
      <Button type="submit">Add</Button>
    </Form.Row>
  </CommonForm>
);

AddVisitForm.propTypes = {
  formValidated: PropTypes.bool.isRequired,
  owners: PropTypes.array.isRequired,
  vets: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired,
  searchPetsByOwnerId: PropTypes.func.isRequired,
  selectPet: PropTypes.func.isRequired,
  activeOwner: PropTypes.number,
  activePet: PropTypes.number
};

export default AddVisitForm;
