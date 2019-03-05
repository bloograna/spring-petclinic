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
  visit: {
    visits: [],
    showAddVisitModal: false,
    shouldValidateVisitModalData: false
  },
  message: []
};

export default initialState;
