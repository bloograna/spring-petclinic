import {
  formatDate,
  formatTime,
  getDateTimeFromStrings,
  sameDay,
  startOfMonthString,
  endOfMonthString,
  fillTimesBetween,
  isBetween
} from './timeUtil';

describe('timeUtil', () => {
  test('should get start of month in yyyy-MM-dd format', () => {
    const expectedOutPut = '2019-04-01';
    const day = new Date('2019-04-11T03:24:00');
    const string = startOfMonthString(day);
    expect(string).toEqual(expectedOutPut);
  });

  test('should get end of month in yyyy-MM-dd format', () => {
    const expectedOutPut = '2019-04-30';
    const day = new Date('2019-04-11T03:24:00');
    const string = endOfMonthString(day);
    expect(string).toEqual(expectedOutPut);
  });

  test('should format date in yyyy-MM-dd format', () => {
    const expectedOutPut = '2019-04-11';
    const day = new Date('2019-04-11T03:24:00');
    const string = formatDate(day);
    expect(string).toEqual(expectedOutPut);
  });

  test('should format time in HH:mm:ss format', () => {
    const expectedOutPut = '03:24:00';
    const day = new Date('2019-04-11T03:24:00');
    const string = formatTime(day);
    expect(string).toEqual(expectedOutPut);
  });

  test('should test same date object', () => {
    const dayOne = new Date('2019-04-11T03:24:00');
    const dayTwo = new Date('2019-04-11T04:24:00');
    const result = sameDay(dayOne, dayTwo);
    expect(result).toEqual(true);
  });

  test('should test same date string', () => {
    const dayOne = '2019-04-11';
    const dayTwo = '2019-04-11';
    const result = sameDay(dayOne, dayTwo);
    expect(result).toEqual(true);
  });

  test('should test same date string and object', () => {
    const dayOne = '2019-04-11';
    const dayTwo = new Date('2019-04-11T04:24:00');
    const result = sameDay(dayOne, dayTwo);
    expect(result).toEqual(true);
  });

  test('should test different date string and object', () => {
    const dayOne = new Date('2019-04-11T04:24:00');
    const dayTwo = '2019-04-12';
    const result = sameDay(dayOne, dayTwo);
    expect(result).toEqual(false);
  });

  test('should get date object from date and time strings', () => {
    const expectedResult = new Date('2019-04-11T04:24:00');
    const dayString = '2019-04-11';
    const timeString = '04:24:00';
    const result = getDateTimeFromStrings(dayString, timeString);
    expect(result).toEqual(expectedResult);
  });

  test('should fill in times between 3 and 4', () => {
    const expectedResult = 4;
    const startString = '03:00:00';
    const endString = '04:00:00';
    const result = fillTimesBetween(startString, endString);
    expect(result.length).toEqual(expectedResult);
  });
});
