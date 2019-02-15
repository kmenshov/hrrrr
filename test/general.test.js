let server;
beforeAll(async () => {
  server = await __createServer();
});

test('server can be started', async () => {
  await server.start();
  expect(server.info.uri).toBe('http://localhost:3000');
  await server.stop();
});
