import { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { StateSchema } from '../config/state-schema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ children, initState }: StoreProviderProps) => {
    const store = createReduxStore({
        initState: initState as StateSchema,
    });

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
