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
import {
    getRouteAbout,
    getRouteAdminPanel,
    getRouteArticleCreate,
    getRouteArticleDetails,
    getRouteArticleEdit,
    getRouteArticles,
    getRouteForbidden,
    getRouteMain,
    getRouteProfile,
} from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';

export const routeConfig: AppRoutesProps[] = [
    {
        path: getRouteMain(),
        element: <Main />,
    },
    {
        path: getRouteAbout(),
        element: <About />,
    },
    {
        path: getRouteProfile(':id'),
        element: <Profile />,
        authOnly: true,
    },
    {
        path: getRouteArticles(),
        element: <Articles />,
        authOnly: true,
    },
    {
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetails />,
        authOnly: true,
    },
    {
        path: getRouteArticleCreate(),
        element: <ArticleEdit />,
        authOnly: true,
    },
    {
        path: getRouteArticleEdit(':id'),
        element: <ArticleEdit />,
        authOnly: true,
    },
    {
        path: getRouteAdminPanel(),
        element: <AdminPanel />,
        authOnly: true,
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
        path: getRouteForbidden(),
        element: <Forbidden />,
    },

    // last route
    {
        path: '*',
        element: <NotFoundPage />,
    },
];
