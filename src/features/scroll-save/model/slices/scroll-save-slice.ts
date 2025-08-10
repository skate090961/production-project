import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ScrollSaveSchema } from '../types/scroll-save-schema';

const initialState: ScrollSaveSchema = {
    scroll: {},
};

export const scrollSaveSlice = createSlice({
    name: 'scrollSave',
    initialState,
    reducers: {
        updateScrollPosition: (state, action: PayloadAction<{ path: string, position: number}>) => {
            const { path, position } = action.payload;

            state.scroll[path] = position;
        },
    },
});

export const { reducer: scrollSaveReducer } = scrollSaveSlice;
export const { actions: scrollSaveActions } = scrollSaveSlice;
