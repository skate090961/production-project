import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/user';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon';
import { AppLink, AppLinkTheme } from '@/shared/ui/app-link';
import { HStack } from '@/shared/ui/stack';

import { SidebarItemType } from '../../model/types/sidebar-items';

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
        <div>
            <AppLink
                to={path}
                theme={AppLinkTheme.SECONDARY}
                className={classNames('', [], { [styles.collapsed]: collapsed })}
            >
                <HStack gap="16">
                    <AppIcon Svg={Icon} theme={IconTheme.INVERTED_PRIMARY} />
                    <span
                        className={styles.linkText}
                    >
                        {t(translationKey)}
                    </span>
                </HStack>
            </AppLink>
        </div>
    );
});
