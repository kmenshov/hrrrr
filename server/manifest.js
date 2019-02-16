'use strict';

const Confidence = require('confidence');
const Path = require('path');

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
        relativeTo: Path.resolve(__dirname, '../public'),
      },
    },
    debug: {
      $filter: { $env: 'NODE_ENV' },
      $default: {
        log: ['error'],
        request: ['error'],
      },
      production: {
        request: ['implementation'],
      },
    },
  },
  register: {
    plugins: [
      { plugin: 'inert' },
      { plugin: `${__dirname}/web` },
      { plugin: `${__dirname}/api`, routes: { prefix: '/api/v0' } },
    ],
  },
});
