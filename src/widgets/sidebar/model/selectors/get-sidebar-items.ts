import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/user';
import ArticlesIcon from '@/shared/assets/icons/articles.svg';
import HomeIcon from '@/shared/assets/icons/home.svg';
import TeamIcon from '@/shared/assets/icons/team.svg';
import UserIcon from '@/shared/assets/icons/user.svg';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/consts/router';

import { SidebarItemType } from '../types/sidebar-items';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                translationKey: 'Главная',
                Icon: HomeIcon,
                authOnly: false,
            },
            {
                path: getRouteAbout(),
                translationKey: 'О сайте',
                Icon: TeamIcon,
                authOnly: false,
            },
        ];

        if (userData) {
            sidebarItemList.push(
                {
                    path: getRouteProfile(userData.id),
                    translationKey: 'Профиль',
                    Icon: UserIcon,
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    translationKey: 'Статьи',
                    Icon: ArticlesIcon,
                    authOnly: true,
                },
            );
        }

        return sidebarItemList;
    },
);
