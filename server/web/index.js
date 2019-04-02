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
            lookupCompressed: true,
          },
        },
      });
    });

    // return index.html for everything except API requests
    server.ext('onPreResponse', (request, h) => {
      const { response } = request;
      if (
        response.isBoom &&
        response.output.statusCode === 404 &&
        request.path.substring(0, 5) !== '/api/'
      ) {
        return h.file('index.html');
      }
      return h.continue;
    });
  },
};
