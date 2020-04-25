const secrets = require('./secrets');

// Confidence store for DB config.
// (May be exported as a simple object if used inside the manifest with Shwifty)
module.exports = {
  debug: !process.env.NODE_ENV, // only when NODE_ENV is not set (i.e. in development)
  client: 'pg',
  connection: {
    $filter: { $env: 'NODE_ENV' },
    $base: {
      host: '127.0.0.1',
      user: secrets.db.user,
      password: secrets.db.password,
    },
    $default: {
      database: 'h4r_dev',
    },
    test: {
      database: 'h4r_test',
    },
    production: {
      database: 'h4r',
    },
  },
};
