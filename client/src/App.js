import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';
import { getVets, getVetSpecialties } from './state/vet/vetStore';

class App extends Component {
  onHomeClick = () => {
    console.log('home click!');
  };
  onOwnerClick = () => {
    console.log('owner click!');
  };
  onVetClick = () => {
    console.log('vetlick');
    this.props.onVetsClicked();
    this.props.loadSpecialties();
  };
  onAppointmentClick = () => {
    console.log('appt click!');
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
