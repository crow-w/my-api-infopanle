import { Layout, Configuration } from 'log4js';

const defaultLoggerLevel = process.env.LOGGER_LEVEL || 'info';

const layout: Layout = {
  type: 'pattern',
  pattern: '%d{ISO8601_WITH_TZ_OFFSET} [%p] %m',
};

export const config: Configuration = {
  appenders: {
    stdout: { type: 'stdout', layout },
  },
  categories: {
    default: { appenders: ['stdout'], level: defaultLoggerLevel },
    error: { appenders: ['stdout'], level: defaultLoggerLevel },
  },
};
