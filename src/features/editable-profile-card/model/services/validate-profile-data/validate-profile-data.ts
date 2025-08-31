import { Profile } from '@/entities/profile';

import { ValidateProfileError } from '../../types/editable-profile-card-schema';

export const validateProfileData = (profile?: Profile) => {
    if (!profile) {
        return [ValidateProfileError.NO_DATA];
    }

    const { firstname, lastname, age } = profile;

    const errors: ValidateProfileError[] = [];

    if (!firstname || !lastname) {
        errors.push(ValidateProfileError.INCORRECT_USER_DATA);
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(ValidateProfileError.INCORRECT_AGE);
    }

    return errors;
};
