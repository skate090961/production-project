import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './navbar.module.scss';
import {AppLink, AppLinkTheme} from "@/shared/ui/app-link/app-link";
import {AppRoutes, RoutePath} from "@/shared/config/route/route-config";
import {ThemeSwitcher} from "@/widgets/theme-switcher";

interface NavbarProps {
    className?: string;
}

interface NavItem {
    route: AppRoutes;
    label: string;
}

const navItems: NavItem[] = [
    { route: AppRoutes.MAIN, label: 'Главная' },
    { route: AppRoutes.ABOUT, label: 'О сайте' },
];

export const Navbar = ({ className }: NavbarProps) => {
    const renderNavItem = ({ route, label }: NavItem) => (
        <li key={route}>
            <AppLink
                to={RoutePath[route]}
                theme={AppLinkTheme.SECONDARY}
            >
                {label}
            </AppLink>
        </li>
    );

    return (
        <nav
            className={classNames(styles.root, [className])}
            aria-label="Основная навигация"
        >
            <ul className={styles.links}>
                {navItems.map(renderNavItem)}
            </ul>
        </nav>
    );
};

