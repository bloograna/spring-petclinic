import clinicRequest from '../clinicRequest';

const endpoint = '/owner';

const getOwners = () => {
  return clinicRequest.get(endpoint);
};

const saveOwner = owner => {
  return clinicRequest.post(endpoint, owner);
};

const ownerService = { getOwners, saveOwner };
export default ownerService;
