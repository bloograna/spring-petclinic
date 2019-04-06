/* ---- INITIAL STATE ---- */
const initialState = {
  pet: {
    pets: [],
    searchResults: [],
    petTypes: [],
    showAddPetModal: false,
    shouldValidatePetModalData: false,
    activePet: undefined
  },
  vet: {
    vets: [],
    specialties: [],
    showAddVetModal: false,
    shouldValidateVetModalData: false
  },
  owner: {
    owners: [],
    searchResults: [],
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
