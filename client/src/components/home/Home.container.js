import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from './Home';
import { openAddOwnerModal } from '../../state/owner/ownerStore';
import { openAddVetModal } from '../../state/vet/vetStore';

const HomeContainer = ({ openAddOwnerModal, openAddVetModal, onAddVisit }) => (
  <Home
    onAddOwner={openAddOwnerModal}
    onAddVet={openAddVetModal}
    onAddVisit={onAddVisit}
  />
);

HomeContainer.propTypes = {
  openAddOwnerModal: PropTypes.func.isRequired,
  openAddVetModal: PropTypes.func.isRequired,
  onAddVisit: PropTypes.func.isRequired
};
/* istanbul ignore next */
const mapStateToProps = state => ({
  owners: state.ownerReducer.owners,
  specialties: state.vetReducer.specialties
});

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  openAddOwnerModal: () => {
    dispatch(openAddOwnerModal());
  },
  openAddVetModal: () => {
    dispatch(openAddVetModal());
  },
  onAddVisit: () => console.log('fake adding visit')
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeContainer);
