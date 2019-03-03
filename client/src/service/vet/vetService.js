import clinicRequest from '../clinicRequest';

const endpoint = '/vet';

const getVets = () => {
  return clinicRequest.get(endpoint);
};

const saveVet = vet => {
  return clinicRequest.post(endpoint, vet);
};

const getVetSpecialties = () => {
  return clinicRequest.get(endpoint + '/specialty');
};

const getVetById = vetId => {
  return clinicRequest.get(endpoint + `/${vetId}`);
};

const vetService = { getVets, saveVet, getVetSpecialties, getVetById };
export default vetService;
