import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { NavigateOptions, To } from 'react-router-dom';

import { userReducer } from '@/entities/user';
import { $api } from '@/shared/api/api';

import { createReducerManager } from './reducer-manager';
import { StateSchema, ThunkExtraArg } from './state-schema';

interface CreateReduxStoreProps {
    initState?: StateSchema
    navigate?: (to: To, options?: NavigateOptions) => void;
}

export function createReduxStore({ initState, navigate }: CreateReduxStoreProps) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = {
        api: $api,
        navigate,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
