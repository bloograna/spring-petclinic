/* ---- INITIAL STATE ---- */
const initialState = {
  pet: {
    // TODO USE MAP
    pets: [],
    searchResults: [],
    petTypes: [],
    showAddPetModal: false,
    shouldValidatePetModalData: false,
    activePet: null
  },
  vet: {
    // TODO USE MAP
    vets: [],
    specialties: [],
    showAddVetModal: false,
    shouldValidateVetModalData: false
  },
  owner: {
    owners: new Map(),
    searchResults: [],
    showAddOwnerModal: false,
    shouldValidateOwnerModalData: false,
    activeOwner: null
  },
  visit: {
    visits: new Map(),
    showAddVisitModal: false,
    shouldValidateVisitModalData: false,
    newVisit: {
      id: null,
      date: null,
      start: null,
      end: null,
      petId: null,
      vetId: null,
      desc: null,
      excludedStartTimes: [],
      maxEndTime: null,
      excludedVets: []
    },
    isNewVisitValid: false
  },
  message: []
};

export default initialState;
