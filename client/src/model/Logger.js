import * as JsLogger from 'js-logger';
import { isUndefined } from 'lodash';
import { config } from '../util/config';

const resolveLogLevel = () => {
  const appLogLevel = JsLogger[config.get('logging.app')];
  return !config.get('logging.all') && isUndefined(appLogLevel)
    ? JsLogger.OFF
    : appLogLevel;
};

JsLogger.useDefaults({
  defaultLevel: resolveLogLevel(),
  formatter: (messages, { level, name }) => {
    // prefix each log message with a timestamp.
    const prefix = [new Date().toUTCString(), `[${level.name}]`, `[${name}]`];
    messages.unshift(...prefix);
  }
});

export const LOGGER = JsLogger;
export const Logger = JsLogger;
