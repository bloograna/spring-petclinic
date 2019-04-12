import React from 'react';
import PropTypes from 'prop-types';
import Alert from './Alert';
import Msg from '../../dataModel/Msg';

const Notifications = ({ messages, onDismiss }) => {
  const showingMessages = messages.map(msg => (
    <Alert message={msg} onDismiss={() => onDismiss(msg.id)} />
  ));

  return <React.Fragment>{showingMessages}</React.Fragment>;
};

Notifications.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.instanceOf(Msg)).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Notifications;
