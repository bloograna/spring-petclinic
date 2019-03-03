import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { capitalize } from 'lodash';

const Owners = ({ owners }) => (
  <Table striped bordered hover variant="dark">
    {TableHeader()}
    <tbody>{constructTableRows(owners)}</tbody>
  </Table>
);

const constructTableRows = owners => {
  const rows = [];
  owners.forEach(owner => {
    const pets = owner.pets.map(pet => capitalize(pet.name)).join(', ');
    rows.push(TableRow(owner.id, owner.firstName, owner.lastName, pets));
  });
  return rows;
};

const TableRow = (id, firstName, lastName, pets) => (
  <tr>
    <td>{id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{pets}</td>
  </tr>
);

const TableHeader = () => (
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
  owners: PropTypes.array.isRequired
};

export default Owners;
