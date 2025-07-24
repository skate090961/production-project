import { StateSchema } from '@/app/providers/store-provider';

import { getProfileError } from './get-profile-error';

describe('getProfileError', () => {
    test('should return error', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: 'Error',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('Error');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
