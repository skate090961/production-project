import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleView } from '@/entities/article';
import { ArticlesViewSelector } from '@/features/articles-view-selector';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Page } from '@/widgets/page/page';

import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';
import { fetchArticlesNewPage } from '../../model/services/fetch-articles-new-page/fetch-articles-new-page';
import { initArticles } from '../../model/services/init-articles/init-articles';
import { articlesActions, articlesReducer, getArticles } from '../../model/slices/articles-slice';

const initReducers: ReducerList = {
    articles: articlesReducer,
};

const Article = () => {
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);

    useEffect(() => {
        dispatch(initArticles());
    }, [dispatch]);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesActions.updateView(view));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchArticlesNewPage());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initReducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart}>
                <ArticlesViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
                <ArticleList
                    isLoading={isLoading}
                    articles={articles}
                    view={view}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(Article);
