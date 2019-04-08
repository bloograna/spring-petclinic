import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
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
  render() {
    const { visits, showAddVisitModal, openAddVisitModal } = this.props;

    return (
      <div style={calendarContainerStyle}>
        <AddVisitModal showAddVisitModal={showAddVisitModal} />
        <Button onClick={() => openAddVisitModal()}>Add Appointment</Button>
        <BigCalendar
          selectable
          localizer={localizer}
          events={visits}
          min={minTime}
          max={maxTime}
          defaultView={BigCalendar.Views.WEEK}
          scrollToTime={new Date(2019, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={openAddVisitModal}
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
  visits: state.visitReducer.visits,
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
