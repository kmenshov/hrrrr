const repl = require('repl');
const createServer = require('../server');

(async () => {
  const server = await createServer();
  await server.initialize();

  const replServer = repl.start('> ');

  replServer.on('exit', async () => {
    console.log('Received "exit" event from repl!'); // eslint-disable-line no-console
    await server.stop();
    // process.exit();
  });

  // make all models available in the repl context
  Object.entries(server.models()).forEach((entry) => {
    const [key, value] = entry;
    replServer.context[key] = value;
  });

  replServer.context.server = server;
})();
