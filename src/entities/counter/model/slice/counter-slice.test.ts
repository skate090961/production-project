import { CounterSchema } from '../types/counter-schema';

import { counterActions, counterReducer } from './counter-slice';

describe('CounterSlice', () => {
    test('increment test', () => {
        const state: CounterSchema = {
            value: 10,
        };

        expect(counterReducer(state as CounterSchema, counterActions.increment()))
            .toEqual({ value: 11 });
    });

    test('decrement test', () => {
        const state: CounterSchema = {
            value: 10,
        };

        expect(counterReducer(state as CounterSchema, counterActions.decrement()))
            .toEqual({ value: 9 });
    });

    test('should work with empty state', () => {
        expect(counterReducer(undefined, counterActions.increment()))
            .toEqual({ value: 2 });
    });
});
