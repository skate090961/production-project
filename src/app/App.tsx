import { Suspense } from 'react';

import { AppRouter } from '@/app/providers/router';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Navbar } from '@/widgets/navbar';
import { PageLoader } from '@/widgets/page-loader';
import { Sidebar } from '@/widgets/sidebar';

export const App = () => (
    <div className={classNames('app')}>
        <Suspense fallback={<PageLoader />}>
            <Navbar />
            <div className="content-page">
                <Sidebar />
                <div className="page-wrapper">
                    <AppRouter />
                </div>
            </div>
        </Suspense>
    </div>
);
