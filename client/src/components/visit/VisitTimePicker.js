import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';

const VisitTimePicker = ({
  visitTime,
  onSelectTime,
  placeholderText,
  minTime
}) => (
  <DatePicker
    selected={visitTime}
    onChange={onSelectTime}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    minTime={minTime}
    maxTime={setHours(setMinutes(new Date(), 0), 17)}
    timeCaption="Time"
    dateFormat="h:mm aa"
    placeholderText={placeholderText}
  />
);

VisitTimePicker.propTypes = {
  onSelectTime: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  visitTime: PropTypes.shape({}),
  minTime: PropTypes.shape({})
};

VisitTimePicker.defaultProps = {
  visitTime: null,
  minTime: setHours(setMinutes(new Date(), 0), 8)
};

export default VisitTimePicker;
