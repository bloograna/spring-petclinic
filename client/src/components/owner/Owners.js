import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import { isEmpty, capitalize } from 'lodash';

const Owners = ({ owners, onAddPet }) =>
  isEmpty(owners) ? null : (
    <Table striped bordered hover variant="dark">
      {constructTableHeader()}
      <tbody>{constructTableRows(owners, onAddPet)}</tbody>
    </Table>
  );

const constructTableRows = (owners, onAdd) => {
  const rows = [];
  owners.forEach(owner => {
    const pets = owner.pets.map(pet => capitalize(pet.name)).join(', ');
    rows.push(
      constructTableRow(owner.id, owner.firstName, owner.lastName, pets, onAdd)
    );
  });
  return rows;
};

const constructAddButton = (ownerId, onAddPet) => (
  <Button variant="link" size="sm" onClick={onAddPet}>
    Add
  </Button>
);

const constructTableRow = (id, firstName, lastName, pets, onAdd) => (
  <tr>
    <td>{id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>
      {pets}
      {constructAddButton(id, onAdd)}
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
  onAddPet: PropTypes.func.isRequired
};

export default Owners;
