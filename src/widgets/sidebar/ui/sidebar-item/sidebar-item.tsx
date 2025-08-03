import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/user';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { AppLink, AppLinkTheme } from '@/shared/ui/app-link/app-link';
import { SidebarItemType } from '@/widgets/sidebar/model/items';

import styles from './sidebar-item.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
    const { t } = useTranslation();

    const { path, translationKey, Icon } = item;

    const isAuth = useSelector(getUserAuthData);

    if (item.authOnly && !isAuth) return null;

    return (
        <li>
            <AppLink
                to={path}
                theme={AppLinkTheme.SECONDARY}
                className={classNames(styles.link, [], { [styles.collapsed]: collapsed })}
            >
                <AppIcon Svg={Icon} theme={IconTheme.INVERTED_PRIMARY} />
                <span
                    className={styles.linkText}
                >
                    {t(translationKey)}
                </span>
            </AppLink>
        </li>
    );
});
