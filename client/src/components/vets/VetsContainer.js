import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVets, getVetSpecialties, saveVet } from '../../state/vet/vetStore';
import Vets from './Vets';
import AddVetForm from './AddVetForm';

class VetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newVet: { firstName: '', lastName: '', specialties: [] },
      validatedNewVet: false
    };
  }

  componentWillMount() {
    this.props.onVetsClicked();
    this.props.loadSpecialties();
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

  onSubmit = event => {
    const { addVet } = this.props;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { newVet } = this.state;
      addVet(newVet);
    }
    this.setState({ validatedNewVet: true });
  };

  render() {
    const { vets, specialties } = this.props;
    const { validatedNewVet } = this.state;
    return (
      <div>
        <Vets vets={vets} specialties={specialties} />
        <AddVetForm
          formValidated={validatedNewVet}
          specialties={specialties}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

VetsContainer.protoTypes = {
  onVetsClicked: PropTypes.func.isRequired,
  loadSpecialties: PropTypes.func.isRequired,
  addVet: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  vets: state.vetReducer.vets,
  specialties: state.vetReducer.specialties
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  onVetsClicked: () => {
    dispatch(getVets());
  },
  loadSpecialties: () => {
    dispatch(getVetSpecialties());
  },
  addVet: vet => {
    dispatch(saveVet(vet));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VetsContainer);
