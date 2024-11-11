// jest.config.cjs
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
    },
    extensionsToTreatAsEsm: ['.jsx'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy', // Sử dụng '\\' thay vì '/'
    },
};
