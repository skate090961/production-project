import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './flex.module.scss';

type FlexAlign = 'start' | 'end' | 'center' | 'normal';
type FlexJustify = 'start' | 'end' | 'between' | 'center';
type FlexDirection = 'row' | 'column';
type FlexGap = '2' | '4' | '8' | '16' | '32';

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    align?: FlexAlign;
    justify?: FlexJustify;
    direction: FlexDirection;
    gap?: FlexGap;
    wrap?: boolean;
    maxWidth?: boolean;
}

const alignStyles: Record<FlexAlign, string> = {
    center: styles.alignCenter,
    start: styles.alignStart,
    end: styles.alignEnd,
    normal: styles.alignNormal,
};

const justifyStyles: Record<FlexJustify, string> = {
    start: styles.justifyStart,
    end: styles.justifyEnd,
    center: styles.justifyCenter,
    between: styles.justifyBetween,
};

const directionStyles: Record<FlexDirection, string> = {
    row: styles.directionRow,
    column: styles.directionColumn,
};

const gapStyles: Record<FlexGap, string> = {
    2: styles.gap2,
    4: styles.gap4,
    8: styles.gap8,
    16: styles.gap16,
    32: styles.gap32,
};

export const Flex = (props: FlexProps) => {
    const {
        className,
        align = 'center',
        justify = 'start',
        direction = 'row',
        gap,
        wrap = false,
        children,
        maxWidth,
        ...otherProps
    } = props;

    const additions = [
        className,
        alignStyles[align],
        justifyStyles[justify],
        directionStyles[direction],
        gap && gapStyles[gap],
    ];
    const mods = {
        [styles.wrap]: wrap,
        [styles.maxWidth]: maxWidth,
    };
    const classes = classNames(styles.root, [...additions], { ...mods });

    return (
        <div className={classes} {...otherProps}>
            {children}
        </div>
    );
};
