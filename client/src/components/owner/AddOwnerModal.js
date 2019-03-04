import React from 'react';
import LargeModal from '../common/LargeModal';
import AddOwnerForm from './AddOwnerForm';
import PropTypes from 'prop-types';

const AddOwnerModal = ({
  showAddOwnerModal,
  shouldValidateOwnerModalData,
  onHideAddOwnerModal,
  onAddNewOwner,
  onOwnerFormChange
}) => {
  return (
    <LargeModal
      show={showAddOwnerModal}
      onHide={onHideAddOwnerModal}
      onClick={onAddNewOwner}
      title={'Add an owner'}
    >
      <AddOwnerForm
        formValidated={shouldValidateOwnerModalData}
        onChange={onOwnerFormChange}
      />
    </LargeModal>
  );
};

AddOwnerModal.propTypes = {
  showAddOwnerModal: PropTypes.bool.isRequired,
  shouldValidateOwnerModalData: PropTypes.bool.isRequired,
  onHideAddOwnerModal: PropTypes.func.isRequired,
  onAddNewOwner: PropTypes.func.isRequired,
  onOwnerFormChange: PropTypes.func.isRequired
};

export default AddOwnerModal;
