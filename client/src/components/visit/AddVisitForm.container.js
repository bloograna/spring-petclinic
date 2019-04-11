import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { setActiveOwner, clearActiveOwner } from '../../state/owner';
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
  validateVisitModalData as validateVisitModalDataAction
} from '../../state/visit';

import AddVisitForm from './AddVisitForm';

class AddVisitFormContainer extends Component {
  getActivePetInfo = (pets, activeOwnerId, activePetId) => {
    const pet = this.formatPetData(pets, activeOwnerId).filter(
      pet => pet.id === activePetId
    );
    return isEmpty(pet) ? null : pet[0].name;
  };

  getActivePersonInfo = (people, activePerson) => {
    const person = this.formatPersonData(
      people.filter(person => person.id === activePerson)
    );
    return isEmpty(person) ? null : person[0].name;
  };

  formatPetData = (petsByOwner, activeOwner) => {
    const cleanArray = [];
    if (isEmpty(petsByOwner) || !activeOwner) {
      return [];
    } else {
      // need another check in the case data hasnt returned
      const pets = petsByOwner[activeOwner];
      if (pets) {
        Object.values(pets).forEach(pet => {
          const { name, id } = pet;
          cleanArray.push({ name, id });
        });
      }
      return cleanArray;
    }
  };

  formatPersonData = people =>
    people.map(person => {
      const { firstName, lastName, id } = person;
      return { id, name: lastName + ', ' + firstName };
    });

  searchPetsByOwnerId = event => {
    const { getPetsByOwner, setActiveOwner, setVisitPet } = this.props;
    const ownerId = event.currentTarget.getAttribute('name');
    setVisitPet(null);
    setActiveOwner(parseInt(ownerId, 10));
    getPetsByOwner(ownerId);
  };

  filterVets = () => {
    const { newVisit, vets } = this.props;
    return vets.filter(vet => !newVisit.excludedVets.includes(vet.id));
  };

  onSelectPet = event => {
    const { setVisitPet } = this.props;
    const petId = event.currentTarget.getAttribute('name');
    setVisitPet(parseInt(petId, 10));
  };

  onSelectVet = event => {
    const { setVisitVet } = this.props;
    const vetId = event.currentTarget.getAttribute('name');
    setVisitVet(parseInt(vetId, 10));
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
      return this.getActivePetInfo(pets, activeOwner, newVisit.petId);
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
      activeOwner,
      vets,
      pets,
      onHideAddVisitModal,
      newVisit,
      setVisitDate,
      setVisitStartTime,
      setVisitEndTime,
      petById,
      deleteVisit
    } = this.props;

    return (
      <AddVisitForm
        formValidated={shouldValidateVisitModalData}
        owners={this.formatPersonData(owners)}
        vets={this.formatPersonData(this.filterVets())}
        pets={activeOwner ? this.formatPetData(pets, activeOwner) : []}
        onSubmit={this.onAddModalSubmit}
        onHideAddVisitModal={onHideAddVisitModal}
        selectOwner={this.searchPetsByOwnerId}
        selectPet={this.onSelectPet}
        selectedOwner={
          activeOwner ? this.getActivePersonInfo(owners, activeOwner) : 'Owner'
        }
        selectedPet={this.getPetSelectionString(
          activeOwner,
          newVisit,
          pets,
          petById
        )}
        selectedVet={
          newVisit.vetId
            ? this.getActivePersonInfo(vets, newVisit.vetId)
            : 'Vet'
        }
        selectDate={setVisitDate}
        selectedDate={newVisit.date}
        selectStartTime={setVisitStartTime}
        selectedStartTime={newVisit.start}
        selectEndTime={setVisitEndTime}
        selectedEndTime={newVisit.end}
        visitDesc={newVisit.desc}
        selectVet={this.onSelectVet}
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
  activeOwner: PropTypes.number,
  activePet: PropTypes.number
};

const mapStateToProps = state => ({
  owners: [...state.ownerReducer.owners.values()],
  activeOwner: state.ownerReducer.activeOwner,
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
  setActiveOwner: ownerId => {
    dispatch(setActiveOwner(ownerId));
  },
  clearActiveOwner: () => {
    dispatch(clearActiveOwner());
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
