import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { getVisitsByDate } from '../../state/visit/visitStore';

const localizer = BigCalendar.momentLocalizer(moment);

const minTime = new Date();
minTime.setHours(8, 0, 0);
const maxTime = new Date();
maxTime.setHours(17, 0, 0);

const calendarContainerStyle = {
  width: '90%',
  height: '90%',
  alignContent: 'center'
};

const VisitsContainer = ({ visits }) => {
  return (
    <div style={calendarContainerStyle}>
      <BigCalendar
        selectable
        localizer={localizer}
        events={visits}
        min={minTime}
        max={maxTime}
        defaultView={BigCalendar.Views.WORK_WEEK}
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => console.log('event', event)}
        onSelectSlot={() => console.log('selected slot')}
        views={{ month: true, work_week: true, day: true }}
      />
    </div>
  );
};

VisitsContainer.propTypes = {
  visits: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  visits: state.visitReducer.visits
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getVisitsByDate: dateString => {
    dispatch(getVisitsByDate(dateString));
  }
  // getVetSpecialties: () => {
  //   dispatch(getVetSpecialties());
  // },
  // openAddVetModal: () => {
  //   dispatch(openAddVetModal());
  // }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisitsContainer);
