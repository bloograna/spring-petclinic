import clinicRequest from '../clinicRequest';

const endpoint = '/owner';

const getOwners = lastName => {
  return clinicRequest.get(endpoint, lastName);
};

const saveOwner = owner => {
  return clinicRequest.post(endpoint, owner);
};

const ownerService = { getOwners, saveOwner };
export default ownerService;
