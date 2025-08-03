import React, { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './icon.module.scss';

export enum IconTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED_PRIMARY = 'invertedPrimary'
}

interface IconProps {
    className?: string;
    Svg: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    theme?: IconTheme
}

export const AppIcon = memo(({ className, Svg, theme = IconTheme.PRIMARY }: IconProps) => (
    <Svg className={classNames(styles.root, [className, styles[theme]])} />
));
