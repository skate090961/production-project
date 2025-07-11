import { DeepPartial } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/store-provider';

import { getLoginPassword } from './get-login-password';

describe('getLoginPassword', () => {
    test('should return password', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                password: 'test',
            },
        };
        expect(getLoginPassword(state as StateSchema)).toEqual('test');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginPassword(state as StateSchema)).toEqual('');
    });
});
