import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  getVets,
  getVetSpecialties,
  openAddVetModal
} from '../../state/vet/vetStore';
import Vets from './Vets';

class VetsContainer extends Component {
  constructor(props) {
    super(props);
    this.props.getVets();
  }

  onChange = event => {
    const field = event.target.id;
    const value = event.target.value;
    const { newVet } = this.state;

    if (field === 'specialties') {
      if (value !== 'None') {
        const selectedOptions = event.currentTarget.selectedOptions;
        const specialties = Object.entries(selectedOptions).map(
          entry => entry[1].value
        );

        newVet.specialties = specialties;
      } else {
        newVet.specialties = [];
      }
    } else {
      newVet[field] = value;
    }
    this.setState({ newVet: newVet });
  };

  renderAddButton = () => {
    const { openAddVetModal } = this.props;
    return (
      <Button variant="primary" onClick={openAddVetModal}>
        Add a vet
      </Button>
    );
  };

  render() {
    const { vets, specialties } = this.props;
    return (
      <div>
        {this.renderAddButton()}
        <Vets vets={vets} specialties={specialties} />
      </div>
    );
  }
}

VetsContainer.protoTypes = {
  getVets: PropTypes.func.isRequired,
  getVetSpecialties: PropTypes.func.isRequired,
  addVet: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  vets: state.vetReducer.vets,
  specialties: state.vetReducer.specialties
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getVets: () => {
    dispatch(getVets());
  },
  getVetSpecialties: () => {
    dispatch(getVetSpecialties());
  },
  openAddVetModal: () => {
    dispatch(openAddVetModal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VetsContainer);
