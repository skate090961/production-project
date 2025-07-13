import { createSlice } from '@reduxjs/toolkit';

import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const { reducer: profileReducer } = profileSlice;
export const { actions: profileActions } = profileSlice;
