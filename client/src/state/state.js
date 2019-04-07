/* ---- INITIAL STATE ---- */
const initialState = {
  pet: {
    pets: [],
    searchResults: [],
    petTypes: [],
    showAddPetModal: false,
    shouldValidatePetModalData: false,
    activePet: null
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
    shouldValidateVisitModalData: false,
    newVisit: {
      id: null,
      date: null,
      start: null,
      end: null,
      petId: null,
      vetId: null,
      desc: null
    },
    isNewVisitValid: false,
    visitVetSearchResult: []
  },
  message: []
};

export default initialState;
