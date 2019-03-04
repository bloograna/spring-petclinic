import clinicRequest from '../clinicRequest';

const endpoint = '/pet';

const getPetsbyOwnerId = ownerId => {
  return clinicRequest.get(endpoint + `/owner/${ownerId}`);
};

const savePet = pet => {
  return clinicRequest.post(endpoint, pet);
};

const getPetTypes = () => {
  return clinicRequest.get(endpoint + '/types');
};

const getPetById = petId => {
  return clinicRequest.get(endpoint + `/${petId}`);
};

const petService = { getPetsbyOwnerId, getPetTypes, savePet, getPetById };
export default petService;
