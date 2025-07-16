import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { Country } from '@/entities/country';
import { Select } from '@/shared/ui/select/select';

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.USA, content: Country.USA },
    { value: Country.Brazil, content: Country.Brazil },
    { value: Country.Japan, content: Country.Japan },
    { value: Country.Germany, content: Country.Germany },
];

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

export const CountrySelect = memo((props: CountrySelectProps) => {
    const {
        className,
        value,
        readonly,

        onChange,
    } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country);
    }, [onChange]);

    return (
        <Select
            className={className}
            label={t('Страна')}
            value={value}
            onChange={onChangeHandler}
            options={options}
            readonly={readonly}
        />
    );
});
