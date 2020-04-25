// Rolls back the latest migration group.

/* eslint-disable no-console */
const knexInit = require('./knexInit');

(async () => {
  const { knex, knexOptions } = await knexInit();
  knex.migrate.rollback(knexOptions.migrations)
    .then(() => knex.migrate.currentVersion())
    .then((version) => {
      console.log(`Rolled back database to version: ${version}`);
      knex.destroy();
    })
    .catch((err) => {
      console.error(err);
      knex.destroy();
    });
})();
