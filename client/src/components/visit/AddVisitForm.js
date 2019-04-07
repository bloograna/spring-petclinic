import React from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonGroup, Button, FormControl } from 'react-bootstrap';

import CommonForm from '../common/CommonForm';
import DropdownSearch from './DropdownSearch';
import VisitDatePicker from './VisitDatePicker';
import VisitTimePicker from './VisitTimePicker';

const AddVisitForm = ({
  formValidated,
  owners,
  selectedOwner,
  pets,
  selectedPet,
  vets,
  onSubmit,
  onHideAddVisitModal,
  selectOwner,
  selectPet,
  selectDate,
  selectedDate,
  selectStartTime,
  selectedStartTime,
  selectEndTime,
  selectedEndTime,
  visitDesc,
  selectVet,
  selectedVet
}) => (
  <CommonForm onSubmit={onSubmit} formValidated={formValidated}>
    <Form.Row>
      <ButtonGroup aria-label="Owner Pet Vet Info">
        <DropdownSearch
          title={selectedOwner}
          dropdownOptions={owners}
          onClick={selectOwner}
        />
        <DropdownSearch
          title={selectedPet}
          dropdownOptions={pets}
          onClick={selectPet}
        />
        <DropdownSearch
          title={selectedVet}
          dropdownOptions={vets}
          onClick={selectVet}
        />
      </ButtonGroup>
    </Form.Row>
    <Form.Row>
      <Form.Group>
        <VisitDatePicker onSelectDate={selectDate} visitDate={selectedDate} />
        <VisitTimePicker
          onSelectTime={selectStartTime}
          visitTime={selectedStartTime}
          placeholderText="Select a start time"
        />
        <VisitTimePicker
          onSelectTime={selectEndTime}
          visitTime={selectedEndTime}
          minTime={selectedStartTime}
          placeholderText="Select an end time"
        />
      </Form.Group>
      <Form.Group />
    </Form.Row>
    <Form.Row>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <FormControl name="desc" type="text" defaultValue={visitDesc} />
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
  onSubmit: PropTypes.func.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired,
  selectOwner: PropTypes.func.isRequired,
  selectPet: PropTypes.func.isRequired,
  selectDate: PropTypes.func.isRequired,
  selectStartTime: PropTypes.func.isRequired,
  selectEndTime: PropTypes.func.isRequired,
  selectVet: PropTypes.func.isRequired,
  selectedOwner: PropTypes.string,
  selectedPet: PropTypes.string,
  selectedDate: PropTypes.shape({}),
  selectedStartTime: PropTypes.shape({}),
  selectedEndTime: PropTypes.shape({}),
  selectedVet: PropTypes.string,
  visitDesc: PropTypes.string
};

export default AddVisitForm;
