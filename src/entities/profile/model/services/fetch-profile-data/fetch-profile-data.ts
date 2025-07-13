import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get('/profile');

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
