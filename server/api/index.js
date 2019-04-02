'use strict';

exports.plugin = {
  name: 'api',
  version: '0.0.1',
  async register(server, options) {
    server.route([
      {
        method: 'GET',
        path: '/test/{message}',
        handler(request, h) {
          return { code: 200, message: `OK: ${request.params.message}` };
        },
      },
    ]);
  },
};
