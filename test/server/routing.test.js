import fs from 'fs';
import { promisify } from 'util';
import Path from 'path';

const readFile = promisify(fs.readFile);

let server;
beforeAll(async () => {
  server = await __createServer();
});

test('returns index.html for 404', async () => {
  const response = await server.inject('/something');
  const index = await readFile(Path.resolve(__dirname, '../../public/index.html'), 'utf8');

  expect(response.result).toEqual(index);
});

test('returns 404 for missing API routes', async () => {
  const response = await server.inject('/api/something');

  expect(response.statusCode).toEqual(404);
});
