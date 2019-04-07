import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import isWeekend from 'date-fns/isWeekend';
import isAfter from 'date-fns/isAfter';

const validDate = date => {
  const weekend = isWeekend(date);
  const future = isAfter(date, new Date());
  return !weekend && future;
};

const VisitDatePicker = ({ visitDate, onSelectDate }) => (
  <DatePicker
    selected={visitDate}
    onChange={onSelectDate}
    filterDate={validDate}
    placeholderText="Select a day"
  />
);

VisitDatePicker.propTypes = {
  onSelectDate: PropTypes.func.isRequired,
  visitDate: PropTypes.shape({})
};

VisitDatePicker.defaultProps = {
  visitDate: null
};

export default VisitDatePicker;
