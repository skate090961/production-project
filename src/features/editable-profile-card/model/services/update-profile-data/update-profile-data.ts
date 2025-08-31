import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { Profile } from '@/entities/profile';

import { getProfileForm } from '../../selectors/get-profile-form/get-profile-form';
import { ValidateProfileError } from '../../types/editable-profile-card-schema';
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
            const response = await extra.api.put(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            return data;
        } catch (e) {
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
