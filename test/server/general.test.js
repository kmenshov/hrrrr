beforeAll(__initServer);

test('server can be started', async () => {
  await server.start();
  expect(server.info.uri).toBe('http://localhost:3001');
  await server.stop();
});
