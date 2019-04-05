import React from 'react';
import LargeModal from '../common/LargeModal';
import AddVisitForm from './AddVisitForm';
import PropTypes from 'prop-types';

const AddVisitModal = ({
  showAddVisitModal,
  shouldValidateVisitModalData,
  onHideAddVisitModal,
  onAddButtonClick,
  vets
}) => {
  return (
    <LargeModal
      show={showAddVisitModal}
      onHide={onHideAddVisitModal}
      title={'Add an visit'}
    >
      <AddVisitForm
        formValidated={shouldValidateVisitModalData}
        vets={vets}
        onAddButtonClick={onAddButtonClick}
        onHideAddVisitModal={onHideAddVisitModal}
      />
    </LargeModal>
  );
};

AddVisitModal.propTypes = {
  showAddVisitModal: PropTypes.bool.isRequired,
  shouldValidateVisitModalData: PropTypes.bool.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  vets: PropTypes.array.isRequired
};

export default AddVisitModal;
