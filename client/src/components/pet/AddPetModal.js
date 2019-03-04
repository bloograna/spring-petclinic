import React from 'react';
import LargeModal from '../common/LargeModal';
import AddPetForm from './AddPetForm';
import PropTypes from 'prop-types';

const AddPetModal = ({
  showAddPetModal,
  shouldValidatePetModalData,
  onHideAddPetModal,
  onAddButtonClick,
  petTypes
}) => {
  return (
    <LargeModal
      show={showAddPetModal}
      onHide={onHideAddPetModal}
      title={'Add an owner'}
    >
      <AddPetForm
        formValidated={shouldValidatePetModalData}
        onAddButtonClick={onAddButtonClick}
        petTypes={petTypes}
        onHideAddPetModal={onHideAddPetModal}
      />
    </LargeModal>
  );
};

AddPetModal.propTypes = {
  showAddPetModal: PropTypes.bool.isRequired,
  shouldValidatePetModalData: PropTypes.bool.isRequired,
  onHideAddPetModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  petTypes: PropTypes.array.isRequired
};

export default AddPetModal;
