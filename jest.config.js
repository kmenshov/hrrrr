module.exports = {
  setupFiles: ['<rootDir>/test/jest.setup.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/server/index.js',
  ],
  coverageThreshold: {
    global: {
      lines: 100,
    },
  },
};
