import { Country } from '@/entities/country';
import { Currency } from '@/entities/currency';
import { Profile } from '@/entities/profile';

import { ValidateProfileError } from '../../types/editable-profile-card-schema';

import { validateProfileData } from './validate-profile-data';

const data: Profile = {
    city: 'city',
    firstname: 'firstname',
    lastname: 'lastname',
    age: 1,
    avatar: 'avatar',
    currency: Currency.RUB,
    country: Country.Russia,
    username: 'username',
};

describe('validateProfileData', () => {
    test('should return empty array for valid profile data', () => {
        const result = validateProfileData(data);
        expect(result).toEqual([]);
    });

    test('should return NO_DATA error when profile is undefined', () => {
        const result = validateProfileData();
        expect(result).toEqual([ValidateProfileError.NO_DATA]);
    });

    test('should return INCORRECT_USER_DATA error when firstname and lastname are empty', () => {
        const result = validateProfileData({ ...data, firstname: '', lastname: '' });
        expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
    });

    test('should return INCORRECT_AGE error when age is undefined', () => {
        const result = validateProfileData({ ...data, age: undefined });
        expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
    });

    test('should return multiple errors when all required fields are invalid', () => {
        const result = validateProfileData({});
        expect(result).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_AGE,
        ]);
    });
});
