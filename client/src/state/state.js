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
    visits: [
      {
        id: 4,
        start: new Date(2019, 2, 4, 15, 15),
        end: new Date(2019, 2, 4, 16, 30),

        // date: '2019-03-04',
        // startTime: '15:15:00',
        // endTime: '16:30:00',
        desc: 'spayed',
        title: 'visit',
        petId: 7,
        vetId: 4
      }
    ],
    showAddVisitModal: false,
    shouldValidateVisitModalData: false
  },
  message: []
};

export default initialState;
