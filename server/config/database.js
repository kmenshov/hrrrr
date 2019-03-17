const Confidence = require('confidence');
const secrets = require('./secrets');

// Confidence store for DB config.
// (May be exported as a simple object if used inside the manifest with Shwifty)
module.exports = new Confidence.Store({
  client: 'pg',
  connection: {
    $filter: { $env: 'NODE_ENV' },
    $base: {
      host: '127.0.0.1',
      user: secrets.db.user,
      password: secrets.db.password,
    },
    $default: {
      database: 'h4r_development',
    },
    test: {
      database: 'h4r_test',
    },
    production: {
      database: 'h4r',
    },
  },
});
