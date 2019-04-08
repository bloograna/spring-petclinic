import visitService from './visitService';
import superagentMocks from '../__mocks__/superagentMocks';

describe('visitService', () => {
  let superagentMock;

  const expectedResult = {
    data: []
  };

  const errorMessage = 'something bad went wrong';

  describe('saveVisit', () => {
    const serverEndpoint = 'http://localhost:8080/api/v1/visit';
    it('should do saveVisit successfully', async () => {
      superagentMock = superagentMocks.post(serverEndpoint, expectedResult);

      await visitService.saveVisit().then(response => {
        expect(response).toEqual(expectedResult);
      });
      superagentMock.unset();
    });

    it('should do reject saveVisit for error', async () => {
      superagentMock = superagentMocks.error(serverEndpoint, errorMessage);

      await visitService.saveVisit().catch(error => {
        expect(error.message).toEqual(errorMessage);
      });
      superagentMock.unset();
    });
  });

  describe('deleteVisit', () => {
    const visitId = '34556';
    const serverEndpoint = `http://localhost:8080/api/v1/visit/${visitId}`;
    it('should do deleteVisit successfully', async () => {
      superagentMock = superagentMocks.del(serverEndpoint, expectedResult);

      await visitService.deleteVisit(visitId).then(response => {
        expect(response).toEqual(expectedResult);
      });
      superagentMock.unset();
    });

    it('should do reject deleteVisit for error', async () => {
      superagentMock = superagentMocks.error(serverEndpoint, errorMessage);

      await visitService.deleteVisit(visitId).catch(error => {
        expect(error.message).toEqual(errorMessage);
      });
      superagentMock.unset();
    });
  });
});
