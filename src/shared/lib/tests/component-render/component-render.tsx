import { DeepPartial } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/store-provider';
import i18nForTests from '@/shared/config/i18n/i18n-for-tests';
import { getRouteMain } from '@/shared/consts/router';

interface ComponentRenderOptions {
    route?: string;
    initState?: DeepPartial<StateSchema>
}

export const componentRender = (
    component: ReactNode,
    options: ComponentRenderOptions = {},
) => {
    const {
        route = getRouteMain(),
        initState,
    } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider initState={initState}>
                <I18nextProvider i18n={i18nForTests}>
                    {component}
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
};
