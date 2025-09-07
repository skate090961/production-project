import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
    getUserAuthData, isUserAdmin, isUserManager, userActions,
} from '@/entities/user';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/consts/router';
import { Avatar } from '@/shared/ui/avatar';
import { Dropdown } from '@/shared/ui/popups';

interface AvatarMenuProps {
    className?: string;
}

export const AvatarMenu = memo(({ className }: AvatarMenuProps) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    return (
        <Dropdown
            className={className}
            direction="bottomLeft"
            trigger={<Avatar size={35} src={authData?.avatar} />}
            items={[
                ...(isAdminPanelAvailable ? [
                    {
                        content: t('Админка'),
                        href: getRouteAdminPanel(),
                    },
                ] : []),
                {
                    content: t('Профиль'),
                    href: getRouteProfile(authData!.id),
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },
            ]}
        />
    );
});
