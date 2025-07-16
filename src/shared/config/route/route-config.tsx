import { RouteProps } from 'react-router-dom';

import { About } from '@/pages/about';
import { Main } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found-page';
import { Profile } from '@/pages/profile';

type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND_PAGE = 'not_found_page',
    PROFILE = 'profile',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',

    // last route
    [AppRoutes.NOT_FOUND_PAGE]: '*',
};

export const routeConfig: AppRoutesProps[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <Main />,
    },
    {
        path: RoutePath[AppRoutes.ABOUT],
        element: <About />,
    },
    {
        path: RoutePath[AppRoutes.PROFILE],
        element: <Profile />,
        authOnly: true,
    },

    // last route
    {
        path: RoutePath[AppRoutes.NOT_FOUND_PAGE],
        element: <NotFoundPage />,
    },
];
