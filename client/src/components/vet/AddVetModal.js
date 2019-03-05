import React from 'react';
import LargeModal from '../common/LargeModal';
import AddVetForm from './AddVetForm';
import PropTypes from 'prop-types';

const AddVetModal = ({
  showAddVetModal,
  shouldValidateVetModalData,
  onHideAddVetModal,
  onAddButtonClick,
  specialties
}) => {
  return (
    <LargeModal
      show={showAddVetModal}
      onHide={onHideAddVetModal}
      title={'Add a vet'}
    >
      <AddVetForm
        formValidated={shouldValidateVetModalData}
        specialties={specialties}
        onAddButtonClick={onAddButtonClick}
        onHideAddVetModal={onHideAddVetModal}
      />
    </LargeModal>
  );
};

AddVetModal.propTypes = {
  showAddVetModal: PropTypes.bool.isRequired,
  shouldValidateVetModalData: PropTypes.bool.isRequired,
  onHideAddVetModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  specialties: PropTypes.array.isRequired
};

export default AddVetModal;
