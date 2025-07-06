import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './button.module.scss';

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ButtonTheme;
    square?: boolean
    size?: ButtonSize;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        square,
        size = ButtonSize.M,
        ...otherProps
    } = props;

    const mods: Record<string, boolean> = {
        [styles.square]: square,
    };

    const additions: string[] = [
        className,
        styles[theme],
        styles[size],
    ];

    return (
        <button
            type="button"
            className={classNames(styles.root, additions, mods)}
            {...otherProps}
        >
            {children}
        </button>
    );
};
