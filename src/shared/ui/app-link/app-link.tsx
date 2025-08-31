import { memo, ReactNode, forwardRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './app-link.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children?: ReactNode;
}

const ForwardAppLink = forwardRef<HTMLAnchorElement, AppLinkProps>((props, ref) => {
    const {
        className,
        theme = AppLinkTheme.PRIMARY,
        children,
        ...otherProps
    } = props;

    return (
        <Link
            ref={ref}
            className={classNames(styles.root, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    );
});

export const AppLink = memo(ForwardAppLink);
