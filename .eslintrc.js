module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:i18next/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'i18next',
        'react-hooks',
        'skate0909-plugin',
    ],
    rules: {
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        indent: [2, 4],
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react/no-array-index-key': 'warn',
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'no-undef': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'aria-label',
                    'aria-role',
                    'aria-placeholder',
                    'data-testid',
                    'name',
                    'alt',
                    'target',
                    'direction',
                    'align',
                    'justify',
                    'gap',
                ],
            },
        ],
        'max-len': ['error', { ignoreComments: true, code: 120 }],

        'import/order': [
            'error',
            {
                pathGroups: [
                    {
                        pattern: '@/{app,entities,features,pages,processes,widgets,shared}/**',
                        group: 'internal',
                    },
                    {
                        pattern: '@/shared/**',
                        group: 'internal',
                    },
                    {
                        pattern: '*.scss',
                        group: 'object',
                        patternOptions: { matchBase: true },
                        position: 'after',
                    },
                ],
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                    ['object', 'type'],
                ],
                'newlines-between': 'always',
                alphabetize: { order: 'asc', caseInsensitive: true },
                warnOnUnassignedImports: true,
            },
        ],
        'skate0909-plugin/path-checker': 'error',
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
    ],
};
