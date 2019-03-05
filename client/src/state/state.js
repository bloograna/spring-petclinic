/* ---- INITIAL STATE ---- */
const initialState = {
  pet: {
    pets: {},
    petTypes: [],
    showAddPetModal: false,
    shouldValidatePetModalData: false
  },
  vet: {
    vets: [],
    specialties: [],
    showAddVetModal: false,
    shouldValidateVetModalData: false
  },
  owner: {
    owners: [],
    showAddOwnerModal: false,
    shouldValidateOwnerModalData: false,
    activeOwner: null
  },
  visit: [],
  message: []
};

export default initialState;
