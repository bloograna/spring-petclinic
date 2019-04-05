import React from 'react';
import LargeModal from '../common/LargeModal';
import AddPetForm from './AddPetForm';
import PropTypes from 'prop-types';

const AddPetModal = ({
  pet,
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
      title={'Add a Pet'}
    >
      <AddPetForm
        formValidated={shouldValidatePetModalData}
        onAddButtonClick={onAddButtonClick}
        petTypes={petTypes}
        onHideAddPetModal={onHideAddPetModal}
        pet={pet}
      />
    </LargeModal>
  );
};

AddPetModal.propTypes = {
  showAddPetModal: PropTypes.bool.isRequired,
  shouldValidatePetModalData: PropTypes.bool.isRequired,
  onHideAddPetModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  petTypes: PropTypes.array.isRequired,
  pet: PropTypes.shape({})
};
AddPetModal.defaultProps = {
  pet: {}
};

export default AddPetModal;
