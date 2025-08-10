import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddNewCommentSchema } from '../types/add-new-comment';

const initialState: AddNewCommentSchema = {
    isLoading: false,
    text: '',
};

export const addNewCommentSlice = createSlice({
    name: 'addNewComment',
    initialState,
    reducers: {
        updateText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { reducer: addNewCommentReducer } = addNewCommentSlice;
export const { actions: addNewCommentActions } = addNewCommentSlice;
