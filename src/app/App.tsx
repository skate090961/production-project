import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppRouter } from '@/app/providers/router';
import { userActions } from '@/entities/user';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Navbar } from '@/widgets/navbar';
import { PageLoader } from '@/widgets/page-loader';
import { Sidebar } from '@/widgets/sidebar';

export const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
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
};
