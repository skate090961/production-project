import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './button.module.scss';
import {ButtonHTMLAttributes, FC} from "react";

export enum ThemeButton {
    CLEAR = 'clear'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme?: ThemeButton;
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        ...otherProps
    } = props;

    return (
        <button
            className={classNames(styles.root, [className, styles[theme]])}
            {...otherProps}
        >
            {children}
        </button>
    );
};