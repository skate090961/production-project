import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './card.module.scss';

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
    theme?: CardTheme;
}

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        theme = CardTheme.NORMAL,
        ...otherProps
    } = props;

    return (
        <article
            className={classNames(styles.root, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </article>
    );
});
