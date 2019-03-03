import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getVets, getVetSpecialties, saveVet } from '../../state/vet/vetStore';
import Vets from './Vets';
import AddVetForm from './AddVetForm';
import LargeModal from '../common/LargeModal';

class VetsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newVet: { firstName: '', lastName: '', specialties: [] },
      validatedNewVet: false,
      showAddVetModal: false,
      formRef: null
    };
  }

  componentWillMount() {
    this.props.onVetsClicked();
    this.props.loadSpecialties();
  }

  onHideModal = () => {
    this.setState({ showAddVetModal: false, validatedNewVet: false });
  };

  onShowModal = () => {
    this.setState({ showAddVetModal: true });
  };

  setAddFormRef = ref => this.setState({ formRef: ref });

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
    const { formRef } = this.state;
    if (formRef.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validatedNewVet: true });
    } else {
      const { newVet } = this.state;
      addVet(newVet);
      this.setState({ showAddVetModal: false, validatedNewVet: false });
    }
  };

  renderAddButton = () => {
    return (
      <Button variant="primary" onClick={this.onShowModal}>
        Add a vet
      </Button>
    );
  };

  renderAddVetModal = () => {
    const { showAddVetModal, validatedNewVet } = this.state;
    const { specialties } = this.props;
    if (showAddVetModal) {
      return (
        <LargeModal
          show={showAddVetModal}
          onHide={this.onHideModal}
          onClick={this.onSubmit}
          title={'Add a vet'}
        >
          <AddVetForm
            formValidated={validatedNewVet}
            specialties={specialties}
            onChange={this.onChange}
            getRef={this.setAddFormRef}
          />
        </LargeModal>
      );
    }
    return null;
  };

  render() {
    const { vets, specialties } = this.props;
    return (
      <div>
        {this.renderAddButton()}
        <Vets vets={vets} specialties={specialties} />
        {this.renderAddVetModal()}
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
