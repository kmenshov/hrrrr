'use strict';

const Confidence = require('confidence');
const Path = require('path');

const serverRootPath = Path.resolve(__dirname, '..');

const goodOptions = {
  ops: {
    $filter: { $env: 'NODE_ENV' },
    $default: { interval: 1 * 60 * 1000 },
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

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: 'localhost',
    port: {
      $filter: { $env: 'NODE_ENV' },
      $default: 3000,
      test: 3001,
    },
    routes: {
      files: {
        relativeTo: Path.resolve(serverRootPath, '../public'),
      },
    },
    // debug: {
    //   $filter: { $env: 'NODE_ENV' },
    //   $default: {
    //     log: ['error'],
    //     request: ['error'],
    //   },
    //   production: {
    //     request: ['implementation'],
    //   },
    // },
  },
  register: {
    plugins: [
      { plugin: 'good', options: goodOptions },
      { plugin: 'inert' },
      { plugin: Path.resolve(serverRootPath, './web') },
      { plugin: Path.resolve(serverRootPath, './api'), routes: { prefix: '/api/v0' } },
    ],
  },
});
