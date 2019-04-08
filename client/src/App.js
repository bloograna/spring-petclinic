import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { startOfMonthString, endOfMonthString } from './util/timeUtil';

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

  onTabClick = tabName => {
    this.setState({ activePanel: tabName });
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
          onHomeClick={() => this.onTabClick('home')}
          onOwnerClick={() => this.onTabClick('owners')}
          onVetClick={() => this.onTabClick('vets')}
          onAppointmentClick={() => this.onTabClick('visits')}
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
const mapDispatchToProps = dispatch => ({
  getPetTypes: () => {
    dispatch(getPetTypes());
  },
  getVetSpecialties: () => {
    dispatch(getVetSpecialties());
  },
  getVisitsByDateRange: () => {
    const today = new Date();
    dispatch(
      getVisitsByDateRange(startOfMonthString(today), endOfMonthString(today))
    );
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
