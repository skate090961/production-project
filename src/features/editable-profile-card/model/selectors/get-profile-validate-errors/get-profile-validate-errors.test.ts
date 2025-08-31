import { StateSchema } from '@/app/providers/store-provider';

import { ValidateProfileError } from '../../types/editable-profile-card-schema';

import { getProfileValidateErrors } from './get-profile-validate-errors';

describe('getProfileValidateErrors', () => {
    const errors = [ValidateProfileError.INCORRECT_AGE, ValidateProfileError.SERVER_ERROR];

    test('should return errors', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: errors,
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(errors);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
