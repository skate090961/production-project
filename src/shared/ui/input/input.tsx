import {
    ChangeEvent, InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'autoFocus'>

interface InputProps extends HTMLInputProps{
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readOnly,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const currentValue = e.currentTarget.value;
        onChange?.(currentValue);
        setCursorPosition(currentValue.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: any) => {
        setCursorPosition(e?.target?.selectionStart || 0);
    };

    return (
        <div className={classNames(styles.root, [className], { [styles.readonly]: readOnly })}>
            {placeholder && (
                <div>
                    {`${placeholder}>`}
                </div>
            )}
            <div className={styles.cursorWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onSelect={onSelect}
                    className={styles.input}
                    {...otherProps}
                />
                {isFocused
                    && (
                        <div
                            className={styles.cursor}
                            style={{ left: `${cursorPosition * 9}px` }}
                        />
                    )}
            </div>
        </div>
    );
});
