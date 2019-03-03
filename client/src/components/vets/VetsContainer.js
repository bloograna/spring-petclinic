import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getVets, getVetSpecialties } from '../../state/vet/vetStore';
import Vets from './Vets';
import AddVetForm from './AddVetForm';

class VetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addVet: { firstName: '', lastName: '', specialties: [] },
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
    console.log('on change event.target.value', event.target.value);
    console.log('on change event.target.id', event.target.id);
    const { addVet } = this.state;

    if (field === 'specialties') {
      let specialtySet;
      const existingAddSpecialty = addVet.specialties;
    }
    addVet[field] = value;
    this.setState({ addVet: addVet });
  };

  onSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
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
  loadSpecialties: PropTypes.func.isRequired
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
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VetsContainer);
