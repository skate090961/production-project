import React, {
    memo, ReactElement, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';

import { AppRoutesProps, routeConfig } from '@/shared/config/route/route-config';
import { PageLoader } from '@/widgets/page-loader';

import { RequireAuth } from './require-auth';
import { RequireRoles } from './require-roles';

export const AppRouter = memo(() => {
    const renderRoute = useCallback((r: AppRoutesProps) => {
        const element = r.authOnly
            ? (
                <RequireAuth>
                    <RequireRoles roles={r.roles}>
                        {r.element as ReactElement}
                    </RequireRoles>
                </RequireAuth>
            )
            : r.element;

        return (
            <Route
                key={r.path}
                element={element}
                path={r.path}
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routeConfig.map(renderRoute)}
            </Routes>
        </Suspense>
    );
});
