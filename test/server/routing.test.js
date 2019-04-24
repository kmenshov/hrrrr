import fs from 'fs';
import { promisify } from 'util';
import Path from 'path';

const readFile = promisify(fs.readFile);

beforeAll(__initServer);

test('returns index.html for 404', async () => {
  const response = await server.inject('/something');
  const index = await readFile(Path.resolve(__dirname, '../../public/index.html'), 'utf8');

  expect(response.result).toEqual(index);
});

test('returns 404 for missing API routes', async () => {
  const response = await server.inject('/api/something');

  expect(response.statusCode).toEqual(404);
});

test('strips trailing slash', async () => {
  const response1 = await server.inject('/api/v0/users');
  const response2 = await server.inject('/api/v0/users/');

  expect(response1.result).toEqual(response2.result);
  expect(response1.statusCode).toEqual(response2.statusCode);
});
