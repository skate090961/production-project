import { configureStore } from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/counter';

import { StateSchema } from './state-schema';

export function createReduxStore(initState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            counter: counterReducer,
        },
        devTools: __IS_DEV__,
        preloadedState: initState,
    });
}
