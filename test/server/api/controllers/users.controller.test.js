const dummyData = [
  { id: 1, name: 'User one' },
  { id: 2, name: 'User two' },
  { id: 3, name: 'User three' },
  { id: 4, name: 'User four' },
  { id: 5, name: 'User five' },
];

beforeAll(__initServer);

test('lists all users', async () => {
  const response = await server.inject('/api/v0/users');

  expect(response.result).toEqual(dummyData);
});

test('deletes user', async () => {
  const response = await server.inject({
    method: 'DELETE',
    url: '/api/v0/user/112',
  });

  expect(response.statusCode).toEqual(204);
});
