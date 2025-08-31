import { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/user';
import { About } from '@/pages/about';
import { AdminPanel } from '@/pages/admin-panel';
import { ArticleDetails } from '@/pages/article-details';
import { ArticleEdit } from '@/pages/article-edit';
import { Articles } from '@/pages/articles';
import { Forbidden } from '@/pages/forbidden';
import { Main } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found-page';
import { Profile } from '@/pages/profile';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?: UserRole[];
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',

    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id
    [AppRoutes.ARTICLE_CREATE]: '/articles/new',
    [AppRoutes.ARTICLE_EDIT]: '/articles/:id/edit',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.FORBIDDEN]: '/forbidden',

    // last route
    [AppRoutes.NOT_FOUND]: '*',
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
        path: `${RoutePath[AppRoutes.PROFILE]}:id`,
        element: <Profile />,
        authOnly: true,
    },
    {
        path: RoutePath[AppRoutes.ARTICLES],
        element: <Articles />,
        authOnly: true,
    },
    {
        path: `${RoutePath[AppRoutes.ARTICLE_DETAILS]}:id`,
        element: <ArticleDetails />,
        authOnly: true,
    },
    {
        path: RoutePath[AppRoutes.ARTICLE_EDIT],
        element: <ArticleEdit />,
        authOnly: true,
    },
    {
        path: RoutePath[AppRoutes.ARTICLE_CREATE],
        element: <ArticleEdit />,
        authOnly: true,
    },
    {
        path: RoutePath[AppRoutes.ADMIN_PANEL],
        element: <AdminPanel />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
        path: RoutePath[AppRoutes.FORBIDDEN],
        element: <Forbidden />,
    },

    // last route
    {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
    },
];
