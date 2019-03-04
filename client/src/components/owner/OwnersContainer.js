import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import {
  saveOwner,
  getOwnerByLastName,
  openAddOwnerModal
} from '../../state/owner/ownerStore';
import { savePet, getPetTypes } from '../../state/pet/petStore';
import Owners from './Owners';
import AddOwnerForm from './AddOwnerForm';
import AddPetForm from '../pet/AddPetForm';
import LargeModal from '../common/LargeModal';

class OwnersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newOwner: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        telephone: ''
      },
      newPet: {
        petName: '',
        petBirthdate: '',
        petType: ''
      },
      selectedOwnerId: null,
      validatedNewOwner: false,
      validatedNewPet: false,
      showAddOwnerModal: false,
      showAddPetModal: false,
      formRef: null
    };
  }

  componentWillMount() {
    const { getPetTypes } = this.props;
    getPetTypes();
  }

  onOwnerFormChange = event => {
    const field = event.target.id;
    const value = event.target.value;
    const { newOwner } = this.state;
    newOwner[field] = value;

    this.setState({ newOwner });
  };

  onPetFormChange = event => {
    const field = event.target.id;
    const value = event.target.value;
    const { newPet } = this.state;
    newPet[field] = value;

    this.setState({ newPet });
  };

  onHideAddOwnerModal = () => {
    this.setState({ showAddOwnerModal: false, validatedNewOwner: false });
  };

  onShowAddOwnerModal = () => {
    this.setState({ showAddOwnerModal: true });
  };

  onHideAddPetModal = () => {
    this.setState({ showAddPetModal: false, validatedNewPet: false });
  };

  onShowAddPetModal = () => {
    this.setState({ showAddPetModal: true });
  };

  setAddFormRef = ref => this.setState({ formRef: ref });

  onAddNewOwner = event => {
    const { addOwner } = this.props;
    const { formRef } = this.state;
    if (formRef.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validatedNewOwner: true });
    } else {
      const { newOwner } = this.state;
      addOwner(newOwner);
      this.setState({ showAddOwnerModal: false, validatedNewOwner: false });
    }
  };

  onAddNewPet = event => {
    const { addPet } = this.props;
    const { formRef } = this.state;
    if (formRef.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({ validatedNewPet: true });
    } else {
      const { newPet } = this.state;
      addPet(newPet);
      this.setState({ showAddPetModal: false, validatedNewPet: false });
    }
  };

  onSearch = event => {
    const { searchByLastName } = this.props;
    const form = event.currentTarget.form[0];
    const lastName = form.value;
    searchByLastName(lastName);
  };

  renderSearchButton = () => {
    const { openAddOwnerModal } = this.props;
    return (
      <Form noValidate>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Last Name" />
            <Button variant="primary" onClick={this.onSearch}>
              Search
            </Button>
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={openAddOwnerModal}>
          Add an owner
        </Button>
      </Form>
    );
  };

  renderAddPetModal = () => {
    const { petTypes } = this.props;
    const { showAddPetModal, validatedNewPet } = this.state;
    return (
      <LargeModal
        show={showAddPetModal}
        onHide={this.onHideAddPetModal}
        onClick={this.onAddNewPet}
        title={'Add a pet'}
      >
        <AddPetForm
          formValidated={validatedNewPet}
          onChange={this.onPetFormChange}
          petTypes={petTypes}
          getRef={this.setAddFormRef}
        />
      </LargeModal>
    );
  };

  render() {
    const { owners } = this.props;
    return (
      <div>
        {this.renderSearchButton()}
        <Owners owners={owners} onAddPet={this.onShowAddPetModal} />
        {this.renderAddPetModal()}
      </div>
    );
  }
}

OwnersContainer.protoTypes = {
  searchByLastName: PropTypes.func.isRequired,
  addOwner: PropTypes.func.isRequired,
  addPet: PropTypes.func.isRequired,
  getPetTypes: PropTypes.func.isRequired,
  openAddOwnerModal: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  owners: state.ownerReducer.owners,
  petTypes: state.petReducer.petTypes
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  searchByLastName: lastName => {
    dispatch(getOwnerByLastName(lastName));
  },
  addOwner: owner => {
    dispatch(saveOwner(owner));
  },
  addPet: pet => {
    dispatch(savePet(pet));
  },
  getPetTypes: () => {
    dispatch(getPetTypes());
  },
  openAddOwnerModal: () => {
    dispatch(openAddOwnerModal());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnersContainer);
