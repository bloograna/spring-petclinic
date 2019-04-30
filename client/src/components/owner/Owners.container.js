import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import {
  getOwnerByLastName,
  openAddOwnerModal as openAddOwnerModalAction,
  closeAddOwnerModal as closeAddOwnerModalAction,
  validateOwnerModalData,
  saveOwner,
  setActiveOwner
} from '../../state/owner';
import {
  getPetsByOwner as getPetsByOwnerAction,
  openAddPetModal as openAddPetModalAction,
  closeAddPetModal as closeAddPetModalAction,
  validatePetModalData,
  savePet,
  setActivePet
} from '../../state/pet';
import { getVisitByPetId as getVisitByPetIdAction } from '../../state/visit';
import Owners from './Owners';
import AddOwnerModal from './AddOwnerModal';
import AddPetModal from '../pet/AddPetModal';

class OwnersContainer extends Component {
  onSearch = event => {
    const { searchByLastName } = this.props;
    const form = event.currentTarget.form[0];
    const lastName = form.value;
    searchByLastName(lastName);
  };

  onPetClick = petObject => {
    const { setActivePet, openAddPetModal } = this.props;
    const { ownerId, id } = petObject;
    setActivePet(id);
    openAddPetModal(ownerId);
  };

  getActivePetObject = () => {
    const { pets, activeOwner, activePet } = this.props;
    if (activeOwner && activePet && !isEmpty(pets)) {
      return pets[activeOwner][activePet];
    }
    return null;
  };

  filterVisitsByPet = () => {
    const { visits, activePet } = this.props;
    if (activePet) {
      return visits.filter(visit => visit.petId === activePet);
    }
    return [];
  };

  handleAddOwnerFormData = (formObj, event) => {
    const { validateOwnerModalData, saveOwner } = this.props;
    const currentTarget = event.currentTarget;
    validateOwnerModalData();
    if (currentTarget.checkValidity() === true) {
      saveOwner(formObj);
    }
  };

  handleAddPetFormData = (formObj, event) => {
    const { validatePetModalData, savePet } = this.props;
    const currentTarget = event.currentTarget;
    validatePetModalData();
    if (currentTarget.checkValidity() === true) {
      savePet(formObj);
    }
  };

  renderSearchButton = () => {
    const { openAddOwnerModal } = this.props;
    return (
      <Form noValidate>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
            <Button variant="primary" onClick={this.onSearch}>
              Search
            </Button>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={openAddOwnerModal}>
          Add an owner
        </Button>
      </Form>
    );
  };

  render() {
    const {
      searchResults,
      showAddOwnerModal,
      closeAddOwnerModal,
      shouldValidateOwnerModalData,
      //pets
      pets,
      showAddPetModal,
      openAddPetModal,
      closeAddPetModal,
      shouldValidatePetModalData,
      getPetsByOwner,
      petTypes,
      // visit
      getVisitByPetId
    } = this.props;
    return (
      <div>
        <AddOwnerModal
          showAddOwnerModal={showAddOwnerModal}
          onHideAddOwnerModal={closeAddOwnerModal}
          shouldValidateOwnerModalData={shouldValidateOwnerModalData}
          onAddButtonClick={this.handleAddOwnerFormData}
        />
        <AddPetModal
          showAddPetModal={showAddPetModal}
          onHideAddPetModal={closeAddPetModal}
          shouldValidatePetModalData={shouldValidatePetModalData}
          onAddButtonClick={this.handleAddPetFormData}
          petTypes={petTypes}
          pet={this.getActivePetObject()}
          visits={this.filterVisitsByPet()}
        />
        {this.renderSearchButton()}
        <Owners
          owners={searchResults}
          pets={pets}
          onAddPet={openAddPetModal}
          setActivePet={this.onPetClick}
          getPetsByOwnerId={getPetsByOwner}
          getVisitByPetId={getVisitByPetId}
        />
      </div>
    );
  }
}

OwnersContainer.protoTypes = {
  searchResults: PropTypes.array.isRequired,
  showAddOwnerModal: PropTypes.bool.isRequired,
  shouldValidateOwnerModalData: PropTypes.bool.isRequired,
  pets: PropTypes.array.isRequired,
  petTypes: PropTypes.array.isRequired,
  showAddPetModal: PropTypes.bool.isRequired,
  shouldValidatePetModalData: PropTypes.bool.isRequired,
  activePet: PropTypes.shape({}).isRequired,
  // actions
  searchByLastName: PropTypes.func.isRequired,
  openAddOwnerModal: PropTypes.func.isRequired,
  closeAddOwnerModal: PropTypes.func.isRequired,
  validateOwnerModalData: PropTypes.func.isRequired,
  saveOwner: PropTypes.func.isRequired,
  openAddPetModal: PropTypes.func.isRequired,
  closeAddPetModal: PropTypes.func.isRequired,
  setActivePet: PropTypes.func.isRequired,
  getPetsByOwner: PropTypes.func.isRequired,
  validatePetModalData: PropTypes.func.isRequired,
  savePet: PropTypes.func.isRequired,
  getVisitByPetId: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  /*----- owners -----*/
  searchResults: state.ownerReducer.searchResults,
  showAddOwnerModal: state.ownerReducer.showAddOwnerModal,
  shouldValidateOwnerModalData: state.ownerReducer.shouldValidateOwnerModalData,
  activeOwner: state.ownerReducer.activeOwner,
  /*----- pets -----*/
  pets: state.petReducer.pets,
  petTypes: state.petReducer.petTypes,
  showAddPetModal: state.petReducer.showAddPetModal,
  shouldValidatePetModalData: state.petReducer.shouldValidatePetModalData,
  activePet: state.petReducer.activePet,
  /*----- visits -----*/
  visits: [...state.visitReducer.visits.values()]
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  /*----- owners -----*/
  searchByLastName: lastName => {
    dispatch(getOwnerByLastName(lastName));
  },
  openAddOwnerModal: () => {
    dispatch(openAddOwnerModalAction());
  },
  closeAddOwnerModal: () => {
    dispatch(closeAddOwnerModalAction());
  },
  validateOwnerModalData: () => {
    dispatch(validateOwnerModalData());
  },
  saveOwner: owner => {
    dispatch(saveOwner(owner));
  },
  setActiveOwner: ownerId => {
    dispatch(setActiveOwner(ownerId));
  },
  /*----- pets -----*/
  openAddPetModal: ownerId => {
    dispatch(openAddPetModalAction(ownerId));
  },
  closeAddPetModal: () => {
    dispatch(closeAddPetModalAction());
  },
  setActivePet: pet => {
    dispatch(setActivePet(pet));
  },
  getPetsByOwner: ownerId => {
    dispatch(getPetsByOwnerAction(ownerId));
  },
  validatePetModalData: () => {
    dispatch(validatePetModalData());
  },
  savePet: pet => {
    dispatch(savePet(pet));
  },
  getVisitByPetId: petId => {
    dispatch(getVisitByPetIdAction(petId));
  }
});

export { OwnersContainer as TestOwnersContainer };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnersContainer);
