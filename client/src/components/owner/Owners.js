import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { isEmpty, capitalize } from 'lodash';

const Owners = ({
  owners,
  pets,
  onAddPet,
  setActivePet,
  getPetsByOwnerId,
  getVisitByPetId
}) =>
  isEmpty(owners) ? null : (
    <Table striped bordered hover variant="dark">
      {constructTableHeader()}
      <tbody>
        {constructTableRows(
          owners,
          pets,
          onAddPet,
          setActivePet,
          getPetsByOwnerId,
          getVisitByPetId
        )}
      </tbody>
    </Table>
  );

const constructTableRows = (
  owners,
  pets,
  onAdd,
  setActivePet,
  onLookUp,
  getVisitByPetId
) => {
  const rows = [];
  owners.forEach(owner => {
    if (owner) {
      const petButtons = contructPetButtons(
        owner,
        pets,
        setActivePet,
        onLookUp,
        getVisitByPetId
      );
      rows.push(
        constructTableRow(
          owner.id,
          owner.firstName,
          owner.lastName,
          petButtons,
          onAdd
        )
      );
    }
  });
  return rows;
};

const attachOwnerId = (ownerId, action) => {
  action(ownerId);
};

const contructPetButtons = (
  owner,
  pets,
  setActivePet,
  onLookUp,
  getVisitByPetId
) => {
  return pets && pets[owner.id] ? (
    Object.values(pets[owner.id]).map(pet => {
      const petName = capitalize(pet.name);
      return (
        <Button
          variant="outline-light"
          size="sm"
          key={`pet-info-${pet.id}`}
          onClick={() => {
            setActivePet(pet);
            getVisitByPetId(pet.id);
          }}
        >
          {petName}
        </Button>
      );
    })
  ) : (
    <Button
      variant="outline-info"
      size="sm"
      key="pet-info-search"
      onClick={() => attachOwnerId(owner.id, onLookUp)}
    >
      View Pets
    </Button>
  );
};

const constructTableRow = (id, firstName, lastName, pets, onAdd) => (
  <tr key={`owner-table-row-${id}`}>
    <td>{id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>
      {pets}
      <Button variant="link" size="sm" onClick={() => attachOwnerId(id, onAdd)}>
        Add
      </Button>
    </td>
  </tr>
);

const constructTableHeader = () => (
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Pets</th>
    </tr>
  </thead>
);

Owners.propTypes = {
  owners: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  onAddPet: PropTypes.func.isRequired,
  setActivePet: PropTypes.func.isRequired,
  getPetsByOwnerId: PropTypes.func.isRequired,
  getVisitByPetId: PropTypes.func.isRequired
};

export default Owners;
