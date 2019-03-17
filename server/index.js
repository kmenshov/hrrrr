/* eslint-disable no-console */

'use strict';

const Glue = require('glue');
const Manifest = require('./config/manifest');

const createServer = () => {
  const manifest = Manifest.get('/');
  return Glue.compose(manifest);
};

const startServer = async () => {
  const server = await createServer();
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

if (module.parent) {
  // the module was required (most probably from tests modules)
  module.exports = createServer;
} else {
  // the module was started as a main process
  startServer();
}
