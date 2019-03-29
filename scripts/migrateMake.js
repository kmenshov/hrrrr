const knexInit = require('./knexInit');

(async () => {
  const { knex, knexOptions } = await knexInit();
  knex.migrate.make(process.argv[2], knexOptions.migrations);
})();
