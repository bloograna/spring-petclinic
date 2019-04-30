import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { formatDate, formatTime } from '../../util/timeUtil';

const VisitList = ({ visits }) => {
  const visitItems = visits.map(visit => (
    <ListGroup.Item action variant="light">
      {formatDate(visit.start)} {formatTime(visit.start)} -
      {formatTime(visit.end)}
    </ListGroup.Item>
  ));
  return (
    <React.Fragment>
      <ListGroup.Item action variant="info">
        Visits
      </ListGroup.Item>
      <ListGroup>{visitItems}</ListGroup>
    </React.Fragment>
  );
};

VisitList.propTypes = {
  visits: PropTypes.array.isRequired
};

export default VisitList;
