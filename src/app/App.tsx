import { Suspense } from 'react';

import { AppRouter } from '@/app/providers/router';
import { useTheme } from '@/app/providers/theme';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';

import './styles/index.scss';

export const App = () => {
    const { theme } = useTheme();
    return (
        <div className={classNames('app', [theme])}>
            <Suspense fallback={<div>...loading</div>}>
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
