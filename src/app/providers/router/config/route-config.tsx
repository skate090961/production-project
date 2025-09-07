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
import { AppRoutes, RoutePath } from '@/shared/consts/router';
import { AppRoutesProps } from '@/shared/types/router';

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
