export default {
    testEnvironment: './browser-jest-env.js',
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