/* ---- INITIAL STATE ---- */
const initialState = {
  pet: { pets: {}, petTypes: [] },
  vet: { vets: [], specialties: [] },
  owner: {
    owners: [],
    showAddModal: false,
    shouldValidateModalData: false,
    newOwner: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      telephone: ''
    }
  },
  visit: [],
  message: []
};

export default initialState;
