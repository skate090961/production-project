import { DeepPartial } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/store-provider';

import { getCounterValue } from './get-counter-value';

describe('getCounterValue', () => {
    test('should return counter value', () => {
        const state: DeepPartial<StateSchema> = {
            counter: { value: 10 },
        };
        expect(getCounterValue(state as StateSchema)).toEqual(10);
    });
});
