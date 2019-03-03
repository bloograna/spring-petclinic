import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const LargeModal = ({ show, onHide, onClick, title, children }) => (
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
    <Modal.Footer>
      <Button onClick={onHide}>Cancel</Button>
      <Button onClick={onClick}>Add</Button>
    </Modal.Footer>
  </Modal>
);

LargeModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default LargeModal;
