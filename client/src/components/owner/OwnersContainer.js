import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Col } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import { saveOwner, getOwnerByLastName } from '../../state/owner/ownerStore';
import Owners from './Owners';
import AddOwnerForm from './AddOwnerForm';
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
      validatedNewOwner: false,
      showAddOwnerModal: false,
      formRef: null
    };
  }

  onChange = event => {
    const field = event.target.id;
    const value = event.target.value;
    const { newOwner } = this.state;
    newOwner[field] = value;

    this.setState({ newOwner: newOwner });
  };

  onHideModal = () => {
    this.setState({ showAddOwnerModal: false, validatedNewOwner: false });
  };

  onShowModal = () => {
    this.setState({ showAddOwnerModal: true });
  };

  setAddFormRef = ref => this.setState({ formRef: ref });

  onSubmit = event => {
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

  onSearch = event => {
    const { searchByLastName } = this.props;
    const form = event.currentTarget.form[0];
    const lastName = form.value;
    searchByLastName(lastName);
  };

  renderSearchButton = () => {
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
        <Button variant="primary" onClick={this.onShowModal}>
          Add an owner
        </Button>
      </Form>
    );
  };

  renderOwnersList = owners =>
    isEmpty(owners) ? null : <Owners owners={owners} />;

  renderAddOwnerModal = () => {
    const { showAddOwnerModal, validatedNewOwner } = this.state;
    if (showAddOwnerModal) {
      return (
        <LargeModal
          show={showAddOwnerModal}
          onHide={this.onHideModal}
          onClick={this.onSubmit}
          title={'Add an owner'}
        >
          <AddOwnerForm
            formValidated={validatedNewOwner}
            onChange={this.onChange}
            getRef={this.setAddFormRef}
          />
        </LargeModal>
      );
    }
    return null;
  };

  render() {
    const { owners } = this.props;
    return (
      <div>
        {this.renderAddOwnerModal()}
        {this.renderSearchButton()}
        {this.renderOwnersList(owners)}
      </div>
    );
  }
}

OwnersContainer.protoTypes = {
  searchByLastName: PropTypes.func.isRequired,
  addOwner: PropTypes.func.isRequired
};

/* istanbul ignore next */
const mapStateToProps = state => ({
  owners: state.ownerReducer.owners
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  searchByLastName: lastName => {
    dispatch(getOwnerByLastName(lastName));
  },
  addOwner: owner => {
    dispatch(saveOwner(owner));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OwnersContainer);
