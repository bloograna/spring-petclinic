import { get } from 'lodash';
// eslint-disable-next-line
import Config from '../config.json';

export const config = {
  get: (key, opt) => get(Config, key, opt)
};

window.config = config;
