import React from 'react';
import LargeModal from '../common/LargeModal';
import AddOwnerForm from './AddOwnerForm';
import PropTypes from 'prop-types';

const AddOwnerModal = ({
  showAddOwnerModal,
  shouldValidateOwnerModalData,
  onHideAddOwnerModal,
  onAddButtonClick
}) => {
  return (
    <LargeModal
      show={showAddOwnerModal}
      onHide={onHideAddOwnerModal}
      title={'Add an owner'}
    >
      <AddOwnerForm
        formValidated={shouldValidateOwnerModalData}
        onAddButtonClick={onAddButtonClick}
        onHideAddOwnerModal={onHideAddOwnerModal}
      />
    </LargeModal>
  );
};

AddOwnerModal.propTypes = {
  showAddOwnerModal: PropTypes.bool.isRequired,
  shouldValidateOwnerModalData: PropTypes.bool.isRequired,
  onHideAddOwnerModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired
};

export default AddOwnerModal;
