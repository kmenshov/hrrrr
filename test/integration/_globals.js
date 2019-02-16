/* eslint-disable object-shorthand */

const createServer = require('../../server');

let server;

module.exports = {
  // This runs once at the beginning of the tests run, before creating the session
  before: async function(done) {
    server = await createServer();
    await server.start();
    done();
  },

  // This runs once at the very end of the tests run, after closing the session
  after: async function(done) {
    await server.stop();
    done();
  },
};
