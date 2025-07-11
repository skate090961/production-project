import { configureStore, ReducersMapObject } from '@reduxjs/toolkit';

import { counterReducer } from '@/entities/counter';
import { userReducer } from '@/entities/user';

import { createReducerManager } from './reducer-manager';
import { StateSchema } from './state-schema';

export function createReduxStore(initState?: StateSchema) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        counter: counterReducer,
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const store = configureStore<StateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initState,
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}
