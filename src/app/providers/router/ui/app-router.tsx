import React, { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { getUserAuthData } from '@/entities/user';
import { routeConfig } from '@/shared/config/route/route-config';
import { PageLoader } from '@/widgets/page-loader';

export const AppRouter = memo(() => {
    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => routeConfig.filter(({ authOnly }) => isAuth || !authOnly), [isAuth]);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {routes.map((r) => <Route key={r.path} {...r} />)}
            </Routes>
        </Suspense>
    );
});
