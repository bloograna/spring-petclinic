import isDate from 'date-fns/isDate';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import isSameDay from 'date-fns/isSameDay';
import endOfMonth from 'date-fns/endOfMonth';
import startOfMonth from 'date-fns/startOfMonth';
import addMinutes from 'date-fns/addMinutes';
import compareAsc from 'date-fns/compareAsc';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import { isEmpty } from 'lodash';

const DATE_FORMAT = 'yyyy-MM-dd';
const TIME_FORMAT = 'HH:mm:ss';

const formatDate = date => format(date, DATE_FORMAT);

const formatTime = time => format(time, TIME_FORMAT);

const getDateTimeFromStrings = (dateString, startTimeString) =>
  parse(
    dateString + ' ' + startTimeString,
    DATE_FORMAT + ' ' + TIME_FORMAT,
    new Date()
  );

const sameDay = (dateLeft, dateRight) => {
  const dateOne = isDate(dateLeft)
    ? dateLeft
    : parse(dateLeft, DATE_FORMAT, new Date());
  const dateTwo = isDate(dateRight)
    ? dateRight
    : parse(dateRight, DATE_FORMAT, new Date());
  return isSameDay(dateOne, dateTwo);
};

const startOfMonthString = date => format(startOfMonth(date), DATE_FORMAT);
const endOfMonthString = date => format(endOfMonth(date), DATE_FORMAT);

const fillTimesBetween = (startTime, endTime, incrementInMin = 15) => {
  let start = isDate(startTime)
    ? startTime
    : parse(startTime, TIME_FORMAT, new Date());
  const end = isDate(endTime)
    ? endTime
    : parse(endTime, TIME_FORMAT, new Date());

  const times = [];
  while (isBefore(start, end)) {
    times.push(start);
    start = addMinutes(start, incrementInMin);
  }
  return times;
};

// assume times is sorted
const earliestBefore = (timeToCompare, times) => {
  const afters = times.filter(time => isAfter(time, timeToCompare));
  return isEmpty(afters) ? null : afters[0];
};

const sortAsc = dates => dates.sort(compareAsc);

const setTime = dateWithTime =>
  setMinutes(
    setHours(new Date(), dateWithTime.getHours()),
    dateWithTime.getMinutes()
  );

export {
  formatDate,
  formatTime,
  getDateTimeFromStrings,
  sameDay,
  startOfMonthString,
  endOfMonthString,
  fillTimesBetween,
  sortAsc,
  earliestBefore,
  setTime
};
