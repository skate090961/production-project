import { StateSchema } from '@/app/providers/store-provider';
import { Country } from '@/entities/country';
import { Currency } from '@/entities/currency';

import { Profile } from '../../types/profile';

import { getProfileData } from './get-profile-data';

describe('getProfileData', () => {
    test('should return data', () => {
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
                data,
            },
        };
        expect(getProfileData(state as StateSchema)).toEqual(data);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileData(state as StateSchema)).toEqual(undefined);
    });
});
