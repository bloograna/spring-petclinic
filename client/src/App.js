import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import VetsContainer from './components/vet/VetsContainer';
import OwnersContainer from './components/owner/OwnersContainer';
import AddOwnerModal from './components/owner/AddOwnerModal';
import {
  openAddOwnerModal,
  hideAddOwnerModal,
  validateOwnerModalData,
  validateOwnerModalDataCompleted
} from './state/owner';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePanel: 'home' };
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

  onFormChange = formObj => {
    console.log(`change: ${JSON.stringify(formObj)}`);
  };

  renderOwners = () => {
    const { activePanel } = this.state;
    return activePanel === 'owners' ? <OwnersContainer /> : null;
  };

  render() {
    const { showAddModal, shouldValidateModalData } = this.props.ownerState;
    const { hideAddOwnerModal } = this.props;
    return (
      <div className="App">
        <NavigationBar
          onHomeClick={this.onHomeClick}
          onOwnerClick={this.onOwnerClick}
          onVetClick={this.onVetClick}
          onAppointmentClick={this.onAppointmentClick}
        />
        {
          <AddOwnerModal
            showAddOwnerModal={showAddModal}
            onHideAddOwnerModal={hideAddOwnerModal}
            shouldValidateOwnerModalData={shouldValidateModalData}
            onOwnerFormChange={this.onFormChange}
          />
        }
        {this.renderVets()}
        {this.renderOwners()}
      </div>
    );
  }
}

App.protoTypes = {
  onVetsClicked: PropTypes.func.isRequired,
  loadSpecialties: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  ownerState: state.ownerReducer,
  petState: state.petReducer
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
  validateOwnerModalDataCompleted: () => {
    dispatch(validateOwnerModalDataCompleted());
  }
});

export { App as TestApp };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
