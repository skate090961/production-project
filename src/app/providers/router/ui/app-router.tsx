import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { routeConfig } from '@/shared/config/route/route-config';

export const AppRouter = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {routeConfig.map((r) => <Route key={r.path} {...r} />)}
        </Routes>
    </Suspense>
);
