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
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(sendComment.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(sendComment.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(sendComment.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { reducer: addNewCommentReducer } = addNewCommentSlice;
export const { actions: addNewCommentActions } = addNewCommentSlice;
