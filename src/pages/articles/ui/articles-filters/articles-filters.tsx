import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    ArticleSortField, ArticleSortSelector, ArticleType, ArticleTypeTabs, ArticleView,
} from '@/entities/article';
import { ArticlesViewSelector } from '@/features/articles-view-selector';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { SortOrder } from '@/shared/types';
import { Card } from '@/shared/ui/card/card';
import { Input } from '@/shared/ui/input/input';
import { HStack, VStack } from '@/shared/ui/stack';
import { TabItem } from '@/shared/ui/tabs/tabs';

import {
    getArticlesOrder, getArticlesSearch, getArticlesSort, getArticlesType, getArticlesView,
} from '../../model/selectors/articles';
import { fetchArticles } from '../../model/services/fetch-articles-list/fetch-articles-list';
import { articlesActions } from '../../model/slices/articles-slice';

interface ArticlesFiltersProps {
    className?: string;
}

export const ArticlesFilters = memo(({ className }: ArticlesFiltersProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesView);
    const order = useSelector(getArticlesOrder);
    const sort = useSelector(getArticlesSort);
    const search = useSelector(getArticlesSearch);
    const type = useSelector(getArticlesType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticles({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesActions.updateView(view));
    }, [dispatch]);

    const onChangeOrder = useCallback((value: SortOrder) => {
        dispatch(articlesActions.updateOrder(value));
        dispatch(articlesActions.updatePage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSort = useCallback((value: ArticleSortField) => {
        dispatch(articlesActions.updateSort(value));
        dispatch(articlesActions.updatePage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeType = useCallback((tab: TabItem<ArticleType>) => {
        if (tab.value === type) return;
        dispatch(articlesActions.updateType(tab.value));
        dispatch(articlesActions.updatePage(1));
        fetchData();
    }, [dispatch, fetchData, type]);

    const onChangeSearch = useCallback((value: string) => {
        dispatch(articlesActions.updateSearch(value));
        dispatch(articlesActions.updatePage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    return (
        <VStack className={className} gap="16" maxWidth>
            <HStack justify="between">
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticlesViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
            </HStack>
            <Card>
                <Input
                    placeholder={t('Поиск')}
                    onChange={onChangeSearch}
                    value={search}
                />
            </Card>
            <ArticleTypeTabs
                onChange={onChangeType}
                value={type}
            />
        </VStack>
    );
});
