import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router';

import { StateSchema } from '../config/state-schema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initState?: DeepPartial<StateSchema>;
}

export const StoreProvider = ({ children, initState }: StoreProviderProps) => {
    const navigate = useNavigate();

    const store = createReduxStore({
        initState: initState as StateSchema,
        navigate,
    });

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
