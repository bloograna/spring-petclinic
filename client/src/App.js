import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import HomeContainer from './components/home/Home.container';
import VetsContainer from './components/vet/Vets.container';
import OwnersContainer from './components/owner/Owners.container';
import VisitsContainer from './components/visit/Visits.container';
import AddOwnerModal from './components/owner/AddOwnerModal';
import AddPetModal from './components/pet/AddPetModal';
import AddVetModal from './components/vet/AddVetModal';
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
import {
  saveVet,
  getVetSpecialties,
  openAddVetModal,
  hideAddVetModal,
  validateVetModalData
} from './state/vet';
import { getVisitsByDateRange } from './state/visit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePanel: 'home' };
    this.props.getPetTypes();
    this.props.getVetSpecialties();
    this.props.getVisitsByDateRange();
  }

  onHomeClick = () => {
    this.setState({ activePanel: 'home' });
  };

  onOwnerClick = () => {
    this.setState({ activePanel: 'owners' });
  };

  onVetClick = () => {
    this.setState({ activePanel: 'vets' });
  };

  onAppointmentClick = () => {
    this.setState({ activePanel: 'visits' });
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

  handleAddVetFormData = (formObj, event) => {
    const { validateVetModalData, saveVet } = this.props;
    const currentTarget = event.currentTarget;
    validateVetModalData();
    if (currentTarget.checkValidity() === true) {
      saveVet(formObj);
    }
  };

  renderActivePanel = () => {
    const { activePanel } = this.state;
    switch (activePanel) {
      case 'home':
        return <HomeContainer />;
      case 'owners':
        return <OwnersContainer />;
      case 'vets':
        return <VetsContainer />;
      case 'visits':
        return <VisitsContainer />;
      default:
        return null;
    }
  };

  render() {
    const {
      showAddVetModal,
      showAddOwnerModal,
      showAddPetModal,
      shouldValidateOwnerModalData,
      shouldValidatePetModalData,
      shouldValidateVetModalData,
      hideAddOwnerModal,
      hideAddPetModal,
      hideAddVetModal,
      petTypes,
      specialties
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
        <AddVetModal
          showAddVetModal={showAddVetModal}
          onHideAddVetModal={hideAddVetModal}
          shouldValidateVetModalData={shouldValidateVetModalData}
          onAddButtonClick={this.handleAddVetFormData}
          specialties={specialties}
        />
        {this.renderActivePanel()}
      </div>
    );
  }
}

App.protoTypes = {
  getPetTypes: PropTypes.func.isRequired,
  getVetSpecialties: PropTypes.func.isRequired,
  getVisitsByDateRange: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  showAddOwnerModal: state.ownerReducer.showAddOwnerModal,
  shouldValidateOwnerModalData: state.ownerReducer.shouldValidateOwnerModalData,
  showAddPetModal: state.petReducer.showAddPetModal,
  shouldValidatePetModalData: state.petReducer.shouldValidatePetModalData,
  petTypes: state.petReducer.petTypes,
  showAddVetModal: state.vetReducer.showAddVetModal,
  shouldValidateVetModalData: state.vetReducer.shouldValidateVetModalData,
  specialties: state.vetReducer.specialties
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
  },
  openAddVetModal: () => {
    dispatch(openAddVetModal());
  },
  hideAddVetModal: () => {
    dispatch(hideAddVetModal());
  },
  validateVetModalData: () => {
    dispatch(validateVetModalData());
  },
  saveVet: vet => {
    dispatch(saveVet(vet));
  },
  getVetSpecialties: () => {
    dispatch(getVetSpecialties());
  },
  getVisitsByDateRange: () => {
    const startOfCurrentMonth = moment()
      .startOf('month')
      .format('YYYY-MM-DD');
    const endOfOfCurrentMonth = moment()
      .endOf('month')
      .format('YYYY-MM-DD');
    dispatch(getVisitsByDateRange(startOfCurrentMonth, endOfOfCurrentMonth));
  }
});

export { App as TestApp };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
