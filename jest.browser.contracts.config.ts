export default {
    testEnvironment: './browser-jest-env.js',
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    projects: ["<rootDir>/backend"],
    detectOpenHandles:true,
};