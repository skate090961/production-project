import { StateSchema } from '@/app/providers/store-provider';
import { Country } from '@/entities/country';
import { Currency } from '@/entities/currency';
import { Profile } from '@/entities/profile';

import { getProfileForm } from './get-profile-form';

describe('getProfileForm', () => {
    test('should return form', () => {
        const data: Profile = {
            city: 'Samara123',
            firstname: 'Максим123',
            lastname: 'Александров123',
            age: 28123,
            avatar: 'avatar',
            currency: Currency.RUB,
            country: Country.Russia,
            username: 'admin123',
        };

        const state: DeepPartial<StateSchema> = {
            profile: {
                form: data,
            },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
