import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { SortOrder } from '@/shared/types';
import { Select, SelectOption } from '@/shared/ui/select/select';
import { HStack } from '@/shared/ui/stack';

import { ArticleSortField } from '../../model/types/article';

interface ArticleSortSelectorProps {
    className?: string;
    order: SortOrder;
    sort: ArticleSortField;
    onChangeOrder: (value: SortOrder) => void;
    onChangeSort: (value: ArticleSortField) => void;
}

type SortOrderSelectOptions = SelectOption<SortOrder>[]
type SortFieldSelectOptions = SelectOption<ArticleSortField>[]

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
    const {
        className,
        order,
        onChangeOrder,
        sort,
        onChangeSort,
    } = props;

    const { t } = useTranslation();

    const orderOptions = useMemo<SortOrderSelectOptions>(() => [
        { value: 'asc', content: t('По возрастанию') },
        { value: 'desc', content: t('По убыванию') },
    ], [t]);

    const sortOptions = useMemo<SortFieldSelectOptions>(() => [
        { value: ArticleSortField.CREATED, content: t('По дате') },
        { value: ArticleSortField.TITLE, content: t('По названию') },
        { value: ArticleSortField.VIEWS, content: t('По просмотрам') },
    ], [t]);

    return (
        <HStack className={className} gap="16">
            <Select
                label={t('Сортировать по')}
                options={sortOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('по')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
            />
        </HStack>
    );
});
