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
  searchOwnerByLastName,
  searchPetsByOwnerId
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
        searchOwnerByLastName={searchOwnerByLastName}
        searchPetsByOwnerId={searchPetsByOwnerId}
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
  searchOwnerByLastName: PropTypes.func.isRequired,
  searchPetsByOwnerId: PropTypes.func.isRequired
};

export default AddVisitModal;
