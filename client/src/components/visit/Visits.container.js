import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import isAfter from 'date-fns/isAfter';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  getVisitsByDate,
  openAddVisitModal as openAddVisitModalAction,
  saveVisit as saveVisitAction
} from '../../state/visit';

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
  filterVisitBlock = event => {
    const { openAddVisitModal } = this.props;
    if (isAfter(event.start, new Date())) {
      openAddVisitModal(event);
    }
  };

  render() {
    const { visits, showAddVisitModal, openAddVisitModal } = this.props;

    return (
      <div style={calendarContainerStyle}>
        <AddVisitModal showAddVisitModal={showAddVisitModal} />
        <BigCalendar
          selectable
          localizer={localizer}
          events={visits}
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsContainer);
