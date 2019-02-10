'use strict';

const Confidence = require('confidence');
const Path = require('path');

// Glue manifest as a confidence store
module.exports = new Confidence.Store({
  server: {
    host: 'localhost',
    port: {
      $env: 'PORT',
      $coerce: 'number',
      $default: 3000,
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
    ],
  },
});
