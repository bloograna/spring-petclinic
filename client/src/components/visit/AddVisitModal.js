import React from 'react';
import LargeModal from '../common/LargeModal';
import AddVisitFormContainer from './AddVisitForm.container';
import PropTypes from 'prop-types';

const AddVisitModal = ({ showAddVisitModal }) => {
  return (
    <LargeModal show={showAddVisitModal} title={'Add an visit'}>
      <AddVisitFormContainer />
    </LargeModal>
  );
};

AddVisitModal.propTypes = {
  showAddVisitModal: PropTypes.bool.isRequired
};

export default AddVisitModal;
