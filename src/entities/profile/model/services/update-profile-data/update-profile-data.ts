import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { getProfileForm } from '../../selectors/get-profile-form/get-profile-form';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = getProfileForm(getState());

        try {
            const response = await extra.api.put('/profile', formData);

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
