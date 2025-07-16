import { SVGProps, VFC } from 'react';

import HomeIcon from '@/shared/assets/icons/home.svg';
import TeamIcon from '@/shared/assets/icons/team.svg';
import UserIcon from '@/shared/assets/icons/user.svg';
import { AppRoutes, RoutePath } from '@/shared/config/route/route-config';

export interface SidebarItemType {
    path: string;
    translationKey: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
    authOnly: boolean;
}

export const sidebarItemList: SidebarItemType[] = [
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
    {
        path: RoutePath[AppRoutes.PROFILE],
        translationKey: 'Профиль',
        Icon: UserIcon,
        authOnly: true,
    },
];
