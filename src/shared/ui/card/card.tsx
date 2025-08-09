import { HTMLAttributes, memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: ReactNode;
}

export const Card = memo((props: CardProps) => {
    const { className, children, ...otherProps } = props;

    return (
        <article
            className={classNames(styles.root, [className])}
            {...otherProps}
        >
            {children}
        </article>
    );
});
