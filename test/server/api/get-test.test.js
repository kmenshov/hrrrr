beforeAll(__initServer);

test('returns param from the test path', async () => {
  let response = await server.inject('/api/v0/test/test-route');
  expect(response.result).toEqual({ code: 200, message: 'OK: test-route' });

  response = await server.inject('/api/v0/test/another-route');
  expect(response.result).toEqual({ code: 200, message: 'OK: another-route' });
});
