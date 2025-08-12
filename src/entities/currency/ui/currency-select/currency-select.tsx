import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '@/entities/currency';
import { Select } from '@/shared/ui/select/select';

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readonly?: boolean;
}

const options = [
    { value: Currency.RUB, content: Currency.RUB },
    { value: Currency.USD, content: Currency.USD },
    { value: Currency.BRL, content: Currency.BRL },
    { value: Currency.JPY, content: Currency.JPY },
    { value: Currency.EUR, content: Currency.EUR },
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {
        className,
        value,
        readonly,

        onChange,
    } = props;

    const { t } = useTranslation();

    return (
        <Select
            className={className}
            label={t('Валюта')}
            value={value}
            onChange={onChange}
            options={options}
            readonly={readonly}
        />
    );
});
