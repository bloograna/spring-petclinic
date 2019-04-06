import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import HomeContainer from './components/home/Home.container';
import VetsContainer from './components/vet/Vets.container';
import OwnersContainer from './components/owner/Owners.container';
import VisitsContainer from './components/visit/Visits.container';

import { getOwnerByLastName } from './state/owner';
import { getPetTypes } from './state/pet';
import { getVets, getVetSpecialties } from './state/vet';
import { getVisitsByDateRange } from './state/visit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePanel: 'home' };
    this.props.getPetTypes();
    this.props.getVets();
    this.props.getVetSpecialties();
    this.props.getVisitsByDateRange();
    this.props.searchByLastName('');
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

  handleAddVisitFormData = (formObj, event) => {
    const { validateVisitModalData, saveVisit } = this.props;
    const currentTarget = event.currentTarget;
    validateVisitModalData();
    if (currentTarget.checkValidity() === true) {
      saveVisit(formObj);
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
    return (
      <div className="App">
        <NavigationBar
          onHomeClick={this.onHomeClick}
          onOwnerClick={this.onOwnerClick}
          onVetClick={this.onVetClick}
          onAppointmentClick={this.onAppointmentClick}
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

// /* istanbul ignore next */
// const mapStateToProps = state => ({
//   showAddOwnerModal: state.ownerReducer.showAddOwnerModal,
//   shouldValidateOwnerModalData: state.ownerReducer.shouldValidateOwnerModalData,
//   showAddPetModal: state.petReducer.showAddPetModal,
//   shouldValidatePetModalData: state.petReducer.shouldValidatePetModalData,
//   petTypes: state.petReducer.petTypes,
//   activePet: state.petReducer.activePet
// });

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getPetTypes: () => {
    dispatch(getPetTypes());
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
  },
  searchByLastName: ownerId => {
    dispatch(getOwnerByLastName(ownerId));
  },
  getVets: () => {
    dispatch(getVets());
  }
});

export { App as TestApp };
export default connect(
  null,
  mapDispatchToProps
)(App);
