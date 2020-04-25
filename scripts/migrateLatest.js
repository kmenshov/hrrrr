// Runs all migrations that have not yet been run.

/* eslint-disable no-console */
const knexInit = require('./knexInit');

(async () => {
  const { knex, knexOptions } = await knexInit();
  knex.migrate.latest(knexOptions.migrations)
    .then(() => knex.migrate.currentVersion())
    .then((version) => {
      console.log(`Migrated database to version: ${version}`);
      knex.destroy();
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
    });
})();
