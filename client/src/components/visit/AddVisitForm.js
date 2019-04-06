import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Button, FormControl } from 'react-bootstrap';
import { capitalize } from 'lodash';
import CommonForm from '../common/CommonForm';
import DropdownSearch from './DropdownSearch';

const formatOwnerData = owners =>
  owners.map(owner => {
    const { firstName, lastName, id } = owner;
    return { id, name: lastName + ', ' + firstName };
  });

const formatPetData = petsByOwner => {
  const cleanArray = [];
  petsByOwner.forEach(owner => {
    if (owner) {
      const pets = Object.values(owner);

      pets.forEach(pet => {
        const { name, id } = pet;
        cleanArray.push({ name, id });
      });
    }
  });
  return cleanArray;
  // const cleaned = petsByOwner.flatMap(petByOwner => {
  //   if (petByOwner) {
  //     const pets = Object.values(petByOwner);
  //     return pets.flatMap(pet => {
  //       const { name, id } = pet;
  //       return { id, name };
  //     });
  //   }
  //   return;
  // });
  // return cleaned;
};

const AddVisitForm = ({
  formValidated,
  owners,
  vets,
  pets,
  onAddButtonClick,
  onHideAddVisitModal,
  searchOwnerByLastName,
  searchPetsByOwnerId
}) => (
  <CommonForm onSubmit={onAddButtonClick} formValidated={formValidated}>
    <Form.Row>
      <Form.Group as={Col} md="4" controlId="firstName">
        <DropdownSearch
          title="Owner"
          dropdownOptions={formatOwnerData(owners)}
          onClick={searchPetsByOwnerId}
        />
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="lastName">
        <DropdownSearch
          title="Pet"
          dropdownOptions={formatPetData(pets)}
          onClick={() => console.log('on select pet')}
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
  searchOwnerByLastName: PropTypes.func.isRequired,
  searchPetsByOwnerId: PropTypes.func.isRequired
};

export default AddVisitForm;
