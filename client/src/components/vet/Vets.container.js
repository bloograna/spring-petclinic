import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import {
  getVetSpecialties,
  openAddVetModal as openAddVetModalAction,
  closeAddVetModal as closeAddVetModalAction,
  validateVetModalData as validateVetModalDataAction,
  saveVet as saveVetAction
} from '../../state/vet/vetStore';
import Vets from './Vets';
import AddVetModal from './AddVetModal';

class VetsContainer extends Component {
  handleAddVetFormData = (formObj, event) => {
    const { validateVetModalData, saveVet } = this.props;
    const currentTarget = event.currentTarget;
    validateVetModalData();
    if (currentTarget.checkValidity() === true) {
      saveVet(formObj);
    }
  };

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
    const {
      vets,
      specialties,
      showAddVetModal,
      closeAddVetModal,
      shouldValidateVetModalData
    } = this.props;
    return (
      <div>
        <AddVetModal
          showAddVetModal={showAddVetModal}
          onHideAddVetModal={closeAddVetModal}
          shouldValidateVetModalData={shouldValidateVetModalData}
          onAddButtonClick={this.handleAddVetFormData}
          specialties={specialties}
        />
        {this.renderAddButton()}
        <Vets vets={vets} specialties={specialties} />
      </div>
    );
  }
}

VetsContainer.protoTypes = {
  vets: PropTypes.array.isRequired,
  specialties: PropTypes.array.isRequired,
  showAddVetModal: PropTypes.bool.isRequired,
  shouldValidateVetModalData: PropTypes.bool.isRequired,
  getVets: PropTypes.func.isRequired,
  getVetSpecialties: PropTypes.func.isRequired,
  openAddVetModal: PropTypes.func.isRequired,
  closeAddVetModal: PropTypes.func.isRequired,
  validateVetModalData: PropTypes.func.isRequired,
  saveVet: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  vets: state.vetReducer.vets,
  specialties: state.vetReducer.specialties,
  showAddVetModal: state.vetReducer.showAddVetModal,
  shouldValidateVetModalData: state.vetReducer.shouldValidateVetModalData
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  getVetSpecialties: () => {
    dispatch(getVetSpecialties());
  },
  openAddVetModal: () => {
    dispatch(openAddVetModalAction());
  },
  closeAddVetModal: () => {
    dispatch(closeAddVetModalAction());
  },
  validateVetModalData: () => {
    dispatch(validateVetModalDataAction());
  },
  saveVet: vet => {
    dispatch(saveVetAction(vet));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VetsContainer);
