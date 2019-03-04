import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import {
  getOwnerByLastName,
  openAddOwnerModal
} from '../../state/owner/ownerStore';
import { openAddPetModal } from '../../state/pet/petStore';
import Owners from './Owners';

class OwnersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPet: {
        petName: '',
        petBirthdate: '',
        petType: ''
      },
      validatedNewPet: false,
      showAddPetModal: false,
      formRef: null
    };
  }

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

  render() {
    const { owners, openAddPetModal } = this.props;
    return (
      <div>
        {this.renderSearchButton()}
        <Owners owners={owners} onAddPet={openAddPetModal} />
      </div>
    );
  }
}

OwnersContainer.protoTypes = {
  searchByLastName: PropTypes.func.isRequired,
  openAddOwnerModal: PropTypes.func.isRequired,
  openAddPetModal: PropTypes.func.isRequired
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
  openAddOwnerModal: () => {
    dispatch(openAddOwnerModal());
  },
  openAddPetModal: ownerId => {
    dispatch(openAddPetModal(ownerId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnersContainer);
