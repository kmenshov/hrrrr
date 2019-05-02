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

  expect(response.result.slice(0)).toEqual(dummyData);
});

test('creates a user', async () => {
  let response = await server.inject({
    method: 'POST',
    url: '/api/v0/users/',
    payload: { name: 'First new user' },
  });
  expect(response.statusCode).toEqual(200);
  const firstUser = response.result;

  response = await server.inject({
    method: 'POST',
    url: '/api/v0/users/',
    payload: { name: 'Second new user' },
  });
  expect(response.statusCode).toEqual(200);
  const secondUser = response.result;

  expect(firstUser.name).toBe('First new user');
  expect(secondUser.name).toBe('Second new user');
  expect(secondUser.id).toBe(firstUser.id + 1);
});

test('deletes user', async () => {
  const response = await server.inject({
    method: 'DELETE',
    url: '/api/v0/user/112',
  });

  expect(response.statusCode).toEqual(204);
});
