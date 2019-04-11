import React from 'react';
import PropTypes from 'prop-types';
import { Form, ButtonGroup, Button, FormControl } from 'react-bootstrap';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';
import addMinutes from 'date-fns/addMinutes';

import CommonForm from '../common/CommonForm';
import DropdownSearch from './DropdownSearch';
import VisitDatePicker from './VisitDatePicker';
import VisitTimePicker from './VisitTimePicker';

// if has edit, then use update mode
const ownerPetInfoChooser = (
  owners,
  selectOwner,
  selectedOwner,
  pets,
  selectPet,
  selectedPet
) => (
  <React.Fragment>
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
  </React.Fragment>
);

const petInfo = selectedPet => (
  <Button variant="outline-secondary">{selectedPet}</Button>
);

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
  selectedVet,
  visitId,
  deleteVisit,
  excludedStartTimes,
  maxEndTime
}) => (
  <CommonForm onSubmit={onSubmit} formValidated={formValidated}>
    <Form.Row>
      <ButtonGroup aria-label="Owner Pet Vet Info">
        {visitId
          ? petInfo(selectedPet)
          : ownerPetInfoChooser(
              owners,
              selectOwner,
              selectedOwner,
              pets,
              selectPet,
              selectedPet
            )}
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
          onChange={event => console.log('calendar change', event)}
          visitTime={selectedStartTime}
          disabled={!selectedDate}
          maxTime={setHours(setMinutes(new Date(), 45), 16)}
          excludeTimes={excludedStartTimes}
          placeholderText="Select a start time"
        />
        <VisitTimePicker
          onSelectTime={selectEndTime}
          visitTime={selectedEndTime}
          onChange={event => console.log('calendar change', event)}
          minTime={addMinutes(selectedStartTime, 15)}
          disabled={!selectedStartTime}
          maxTime={maxEndTime}
          placeholderText="Select an end time"
        />
      </Form.Group>
      <Form.Group />
    </Form.Row>
    <Form.Row>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <FormControl
          name="desc"
          required
          type="text"
          defaultValue={visitDesc}
        />
        <FormControl.Feedback type="invalid">
          You must enter a visit description
        </FormControl.Feedback>
        <FormControl hidden name="id" defaultValue={visitId} />
      </Form.Group>
    </Form.Row>
    <Form.Row>
      <Button onClick={onHideAddVisitModal}>Cancel</Button>
      <Button
        variant="danger"
        hidden={!visitId}
        onClick={() => deleteVisit(visitId)}
      >
        Delete
      </Button>
      <Button type="submit">{visitId ? 'Update' : 'Add'}</Button>
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
  deleteVisit: PropTypes.func.isRequired,
  excludedStartTimes: PropTypes.array.isRequired,
  selectedOwner: PropTypes.string,
  selectedPet: PropTypes.string,
  selectedDate: PropTypes.shape({}),
  selectedStartTime: PropTypes.shape({}),
  selectedEndTime: PropTypes.shape({}),
  selectedVet: PropTypes.string,
  visitDesc: PropTypes.string,
  visitId: PropTypes.number,
  maxEndTime: PropTypes.shape({})
};

export default AddVisitForm;
