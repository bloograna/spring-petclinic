import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { getPetsByOwner as getPetsByOwnerAction } from '../../state/pet';
import {
  deleteVisit as deleteVisitAction,
  closeAddVisitModal as closeAddVisitModalAction,
  setVisitDate as setVisitDateAction,
  setVisitStartTime as setVisitStartTimeAction,
  setVisitEndTime as setVisitEndTimeAction,
  setVisitPetId as setVisitPetIdAction,
  setVisitVetId as setVisitVetIdAction,
  setVisitDescription as setVisitDescriptionAction,
  validateVisitModalData as validateVisitModalDataAction,
  setVisitOwner as setVisitOwnerAction
} from '../../state/visit';

import AddVisitForm from './AddVisitForm';

import {
  getActivePersonDisplayInfo,
  formatPersonData,
  getActivePetDisplayInfo,
  formatPetData
} from '../../util/displayInfo';

class AddVisitFormContainer extends Component {
  searchPetsByOwnerId = ownerId => {
    const { getPetsByOwner, setVisitOwner, setVisitPet } = this.props;
    setVisitPet(null);
    setVisitOwner(ownerId);
    getPetsByOwner(ownerId);
  };

  filterVets = () => {
    const { newVisit, vets } = this.props;
    return vets.filter(vet => !newVisit.excludedVets.includes(vet.id));
  };

  onAddModalSubmit = (formObj, event) => {
    const { validateVisitModalData, setVisitDescription } = this.props;
    const currentTarget = event.currentTarget;
    const { desc } = formObj;
    setVisitDescription(desc);
    currentTarget.checkValidity();
    validateVisitModalData();
  };

  getPetSelectionString = (activeOwner, newVisit, pets, petById) => {
    if (activeOwner && newVisit.petId) {
      return getActivePetDisplayInfo(pets, activeOwner, newVisit.petId);
    }
    if (newVisit.petId && newVisit.id && !isEmpty(petById)) {
      const pet = petById[0];
      return pet.id === newVisit.petId ? pet.name : newVisit.petId;
    }
    return 'Pet';
  };

  render() {
    const {
      shouldValidateVisitModalData,
      owners,
      vets,
      pets,
      onHideAddVisitModal,
      newVisit,
      setVisitDate,
      setVisitStartTime,
      setVisitEndTime,
      petById,
      deleteVisit,
      setVisitVet,
      setVisitPet
    } = this.props;
    const activeOwner = newVisit.ownerId;

    return (
      <AddVisitForm
        formValidated={shouldValidateVisitModalData}
        owners={formatPersonData(owners)}
        vets={formatPersonData(this.filterVets())}
        pets={activeOwner ? formatPetData(pets, activeOwner) : []}
        onSubmit={this.onAddModalSubmit}
        onHideAddVisitModal={onHideAddVisitModal}
        selectOwner={this.searchPetsByOwnerId}
        selectPet={setVisitPet}
        selectedOwner={
          activeOwner
            ? getActivePersonDisplayInfo(owners, activeOwner)
            : 'Owner'
        }
        selectedPet={this.getPetSelectionString(
          activeOwner,
          newVisit,
          pets,
          petById
        )}
        selectedVet={
          newVisit.vetId
            ? getActivePersonDisplayInfo(vets, newVisit.vetId)
            : 'Vet'
        }
        selectDate={setVisitDate}
        selectedDate={newVisit.date}
        selectStartTime={setVisitStartTime}
        selectedStartTime={newVisit.start}
        selectEndTime={setVisitEndTime}
        selectedEndTime={newVisit.end}
        visitDesc={newVisit.desc}
        selectVet={setVisitVet}
        visitId={newVisit.id}
        deleteVisit={deleteVisit}
        excludedStartTimes={newVisit.excludedStartTimes}
        maxEndTime={newVisit.maxEndTime}
      />
    );
  }
}

AddVisitFormContainer.propTypes = {
  shouldValidateVisitModalData: PropTypes.bool.isRequired,
  owners: PropTypes.array.isRequired,
  vets: PropTypes.array.isRequired,
  pets: PropTypes.array.isRequired,
  onHideAddVisitModal: PropTypes.func.isRequired,
  newVisit: PropTypes.shape({}).isRequired,
  activePet: PropTypes.number
};

const mapStateToProps = state => ({
  owners: [...state.ownerReducer.owners.values()],
  pets: state.petReducer.pets,
  vets: [...state.vetReducer.vets.values()],
  visits: [...state.visitReducer.visits.values()],
  showAddVisitModal: state.visitReducer.showAddVisitModal,
  shouldValidateVisitModalData: state.visitReducer.shouldValidateVisitModalData,
  newVisit: state.visitReducer.newVisit,
  petById: state.petReducer.searchResults
});

const mapDispatchToProps = dispatch => ({
  getPetsByOwner: ownerId => {
    dispatch(getPetsByOwnerAction(ownerId));
  },
  onHideAddVisitModal: () => {
    dispatch(closeAddVisitModalAction());
  },
  setVisitOwner: ownerId => {
    dispatch(setVisitOwnerAction(ownerId));
  },
  setVisitDate: date => {
    dispatch(setVisitDateAction(date));
  },
  setVisitStartTime: start => {
    dispatch(setVisitStartTimeAction(start));
  },
  setVisitEndTime: end => {
    dispatch(setVisitEndTimeAction(end));
  },
  setVisitPet: petId => {
    dispatch(setVisitPetIdAction(petId));
  },
  setVisitVet: vetId => {
    dispatch(setVisitVetIdAction(vetId));
  },
  setVisitDescription: desc => {
    dispatch(setVisitDescriptionAction(desc));
  },
  validateVisitModalData: () => {
    dispatch(validateVisitModalDataAction());
  },
  deleteVisit: visitId => {
    dispatch(deleteVisitAction(visitId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddVisitFormContainer);
