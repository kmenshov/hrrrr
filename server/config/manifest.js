'use strict';

const Confidence = require('confidence');
const Path = require('path');
const dbConfig = require('./database.js');

const serverRootPath = Path.resolve(__dirname, '..');

const goodOptions = {
  ops: {
    $filter: { $env: 'NODE_ENV' },
    $default: { interval: 10 * 60 * 1000 },
    production: { interval: 5 * 60 * 1000 },
    test: false,
  },
  reporters: {
    consoleReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          $filter: { $env: 'NODE_ENV' },
          $default: { log: '*', request: '*', response: '*', ops: '*' },
          test: {},
        }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
  },
};

const schwiftyOptions = {
  knex: dbConfig,
  models: Path.resolve(serverRootPath, './models'),
  migrationsDir: Path.resolve(serverRootPath, './config/migrations'),
};

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: 'localhost',
    port: {
      $filter: { $env: 'NODE_ENV' },
      $default: 3000,
      test: 3001,
    },
    router: {
      stripTrailingSlash: true,
    },
    routes: {
      files: {
        relativeTo: Path.resolve(serverRootPath, '../public'),
      },
    },
  },
  register: {
    plugins: [
      { plugin: 'good', options: goodOptions },
      { plugin: 'schwifty', options: schwiftyOptions },
      { plugin: 'inert' },
      { plugin: Path.resolve(serverRootPath, './web') },
      { plugin: Path.resolve(serverRootPath, './api'), routes: { prefix: '/api/v0' } },
    ],
  },
});
