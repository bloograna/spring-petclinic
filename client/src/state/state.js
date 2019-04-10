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
    // TODO USE MAP
    owners: [],
    searchResults: [],
    showAddOwnerModal: false,
    shouldValidateOwnerModalData: false,
    activeOwner: null
  },
  visit: {
    // TODO USE MAP.
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
      desc: null,
      excludedStartTimes: [],
      maxEndTime: null
    },
    isNewVisitValid: false
  },
  message: []
};

export default initialState;
