import { ChangeEvent, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './select.module.scss';

interface SelectOption {
    value: string;
    content: string;
}

interface SelectProps {
    className?: string;
    label?: string;
    options?: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
    const {
        className,
        label,
        options,
        value,
        readonly,
        onChange,
    } = props;

    const optionsList = useMemo(() => options?.map((o) => (
        <option
            key={o.value}
            value={o.value}
            className={styles.option}
        >
            {o.content}
        </option>
    )), [options]);

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.currentTarget.value);
    };

    return (
        <div className={classNames(styles.root, [className])}>
            {label && (
                <span className={classNames('', [], { [styles.readonly]: readonly })}>{`${label}>`}</span>
            )}
            <select
                disabled={readonly}
                value={value}
                onChange={onChangeHandler}
                className={styles.select}
            >
                {optionsList}
            </select>

        </div>
    );
});
