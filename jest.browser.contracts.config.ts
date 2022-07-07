export default {
    testEnvironment: './browser-jest-env.js',
    clearMocks: true,
    projects: [
        {
            "displayName": "contracts tests",
            "testMatch": ["<rootDir>/backend/tests/**/*.test.ts"]
        },
    ],
    detectOpenHandles:true,
};