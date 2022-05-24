/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/node_modules/jest-css-modules'
  },
  collectCoverageFrom: ['src/index.ts'],
  coverageReporters: [
    'json-summary',
    'text',
    'lcov'
  ]
}
