import { RouteProps } from 'react-router-dom';

import { About } from '@/pages/about';
import { Main } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found-page';

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    NOT_FOUND_PAGE = 'not_found_page'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',

    // last route
    [AppRoutes.NOT_FOUND_PAGE]: '*',
};

export const routeConfig: RouteProps[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <Main />,
    },
    {
        path: RoutePath[AppRoutes.ABOUT],
        element: <About />,
    },
    {
        path: RoutePath[AppRoutes.NOT_FOUND_PAGE],
        element: <NotFoundPage />,
    },
];
