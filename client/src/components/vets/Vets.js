import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { isEmpty, capitalize } from 'lodash';

const Vets = ({ vets }) => (
  <Table striped bordered hover variant="dark">
    {TableHeader()}
    <tbody>{constructTableRows(vets)}</tbody>
  </Table>
);

const constructTableRows = vets => {
  const rows = [];
  vets.forEach(vet => {
    const specialties = vet.specialties
      .map(specialty => capitalize(specialty.name))
      .join(', ');
    rows.push(
      TableRow(
        vet.id,
        vet.firstName,
        vet.lastName,
        isEmpty(specialties) ? 'None' : specialties
      )
    );
  });
  return rows;
};

const TableRow = (id, firstName, lastName, specialties) => (
  <tr>
    <td>{id}</td>
    <td>{firstName}</td>
    <td>{lastName}</td>
    <td>{specialties}</td>
  </tr>
);

const TableHeader = () => (
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Specialties</th>
    </tr>
  </thead>
);

Vets.propTypes = {
  vets: PropTypes.array.isRequired
};

export default Vets;
