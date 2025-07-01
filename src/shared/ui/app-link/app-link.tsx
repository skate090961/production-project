import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './app-link.module.scss';
import {Link, LinkProps} from "react-router-dom";
import {FC} from "react";

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    theme?: AppLinkTheme;
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const {
        className,
        theme = AppLinkTheme.PRIMARY,
        children,
        ...otherProps
    } = props;

    return (
        <Link className={classNames(styles.root, [className, styles[theme]])} {...otherProps}>
            {children}
        </Link>
    );
};