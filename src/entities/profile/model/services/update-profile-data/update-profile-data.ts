import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { getProfileForm } from '../../selectors/get-profile-form/get-profile-form';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validate-profile-data/validate-profile-data';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = getProfileForm(getState());

        const errors = validateProfileData(formData);

        if (errors.length) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
