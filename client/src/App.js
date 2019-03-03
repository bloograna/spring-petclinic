import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import VetsContainer from './components/vets/VetsContainer';
import { getVets, getVetSpecialties } from './state/vet/vetStore';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { activePanel: '' };
  }

  onHomeClick = () => {
    console.log('home click!');
  };

  onOwnerClick = () => {
    console.log('owner click!');
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
      </div>
    );
  }
}

App.protoTypes = {
  onVetsClicked: PropTypes.func.isRequired,
  loadSpecialties: PropTypes.func.isRequired
};
/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  onVetsClicked: () => {
    dispatch(getVets());
  },
  loadSpecialties: () => {
    dispatch(getVetSpecialties());
  }
});

export { App as TestApp };
export default connect(
  null,
  mapDispatchToProps
)(App);
