import { createSlice } from '@reduxjs/toolkit';

import { CounterSchema } from '../types/counter-schema';

const initialState: CounterSchema = {
    value: 1,
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },

    },
});

export const { reducer: counterReducer } = counterSlice;
export const { actions: counterActions } = counterSlice;
