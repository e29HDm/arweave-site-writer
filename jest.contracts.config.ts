/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testEnvironment: 'node',
  clearMocks: true,
  projects: [
    {
      "displayName": "contracts tests",
      "testMatch": ["<rootDir>/backend/tests/**/*.test.ts"]
    },
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/dist-contracts/**",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  detectOpenHandles:true,
};
