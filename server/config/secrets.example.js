const Confidence = require('confidence');

const secrets = new Confidence.Store({
  $filter: { $env: 'NODE_ENV' },
  $default: {
    db: {
      user: 'dev_user',
      password: 'dev_password',
    },
  },
  test: {
    db: {
      user: 'test_user',
      password: 'test_password',
    },
  },
  production: {
    db: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
});

module.exports = secrets.get('/');
