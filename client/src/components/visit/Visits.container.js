import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import isAfter from 'date-fns/isAfter';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  getVisitsByDate,
  openAddVisitModal as openAddVisitModalAction,
  saveVisit as saveVisitAction
} from '../../state/visit';
import { getPetsByOwner as getPetsByOwnerAction } from '../../state/pet';

import DropdownSearch from './DropdownSearch';
import AddVisitModal from './AddVisitModal';
import {
  getActivePersonDisplayInfo,
  formatPersonData,
  getActivePetDisplayInfo,
  formatPetData
} from '../../util/displayInfo';

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
  constructor(props) {
    super(props);
    this.state = {
      vetFilter: null,
      petFilter: null,
      ownerFilter: null
    };
  }

  searchPetsByOwnerId = ownerId => {
    const { getPetsByOwner } = this.props;
    this.setState({ petFilter: null });
    getPetsByOwner(ownerId);
  };

  onOwnerFilterClick = ownerId => {
    this.setState({ ownerFilter: ownerId });
    this.searchPetsByOwnerId(ownerId);
  };

  filterVisitBlock = event => {
    const { openAddVisitModal } = this.props;
    if (isAfter(event.start, new Date())) {
      openAddVisitModal(event);
    }
  };

  filterVisitsByVet = vetId => {
    const { visits } = this.props;
    return visits.filter(visit => visit.vetId === vetId);
  };

  filterVisitsByPet = petId => {
    const { visits } = this.props;
    return visits.filter(visit => visit.petId === petId);
  };

  filterVisits = () => {
    const { visits } = this.props;
    const { ownerFilter, petFilter, vetFilter } = this.state;
    let returnVisits = visits;
    if (petFilter) {
      returnVisits = returnVisits.filter(visit => visit.petId === petFilter);
    }
    if (vetFilter) {
      returnVisits = returnVisits.filter(visit => visit.vetId === vetFilter);
    }
    return returnVisits;
  };

  render() {
    const {
      visits,
      showAddVisitModal,
      openAddVisitModal,
      owners,
      pets,
      vets
    } = this.props;
    const { ownerFilter, vetFilter, petFilter } = this.state;
    const filteredVisits = this.filterVisits();
    return (
      <div style={calendarContainerStyle}>
        <AddVisitModal showAddVisitModal={showAddVisitModal} />
        <Row>
          <DropdownSearch
            title={
              ownerFilter
                ? getActivePersonDisplayInfo(owners, ownerFilter)
                : 'Filter visits by owner'
            }
            dropdownOptions={formatPersonData(owners)}
            onClick={this.onOwnerFilterClick}
            onClear={() => this.setState({ ownerFilter: null })}
          />
          <DropdownSearch
            title={
              petFilter
                ? getActivePetDisplayInfo(pets, ownerFilter, petFilter)
                : 'Filter visits by pet'
            }
            dropdownOptions={
              ownerFilter ? formatPetData(pets, ownerFilter) : []
            }
            onClick={petId => this.setState({ petFilter: petId })}
            onClear={() => this.setState({ petFilter: null })}
          />
          <DropdownSearch
            title={
              vetFilter
                ? getActivePersonDisplayInfo(vets, vetFilter)
                : 'Filter visits by vet'
            }
            dropdownOptions={formatPersonData(vets)}
            onClick={vetId => this.setState({ vetFilter: vetId })}
            onClear={() => this.setState({ vetFilter: null })}
          />
        </Row>
        <BigCalendar
          selectable
          localizer={localizer}
          events={filteredVisits}
          step={15}
          timeslots={8}
          min={minTime}
          max={maxTime}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(2019, 1, 1, 6)}
          defaultDate={new Date()}
          onDoubleClickEvent={openAddVisitModal}
          onSelectSlot={this.filterVisitBlock}
          views={{ month: true, week: true, day: true }}
        />
      </div>
    );
  }
}

VisitsContainer.propTypes = {
  visits: PropTypes.array.isRequired,
  showAddVisitModal: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  owners: [...state.ownerReducer.owners.values()],
  pets: state.petReducer.pets,
  vets: [...state.vetReducer.vets.values()],
  visits: [...state.visitReducer.visits.values()],
  showAddVisitModal: state.visitReducer.showAddVisitModal
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getVisitsByDate: dateString => {
    dispatch(getVisitsByDate(dateString));
  },
  saveVisit: visit => {
    dispatch(saveVisitAction(visit));
  },
  openAddVisitModal: visit => {
    dispatch(openAddVisitModalAction(visit));
  },
  getPetsByOwner: ownerId => {
    dispatch(getPetsByOwnerAction(ownerId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsContainer);
