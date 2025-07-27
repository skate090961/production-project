import React, {
    memo, ReactElement, Suspense, useCallback,
} from 'react';
import { Route, Routes } from 'react-router-dom';

import { RequireAuth } from '@/app/providers/router';
import { AppRoutesProps, routeConfig } from '@/shared/config/route/route-config';
import { PageLoader } from '@/widgets/page-loader';

export const AppRouter = memo(() => {
    const renderRoute = useCallback((r: AppRoutesProps) => {
        const element = r.authOnly
            ? <RequireAuth>{r.element as ReactElement}</RequireAuth>
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
