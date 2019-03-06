import clinicRequest from '../clinicRequest';

const endpoint = '/visit';

const getVisitsByPetId = petId => {
  return clinicRequest.get(endpoint + `/pet-id/${petId}`);
};

const saveVisit = visit => {
  return clinicRequest.post(endpoint, visit);
};

const getVisitsByVetId = vetId => {
  return clinicRequest.get(endpoint + `/vet-id/${vetId}`);
};

const getVisitsByDate = dateString => {
  return clinicRequest.get(endpoint + `/visit-date/${dateString}`);
};

const getVisitsByDateRange = (startDate, endDate) => {
  const dateRange = { startDate, endDate };
  return clinicRequest.get(endpoint + '/visit-date', dateRange);
};

const visitService = {
  getVisitsByPetId,
  saveVisit,
  getVisitsByVetId,
  getVisitsByDate,
  getVisitsByDateRange
};
export default visitService;
