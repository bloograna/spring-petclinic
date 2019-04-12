import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert as BSAlert } from 'react-bootstrap';
import Msg from '../../dataModel/Msg';

class Alert extends Component {
  componentDidMount() {
    this.setMessageExpiration();
  }

  setMessageExpiration = () => {
    const { message, onDismiss } = this.props;

    setTimeout(() => {
      return onDismiss(message);
    }, 5000);
  };

  render() {
    const { message } = this.props;
    return (
      <BSAlert
        key={message.id}
        variant={message.type === 'error' ? 'danger' : message.type}
        show={!message.isRead}
      >
        {message.message}
      </BSAlert>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.instanceOf(Msg).isRequired,
  onDismiss: PropTypes.func.isRequired
};

export default Alert;
