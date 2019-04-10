import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import setMinutes from 'date-fns/setMinutes';
import setHours from 'date-fns/setHours';

const VisitTimePicker = ({
  visitTime,
  onSelectTime,
  placeholderText,
  disabled,
  minTime,
  maxTime,
  excludeTimes
}) => (
  <DatePicker
    disabled={disabled}
    selected={visitTime}
    onChange={onSelectTime}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    excludeTimes={excludeTimes}
    minTime={minTime ? minTime : setHours(setMinutes(new Date(), 0), 8)}
    maxTime={maxTime ? maxTime : setHours(setMinutes(new Date(), 0), 17)}
    timeCaption="Time"
    dateFormat="h:mm aa"
    placeholderText={
      !disabled ? placeholderText : 'Please select a day/start time first'
    }
  />
);

VisitTimePicker.propTypes = {
  onSelectTime: PropTypes.func.isRequired,
  placeholderText: PropTypes.string.isRequired,

  disabled: PropTypes.bool.isRequired,
  minTime: PropTypes.shape({}),
  maxTime: PropTypes.shape({}),
  visitTime: PropTypes.shape({}),
  excludeTimes: PropTypes.array
};

VisitTimePicker.defaultProps = {
  visitTime: null,
  excludeTimes: []
};

export default VisitTimePicker;
