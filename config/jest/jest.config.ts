export default {
    globals: {
        __IS_DEV__: true,
        __API__: '',
        __PROJECT__: 'jest',
    },
    clearMocks: true,
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: [
        '\\\\node_modules\\\\',
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'node',
    ],
    moduleDirectories: [
        'node_modules',
    ],
    rootDir: '../../',
    moduleNameMapper: {
        '\\.(svg|png|jpe?g)$': '<rootDir>config/jest/jest-empty-component.tsx',
        '^.+\\.s?css$': 'identity-obj-proxy',
        // last mapper
        '^@/(.*)$': '<rootDir>src/$1',
    },
    testMatch: [
        '<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    setupFilesAfterEnv: ['<rootDir>config/jest/jest-setup.ts'],
};
