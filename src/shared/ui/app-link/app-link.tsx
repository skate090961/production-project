import { memo, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './app-link.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    theme?: AppLinkTheme;
    children?: ReactNode;
}

export const AppLink = memo((props: AppLinkProps) => {
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
});
