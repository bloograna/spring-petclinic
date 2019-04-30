import React from 'react';
import PropTypes from 'prop-types';
import LargeModal from '../common/LargeModal';
import VisitList from '../common/VisitList';
import AddPetForm from './AddPetForm';

const AddPetModal = ({
  pet,
  showAddPetModal,
  shouldValidatePetModalData,
  onHideAddPetModal,
  onAddButtonClick,
  petTypes,
  visits
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
      <VisitList visits={visits} />
    </LargeModal>
  );
};

AddPetModal.propTypes = {
  showAddPetModal: PropTypes.bool.isRequired,
  shouldValidatePetModalData: PropTypes.bool.isRequired,
  onHideAddPetModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  petTypes: PropTypes.array.isRequired,
  visits: PropTypes.array.isRequired,
  pet: PropTypes.shape({})
};

export default AddPetModal;
