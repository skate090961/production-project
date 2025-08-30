import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AppRouter } from '@/app/providers/router';
import { getUserInited, userActions } from '@/entities/user';
import { classNames } from '@/shared/lib/class-names/class-names';
import { HStack } from '@/shared/ui/stack';
import { Navbar } from '@/widgets/navbar';
import { PageLoader } from '@/widgets/page-loader';
import { Sidebar } from '@/widgets/sidebar';

export const App = () => {
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app')}>
            <Suspense fallback={<PageLoader />}>
                <Navbar />
                <HStack>
                    <Sidebar />
                    {inited && <AppRouter />}
                </HStack>
            </Suspense>
        </div>
    );
};
