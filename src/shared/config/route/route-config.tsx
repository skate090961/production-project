import { RouteProps } from 'react-router-dom';

import { About } from '@/pages/about';
import { ArticleDetails } from '@/pages/article-details';
import { Articles } from '@/pages/articles';
import { Main } from '@/pages/main';
import { NotFoundPage } from '@/pages/not-found-page';
import { Profile } from '@/pages/profile';

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile/', // + :id
    [AppRoutes.ARTICLES]: '/articles',
    [AppRoutes.ARTICLE_DETAILS]: '/articles/', // + :id

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

    // last route
    {
        path: RoutePath[AppRoutes.NOT_FOUND],
        element: <NotFoundPage />,
    },
];
