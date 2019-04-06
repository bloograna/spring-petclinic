import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import {
  getVisitsByDate,
  openAddVisitModal as openAddVisitModalAction,
  saveVisit,
  closeAddVisitModal as closeAddVisitModalAction,
  validateVisitModalData
} from '../../state/visit';
import { setActiveOwner, clearActiveOwner } from '../../state/owner';
import {
  getPetsByOwner as getPetsByOwnerAction,
  setActivePet,
  clearActivePet
} from '../../state/pet';
import DropdownSearch from './DropdownSearch';
import AddVisitModal from './AddVisitModal';

const localizer = BigCalendar.momentLocalizer(moment);

const minTime = new Date();
minTime.setHours(8, 0, 0);
const maxTime = new Date();
maxTime.setHours(17, 0, 0);

const calendarContainerStyle = {
  width: 'calc(90vw)',
  height: 'calc(90vh)',
  alignSelf: 'center'
};

class VisitsContainer extends Component {
  searchPetsByOwnerId = event => {
    const { getPetsByOwner, setActiveOwner } = this.props;
    const ownerId = event.currentTarget.getAttribute('name');
    setActiveOwner(parseInt(ownerId, 10));
    getPetsByOwner(ownerId);
  };

  onSelectPet = event => {
    const { setActivePet } = this.props;
    const petId = event.currentTarget.getAttribute('name');
    setActivePet(parseInt(petId, 10));
  };

  render() {
    const {
      visits,
      showAddVisitModal,
      openAddVisitModal,
      closeAddVisitModal,
      shouldValidateVisitModalData,
      owners,
      pets,
      vets,
      activeOwner,
      activePet
    } = this.props;

    return (
      <div style={calendarContainerStyle}>
        <AddVisitModal
          showAddVisitModal={showAddVisitModal}
          onHideAddVisitModal={closeAddVisitModal}
          shouldValidateVisitModalData={shouldValidateVisitModalData}
          onAddButtonClick={this.handleAddVisitFormData}
          vets={vets}
          owners={owners}
          pets={pets}
          searchPetsByOwnerId={this.searchPetsByOwnerId}
          selectPet={this.onSelectPet}
          activeOwner={activeOwner}
          activePet={activePet}
        />
        <BigCalendar
          selectable
          localizer={localizer}
          events={visits}
          min={minTime}
          max={maxTime}
          defaultView={BigCalendar.Views.WORK_WEEK}
          scrollToTime={new Date(2019, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => console.log('event', event)}
          onSelectSlot={openAddVisitModal}
          views={{ month: true, work_week: true, day: true }}
        />
      </div>
    );
  }
}

VisitsContainer.propTypes = {
  owners: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  vets: PropTypes.array.isRequired,
  visits: PropTypes.array.isRequired,
  showAddVisitModal: PropTypes.bool.isRequired,
  shouldValidateVisitModalData: PropTypes.bool.isRequired,
  activeOwner: PropTypes.number,
  activePet: PropTypes.number
};
const mapStateToProps = state => ({
  owners: state.ownerReducer.owners,
  activeOwner: state.ownerReducer.activeOwner,
  pets: state.petReducer.pets,
  activePet: state.petReducer.activePet,
  vets: state.vetReducer.vets,
  visits: state.visitReducer.visits,
  showAddVisitModal: state.visitReducer.showAddVisitModal,
  shouldValidateVisitModalData: state.visitReducer.shouldValidateVisitModalData
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getVisitsByDate: dateString => {
    dispatch(getVisitsByDate(dateString));
  },
  saveVisit: visit => {
    dispatch(saveVisit(visit));
  },
  openAddVisitModal: () => {
    dispatch(openAddVisitModalAction());
  },
  closeAddVisitModal: () => {
    dispatch(closeAddVisitModalAction());
  },
  validateVisitModalData: () => {
    dispatch(validateVisitModalData());
  },
  getPetsByOwner: ownerId => {
    dispatch(getPetsByOwnerAction(ownerId));
  },
  setActiveOwner: ownerId => {
    dispatch(setActiveOwner(ownerId));
  },
  clearActiveOwner: () => {
    dispatch(clearActiveOwner());
  },
  setActivePet: petId => {
    dispatch(setActivePet(petId));
  },
  clearActivePet: () => {
    dispatch(clearActivePet());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsContainer);
