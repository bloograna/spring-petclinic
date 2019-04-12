import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications from './Notifications';
import { markMessageAsRead } from '../../state/message';

const notificationStyle = {
  width: 400,
  height: 'calc(vh)',
  position: 'absolute',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  top: 25,
  zIndex: 9999
};

const NotificationsContainer = ({ messages, onDismiss }) => (
  <div style={notificationStyle}>
    <Notifications messages={messages} onDismiss={onDismiss} />
  </div>
);

NotificationsContainer.propTypes = {
  messages: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  messages: state.messageReducer
});

const mapDispatchToProps = dispatch => ({
  onDismiss: id => dispatch(markMessageAsRead(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsContainer);
