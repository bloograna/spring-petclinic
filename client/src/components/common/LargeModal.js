import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';

const LargeModal = ({ show, title, children }) => (
  <Modal
    size="lg"
    show={show}
    aria-labelledby="modal-lg"
    centered
    backdrop="static"
  >
    <Modal.Header>
      <Modal.Title id="modal-title-lg">{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body id="modal-body-lg">{children}</Modal.Body>
  </Modal>
);

LargeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default LargeModal;
