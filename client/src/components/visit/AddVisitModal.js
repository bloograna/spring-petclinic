import React from 'react';
import LargeModal from '../common/LargeModal';
import AddVisitForm from './AddVisitForm';
import PropTypes from 'prop-types';

const AddVisitModal = ({
  showAddVisitModal,
  shouldValidateVisitModalData,
  onHideAddVisitModal,
  onAddButtonClick,
  owners,
  vets,
  pets,
  searchPetsByOwnerId,
  activeOwner,
  activePet,
  selectPet
}) => {
  return (
    <LargeModal
      show={showAddVisitModal}
      onHide={onHideAddVisitModal}
      title={'Add an visit'}
    >
      <AddVisitForm
        formValidated={shouldValidateVisitModalData}
        owners={owners}
        vets={vets}
        pets={pets}
        onAddButtonClick={onAddButtonClick}
        onHideAddVisitModal={onHideAddVisitModal}
        searchPetsByOwnerId={searchPetsByOwnerId}
        activeOwner={activeOwner}
        activePet={activePet}
        selectPet={selectPet}
      />
    </LargeModal>
  );
};

AddVisitModal.propTypes = {
  showAddVisitModal: PropTypes.bool.isRequired,
  shouldValidateVisitModalData: PropTypes.bool.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  owners: PropTypes.array.isRequired,
  vets: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  searchPetsByOwnerId: PropTypes.func.isRequired,
  selectPet: PropTypes.func.isRequired,
  activeOwner: PropTypes.number,
  activePet: PropTypes.number
};

export default AddVisitModal;
