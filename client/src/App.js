import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import VetsContainer from './components/vet/VetsContainer';
import OwnersContainer from './components/owner/OwnersContainer';

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

  renderOwners = () => {
    const { activePanel } = this.state;
    return activePanel === 'owners' ? <OwnersContainer /> : null;
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

export { App as TestApp };
export default connect(
  null,
  null
)(App);
