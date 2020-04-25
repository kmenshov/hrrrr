const Path = require('path');

module.exports = {
  setupFiles: ['<rootDir>/test/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/server/index.js',
  ],
  moduleDirectories: [Path.resolve(__dirname, 'client/'), 'node_modules'],
  coverageThreshold: {
    global: {
      lines: 100,
    },
    'client/': {
      lines: 95,
    },
  },
  // transform: {},
  transformIgnorePatterns: ['<rootDir>/server/', '<rootDir>/node_modules/'],
};
