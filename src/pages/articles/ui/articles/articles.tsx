import React, { memo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/stack';
import { Page } from '@/widgets/page';

import { fetchArticlesNewPage } from '../../model/services/fetch-articles-new-page/fetch-articles-new-page';
import { initArticles } from '../../model/services/init-articles/init-articles';
import { articlesReducer } from '../../model/slices/articles-slice';
import { ArticlesFilters } from '../articles-filters/articles-filters';
import { ArticlesInfiniteList } from '../articles-infinite-list/articles-infinite-list';

const initReducers: ReducerList = {
    articles: articlesReducer,
};

const Article = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initArticles(searchParams));
    }, [dispatch, searchParams]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNewPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initReducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart}>
                <VStack gap="16">
                    <ArticlesFilters />
                    <ArticlesInfiniteList />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(Article);
