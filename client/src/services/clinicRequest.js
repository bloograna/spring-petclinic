import request from 'superagent';
import config from '../config.json';

const { server, apiVersion, acceptType } = config;
const url = server + apiVersion;
const get = (endpoint, args) => {
  return request
    .get(url + endpoint)
    .query(args)
    .accept(acceptType)
    .ok(response => response.status === 200)
    .then(response => response.body);
};

const post = (endpoint, body) => {
  return request
    .post(url + endpoint)
    .set('Content-Type', acceptType)
    .send(body)
    .accept(acceptType)
    .ok(response => response.status === 200)
    .then(response => response.body);
};

const del = endpoint => {
  return request
    .delete(url + endpoint)
    .accept(acceptType)
    .ok(response => response.status === 200)
    .then(response => response.body);
};

const clinicRequest = { get, post, del };
export default clinicRequest;
