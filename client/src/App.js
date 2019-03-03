import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavigationBar from './components/navbar/NavigationBar';

const createHandlers = dispatch => ({
  // initToolkitAction: () => dispatch(initToolkitAction())
});
class App extends Component {
  onHomeClick = () => {
    console.log('home click!');
  };
  onOwnerClick = () => {
    console.log('owner click!');
  };
  onFindVetClick = () => {
    console.log('vet click!');
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
          onFindVetClick={this.onFindVetClick}
          onAppointmentClick={this.onAppointmentClick}
        />
      </div>
    );
  }
}
// const mapStateToProps = state => ({
//   toolkit: state.jsPlumb.toolkit,
//   graphIsDirty: state.graph.present.isDirty
// });

export { createHandlers, App as TestApp };
export default connect(null)(App);
