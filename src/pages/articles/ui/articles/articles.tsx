import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { ArticleList } from '@/entities/article';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/stack';
import { Page } from '@/widgets/page/page';

import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';
import { fetchArticlesNewPage } from '../../model/services/fetch-articles-new-page/fetch-articles-new-page';
import { initArticles } from '../../model/services/init-articles/init-articles';
import { articlesReducer, getArticles } from '../../model/slices/articles-slice';
import { ArticlesFilters } from '../articles-filters/articles-filters';

const initReducers: ReducerList = {
    articles: articlesReducer,
};

const Article = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);
    const [searchParams] = useSearchParams();

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
                    <ArticleList
                        isLoading={isLoading}
                        articles={articles}
                        view={view}
                    />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(Article);
