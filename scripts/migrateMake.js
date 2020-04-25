// Creates a new migration, with the name of the migration being added.

const knexInit = require('./knexInit');

(async () => {
  const { knex, knexOptions } = await knexInit();
  knex.migrate.make(process.argv[2], knexOptions.migrations);
})();
