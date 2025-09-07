import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/user';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import TeamIcon from '@/shared/assets/icons/team.svg';
import UserIcon from '@/shared/assets/icons/user.svg';
import { AppRoutes, RoutePath } from '@/shared/consts/router';

import { SidebarItemType } from '../types/sidebar-items';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemList: SidebarItemType[] = [
            {
                path: RoutePath[AppRoutes.MAIN],
                translationKey: 'Главная',
                Icon: HomeIcon,
                authOnly: false,
            },
            {
                path: RoutePath[AppRoutes.ABOUT],
                translationKey: 'О сайте',
                Icon: TeamIcon,
                authOnly: false,
            },
        ];

        if (userData) {
            sidebarItemList.push(
                {
                    path: `${RoutePath[AppRoutes.PROFILE]}${userData.id}`,
                    translationKey: 'Профиль',
                    Icon: UserIcon,
                    authOnly: true,
                },
                {
                    path: RoutePath[AppRoutes.ARTICLES],
                    translationKey: 'Статьи',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return sidebarItemList;
    },
);
