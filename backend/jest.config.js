module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js', // include all source files
    '!src/**/*.test.js', // exclude test files
    '!src/config/**', // exclude configs if you like
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};