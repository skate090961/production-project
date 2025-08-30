import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './text.module.scss';

type HeaderTagType = 'h1' | 'h2' | 'h3'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
    INVERTED = 'inverted'
}

export enum TextAlign {
    CENTER = 'center',
    LEFT = 'left',
    RIGHT = 'right'
}

export enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    [TextSize.S]: 'h3',
    [TextSize.M]: 'h2',
    [TextSize.L]: 'h1',
};

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        title,
        text,
        theme = TextTheme.PRIMARY,
        align = TextAlign.LEFT,
        size = TextSize.M,
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div className={classNames(styles.root, [className, styles[theme], styles[align], styles[size]])}>
            {title && <HeaderTag className={styles.title}>{title}</HeaderTag>}
            {text && <p className={styles.text}>{text}</p>}
        </div>
    );
});
