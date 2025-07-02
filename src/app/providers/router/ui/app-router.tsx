import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '@/shared/config/route/route-config';
import { PageLoader } from '@/widgets/page-loader';

export const AppRouter = () => (
    <Suspense fallback={<PageLoader />}>
        <Routes>
            {routeConfig.map((r) => <Route key={r.path} {...r} />)}
        </Routes>
    </Suspense>
);
