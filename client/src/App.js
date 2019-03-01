import React, { Component } from 'react';
import './App.css';
import NavigationBar from './navbar/NavigationBar';

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
  render() {
    return (
      <div className="App">
        <NavigationBar
          onHomeClick={this.onHomeClick}
          onOwnerClick={this.onOwnerClick}
          onFindVetClick={this.onFindVetClick}
        />
      </div>
    );
  }
}

export default App;
