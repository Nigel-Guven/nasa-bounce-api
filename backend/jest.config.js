module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/test/**/*.test.js'],
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/config/**', 
    '!src/server.js', 
    '!src/app.js', 
    '!src/routes.js', 
     '!src/middleware.js',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};