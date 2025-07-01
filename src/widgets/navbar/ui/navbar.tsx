import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './navbar.module.scss';
import {AppLink, AppLinkTheme} from "@/shared/ui/app-link/app-link";
import {AppRoutes, RoutePath} from "@/shared/config/route/route-config";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(styles.root, [className])}>
            <div className={styles.links}>
                <AppLink to={RoutePath[AppRoutes.MAIN]} theme={AppLinkTheme.SECONDARY}>
                    Главная
                </AppLink>
                <AppLink to={RoutePath[AppRoutes.ABOUT]} theme={AppLinkTheme.SECONDARY}>
                    О сайте
                </AppLink>
            </div>
        </div>
    );
};

