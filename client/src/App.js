import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import VetsContainer from './components/vet/VetsContainer';
import OwnersContainer from './components/owner/OwnersContainer';
import AddOwnerModal from './components/owner/AddOwnerModal';
import AddPetModal from './components/pet/AddPetModal';
import {
  saveOwner,
  openAddOwnerModal,
  hideAddOwnerModal,
  validateOwnerModalData
} from './state/owner';
import {
  savePet,
  openAddPetModal,
  hideAddPetModal,
  validatePetModalData,
  getPetTypes
} from './state/pet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePanel: 'home' };
    this.props.getPetTypes();
  }

  onHomeClick = () => {
    console.log('home click!');
  };

  onOwnerClick = () => {
    this.setState({ activePanel: 'owners' });
  };

  onVetClick = () => {
    this.setState({ activePanel: 'vets' });
  };

  onAppointmentClick = () => {
    console.log('appt click!');
  };

  renderVets = () => {
    const { activePanel } = this.state;
    return activePanel === 'vets' ? <VetsContainer /> : null;
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

  renderOwners = () => {
    const { activePanel } = this.state;
    return activePanel === 'owners' ? <OwnersContainer /> : null;
  };

  render() {
    const {
      shouldValidateOwnerModalData,
      showAddOwnerModal,
      showAddPetModal,
      shouldValidatePetModalData,
      hideAddOwnerModal,
      hideAddPetModal,
      petTypes
    } = this.props;

    return (
      <div className="App">
        <NavigationBar
          onHomeClick={this.onHomeClick}
          onOwnerClick={this.onOwnerClick}
          onVetClick={this.onVetClick}
          onAppointmentClick={this.onAppointmentClick}
        />
        <AddOwnerModal
          showAddOwnerModal={showAddOwnerModal}
          onHideAddOwnerModal={hideAddOwnerModal}
          shouldValidateOwnerModalData={shouldValidateOwnerModalData}
          onAddButtonClick={this.handleAddOwnerFormData}
        />
        <AddPetModal
          showAddPetModal={showAddPetModal}
          onHideAddPetModal={hideAddPetModal}
          shouldValidatePetModalData={shouldValidatePetModalData}
          onAddButtonClick={this.handleAddPetFormData}
          petTypes={petTypes}
        />
        {this.renderVets()}
        {this.renderOwners()}
      </div>
    );
  }
}

App.protoTypes = {
  getPetTypes: PropTypes.func.isRequired
  // loadSpecialties: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  showAddOwnerModal: state.ownerReducer.showAddOwnerModal,
  shouldValidateOwnerModalData: state.ownerReducer.shouldValidateOwnerModalData,
  showAddPetModal: state.petReducer.showAddPetModal,
  shouldValidatePetModalData: state.petReducer.shouldValidatePetModalData,
  petTypes: state.petReducer.petTypes
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  openAddOwnerModal: () => {
    dispatch(openAddOwnerModal());
  },
  hideAddOwnerModal: () => {
    dispatch(hideAddOwnerModal());
  },
  validateOwnerModalData: () => {
    dispatch(validateOwnerModalData());
  },
  saveOwner: owner => {
    dispatch(saveOwner(owner));
  },
  openAddPetModal: () => {
    dispatch(openAddPetModal());
  },
  hideAddPetModal: () => {
    dispatch(hideAddPetModal());
  },
  validatePetModalData: () => {
    dispatch(validatePetModalData());
  },
  savePet: pet => {
    dispatch(savePet(pet));
  },
  getPetTypes: () => {
    dispatch(getPetTypes());
  }
});

export { App as TestApp };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
