import { ChangeEvent, useMemo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import { HStack } from '../stack';

import styles from './select.module.scss';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

interface SelectProps<T extends string> {
    className?: string;
    label?: string;
    options?: SelectOption<T>[];
    value?: T;
    onChange?: (value: T) => void;
    readonly?: boolean;
}

export const Select = <T extends string>(props: SelectProps<T>) => {
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
        onChange?.(e.currentTarget.value as T);
    };

    return (
        <HStack className={className} gap="4">
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

        </HStack>
    );
};
