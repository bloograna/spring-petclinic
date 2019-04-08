import ownerService from './ownerService';
import superagentMocks from '../__mocks__/superagentMocks';

describe('ownerService', () => {
  let superagentMock;

  const expectedResult = {
    data: []
  };

  const errorMessage = 'something bad went wrong';

  describe('getOwners', () => {
    const serverEndpoint = 'http://localhost:8080/api/v1/owner';
    it('should do getOwners successfully', async () => {
      superagentMock = superagentMocks.get(serverEndpoint, expectedResult);

      await ownerService.getOwners().then(response => {
        expect(response).toEqual(expectedResult);
      });
      superagentMock.unset();
    });

    it('should do reject getOwners for error', async () => {
      superagentMock = superagentMocks.error(serverEndpoint, errorMessage);

      await ownerService.getOwners().catch(error => {
        expect(error.message).toEqual(errorMessage);
      });
      superagentMock.unset();
    });
  });
});
