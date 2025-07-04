import {
    SVGProps, useMemo, useState, VFC,
} from 'react';
import { useTranslation } from 'react-i18next';

import HomeIcon from '@/shared/assets/icons/home.svg';
import TeamIcon from '@/shared/assets/icons/team.svg';
import { AppRoutes, RoutePath } from '@/shared/config/route/route-config';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppLink, AppLinkTheme } from '@/shared/ui/app-link/app-link';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/button';
import { LangSwitcher } from '@/widgets/lang-switcher';
import { ThemeSwitcher } from '@/widgets/theme-switcher';

import styles from './sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

interface NavItem {
    route: AppRoutes;
    translationKey: string;
    Icon: VFC<SVGProps<SVGSVGElement>>;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    const navItems: NavItem[] = useMemo(() => [
        {
            route: AppRoutes.MAIN,
            translationKey: 'Главная',
            Icon: HomeIcon,
        },
        {
            route: AppRoutes.ABOUT,
            translationKey: 'О сайте',
            Icon: TeamIcon,
        },
    ], []);

    const renderNavItem = ({ route, translationKey, Icon }: NavItem) => (
        <li key={route}>
            <AppLink
                to={RoutePath[route]}
                theme={AppLinkTheme.SECONDARY}
                className={styles.link}
            >
                <div className={styles.iconWrapper}>
                    <Icon />
                </div>
                <span
                    className={styles.linkText}
                >
                    {t(translationKey)}
                </span>
            </AppLink>
        </li>
    );

    return (
        <aside
            className={classNames(styles.root, [className], { [styles.collapsed]: isCollapsed })}
            aria-label="Боковая панель"
            data-testid="sidebar"
        >
            <ul className={styles.links}>
                {navItems.map(renderNavItem)}
            </ul>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={styles.toggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {isCollapsed ? '>' : '<'}
            </Button>
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher isShort={isCollapsed} />
            </div>
        </aside>
    );
};
