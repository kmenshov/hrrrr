'use strict';

const Manifest = require('../server/config/manifest');
const createServer = require('../server');

const schwiftyOptions = Manifest
  .get('/register/plugins')
  .find(({ plugin }) => plugin === 'schwifty')
  .options;

const knexOptions = Object.assign(
  {
    migrations: {
      directory: schwiftyOptions.migrationsDir,
    },
  },
  schwiftyOptions.knex,
);

module.exports = async () => {
  const server = await createServer();
  const knex = server.knex();
  return {
    knex,
    knexOptions,
  };
};
