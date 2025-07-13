import { createSlice } from '@reduxjs/toolkit';

import { fetchProfileData } from '../services/fetch-profile-data/fetch-profile-data';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
