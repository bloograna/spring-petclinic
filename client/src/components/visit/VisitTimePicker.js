import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';

const VisitTimePicker = ({
  visitTime,
  onSelectTime,
  placeholderText,
  day,
  minTime,
  maxTime,
  excludeTimes
}) => (
  <DatePicker
    disabled={!!!day}
    selected={visitTime}
    onChange={onSelectTime}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    excludeTimes={excludeTimes}
    minTime={minTime ? minTime : setHours(setMinutes(day, 0), 8)}
    maxTime={maxTime ? maxTime : setHours(setMinutes(day, 0), 17)}
    timeCaption="Time"
    dateFormat="h:mm aa"
    placeholderText={day ? placeholderText : 'Please select a day first'}
  />
);

VisitTimePicker.propTypes = {
  onSelectTime: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,
  excludeTimes: PropTypes.array.isRequired,
  day: PropTypes.shape({}),
  minTime: PropTypes.shape({}),
  maxTime: PropTypes.shape({}),
  visitTime: PropTypes.shape({})
};

VisitTimePicker.defaultProps = {
  visitTime: null
};

export default VisitTimePicker;
