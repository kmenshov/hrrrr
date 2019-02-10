/* eslint-disable no-unused-vars */

'use strict';

exports.plugin = {
  name: 'webPages',
  version: '0.0.1',
  async register(server, options) {
    server.dependency('inert', () => {
      server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
          directory: {
            path: '.',
            redirectToSlash: true,
          },
        },
      });
    });
  },
};
