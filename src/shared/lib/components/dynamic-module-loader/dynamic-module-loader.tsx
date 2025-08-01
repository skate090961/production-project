import { Reducer } from '@reduxjs/toolkit';
import { FC, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

import { ReduxStoreWithManager } from '@/app/providers/store-provider';
import { StateSchemaKeys } from '@/app/providers/store-provider/config/state-schema';

export type ReducerList = {
    [name in StateSchemaKeys]?: Reducer;
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
    reducers, children, removeAfterUnmount,
}) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        const entries = Object.entries(reducers) as [StateSchemaKeys, Reducer][];

        entries.forEach(([name, reducer]) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });

        return () => {
            if (removeAfterUnmount) {
                entries.forEach(([name]) => {
                    store.reducerManager.remove(name);
                    dispatch({ type: `@DESTROY ${name} reducer` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
