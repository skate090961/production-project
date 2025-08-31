import {
    CombinedState, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';

import { userReducer } from '@/entities/user';
import { scrollSaveReducer } from '@/features/scroll-save';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtk-api';

import { createReducerManager } from './reducer-manager';
import { StateSchema, ThunkExtraArg } from './state-schema';

interface CreateReduxStoreProps {
    initState?: StateSchema
}

export function createReduxStore({ initState }: CreateReduxStoreProps) {
    const rootReducers: ReducersMapObject<StateSchema> = {
        user: userReducer,
        scrollSave: scrollSaveReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArgument: ThunkExtraArg = {
        api: $api,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initState,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            thunk: {
                extraArgument,
            },
        }).concat(rtkApi.middleware),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
