/* eslint-disable no-console */

'use strict';

const Glue = require('glue');
const Manifest = require('./manifest');

const init = async () => {
  const manifest = Manifest.get('/');
  const server = await Glue.compose(manifest);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
