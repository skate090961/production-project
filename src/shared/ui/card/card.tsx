import { FC, HTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const Card: FC<CardProps> = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <div
            className={classNames(styles.root, [className])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
