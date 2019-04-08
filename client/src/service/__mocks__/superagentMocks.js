import superagent from 'superagent';
import mockSuperagent from 'superagent-mock';

const get = (serverEndpoint, expectedResult) =>
  mockSuperagent(superagent, [
    {
      pattern: serverEndpoint,
      fixtures: () => expectedResult,
      get: (match, data) => ({ body: data, status: 200 })
    }
  ]);

const post = (serverEndpoint, expectedResult) =>
  mockSuperagent(superagent, [
    {
      pattern: serverEndpoint,
      fixtures: () => expectedResult,
      post: (match, data) => ({ body: data, status: 200 })
    }
  ]);

const del = (serverEndpoint, expectedResult) =>
  mockSuperagent(superagent, [
    {
      pattern: serverEndpoint,
      fixtures: () => expectedResult,
      delete: (match, data) => ({ body: data, status: 200 })
    }
  ]);

const error = (serverEndpoint, errorMessage) =>
  mockSuperagent(superagent, [
    {
      pattern: serverEndpoint,
      fixtures: () => {
        throw new Error(errorMessage);
      }
    }
  ]);

const superagentMocks = { get, post, del, error };
export default superagentMocks;
